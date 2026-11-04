import Logo from './Logo.jsx'
import { categories } from '../data/blogs.js'

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-text">Printers, ink and expert advice for homes and offices. We write the guides we wish we had when we started.</p>
        </div>
        <div>
          <h4>Topics</h4>
          <ul>
            {categories.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
        <div>
          <h4>Printerworld</h4>
          <ul>
            <li>hello@printerworld.example</li>
            <li>Mon to Sat, 9am to 6pm</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Printerworld. All rights reserved.</div>
    </footer>
  )
}
