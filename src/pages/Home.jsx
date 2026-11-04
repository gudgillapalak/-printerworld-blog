import { useMemo, useState } from 'react'
import Hero from '../components/Hero.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import BlogCard from '../components/BlogCard.jsx'
import Seo from '../components/Seo.jsx'
import { blogs, categories } from '../data/blogs.js'

const PAGE_SIZE = 6

export default function Home() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return blogs.filter((b) =>
      (category === 'All' || b.category === category) &&
      (!q || q.split(/\s+/).every((w) => b.searchText.includes(w)))
    )
  }, [query, category])

  const changeQuery = (v) => { setQuery(v); setVisible(PAGE_SIZE) }
  const changeCategory = (c) => { setCategory(c); setVisible(PAGE_SIZE) }

  return (
    <>
      <Seo
        title="Printerworld Blog | Printer and Laptop Guides, Repair Tips and Buying Advice"
        description="Practical guides from Printerworld on choosing, maintaining and troubleshooting printers and laptops, plus ink, toner and repair advice."
        path="/"
      />
      <Hero query={query} onQuery={changeQuery} />
      <section className="container section">
        <CategoryFilter categories={['All', ...categories]} active={category} onSelect={changeCategory} />
        {results.length === 0 ? (
          <div className="empty">
            <h3>No articles found</h3>
            <p>Try a different keyword or pick another category.</p>
            <button className="btn" onClick={() => { changeQuery(''); changeCategory('All') }}>Clear filters</button>
          </div>
        ) : (
          <>
            <div className="grid">
              {results.slice(0, visible).map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
            <p className="count">Showing {Math.min(visible, results.length)} of {results.length} articles</p>
            {visible < results.length && (
              <div className="center"><button className="btn" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more articles</button></div>
            )}
          </>
        )}
      </section>
    </>
  )
}
