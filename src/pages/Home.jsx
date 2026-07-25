import TrustindexReviews from '../components/TrustindexReviews';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Reveal, Counter, SectionHead, PropertyCard, EstimationForm } from '../components/ui';
import { AGENCE, HERO_SLIDES, EQUIPE, ACTUS, } from '../data/data';
import { useBiens } from '../data/biens';
const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const NUMGRID = [
  { to: '/acheter', label: 'Acheter', img: U('photo-1600585154340-be6161a56a0c', 900) },
  { to: '/gestion-locative', label: 'Gestion locative', img: U('photo-1560184897-ae75f418493e', 900) },
  { to: '/estimer', label: 'Estimer / Vendre', img: U('photo-1560518883-ce09059eeffa', 900) },
  { to: '/biens-vendus', label: 'Biens vendus', img: U('photo-1605276374104-dee2a0ed3cd6', 900) },
  { to: '/agence', label: "L'agence", img: U('photo-1497366216548-37526070297c', 900) },
  { to: '/actualites', label: 'Vivre en Provence', img: U('photo-1596394516093-501ba68a0ba6', 900) },
];

export default function Home() {
  const [newsSent, setNewsSent] = useState(false);
  const { biens } = useBiens('disponible');
  const derniers = biens.slice(0, 8);
  return (
    <>
      {/* 1 — HERO plein écran */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          speed={1400}
        >
          {HERO_SLIDES.map((src) => (
            <SwiperSlide key={src}>
              <div className="hero-slide" style={{ backgroundImage: `url(${src})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hero-content">
          <span className="eyebrow">{AGENCE.baseline}</span>
          <p className="hero-title">Votre agence immobilière local,<br /></p>
          <p className="hero-sub">Vente, location, gestion locative, investissement.
          Une équipe d'experts qui transforme vos projets en réussite</p>
          <div className="hero-cta">
            <Link to="/acheter" className="btn btn--light">Acheter un bien</Link>
            <Link to="/estimer" className="btn btn--light">Vendre un bien</Link>
          </div>
        </div>
        <button
          className="hero-scroll"
          onClick={() => document.getElementById('h1-seo')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Découvrir
          <span className="arrow" />
        </button>
      </section>

      {/* 2 — H1 SEO */}
      <section className="seo-title" id="h1-seo">
        <div className="container">
          <Reveal as="h1">
            Agence immobilière local du 7ème arrondissement de {AGENCE.ville}. <em>acheter et vendre</em>
          </Reveal>
          <Reveal className="divider" delay={1}>✦</Reveal>
        </div>
      </section>

      {/* 3 — Nos derniers biens */}
      <section className="section section--off">
        <div className="container">
          <SectionHead title="Nos derniers biens" />
          <Reveal>
          <Swiper
            className="props-swiper"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: true }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
              {derniers.map((b) => (
                <SwiperSlide key={b.id} style={{ height: 'auto' }}>
                  <PropertyCard bien={b} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
          <div className="section-foot">
            <Link to="/acheter" className="btn">Découvrir tous les biens</Link>
          </div>
        </div>
      </section>

      {/* 4 — Grille de navigation numérotée */}
      <section className="section">
        <div className="container">
          <SectionHead title="Explorer Apimmo" />
          <div className="numgrid">
            {NUMGRID.map((item, i) => (
              <Reveal key={item.to + item.label} delay={(i % 3) + 1}>
                <Link to={item.to} className="numgrid-item">
                  <img src={item.img} alt={item.label} loading="lazy" />
                  <div className="numgrid-cap">
                    <div>
                      <div className="num">.0{i + 1}</div>
                      <div className="label">{item.label}</div>
                    </div>
                    <span className="arr" aria-hidden="true">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Notre agence */}
      <section className="section section--off">
        <div className="container about">
          <Reveal className="about-photos">
            <img className="ph1" src={U('photo-1497366811353-6870744d04b2', 900)} alt="L'agence Apimmo, rue du Capitaine Dessemond à Marseille" loading="lazy" />
            <img className="ph2" src={U('photo-1497366754035-f200968a6e72', 700)} alt="Espace de réception de l'agence" loading="lazy" />
          </Reveal>
          <Reveal className="about-text" delay={1}>
            <span className="eyebrow">Notre agence</span>
            <h2>Une maison marseillaise, une exigence internationale</h2>
            <p>
              Fondée au pied du Pharo, Apimmo cultive une conviction simple : la vente d'un bien d'exception
              mérite autre chose qu'une annonce. Elle mérite une mise en scène, une discrétion et un
              accompagnement dignes de la maison qu'elle concerne.
            </p>
            <ul className="about-vals">
              <li>Estimations confidentielles, argumentées et documentées</li>
              <li>Photographies d'art, home staging et dossiers de vente soignés</li>
              <li>Fichier d'acquéreurs qualifiés, en France et à l'international</li>
              <li>Un interlocuteur unique, de l'estimation à la signature</li>
            </ul>
            <Link to="/agence" className="btn">Découvrir notre histoire</Link>
          </Reveal>
        </div>
      </section>

      {/* 6 — L'équipe */}
      <section className="section" id="equipe-home">
        <div className="container">
          <SectionHead title="Celles et ceux qui vous accompagnent" />
          {EQUIPE.map((m, i) => (
            <Reveal key={m.nom} className={`team-row${i % 2 ? ' reverse' : ''}`}>
              <div className="team-photo">
                <img src={m.photo} alt={`${m.nom}, ${m.role}`} loading="lazy" />
              </div>
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

      {/* 7 — Actualités */}
      <section className="section section--off">
        <div className="container">
          <SectionHead title="Nos dernières actualités" />
          <div className="news-grid">
            {ACTUS.map((a, i) => (
              <Reveal key={a.id} delay={i + 1}>
                <Link to="/actualites" className="news-card">
                  <div className="nc-media"><img src={a.photo} alt="" loading="lazy" /></div>
                  <div className="nc-body">
                    <span className="date">{a.date}</span>
                    <h3>{a.titre}</h3>
                    <p>{a.extrait}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Réseau / chiffres clés */}
      <section
        className="network"
        style={{ '--network-bg': `url(${U('photo-1566838217578-1903568a76d9', 1800)})` }}
      >
        <div className="container network-inner">
          <Reveal>
            <h2>Un ancrage local,<br />Une portée régional</h2>
            <p>
              Adossée à un réseau de partenaires Régional et au-delà, Apimmo présente chaque bien à une
              clientèle d'acquéreurs français et internationaux — en toute confidentialité lorsque la
              vente l'exige.
            </p>
          </Reveal>
          <Reveal className="counters" delay={1}>
            <Counter value={340} label="Biens vendus" />
            <Counter value={17} label="Années d'expérience" />
            <Counter value={98} suffix=" %" label="Clients satisfaits" />
          </Reveal>
        </div>
      </section>

      {/* 8 bis — Avis clients */}
      <section className="section" id="avis">
        <div className="container">
          <SectionHead title="Des mots qui comptent" italic />
          <Reveal>
            <TrustindexReviews />
          </Reveal>
        </div>
      </section>

      {/* 9 — Formulaire d'estimation */}
      <section className="section section--off" id="estimation">
        <div className="container form-wrap">
          <SectionHead title="Vendre votre propriété" sub="Estimation précise & confidentielle" />
          <Reveal>
            <EstimationForm />
          </Reveal>
        </div>
      </section>

      

      {/* 11 — Contact & Newsletter */}
      <section className="section" id="newsletter">
        <div className="container contact-band">
          <Reveal>
            <h2>Contactez-nous</h2>
            <a className="big-contact" href={`mailto:${AGENCE.email}`}>{AGENCE.email}</a>
            <a className="big-contact" href={AGENCE.telHref}>{AGENCE.tel}</a>
            <p style={{ color: 'var(--smoke)', marginTop: 14 }}>{AGENCE.adresse}</p>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">Newsletter</span>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 28 }}>
              Recevez nos biens en avant-première
            </h2>
            {newsSent ? (
              <p style={{ color: 'var(--gold)', marginTop: 16 }}>✦ Merci, votre inscription est confirmée.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsSent(true);
                }}
              >
                <div className="newsletter-form">
                  <input type="email" required placeholder="Votre adresse email" aria-label="Votre adresse email" />
                  <button type="submit" className="btn btn--solid">S'inscrire</button>
                </div>
                <label className="small-rgpd">
                  <input type="checkbox" required />
                  <span>J'accepte de recevoir la newsletter Apimmo et je peux me désinscrire à tout moment. *</span>
                </label>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
