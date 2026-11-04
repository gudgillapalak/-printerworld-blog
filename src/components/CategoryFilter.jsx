export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="filters" role="group" aria-label="Filter by category">
      {categories.map((c) => (
        <button key={c} className={`chip ${active === c ? 'active' : ''}`} aria-pressed={active === c} onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  )
}
