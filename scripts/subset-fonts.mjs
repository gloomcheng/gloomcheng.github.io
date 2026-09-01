import { execFileSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const srcRoot = resolve(root, 'src')
const corpusFiles = [resolve(root, 'src/data/profile.json')]

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectFiles(path))
    else if (['.astro', '.css', '.ts', '.json', '.md'].includes(extname(entry.name))) files.push(path)
  }
  return files
}

corpusFiles.push(...await collectFiles(srcRoot))
const corpus = (await Promise.all([...new Set(corpusFiles)].map((file) => readFile(file, 'utf8')))).join('\n')
const corpusPath = resolve(root, '.font-subset-corpus.txt')
await writeFile(corpusPath, corpus)

const outputDir = resolve(root, 'public/assets/fonts/subset')
await mkdir(outputDir, { recursive: true })

const fonts = [
  ['assets/font-source/line-seed/line-seed-tw-bold.woff2', 'line-seed-tw-bold.woff2'],
  ['assets/font-source/noto-sans-tc/NotoSansTC[wght].ttf', 'noto-sans-tc-variable.woff2'],
  ['assets/font-source/ibm-plex-mono/IBMPlexMono-Regular.ttf', 'ibm-plex-mono-regular.woff2'],
]

for (const [input, output] of fonts) {
  execFileSync('pyftsubset', [
    resolve(root, input),
    `--text-file=${corpusPath}`,
    `--output-file=${resolve(outputDir, output)}`,
    '--flavor=woff2',
    '--layout-features=*',
    '--glyph-names',
    '--symbol-cmap',
    '--legacy-cmap',
    '--notdef-glyph',
    '--notdef-outline',
    '--recommended-glyphs',
    '--ignore-missing-glyphs',
  ], { stdio: 'inherit' })
}

console.log(`Subset ${fonts.length} fonts into ${outputDir}`)
