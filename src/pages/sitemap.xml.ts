import { blogPath, getBlogPosts } from '../lib/blog'

const site = 'https://gloomcheng.github.io'
const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) =>
    ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    })[character] ?? character,
  )

export async function GET() {
  const posts = await getBlogPosts()
  const urls = [
    { path: '/', lastmod: '2026-08-29' },
    { path: '/blog/', lastmod: '2026-09-02' },
    { path: '/resume/', lastmod: '2026-08-27' },
    { path: '/resume/en/', lastmod: '2026-08-27' },
    ...posts.map((post) => ({
      path: blogPath(post.data.legacyPath),
      lastmod: post.data.updatedAt.toISOString().slice(0, 10),
    })),
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${escapeXml(new URL(path, site).toString())}</loc><lastmod>${lastmod}</lastmod></url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
