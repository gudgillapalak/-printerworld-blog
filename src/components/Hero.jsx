import SearchBar from './SearchBar.jsx'

export default function Hero({ query, onQuery }) {
  return (
    <section className="hero">
      <div className="hero-dots" aria-hidden="true">
        <i className="dot c" /><i className="dot m" /><i className="dot y" />
      </div>
      <div className="container hero-inner">
        <h1 className="hero-title">Print better. Spend less. Fix it faster.</h1>
        <p className="hero-text">Plain-English guides on choosing printers, keeping them healthy and solving the problems that always show up five minutes before a deadline.</p>
        <SearchBar value={query} onChange={onQuery} />
      </div>
    </section>
  )
}
