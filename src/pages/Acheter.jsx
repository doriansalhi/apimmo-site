import { useMemo, useState } from 'react';
import { Reveal, PropertyCard, SectionHead } from '../components/ui';
import { useBiens } from '../data/biens';

const HERO = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80';

const initial = { type: '', ville: '', min: '', max: '', chambres: '' };

export default function Acheter() {
  const [f, setF] = useState(initial);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const { biens, loading } = useBiens('disponible', 'vente');

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
          <h1>Acheter un bien d'exception</h1>
          <div className="ph-sub">Apimmo — Immobilier de prestige</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <form className="filters" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="f-type">Type de bien</label>
              <select id="f-type" value={f.type} onChange={set('type')}>
                <option value="">Tous</option>
                <option>Appartement</option>
                <option>Maison</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-ville">Localisation</label>
              <select id="f-ville" value={f.ville} onChange={set('ville')}>
                <option value="">Toutes</option>
                {villes.map((v) => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-min">Budget min (€)</label>
              <input id="f-min" type="number" min="0" step="50000" value={f.min} onChange={set('min')} placeholder="—" />
            </div>
            <div className="field">
              <label htmlFor="f-max">Budget max (€)</label>
              <input id="f-max" type="number" min="0" step="50000" value={f.max} onChange={set('max')} placeholder="—" />
            </div>
            <div className="field">
              <label htmlFor="f-ch">Chambres min</label>
              <select id="f-ch" value={f.chambres} onChange={set('chambres')}>
                <option value="">Indifférent</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <button type="button" className="btn" onClick={() => setF(initial)}>Réinitialiser</button>
          </form>

          {loading ? (
            <p className="no-results" style={{ fontStyle: 'normal' }}>Chargement des biens…</p>
          ) : results.length === 0 ? (
            <p className="no-results">Aucun bien ne correspond à votre recherche — confiez-nous votre projet, nous chercherons pour vous.</p>
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
          <SectionHead title="Vous ne trouvez pas ?" italic sub="Recherche sur mesure" />
          <Reveal>
            <p style={{ maxWidth: 640, margin: '0 auto 30px', color: 'var(--smoke)' }}>
              Une partie de nos ventes se fait hors marché, en toute confidentialité. Décrivez-nous le bien
              que vous recherchez : nous activerons notre réseau.
            </p>
            <a href="/contact" className="btn btn--solid">Confier ma recherche</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
