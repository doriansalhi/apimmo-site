// ============================================================
// Données de démonstration — à remplacer par vos biens réels
// (ou à brancher sur Supabase / votre logiciel de transaction)
// ============================================================
const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const AGENCE = {
  nom: 'Apimmo',
  baseline: 'Une expertise locale, par nous, pour vous',
  tel: '06 15 77 29 96',
  telHref: 'tel:+33615772996',
  email: 'apimmo13@gmail.com',
  adresse: '12 Rue du Capitaine Dessemond, 13007 Marseille',
  maps: 'https://maps.app.goo.gl/Y6qELb1cEdgSHpTV8',
  ville: 'Marseille',
};

export const HERO_SLIDES = [
  U('photo-1600585154340-be6161a56a0c', 1800),
  U('photo-1613490493576-7fde63acd811', 1800),
  U('photo-1512917774080-9991f1c4c750', 1800),
];

export const BIENS = [
  {
    id: 'ap-2401',
    ref: 'AP-2401',
    titre: 'Villa contemporaine vue mer — Roucas Blanc',
    prix: 2450000,
    surface: 240,
    chambres: 5,
    type: 'Maison',
    ville: 'Marseille 7e',
    badge: 'Exclusivité',
    dpe: 'B',
    photos: [U('photo-1613977257363-707ba9348227'), U('photo-1600607687939-ce8a6c25118c'), U('photo-1600566753086-00f18fb6b3ea'), U('photo-1600585154526-990dced4db0d')],
    extrait: "Villa d'architecte baignée de lumière, piscine à débordement et vue panoramique sur la rade de Marseille.",
    description: [
      "Nichée sur les hauteurs du Roucas Blanc, cette villa d'architecte de 240 m² déploie des volumes généreux ouverts sur la Méditerranée. Le séjour cathédrale, prolongé par de larges baies à galandage, s'ouvre sur une terrasse en pierre de Bourgogne et une piscine à débordement.",
      "Cinq chambres dont une suite parentale avec dressing et salle de bains en marbre, un bureau, une cuisine Bulthaup entièrement équipée et un garage double complètent ce bien rare. Prestations de très haut standing, domotique intégrale, vue mer de chaque niveau.",
    ],
  },
  {
    id: 'ap-2402',
    ref: 'AP-2402',
    titre: 'Appartement haussmannien — Palais du Pharo',
    prix: 1180000,
    surface: 165,
    chambres: 4,
    type: 'Appartement',
    ville: 'Marseille 7e',
    badge: 'Nouveauté',
    dpe: 'C',
    photos: [U('photo-1600210492486-724fe5c67fb0'), U('photo-1600121848594-d8644e57abab'), U('photo-1600566752355-35792bedcfea'), U('photo-1600573472592-401b489a3cdc')],
    extrait: "Étage noble, moulures, parquet en point de Hongrie et balcon filant face au jardin du Pharo.",
    description: [
      "À deux pas du Palais du Pharo, cet appartement traversant de 165 m² occupe l'étage noble d'un immeuble bourgeois de 1880. Hauteur sous plafond de 3,40 m, moulures d'origine, cheminées en marbre et parquet en point de Hongrie composent un décor d'exception.",
      "La réception de 55 m² ouvre sur un balcon filant orienté sud. Quatre chambres, deux salles de bains, une cuisine dînatoire et une cave voûtée complètent ce bien de caractère, rare sur le secteur.",
    ],
  },
  {
    id: 'ap-2403',
    ref: 'AP-2403',
    titre: 'Bastide XVIIIe et son parc — Cassis',
    prix: 3290000,
    surface: 380,
    chambres: 7,
    type: 'Maison',
    ville: 'Cassis',
    badge: 'Exclusivité',
    dpe: 'C',
    photos: [U('photo-1600596542815-ffad4c1539a9'), U('photo-1600607687920-4e2a09cf159d'), U('photo-1584622650111-993a426fbf0a'), U('photo-1600585152220-90363fe7e115')],
    extrait: "Demeure de famille restaurée avec soin, parc arboré d'un hectare, dépendances et piscine maçonnée.",
    description: [
      "Aux portes de Cassis, cette bastide du XVIIIe siècle a été restaurée dans les règles de l'art : pierres apparentes, tomettes anciennes, gypseries et menuiseries d'époque dialoguent avec un confort résolument contemporain.",
      "Le parc clos d'un hectare, planté d'oliviers centenaires et de platanes, abrite une piscine maçonnée, un pool house et une maison d'amis indépendante. Un bien de famille comme il ne s'en présente qu'une fois par décennie.",
    ],
  },
  {
    id: 'ap-2404',
    ref: 'AP-2404',
    titre: 'Penthouse terrasse — Vieux-Port',
    prix: 1650000,
    surface: 142,
    chambres: 3,
    type: 'Appartement',
    ville: 'Marseille 1er',
    badge: 'Sous offre',
    dpe: 'B',
    photos: [U('photo-1600047509807-ba8f99d2cdde'), U('photo-1600566753190-17f0baa2a6c3'), U('photo-1600210491892-03d54c0aaf87'), U('photo-1615874959474-d609969a20ed')],
    extrait: "Dernier étage, terrasse de 90 m² plein ciel sur le Vieux-Port et Notre-Dame de la Garde.",
    description: [
      "Au dernier étage d'un immeuble de standing avec ascenseur, ce penthouse de 142 m² offre une vue à couper le souffle sur le Vieux-Port et Notre-Dame de la Garde. La terrasse plantée de 90 m², équipée d'une cuisine d'été, prolonge la réception sur trois orientations.",
      "Trois chambres dont une suite, deux salles d'eau, une buanderie et deux places de parking en sous-sol. Climatisation gainable, stores électriques, prestations irréprochables.",
    ],
  },
  {
    id: 'ap-2405',
    ref: 'AP-2405',
    titre: 'Mas provençal rénové — Aubagne',
    prix: 985000,
    surface: 210,
    chambres: 4,
    type: 'Maison',
    ville: 'Aubagne',
    badge: 'Nouveauté',
    dpe: 'C',
    photos: [U('photo-1600585154340-be6161a56a0c'), U('photo-1600563438938-a9a27216b4f5'), U('photo-1600566752229-250ed79470f8'), U('photo-1523217582562-09d0def993a6')],
    extrait: "Authenticité préservée, cuisine d'été sous la treille, oliveraie et vue dégagée sur le Garlaban.",
    description: [
      "Au calme absolu, ce mas du XIXe siècle entièrement rénové conjugue le charme de l'ancien — poutres, pierres, sols en terre cuite — et des prestations actuelles : pompe à chaleur, menuiseries double vitrage, cuisine contemporaine.",
      "Le terrain de 4 000 m² accueille une oliveraie, une piscine traditionnelle et une cuisine d'été sous la treille, face au massif du Garlaban cher à Pagnol.",
    ],
  },
  {
    id: 'ap-2406',
    ref: 'AP-2406',
    titre: 'Duplex vue rade — Malmousque',
    prix: 1390000,
    surface: 128,
    chambres: 3,
    type: 'Appartement',
    ville: 'Marseille 7e',
    badge: 'Exclusivité',
    dpe: 'C',
    photos: [U('photo-1512917774080-9991f1c4c750'), U('photo-1600607688969-a5bfcd646154'), U('photo-1600494603989-9650cf6ddd3d'), U('photo-1600585153490-76fb20a32601')],
    extrait: "Dans le hameau de Malmousque, duplex les pieds dans l'eau avec terrasse face aux îles du Frioul.",
    description: [
      "Adresse confidentielle s'il en est, le hameau de Malmousque abrite ce duplex de 128 m² dont la terrasse domine la mer, face aux îles du Frioul. Séjour lumineux ouvert sur l'horizon, cuisine équipée, trois chambres dont deux avec vue mer.",
      "Un bien rarissime sur l'un des secteurs les plus recherchés de Marseille, à quelques mètres des criques et des restaurants de bord de mer.",
    ],
  },
];

