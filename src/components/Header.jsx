import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AGENCE } from '../data/data';

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/acheter', label: 'Acheter' },
  { to: '/louer', label: 'Louer' },
  { to: '/gestion-locative', label: 'Gestion locative' },
  { to: '/estimer', label: 'Estimer / Vendre' },
  { to: '/biens-vendus', label: 'Biens vendus' },
];

const agenceLinks = [
  { to: '/agence', label: 'Notre histoire' },
  { to: '/agence#equipe', label: 'Notre équipe' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === '/'; // header transparent uniquement sur le hero d'accueil

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>

      <header className={`header${overHero ? ' over-hero' : ''}${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
        <Link to="/" className="logo" aria-label="Apimmo — accueil">
            <img src="/logo-marine-transparent.png" alt="Apimmo Immobilier" className="logo-img logo-img--marine" />
            <img src="/logo-blanc-transparent.png" alt="" aria-hidden="true" className="logo-img logo-img--blanc" />
          </Link>

          <nav aria-label="Navigation principale">
            <ul className="nav">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button className="nav-btn" aria-haspopup="true">L'agence <span aria-hidden="true">▾</span></button>
                <div className="dropdown">
                  {agenceLinks.map((l) => (
                    <Link key={l.to} to={l.to}>{l.label}</Link>
                  ))}
                </div>
              </li>
              <li><NavLink to="/actualites">Actualités</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          <button
            className={`burger${open ? ' open' : ''}`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-nav${open ? ' open' : ''}`}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link to="/agence" onClick={() => setOpen(false)}>L'agence</Link>
        {agenceLinks.slice(1).map((l) => (
          <Link key={l.to} className="mn-sub" to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link to="/actualites" onClick={() => setOpen(false)}>Actualités</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        <div className="mn-contact">
          <a href={AGENCE.telHref}>{AGENCE.tel}</a> · <a href={`mailto:${AGENCE.email}`}>{AGENCE.email}</a>
        </div>
      </div>
    </>
  );
}
