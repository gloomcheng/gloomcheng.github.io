#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sanitizeHtml from 'sanitize-html'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDir, '..')
const contentDir = path.join(siteRoot, 'src/content/blog')
const mediaDir = path.join(siteRoot, 'public/blog-media/legacy')
const archiveRoot = process.env.TAYANSWA_ARCHIVE_DIR
const container = process.env.TAYANSWA_DB_CONTAINER ?? 'codex-tayanswa-migrate'
const database = process.env.TAYANSWA_DB_NAME ?? 'tayanswa'
const password = process.env.TAYANSWA_DB_PASSWORD

if (!archiveRoot || !password) {
  console.error(
    'Required: TAYANSWA_ARCHIVE_DIR and TAYANSWA_DB_PASSWORD environment variables.',
  )
  process.exit(1)
}

const publicFilesRoot = path.join(
  archiveRoot,
  'tayanswa.tw/web/sites/default/files',
)
if (!existsSync(publicFilesRoot)) {
  throw new Error(`Drupal public files not found: ${publicFilesRoot}`)
}

for (const generatedDir of [contentDir, mediaDir]) {
  if (!generatedDir.startsWith(siteRoot + path.sep)) {
    throw new Error(`Refusing to replace path outside site root: ${generatedDir}`)
  }
  rmSync(generatedDir, { recursive: true, force: true })
  mkdirSync(generatedDir, { recursive: true })
}

const sql = String.raw`
SET SESSION group_concat_max_len = 65535;
SELECT
  n.nid,
  HEX(n.type),
  n.created,
  n.changed,
  HEX(n.title),
  HEX(COALESCE(p.alias, CONCAT('/node/', n.nid))),
  HEX(COALESCE(b.body_value, '')),
  HEX(COALESCE(b.body_summary, '')),
  HEX(COALESCE(b.body_format, '')),
  HEX(COALESCE(GROUP_CONCAT(DISTINCT term.name ORDER BY term.name SEPARATOR 0x1F), ''))
FROM node_field_data n
LEFT JOIN node__body b
  ON b.entity_id = n.nid AND b.deleted = 0 AND b.delta = 0
LEFT JOIN path_alias p
  ON p.path = CONCAT('/node/', n.nid) AND p.langcode = n.langcode
LEFT JOIN node__field_tags tag
  ON tag.entity_id = n.nid AND tag.deleted = 0
LEFT JOIN taxonomy_term_field_data term
  ON term.tid = tag.field_tags_target_id
WHERE n.status = 1 AND n.type IN ('article', 'technical')
GROUP BY n.nid, n.type, n.created, n.changed, n.title, p.alias,
  b.body_value, b.body_summary, b.body_format
ORDER BY n.created, n.nid;
`

const output = execFileSync(
  'docker',
  [
    'exec',
    '-e',
    `MYSQL_PWD=${password}`,
    container,
    'mariadb',
    '-uroot',
    '--batch',
    '--raw',
    '--skip-column-names',
    database,
    '-e',
    sql,
  ],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
)

const fromHex = (value) => Buffer.from(value ?? '', 'hex').toString('utf8')
const normalizeAlias = (value, nid) => {
  const candidate = value.startsWith('/') ? value : `/${value}`
  const normalized = path.posix.normalize(candidate).replace(/\/$/, '')
  if (normalized.includes('..') || normalized === '/') return `/node/${nid}`
  return normalized
}

const records = output
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [nid, type, created, changed, title, alias, body, summary, format, tags] =
      line.split('\t')
    return {
      nid: Number(nid),
      type: fromHex(type),
      created: Number(created),
      changed: Number(changed),
      title: fromHex(title),
      legacyPath: normalizeAlias(fromHex(alias), nid),
      body: fromHex(body),
      summary: fromHex(summary),
      format: fromHex(format),
      tags: fromHex(tags).split('\u001f').filter(Boolean),
    }
  })

const aliases = new Map(
  records.map(({ legacyPath }) => [legacyPath, `/blog${legacyPath}/`]),
)
const mediaPaths = new Set()
const missingMedia = new Set()

