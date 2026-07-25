import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Acheter from './pages/Acheter';
import Louer from './pages/Louer';
import BienDetail from './pages/BienDetail';
import { GestionLocative, Estimer, BiensVendus, Agence, Actualites, Contact } from './pages/Autres';
import Admin from './pages/Admin';
import { AuthProvider } from './lib/auth';

const META = {
  '/': {
    title: 'Apimmo — Agence immobilière de prestige à Marseille',
    desc: "Apimmo, agence immobilière de prestige à Marseille. Achat, vente et estimation de biens d'exception : villas vue mer, appartements bourgeois, bastides.",
  },
  '/acheter': {
    title: "Acheter un bien d'exception à Marseille | Apimmo",
    desc: "Villas, appartements de prestige et propriétés de caractère à vendre à Marseille et sur le littoral. Sélection Apimmo.",
  },
  '/louer': {
    title: "Louer un bien d'exception à Marseille | Apimmo",
    desc: "Appartements et maisons de prestige à louer à Marseille et sur le littoral. Locations sélectionnées par Apimmo.",
  },
  '/gestion-locative': {
    title: 'Gestion locative à Marseille | Apimmo',
    desc: "Confiez la gestion locative de votre bien à Apimmo : mise en location, gestion complète, garanties loyers impayés. Étude gratuite et sans engagement.",
  },
  '/estimer': {
    title: 'Estimation confidentielle de votre bien | Apimmo Marseille',
    desc: "Faites estimer votre propriété par Apimmo : avis de valeur argumenté sous 72 h, en toute confidentialité.",
  },
  '/biens-vendus': {
    title: 'Biens vendus | Apimmo Marseille',
    desc: 'Nos dernières ventes de prestige à Marseille et alentours. Votre bien pourrait être le prochain.',
  },
  '/agence': {
    title: "L'agence Apimmo — Notre histoire et notre équipe",
    desc: "Découvrez Apimmo : une agence marseillaise indépendante dédiée à l'immobilier de prestige, rue du Capitaine Dessemond.",
  },
  '/actualites': {
    title: 'Actualités du marché immobilier de prestige | Apimmo',
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

function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acheter" element={<Acheter />} />
          <Route path="/louer" element={<Louer />} />
          <Route path="/bien/:id" element={<BienDetail />} />
          <Route path="/gestion-locative" element={<GestionLocative />} />
          <Route path="/programmes-neufs" element={<GestionLocative />} />
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

export default function App() {
  return (
    <AuthProvider>
      <Meta />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </AuthProvider>
  );
}
