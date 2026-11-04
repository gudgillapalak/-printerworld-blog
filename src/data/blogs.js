// All 50 Printerworld articles live in blogsData.json (extracted from the Word document).
// Each article: id, slug, title, category, excerpt, seoTitle, keywords[], readTime, content[{heading, paragraphs[]}]
// To change an article's category, edit "category" for it in blogsData.json.
import data from './blogsData.json'

export const categories = [...new Set(data.map((b) => b.category))]

const palette = ['c', 'm', 'y']
const toneByCategory = Object.fromEntries(categories.map((c, i) => [c, palette[i % 3]]))

export const blogs = data.map((b) => ({
  ...b,
  tone: toneByCategory[b.category],
  // lower-cased text used by the search box (title, summary, category, keywords and full article)
  searchText: [b.title, b.excerpt, b.category, b.keywords.join(' '), b.content.map((s) => `${s.heading || ''} ${s.paragraphs.join(' ')}`).join(' ')].join(' ').toLowerCase(),
}))