const registerMedia = (urlPath) => {
  const withoutQuery = urlPath.split(/[?#]/, 1)[0]
  const encodedRelative = withoutQuery.replace(
    /^\/?(?:sites\/default\/files|blog-media\/legacy)\/?/,
    '',
  )
  let relative
  try {
    relative = decodeURIComponent(encodedRelative)
  } catch {
    relative = encodedRelative
  }
  relative = path.posix.normalize(relative).replace(/^\.\.\/?/, '')
  if (!relative || relative.startsWith('..')) return urlPath

  const source = path.join(publicFilesRoot, relative)
  const destination = path.join(mediaDir, relative)
  if (existsSync(source)) {
    mkdirSync(path.dirname(destination), { recursive: true })
    copyFileSync(source, destination)
    mediaPaths.add(relative)
  } else {
    missingMedia.add(relative)
  }
  return `/blog-media/legacy/${relative
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`
}

const rewriteUrl = (rawUrl) => {
  if (!rawUrl || rawUrl.startsWith('#')) return rawUrl
  if (/^(?:mailto|tel):/i.test(rawUrl)) return rawUrl

  let parsed
  try {
    parsed = new URL(rawUrl, 'https://tayanswa.tw')
  } catch {
    return rawUrl
  }

  if (
    parsed.hostname === 'tayanswa.tw' ||
    parsed.hostname === 'www.tayanswa.tw'
  ) {
    if (/^\/sites\/default\/files\//.test(parsed.pathname)) {
      return registerMedia(parsed.pathname + parsed.search + parsed.hash)
    }
    const normalized = parsed.pathname.replace(/\/$/, '') || '/'
    const migrated = aliases.get(normalized)
    if (migrated) return `${migrated}${parsed.search}${parsed.hash}`
    return `${parsed.pathname}${parsed.search}${parsed.hash}`
  }

  return rawUrl
}

const decodeEntities = (value) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(
      /&(amp|lt|gt|quot|apos|nbsp);/g,
      (_, entity) =>
        ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[
          entity
        ],
    )

const plainText = (html) =>
  decodeEntities(
    sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }),
  )
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const yamlString = (value) => JSON.stringify(value)
const yamlArray = (values) => `[${values.map(yamlString).join(', ')}]`

for (const record of records) {
  const sanitizedBody = sanitizeHtml(record.body, {
    allowedTags: [
      'p',
      'br',
      'a',
      'strong',
      'em',
      'b',
      'i',
      'u',
      's',
      'blockquote',
      'ul',
      'ol',
      'li',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'pre',
      'code',
      'kbd',
      'samp',
      'figure',
      'figcaption',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
      'div',
      'span',
      'dl',
      'dt',
      'dd',
      'sup',
      'sub',
    ],
    allowedAttributes: {
      '*': ['class'],
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          href: rewriteUrl(attributes.href),
          ...(attributes.target === '_blank'
            ? { rel: 'noopener noreferrer' }
            : {}),
        },
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          src: rewriteUrl(attributes.src).replace(/^http:\/\//i, 'https://'),
          loading: 'lazy',
        },
      }),
    },
  }).trim()
  const safeBody = sanitizedBody.replace(
    /(```[^\r\n]*\r?\n)([\s\S]*?)(\r?\n```)/g,
    (_, opening, code, closing) => `${opening}${decodeEntities(code)}${closing}`,
  )

  const descriptionSource = record.summary || safeBody || record.title
  const description = plainText(descriptionSource).slice(0, 180)
  const relativePath = record.legacyPath.replace(/^\//, '')
  const filePath = path.join(contentDir, `${relativePath}.md`)
  if (!filePath.startsWith(contentDir + path.sep)) {
    throw new Error(`Unsafe content output path: ${filePath}`)
  }
  mkdirSync(path.dirname(filePath), { recursive: true })

  const publishedAt = new Date(record.created * 1000).toISOString()
  const updatedAt = new Date(record.changed * 1000).toISOString()
  const fallbackBody =
    '<p class="archive-note">這篇舊站短記只有標題；原資料庫沒有保存獨立內文。</p>'
  const markdown = `---
title: ${yamlString(record.title)}
description: ${yamlString(description)}
publishedAt: ${yamlString(publishedAt)}
updatedAt: ${yamlString(updatedAt)}
legacyPath: ${yamlString(record.legacyPath)}
kind: ${yamlString(record.type)}
tags: ${yamlArray(record.tags)}
legacyNid: ${record.nid}
archived: true
---

${safeBody || fallbackBody}
`
  writeFileSync(filePath, markdown)
}

console.log(`Imported ${records.length} published posts.`)
console.log(`Copied ${mediaPaths.size} referenced legacy media files.`)
if (missingMedia.size > 0) {
  console.warn(`Missing ${missingMedia.size} referenced media paths:`)
  for (const mediaPath of [...missingMedia].sort()) console.warn(`- ${mediaPath}`)
}
