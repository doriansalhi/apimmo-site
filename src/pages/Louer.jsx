import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, PropertyCard, SectionHead } from '../components/ui';
import { useBiens } from '../data/biens';

const HERO = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=80';

const initial = { type: '', ville: '', min: '', max: '', chambres: '' };

export default function Louer() {
  const [f, setF] = useState(initial);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const { biens, loading } = useBiens('disponible', 'location');

  const villes = useMemo(() => [...new Set(biens.map((b) => b.ville))].filter(Boolean), [biens]);

  const results = useMemo(
    () =>
      biens.filter(
        (b) =>
          (!f.type || b.type === f.type) &&
          (!f.ville || b.ville === f.ville) &&
          (!f.min || b.prix >= Number(f.min)) &&
          (!f.max || b.prix <= Number(f.max)) &&
          (!f.chambres || b.chambres >= Number(f.chambres))
      ),
    [f, biens]
  );

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `url(${HERO})` }}>
        <div className="ph-inner">
          <h1>Louer un bien d'exception</h1>
          <div className="ph-sub">Apimmo — Immobilier de prestige</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <form className="filters" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="fl-type">Type de bien</label>
              <select id="fl-type" value={f.type} onChange={set('type')}>
                <option value="">Tous</option>
                <option>Appartement</option>
                <option>Maison</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="fl-ville">Localisation</label>
              <select id="fl-ville" value={f.ville} onChange={set('ville')}>
                <option value="">Toutes</option>
                {villes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="fl-min">Loyer min (€/mois)</label>
              <input id="fl-min" type="number" min="0" step="100" value={f.min} onChange={set('min')} placeholder="—" />
            </div>
            <div className="field">
              <label htmlFor="fl-max">Loyer max (€/mois)</label>
              <input id="fl-max" type="number" min="0" step="100" value={f.max} onChange={set('max')} placeholder="—" />
            </div>
            <div className="field">
              <label htmlFor="fl-ch">Chambres min</label>
              <select id="fl-ch" value={f.chambres} onChange={set('chambres')}>
                <option value="">Indifférent</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <button type="button" className="btn" onClick={() => setF(initial)}>Réinitialiser</button>
          </form>

          {loading ? (
            <p className="no-results" style={{ fontStyle: 'normal' }}>Chargement des biens…</p>
          ) : results.length === 0 ? (
            <p className="no-results">Aucune location disponible pour le moment — contactez-nous, de nouveaux biens arrivent régulièrement.</p>
          ) : (
            <div className="props-grid">
              {results.map((b, i) => (
                <Reveal key={b.id} delay={(i % 3) + 1}>
                  <PropertyCard bien={b} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--off">
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHead title="Propriétaire bailleur ?" italic sub="Gestion locative" />
          <Reveal>
            <p style={{ maxWidth: 640, margin: '0 auto 30px', color: 'var(--smoke)' }}>
              Confiez-nous la mise en location et la gestion complète de votre bien : locataires
              sélectionnés, loyers garantis, patrimoine préservé.
            </p>
            <Link to="/gestion-locative" className="btn btn--solid">Découvrir notre gestion locative</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
