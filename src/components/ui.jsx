import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fmtPrix } from '../data/data';

/* ---------- Apparition au scroll ---------- */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const d = delay ? ` reveal-d${delay}` : '';
  return (
    <Tag ref={ref} className={`reveal${d} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Compteur animé ---------- */
export function Counter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setDisplay(value.toLocaleString('fr-FR'));
          return;
        }
        const dur = 2000;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased).toLocaleString('fr-FR'));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div className="counter" ref={ref}>
      <div className="val">
        {display}
        <span>{suffix}</span>
      </div>
      <div className="lab">{label}</div>
    </div>
  );
}

/* ---------- Double titre de section ---------- */
export function SectionHead({ title, italic = false, sub = 'Apimmo — Immobilier de prestige', divider = true }) {
  return (
    <Reveal className="section-head">
      <h2 className={italic ? 'italic' : ''}>{title}</h2>
      <span className="sub">{sub}</span>
      {divider && <div className="divider">✦</div>}
    </Reveal>
  );
}

/* ---------- Carte bien ---------- */
export function PropertyCard({ bien }) {
  const isLocation = bien.transaction === 'location';
  return (
    <article className="prop-card">
      <Link to={`/bien/${bien.id}`} className="prop-media" aria-label={bien.titre}>
        {bien.badge && (
          <span className={`badge${bien.badge === 'Sous offre' ? ' badge--offre' : ''}`}>{bien.badge}</span>
        )}
        <img className="main" src={bien.photos[0]} alt={bien.titre} loading="lazy" />
        <img className="alt" src={bien.photos[1]} alt="" aria-hidden="true" loading="lazy" />
      </Link>
      <div className="prop-meta">
        <span>{bien.surface} m² · {bien.chambres} ch.</span>
        <span>Réf. {bien.ref}</span>
      </div>
      <div className="prop-body">
        <h3>{bien.titre}</h3>
        <div className="price">
          {fmtPrix(bien.prix)}
          {isLocation && <span style={{ fontSize: 13, color: 'var(--smoke)' }}> / mois CC</span>}
        </div>
        <p>{bien.extrait}</p>
        <Link to={`/bien/${bien.id}`} className="link-gold">En savoir plus</Link>
      </div>
    </article>
  );
}

/* ---------- Formulaire d'estimation ---------- */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwvgwwbb';

export function EstimationForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (!res.ok) throw new Error('send failed');
      setSent(true);
    } catch {
      setError("L'envoi a échoué. Réessayez, ou contactez-nous directement par téléphone ou email.");
    }
    setBusy(false);
  }

  if (sent)
    return (
      <div className="form-ok">
        <div className="tick">✦</div>
        <h3>Demande envoyée</h3>
        <p>Nous vous recontactons sous 24 h pour convenir d'un rendez-vous d'estimation confidentiel.</p>
      </div>
    );
  return (
    <form className="form-grid" onSubmit={submit}>
      <input type="hidden" name="_subject" value="Nouvelle demande — site Apimmo" />
      <div className="field">
        <label htmlFor="est-nom">Nom *</label>
        <input id="est-nom" name="nom" required autoComplete="family-name" />
      </div>
      <div className="field">
        <label htmlFor="est-prenom">Prénom *</label>
        <input id="est-prenom" name="prenom" required autoComplete="given-name" />
      </div>
      <div className="field">
        <label htmlFor="est-email">Email *</label>
        <input id="est-email" type="email" name="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="est-tel">Téléphone *</label>
        <input id="est-tel" type="tel" name="telephone" required autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="est-type">Type de bien</label>
        <select id="est-type" name="type_bien" defaultValue="Appartement">
          <option>Appartement</option>
          <option>Maison</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="est-tx">Type de transaction</label>
        <select id="est-tx" name="transaction" defaultValue="Vente">
          <option>Vente</option>
          <option>Location</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="est-adresse">Adresse du bien *</label>
        <input id="est-adresse" name="adresse" required autoComplete="street-address" />
      </div>
      <div className="field full">
        <label htmlFor="est-msg">Message</label>
        <textarea id="est-msg" name="message" placeholder="Précisions utiles : surface, étage, travaux, échéance…" />
      </div>
      <label className="rgpd">
        <input type="checkbox" required />
        <span>
          J'accepte que mes données soient utilisées pour être recontacté(e) dans le cadre de ma demande d'estimation,
          conformément à la politique de confidentialité. *
        </span>
      </label>
      {error && <p style={{ gridColumn: '1 / -1', color: '#c0392b', fontSize: 15, textAlign: 'center' }}>{error}</p>}
      <div className="form-foot">
        <button type="submit" className="btn btn--solid" disabled={busy}>
          {busy ? 'Envoi en cours…' : 'Demander mon estimation'}
        </button>
      </div>
    </form>
  );
}
