import { Link } from 'react-router-dom';
import { AGENCE, COMMUNES } from '../data/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <div className="f-logo">Apimmo</div>
          <div className="f-base">Votre agence immobilière</div>
          <ul>
            <li>{AGENCE.adresse}</li>
            <li><a href={AGENCE.telHref}>{AGENCE.tel}</a></li>
            <li><a href={`mailto:${AGENCE.email}`}>{AGENCE.email}</a></li>
            <li><a href={AGENCE.maps} target="_blank" rel="noopener noreferrer">Itinéraire — Google Maps</a></li>
          </ul>
        </div>

        <div>
          <h4>Horaires</h4>
          <ul>
            <li>Lundi – Vendredi : 9 h – 19 h</li>
            <li>Samedi : 9 h 30 – 18 h</li>
            <li>Dimanche : sur rendez-vous</li>
          </ul>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/acheter">Acheter un bien</Link></li>
            <li><Link to="/estimer">Vendre / Estimer</Link></li>
            <li><Link to="/gestion-locative">Gestion locative</Link></li>
            <li><Link to="/biens-vendus">Biens vendus</Link></li>
            <li><Link to="/agence">L'agence</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
          </ul>
        </div>

        <div>
          <h4>Informations légales</h4>
          <ul>
            <li><a href="#mentions">Mentions légales</a></li>
            <li><a href="#confidentialite">Politique de confidentialité</a></li>
            <li><a href="#honoraires">Barème d'honoraires</a></li>
            <li><a href="#plan">Plan du site</a></li>
          </ul>
          <div className="socials" style={{ marginTop: 22 }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>
      </div>

      <div className="footer-seo">
        <div className="container">
        <strong>Apimmo, votre agence immobilière à Marseille.</strong> Installée rue du Capitaine Dessemond,
          au cœur du 7e arrondissement, notre agence accompagne l'achat, la vente et l'estimation de biens
          d'exception : villas vue mer, appartements bourgeois, bastides et propriétés de caractère. Nous intervenons
          notamment à {COMMUNES.join(' · ')}.
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© {new Date().getFullYear()} Apimmo — Tous droits réservés</span>
          <span>{AGENCE.baseline}</span>
        </div>
      </div>
    </footer>
  );
}
