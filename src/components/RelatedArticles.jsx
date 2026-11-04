import BlogCard from './BlogCard.jsx'

export default function RelatedArticles({ posts }) {
  if (!posts.length) return null
  return (
    <section className="related">
      <div className="container">
        <h2>Related articles</h2>
        <div className="grid">{posts.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      </div>
    </section>
  )
}
