import { Link } from 'react-router-dom';
import { Reveal, SectionHead, EstimationForm } from '../components/ui';
import { EQUIPE, ACTUS, AGENCE, COMMUNES } from '../data/data';
import { useBiens } from '../data/biens';

const U = (id, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

function PageHero({ title, sub = 'Apimmo — Immobilier de prestige', img }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url(${img})` }}>
      <div className="ph-inner">
        <h1>{title}</h1>
        <div className="ph-sub">{sub}</div>
      </div>
    </section>
  );
}

/* ============ GESTION LOCATIVE ============ */
const GL_SERVICES = [
  {
    titre: 'Mise en location',
    photo: U('photo-1560518883-ce09059eeffa', 900),
    texte: "Estimation du loyer de marché, photographies professionnelles, diffusion ciblée et visites qualifiées : nous sélectionnons pour vous des locataires solides, dossiers vérifiés à l'appui.",
  },
  {
    titre: 'Gestion complète',
    photo: U('photo-1497366811353-6870744d04b2', 900),
    texte: "Quittances, encaissement des loyers, révision annuelle, régularisation des charges, coordination des interventions : nous administrons votre bien comme s'il était le nôtre. Vous ne vous occupez de rien.",
  },
  {
    titre: 'Sérénité & garanties',
    photo: U('photo-1554224155-6726b3ff858f', 900),
    texte: "Garantie loyers impayés, protection juridique, états des lieux détaillés et suivi rigoureux de l'entretien : votre patrimoine est protégé, sa valeur préservée dans la durée.",
  },
];

export function GestionLocative() {
  return (
    <>
      <PageHero title="Gestion locative" sub="Votre bien entre de bonnes mains" img={U('photo-1560184897-ae75f418493e')} />
      <section className="section">
        <div className="container">
          <SectionHead title="Confiez, nous veillons" />
          <div className="news-grid">
            {GL_SERVICES.map((s, i) => (
              <Reveal key={s.titre} delay={i + 1}>
                <article className="news-card">
                  <div className="nc-media"><img src={s.photo} alt={s.titre} loading="lazy" /></div>
                  <div className="nc-body">
                    <h3>{s.titre}</h3>
                    <p>{s.texte}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--off">
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHead title="Un interlocuteur unique, un patrimoine préservé" italic sub="Gestion sur mesure" />
          <Reveal>
            <p style={{ maxWidth: 680, margin: '0 auto 30px', color: 'var(--smoke)' }}>
              Chaque propriétaire bénéficie d'un consultant dédié, d'un reporting régulier et d'une totale
              transparence sur les honoraires. Confiez-nous votre bien : nous vous présentons notre mandat
              de gestion lors d'un rendez-vous sans engagement.
            </p>
            <Link to="/contact" className="btn btn--solid">Demander une étude gratuite</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ ESTIMER / VENDRE ============ */
export function Estimer() {
  return (
    <>
      <PageHero title="Vendre votre propriété" sub="Estimation précise & confidentielle" img={U('photo-1560518883-ce09059eeffa')} />
      <section className="section">
        <div className="container about">
          <Reveal className="about-text">
            <span className="eyebrow">Notre méthode</span>
            <h2>Une estimation n'est pas un chiffre.<br />C'est une stratégie.</h2>
            <p>
              Analyse des ventes comparables, spécificités du bien, saisonnalité du marché, profil des
              acquéreurs actifs : chaque estimation Apimmo est un document argumenté, remis en main propre,
              qui pose les fondations d'une vente réussie.
            </p>
            <ul className="about-vals">
              <li>Visite et étude confidentielles, sans engagement</li>
              <li>Avis de valeur écrit et documenté sous 72 h</li>
              <li>Stratégie de mise en vente : prix, calendrier, mise en scène</li>
              <li>Diffusion maîtrisée — jusqu'à la vente hors marché si vous le souhaitez</li>
            </ul>
          </Reveal>
          <Reveal className="about-photos" delay={1}>
            <img className="ph1" src={U('photo-1600607687939-ce8a6c25118c', 900)} alt="Salon d'une propriété estimée par Apimmo" loading="lazy" />
            <img className="ph2" src={U('photo-1556912173-3bb406ef7e77', 700)} alt="Détail d'intérieur" loading="lazy" />
          </Reveal>
        </div>
      </section>
      <section className="section section--off">
        <div className="container form-wrap">
          <SectionHead title="Demander mon estimation" sub="Réponse sous 24 h — confidentiel" />
          <Reveal><EstimationForm /></Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ BIENS VENDUS ============ */
export function BiensVendus() {
  const { biens, loading } = useBiens('vendu');
  return (
    <>
      <PageHero title="Biens vendus" sub="Ils nous ont fait confiance" img={U('photo-1605276374104-dee2a0ed3cd6')} />
      <section className="section">
        <div className="container">
          <SectionHead title="Nos dernières ventes" />
          {loading ? (
            <p className="no-results" style={{ fontStyle: 'normal' }}>Chargement…</p>
          ) : biens.length === 0 ? (
            <p className="no-results">Nos ventes récentes seront bientôt présentées ici.</p>
          ) : (
          <div className="props-grid">
            {biens.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) + 1}>
                <article className="prop-card sold-card">
                  <div className="prop-media">
                    <img className="main" src={(v.photo || (v.photos && v.photos[0]))} alt={v.titre} loading="lazy" />
                  </div>
                  <div className="prop-meta">
                    <span>{v.surface} m² · {v.ville}</span>
                    <span>Réf. {v.ref}</span>
                  </div>
                  <div className="prop-body">
                    <h3>{v.titre}</h3>
                    <p>{v.extrait}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          )}
          <Reveal style={{ textAlign: 'center', marginTop: 60 }}>
            <p style={{ maxWidth: 600, margin: '0 auto 26px', color: 'var(--smoke)' }}>
              Votre bien pourrait figurer ici. Commençons par une estimation confidentielle.
            </p>
            <Link to="/estimer" className="btn btn--solid">Estimer mon bien</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ L'AGENCE ============ */
export function Agence() {
  return (
    <>
      <PageHero title="L'agence" sub={AGENCE.baseline} img={U('photo-1497366216548-37526070297c')} />

      <section className="section">
        <div className="container about">
          <Reveal className="about-photos">
            <img className="ph1" src={U('photo-1497366811353-6870744d04b2', 900)} alt="L'agence Apimmo à Marseille" loading="lazy" />
            <img className="ph2" src={U('photo-1497366754035-f200968a6e72', 700)} alt="Réception de l'agence" loading="lazy" />
          </Reveal>
          <Reveal className="about-text" delay={1}>
            <span className="eyebrow">Notre histoire</span>
            <h2>Née face à la mer,<br />rue du Capitaine Dessemond</h2>
            <p>
              Apimmo est née d'un constat : à Marseille, les plus belles maisons se transmettent souvent
              de bouche à oreille. Nous avons voulu créer l'agence qui soit ce bouche-à-oreille — un lieu
              où propriétaires et acquéreurs exigeants se rencontrent, en confiance.
            </p>
            <p>
              Du Pharo à Malmousque, de Cassis au pays d'Aix, nous cultivons une connaissance intime de
              chaque quartier, de chaque rue — et l'ambition d'un service que l'on croyait réservé aux
              grandes capitales.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--off" id="equipe">
        <div className="container">
          <SectionHead title="Notre équipe" />
          {EQUIPE.map((m, i) => (
            <Reveal key={m.nom} className={`team-row${i % 2 ? ' reverse' : ''}`}>
              <div className="team-photo"><img src={m.photo} alt={`${m.nom}, ${m.role}`} loading="lazy" /></div>
              <div className="team-info">
                <span className="eyebrow">Apimmo</span>
                <h3>{m.nom}</h3>
                <div className="role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="rejoindre">
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHead title="Nous rejoindre" italic sub="Recrutement" />
          <Reveal>
            <p style={{ maxWidth: 660, margin: '0 auto 30px', color: 'var(--smoke)' }}>
              Apimmo grandit et recherche des consultants qui partagent notre exigence : culture du service,
              discrétion, goût des belles choses. Envoyez-nous votre parcours — nous lisons chaque candidature.
            </p>
            <a href={`mailto:${AGENCE.email}?subject=Candidature%20Apimmo`} className="btn btn--solid">Envoyer ma candidature</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ ACTUALITÉS ============ */
export function Actualites() {
  return (
    <>
      <PageHero title="Actualités" sub="Le marché, nos conseils, la vie de l'agence" img={U('photo-1566838217578-1903568a76d9')} />
      <section className="section">
        <div className="container post-list">
          {ACTUS.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) + 1}>
              <Link to={`/actualites/${a.slug}`} className="post-item" style={{ display: 'grid' }}>
                <div className="pi-media"><img src={a.photo} alt="" loading="lazy" /></div>
                <div>
                  <span className="eyebrow" style={{ marginBottom: 6 }}>{a.date}</span>
                  <h3>{a.titre}</h3>
                  <p>{a.extrait}</p>
                  <span className="link-gold">Lire l'article</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/* ============ CONTACT ============ */
export function Contact() {
  return (
    <>
      <PageHero title="Contact" sub="À votre écoute, du lundi au samedi" img={U('photo-1596394516093-501ba68a0ba6')} />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-info">
            <h2>Au cœur de Marseille</h2>
            <div className="ci-block">
              <div className="l">Adresse</div>
              <p>{AGENCE.adresse}</p>
              <a href={AGENCE.maps} target="_blank" rel="noopener noreferrer" className="link-gold">Itinéraire Google Maps</a>
            </div>
            <div className="ci-block">
              <div className="l">Téléphone</div>
              <a className="big-contact" href={AGENCE.telHref}>{AGENCE.tel}</a>
            </div>
            <div className="ci-block">
              <div className="l">Email</div>
              <a className="big-contact" href={`mailto:${AGENCE.email}`} style={{ fontSize: 22 }}>{AGENCE.email}</a>
            </div>
            <div className="ci-block">
              <div className="l">Horaires</div>
              <div className="hours">
                <div><span className="d">Lundi – Vendredi</span><span>9 h – 19 h</span></div>
                <div><span className="d">Samedi</span><span>9 h 30 – 18 h</span></div>
                <div><span className="d">Dimanche</span><span>Sur rendez-vous</span></div>
              </div>
            </div>
            <div className="ci-block">
              <div className="l">Secteurs</div>
              <p style={{ fontSize: 13.5, color: 'var(--smoke)' }}>{COMMUNES.slice(0, 10).join(' · ')}…</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <SectionHead title="Écrivez-nous" divider={false} sub="Réponse sous 24 h" />
            <EstimationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
