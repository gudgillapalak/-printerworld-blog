export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`}>
      <svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={light ? '#fff' : '#101828'} />
        <circle cx="24" cy="26" r="11" fill="#00A3C4" />
        <circle cx="40" cy="26" r="11" fill="#E5367A" fillOpacity=".92" />
        <circle cx="32" cy="40" r="11" fill="#FFC933" fillOpacity=".92" />
      </svg>
      <span className="logo-text">Printerworld</span>
    </span>
  )
}
