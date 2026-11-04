import { Link } from 'react-router-dom'

export default function BlogCard({ post }) {
  return (
    <article className="card">
      <div className={`card-band ${post.tone}`} aria-hidden="true" />
      <div className="card-body">
        <p className="meta"><span className={`tag ${post.tone}`}>{post.category}</span> {post.readTime} min read</p>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p className="card-excerpt">{post.excerpt}</p>
        <Link className="read-more" to={`/blog/${post.slug}`}>Read more</Link>
      </div>
    </article>
  )
}
