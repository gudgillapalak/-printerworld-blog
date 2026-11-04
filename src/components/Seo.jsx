import { useEffect } from 'react'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets the page title, meta description, canonical URL and social tags for the current page.
export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const url = window.location.origin + path
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', window.location.origin + '/og-image.png')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }, [title, description, path])
  return null
}