export const VENDUS = [
  { id: 'v1', ref: 'AP-2312', titre: 'Hôtel particulier — Préfecture', ville: 'Marseille 6e', surface: 320, photo: U('photo-1605276374104-dee2a0ed3cd6'), extrait: 'Vendu en 21 jours au prix de présentation.' },
  { id: 'v2', ref: 'AP-2318', titre: 'Villa pieds dans l\u2019eau — La Madrague', ville: 'Marseille 8e', surface: 190, photo: U('photo-1613490493576-7fde63acd811'), extrait: 'Vente confidentielle, hors marché.' },
  { id: 'v3', ref: 'AP-2325', titre: 'Loft atelier — Camas', ville: 'Marseille 5e', surface: 156, photo: U('photo-1600121848594-d8644e57abab'), extrait: 'Trois offres reçues la première semaine.' },
  { id: 'v4', ref: 'AP-2331', titre: 'Maison de maître — Saint-Barnabé', ville: 'Marseille 12e', surface: 265, photo: U('photo-1600596542815-ffad4c1539a9'), extrait: 'Vendue à des acquéreurs de notre fichier.' },
  { id: 'v5', ref: 'AP-2338', titre: 'Cabanon d\u2019exception — Les Goudes', ville: 'Marseille 8e', surface: 85, photo: U('photo-1523217582562-09d0def993a6'), extrait: 'Record du secteur au mètre carré.' },
  { id: 'v6', ref: 'AP-2344', titre: 'Appartement terrasse — Périer', ville: 'Marseille 8e', surface: 134, photo: U('photo-1600047509807-ba8f99d2cdde'), extrait: 'Estimé, mis en scène et vendu en un mois.' },
];

