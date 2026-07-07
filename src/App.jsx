import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Acheter from './pages/Acheter';
import BienDetail from './pages/BienDetail';
import { ProgrammesNeufs, Estimer, BiensVendus, Agence, Actualites, Contact } from './pages/Autres';

const META = {
  '/': {
    title: 'Apimmo — Votre Agence immobilière à Marseille ',
    desc: "Apimmo, agence immobilière à Marseille. Achat, vente et estimation de biens d'exception : villas vue mer, appartements bourgeois, bastides.",
  },
  '/acheter': {
    title: "Acheter un bien d'exception à Marseille | Apimmo",
    desc: "Villas, appartements et propriétés de caractère à vendre à Marseille et sur le littoral. Sélection Apimmo.",
  },
  '/programmes-neufs': {
    title: 'Programmes neufs à Marseille | Apimmo',
    desc: "Résidences neuves haut de gamme à Marseille et Cassis : appartements et villas, sélectionnés par Apimmo.",
  },
  '/estimer': {
    title: 'Estimation confidentielle de votre bien | Apimmo Marseille',
    desc: "Faites estimer votre propriété par Apimmo : avis de valeur argumenté sous 72 h, en toute confidentialité.",
  },
  '/biens-vendus': {
    title: 'Biens vendus | Apimmo Marseille',
    desc: 'Nos dernières ventes  à Marseille et alentours. Votre bien pourrait être le prochain.',
  },
  '/agence': {
    title: "L'agence Apimmo — Notre histoire et notre équipe",
    desc: "Découvrez Apimmo : une agence marseillaise indépendante dédiée à l'immobilier , rue du Capitaine Dessemond.",
  },
  '/actualites': {
    title: 'Actualités du marché immobilier  | Apimmo',
    desc: 'Analyses de marché, conseils vendeurs et acquéreurs, vie de l’agence : les actualités Apimmo.',
  },
  '/contact': {
    title: 'Contact | Apimmo Marseille — 06 15 77 29 96',
    desc: 'Contactez Apimmo, 12 rue du Capitaine Dessemond, 13007 Marseille. Réponse sous 24 h.',
  },
};

function Meta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = META[pathname] || META['/'];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.desc);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <Meta />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acheter" element={<Acheter />} />
          <Route path="/bien/:id" element={<BienDetail />} />
          <Route path="/programmes-neufs" element={<ProgrammesNeufs />} />
          <Route path="/estimer" element={<Estimer />} />
          <Route path="/biens-vendus" element={<BiensVendus />} />
          <Route path="/agence" element={<Agence />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
