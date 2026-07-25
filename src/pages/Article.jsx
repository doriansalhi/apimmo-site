import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Reveal } from '../components/ui';
import { ACTUS } from '../data/data';

export default function Article() {
  const { slug } = useParams();
  const article = ACTUS.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) document.title = `${article.titre} | Apimmo`;
  }, [article]);

  if (!article)
    return (
      <section className="section container" style={{ textAlign: 'center', minHeight: '50vh' }}>
        <p className="no-results">Cet article n'existe pas ou n'est plus disponible.</p>
        <Link to="/actualites" className="btn">Voir toutes les actualités</Link>
      </section>
    );

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `url(${article.photo})` }}>
        <div className="ph-inner">
          <h1 style={{ maxWidth: 860 }}>{article.titre}</h1>
          <div className="ph-sub">{article.date} — Apimmo</div>
        </div>
      </section>

      <section className="section">
        <article className="article-body">
          {article.sections.map((s, i) => (
            <Reveal key={i}>
              {s.h && <h2>{s.h}</h2>}
              {s.p.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </Reveal>
          ))}

          <Reveal className="article-cta">
            <div className="divider">✦</div>
            <p>Un projet immobilier à Marseille ou dans ses environs ?</p>
            <div className="article-cta-btns">
              <Link to="/contact" className="btn btn--solid">Contactez-nous</Link>
              <Link to="/estimer" className="btn">Faire estimer mon bien</Link>
            </div>
          </Reveal>

          <Reveal style={{ textAlign: 'center', marginTop: 50 }}>
            <Link to="/actualites" className="link-gold">← Toutes les actualités</Link>
          </Reveal>
        </article>
      </section>
    </>
  );
}