export const PROGRAMMES = [
  { id: 'p1', titre: 'Les Terrasses du Pharo', ville: 'Marseille 7e', photo: U('photo-1545324418-cc1a3fa10c00'), extrait: 'Résidence intimiste de 12 appartements, du T2 au T5, terrasses plein sud face à la mer. Livraison T4 2027.', prix: 'À partir de 420 000 €' },
  { id: 'p2', titre: 'Domaine des Calanques', ville: 'Cassis', photo: U('photo-1512915922686-57c11dde9b6b'), extrait: 'Villas neuves de 120 à 180 m² avec piscine privative, en lisière du Parc national. Dernières opportunités.', prix: 'À partir de 1 150 000 €' },
  { id: 'p3', titre: 'Villa Paradis', ville: 'Marseille 6e', photo: U('photo-1600607687644-c7171b42498b'), extrait: 'Réhabilitation d\u2019un immeuble bourgeois : 8 appartements de prestige, prestations haute couture. Éligible déficit foncier.', prix: 'À partir de 380 000 €' },
];

export const EQUIPE = [
  {
    nom: 'Alexandre Perrin',
    role: 'Fondateur & directeur',
    photo: U('photo-1560250097-0b93528c311a', 900),
    bio: "Marseillais de naissance et de cœur, Alexandre a fondé Apimmo après quinze ans passés au sein de grandes enseignes internationales. Sa conviction : le prestige n'est pas une question de prix, mais d'exigence. Il accompagne personnellement chaque vente confidentielle de l'agence.",
  },
  {
    nom: 'Inès Moretti',
    role: 'Consultante — 7e & 8e arrondissements',
    photo: U('photo-1573496359142-b8d87734a5a2', 900),
    bio: "Ancienne architecte d'intérieur, Inès porte un regard singulier sur chaque bien qu'elle présente. Du Roucas Blanc à Malmousque, elle connaît chaque rue, chaque immeuble — et souvent leurs habitants. Sa spécialité : révéler le potentiel d'un bien avant sa mise en vente.",
  },
  {
    nom: 'Thomas Blanchard',
    role: 'Consultant — Pays d\u2019Aix & littoral',
    photo: U('photo-1472099645785-5658abf4ff4e', 900),
    bio: "De Cassis à Aix-en-Provence, Thomas cultive un réseau patiemment tissé de propriétaires, de notaires et d'artisans d'art. Discret et méthodique, il est l'homme des ventes hors marché et des recherches sur mesure pour une clientèle française et internationale.",
  },
];

export const ACTUS = [
  {
    id: 'a1',
    date: '12 juin 2026',
    titre: 'Marché du prestige à Marseille : le bilan du premier semestre 2026',
    extrait: "Volumes, prix au mètre carré, secteurs les plus recherchés : notre analyse complète du marché haut de gamme marseillais.",
    photo: U('photo-1449824913935-59a10b8d2000'),
  },
  {
    id: 'a2',
    date: '28 mai 2026',
    titre: 'Vendre une propriété d\u2019exception : les 5 étapes d\u2019une vente réussie',
    extrait: "De l'estimation confidentielle à la signature, ce qui distingue une vente de prestige d'une transaction classique.",
    photo: U('photo-1560518883-ce09059eeffa'),
  },
  {
    id: 'a3',
    date: '9 mai 2026',
    titre: 'Vivre au 7e : pourquoi le secteur Pharo–Malmousque séduit autant',
    extrait: "Entre mer et centre-ville, portrait d'un arrondissement devenu l'adresse la plus convoitée de Marseille.",
    photo: U('photo-1596394516093-501ba68a0ba6'),
  },
];

export const AVIS = [
  { texte: "Une vente menée avec une discrétion et un professionnalisme remarquables. Notre villa a trouvé preneur en trois semaines, au prix estimé.", qui: 'Catherine & Philippe D. — Roucas Blanc' },
  { texte: "Inès a su voir dans notre appartement ce que nous ne voyions plus nous-mêmes. Les photos, la mise en scène, tout était impeccable.", qui: 'Marc L. — Vieux-Port' },
  { texte: "Recherche sur mesure, visites triées avec soin, négociation ferme et élégante. Nous recommandons Apimmo sans la moindre réserve.", qui: 'Famille Rousseau — Cassis' },
];

export const PARTENAIRES = [
  'Notaires de Provence', 'Crédit Privé & Patrimoine', 'Atelier Verrier', 'Maison Delacour', 'Assur\u2019Prestige', 'Jardins du Sud',
];

export const COMMUNES = [
  'Marseille 7e', 'Marseille 8e', 'Marseille 6e', 'Marseille 1er', 'Le Roucas Blanc', 'Malmousque', 'Endoume', 'Le Pharo',
  'Cassis', 'Aubagne', 'La Ciotat', 'Bandol', 'Aix-en-Provence', 'Allauch', 'Carry-le-Rouet', 'Sanary-sur-Mer',
];

export const fmtPrix = (n) =>
  n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
