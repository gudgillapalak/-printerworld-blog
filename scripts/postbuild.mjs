// Runs after `vite build`. Creates one HTML file per article with its own SEO title and
// meta description (so search engines and link previews see them without running JavaScript),
// plus sitemap.xml and robots.txt. Set SITE_URL (e.g. https://www.printerworld.com) to add
// canonical URLs and the sitemap; on Vercel the production domain is detected automatically.
import fs from 'node:fs'
import path from 'node:path'
import { pageTitle } from '../src/data/seoTitle.js'

const dist = 'dist'
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const posts = JSON.parse(fs.readFileSync('src/data/blogsData.json', 'utf8'))
const site = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')).replace(/\/+$/, '')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const setContent = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), (_, a, b) => a + esc(value) + b)

function render({ title, description, route }) {
  let h = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`)
  h = setContent(h, 'name', 'description', description)
  h = setContent(h, 'property', 'og:title', title)
  h = setContent(h, 'property', 'og:description', description)
  h = setContent(h, 'name', 'twitter:title', title)
  h = setContent(h, 'name', 'twitter:description', description)
  if (site) {
    h = setContent(h, 'property', 'og:image', `${site}/og-image.png`)
    h = h.replace('</head>', () => `    <link rel="canonical" href="${site}${route}" />\n    <meta property="og:url" content="${site}${route}" />\n  </head>`)
  }
  return h
}

for (const p of posts) {
  const dir = path.join(dist, 'blog', p.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), render({ title: pageTitle(p.seoTitle), description: p.metaDescription, route: `/blog/${p.slug}` }))
}

if (site) {
  fs.writeFileSync(path.join(dist, 'index.html'), render({ title: template.match(/<title>([\s\S]*?)<\/title>/)[1], description: template.match(/name="description" content="([^"]*)"/)[1].replace(/&amp;/g, '&'), route: '/' }))
  const urls = ['/', ...posts.map((p) => `/blog/${p.slug}`)]
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}\n</urlset>\n`)
  fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
} else {
  fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n')
  console.log('postbuild: SITE_URL not set, so canonical URLs and sitemap.xml were skipped.')
}
console.log(`postbuild: wrote ${posts.length} article pages.`)
