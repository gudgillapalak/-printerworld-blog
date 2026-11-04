import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" aria-label="Printerworld home"><Logo /></Link>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end>Blog</NavLink>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  )
}
