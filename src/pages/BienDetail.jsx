import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Reveal } from '../components/ui';
import { fmtPrix, AGENCE } from '../data/data';
import { useBien } from '../data/biens';

const DPE_COLORS = { A: '#1d9d4b', B: '#4fb548', C: '#b6ce3a', D: '#f2e21c', E: '#eba63b', F: '#e2732b', G: '#d02e26' };

export default function BienDetail() {
  const { id } = useParams();
  const { bien, loading } = useBien(id);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  if (loading)
    return (
      <section className="section container" style={{ minHeight: '50vh' }}>
        <p style={{ color: 'var(--smoke)' }}>Chargement…</p>
      </section>
    );

  if (!bien)
    return (
      <section className="section container" style={{ textAlign: 'center' }}>
        <p className="no-results">Ce bien n'est plus disponible.</p>
        <Link to="/acheter" className="btn">Voir tous les biens</Link>
      </section>
    );

  const isLocation = bien.transaction === 'location';

  return (
    <>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container detail-gallery">
          <Swiper
            className="main-swiper"
            modules={[EffectFade]}
            effect="fade"
            speed={700}
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setActive(s.activeIndex)}
          >
            {bien.photos.map((p, i) => (
              <SwiperSlide key={p}>
                <img src={p} alt={`${bien.titre} — photo ${i + 1}`} loading={i ? 'lazy' : 'eager'} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="detail-thumbs">
            {bien.photos.map((p, i) => (
              <img
                key={p}
                src={p}
                alt=""
                className={i === active ? 'active' : ''}
                onClick={() => swiperRef.current?.slideTo(i)}
                loading="lazy"
              />
            ))}
          </div>

          <div className="detail-layout">
            <div className="detail-main">
              <span className="eyebrow">{bien.ville} · Réf. {bien.ref} {bien.badge ? `· ${bien.badge}` : ''} {isLocation ? '· Location' : ''}</span>
              <h1>{bien.titre}</h1>
              <div className="d-price">
                {fmtPrix(bien.prix)}
                {isLocation
                  ? <span style={{ fontSize: 15, color: 'var(--smoke)' }}> / mois charges comprises</span>
                  : <span style={{ fontSize: 13, color: 'var(--smoke)' }}> honoraires charge vendeur</span>}
              </div>

              <div className="d-features">
                <div className="d-feat"><div className="v">{bien.surface}</div><div className="l">m² habitables</div></div>
                <div className="d-feat"><div className="v">{bien.chambres}</div><div className="l">Chambres</div></div>
                <div className="d-feat"><div className="v">{bien.type}</div><div className="l">Type de bien</div></div>
                <div className="d-feat">
                  <div className="dpe" style={{ justifyContent: 'center' }}>
                    {Object.entries(DPE_COLORS).map(([k, c]) => (
                      <span key={k} className={k === bien.dpe ? 'on' : ''} style={{ background: c }}>{k}</span>
                    ))}
                  </div>
                  <div className="l" style={{ marginTop: 10 }}>DPE</div>
                </div>
              </div>

              <div className="desc">
                {bien.description.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
              </div>

              <div className="d-map">
                Localisation communiquée lors de la visite — Emplacement carte (Google Maps / Leaflet)
              </div>
            </div>

            <aside className="detail-side">
              <h3>Ce bien vous intéresse ?</h3>
              {sent ? (
                <div className="form-ok" style={{ padding: '20px 0' }}>
                  <div className="tick">✦</div>
                  <h3 style={{ fontSize: 20 }}>Message envoyé</h3>
                  <p>Nous revenons vers vous très rapidement.</p>
                </div>
              ) : (
                <form
                  className="form-grid"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    setSendError('');
                    try {
                      const res = await fetch('https://formspree.io/f/mwvgwwbb', {
                        method: 'POST',
                        headers: { Accept: 'application/json' },
                        body: new FormData(e.target),
                      });
                      if (!res.ok) throw new Error('send failed');
                      setSent(true);
                    } catch {
                      setSendError("L'envoi a échoué. Réessayez ou appelez-nous directement.");
                    }
                    setSending(false);
                  }}
                >
                  <input type="hidden" name="_subject" value={`Demande bien réf. ${bien.ref} — ${bien.titre}`} />
                  <input type="hidden" name="bien_reference" value={bien.ref} />
                  <input type="hidden" name="bien_titre" value={bien.titre} />
                  <div className="field"><label htmlFor="d-nom">Nom *</label><input id="d-nom" name="nom" required /></div>
                  <div className="field"><label htmlFor="d-email">Email *</label><input id="d-email" name="email" type="email" required /></div>
                  <div className="field"><label htmlFor="d-tel">Téléphone *</label><input id="d-tel" name="telephone" type="tel" required /></div>
                  <div className="field">
                    <label htmlFor="d-msg">Message</label>
                    <textarea id="d-msg" name="message" defaultValue={`Bonjour, je souhaite en savoir plus sur le bien réf. ${bien.ref}.`} />
                  </div>
                  <label className="rgpd">
                    <input type="checkbox" required />
                    <span>J'accepte d'être recontacté(e) au sujet de ce bien. *</span>
                  </label>
                  {sendError && <p style={{ color: '#c0392b', fontSize: 14 }}>{sendError}</p>}
                  <button type="submit" className="btn btn--solid" style={{ width: '100%' }} disabled={sending}>
                    {sending ? 'Envoi…' : 'Prendre rendez-vous'}
                  </button>
                </form>
              )}
              <p style={{ fontSize: 12.5, color: 'var(--smoke)', marginTop: 18, textAlign: 'center' }}>
                ou appelez-nous : <a href={AGENCE.telHref} style={{ color: 'var(--gold)' }}>{AGENCE.tel}</a>
              </p>
            </aside>
          </div>

          <Reveal style={{ textAlign: 'center', marginTop: 70 }}>
            <Link to={isLocation ? '/louer' : '/acheter'} className="link-gold">← Retour à tous les biens</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
