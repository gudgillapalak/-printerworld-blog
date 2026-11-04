import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { pageTitle } from '../data/seoTitle.js'
import RelatedArticles from '../components/RelatedArticles.jsx'
import { blogs } from '../data/blogs.js'

export default function BlogDetail() {
  const { slug } = useParams()
  const post = blogs.find((b) => b.slug === slug)
  if (!post) return <Navigate to="/" replace />

  const related = [
    ...blogs.filter((b) => b.slug !== slug && b.category === post.category),
    ...blogs.filter((b) => b.slug !== slug && b.category !== post.category),
  ].slice(0, 3)

  return (
    <>
      <Seo title={pageTitle(post.seoTitle)} description={post.metaDescription} path={`/blog/${post.slug}`} />
      <article className="container article">
        <Link to="/" className="back">← Back to Blogs</Link>
        <p className="meta"><span className={`tag ${post.tone}`}>{post.category}</span> {post.readTime} min read</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        <div className={`article-rule ${post.tone}`} aria-hidden="true" />
        {post.content.map((s, i) => (
          <section key={i}>
            {s.heading && <h2>{s.heading}</h2>}
            {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
      </article>
      <RelatedArticles posts={related} />
    </>
  )
}
