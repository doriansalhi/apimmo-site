# Apimmo — Site vitrine immobilier de prestige

React 18 + Vite + React Router + Swiper. Charte « English classic » : marine #152238, or laiton #B08D57, Playfair Display + Montserrat.

## Lancer en local
```
npm install
npm run dev
```

## Déployer sur Netlify
- Build command : `npm run build`
- Publish directory : `dist`
- Le fichier `public/_redirects` gère le routing SPA (déjà inclus).

## Personnaliser
- **Coordonnées / textes** : `src/data/data.js` (objet `AGENCE`, biens, équipe, avis, actus, partenaires, communes SEO).
- **Photos** : remplacer les URLs Unsplash de démonstration dans `data.js` (Cloudinary conseillé).
- **Formulaires** : les `onSubmit` dans `src/components/ui.jsx` et `src/pages/BienDetail.jsx` sont prêts à brancher (Formspree / EmailJS / Supabase).
- **Widget avis** : emplacement prévu section « Des mots qui comptent » (Home).
- **SEO** : titles/descriptions par page dans `src/App.jsx` (objet `META`), JSON-LD RealEstateAgent dans `index.html`.
