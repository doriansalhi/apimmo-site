// ============================================================
// Données du site — coordonnées, biens de démonstration, articles
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

// ============================================================
// ARTICLES — actualités avec contenu intégral
// Chaque article : slug (URL), titre, date, extrait, photo,
// sections [{ h: sous-titre ou null, p: [paragraphes] }]
// ============================================================
export const ACTUS = [
  {
    id: 'a1',
    slug: 'immobilier-marseille-2026-acheteurs',
    date: '12 juin 2026',
    titre: 'Immobilier à Marseille : ce qui change en 2026 pour les acheteurs',
    extrait: "Taux, prix au mètre carré, quartiers qui bougent : le point sur le marché marseillais et nos conseils pour acheter au bon moment.",
    photo: U('photo-1566838217578-1903568a76d9'),
    sections: [
      {
        h: null,
        p: [
          "Acheter un appartement ou une maison à Marseille en 2026, c'est arriver sur un marché qui a beaucoup évolué en quelques années. Entre l'évolution des taux de crédit, des prix qui varient fortement d'un arrondissement à l'autre et des quartiers en pleine transformation, il est facile de s'y perdre. Voici les repères essentiels pour aborder votre projet sereinement.",
        ],
      },
      {
        h: 'Des taux qui redonnent de l\u2019air aux acheteurs',
        p: [
          "Après plusieurs années de hausse, les conditions de financement se sont progressivement détendues. Concrètement, cela signifie qu'à mensualité égale, votre capacité d'emprunt est meilleure qu'il y a deux ans. C'est le moment de refaire calculer votre budget : de nombreux acheteurs qui avaient mis leur projet en pause découvrent qu'il est redevenu réalisable.",
          "Notre conseil : avant même de visiter, faites établir une simulation de financement à jour par votre banque ou un courtier. À Marseille, les bons biens partent vite — un dossier de financement solide fait souvent la différence face à un autre acquéreur.",
        ],
      },
      {
        h: 'Des prix très contrastés selon les quartiers',
        p: [
          "Marseille reste l'une des grandes villes françaises les plus accessibles, mais avec des écarts considérables : le mètre carré peut varier du simple au triple entre certains quartiers du centre et les secteurs les plus recherchés du littoral, comme le 7e ou le 8e arrondissement.",
          "Cette diversité est une chance pour les acheteurs : à budget égal, vous pouvez choisir entre un grand appartement à rénover dans un quartier en devenir, ou une surface plus compacte dans un secteur déjà établi. Tout dépend de votre projet de vie — et c'est précisément là qu'un regard local fait la différence.",
        ],
      },
      {
        h: 'Les quartiers à suivre cette année',
        p: [
          "Les grands projets urbains continuent de transformer la ville : les abords d'Euroméditerranée poursuivent leur mutation, les quartiers proches du centre comme Chave, Camas ou la Plaine attirent une nouvelle génération d'habitants, et le littoral sud reste une valeur sûre pour qui cherche la mer au quotidien.",
          "Attention toutefois aux effets d'annonce : un quartier « qui monte » ne convient pas à tous les projets. Investissement locatif, résidence principale, pied-à-terre — chaque objectif a ses secteurs de prédilection.",
        ],
      },
      {
        h: 'Nos conseils pour acheter au bon moment',
        p: [
          "Le bon moment pour acheter, c'est d'abord celui où votre projet est prêt : financement validé, critères clairs, secteur ciblé. Ensuite, entourez-vous : une agence qui connaît la rue, l'immeuble, parfois même la copropriété, vous évitera les mauvaises surprises et vous alertera sur les vraies opportunités avant qu'elles ne soient partout.",
          "Chez Apimmo, nous accompagnons chaque acheteur comme s'il s'agissait de notre propre recherche : sélection de biens correspondant réellement à vos critères, visites préparées, et négociation menée dans votre intérêt. Parlons de votre projet.",
        ],
      },
    ],
  },
  {
    id: 'a2',
    slug: 'vendre-appartement-marseille-erreurs',
    date: '28 mai 2026',
    titre: 'Vendre son appartement à Marseille : les 5 erreurs à éviter',
    extrait: "Prix mal positionné, photos négligées, diagnostics oubliés… Les pièges classiques qui font perdre du temps et de l'argent aux vendeurs, et comment les éviter.",
    photo: U('photo-1560518883-ce09059eeffa'),
    sections: [
      {
        h: null,
        p: [
          "Vendre un bien immobilier paraît simple : une annonce, des visites, une signature. En réalité, chaque étape recèle des pièges qui peuvent coûter des semaines de délai — et parfois plusieurs milliers d'euros. Voici les cinq erreurs que nous voyons le plus souvent à Marseille, et comment les éviter.",
        ],
      },
      {
        h: '1. Surestimer le prix de départ',
        p: [
          "C'est l'erreur la plus fréquente, et la plus coûteuse. Un bien affiché trop cher ne génère pas de visites, s'installe dans les annonces, et finit par éveiller la méfiance : « pourquoi n'est-il toujours pas vendu ? ». Résultat paradoxal : les biens surestimés se vendent souvent moins cher, après plusieurs baisses successives, que s'ils avaient été positionnés juste dès le départ.",
          "La parade : une estimation argumentée, fondée sur les ventes réellement conclues dans votre secteur — pas sur les prix affichés des annonces voisines, qui ne disent rien des prix réellement négociés.",
        ],
      },
      {
        h: '2. Négliger les photos et la présentation',
        p: [
          "Sur internet, votre bien a trois secondes pour convaincre. Des photos sombres, un intérieur encombré ou une annonce rédigée à la va-vite éliminent d'office une partie des acheteurs. Un rangement soigné, une lumière travaillée et des photos professionnelles peuvent transformer la perception d'un même appartement.",
        ],
      },
      {
        h: '3. Oublier les diagnostics et les documents',
        p: [
          "DPE, diagnostics techniques, procès-verbaux d'assemblée générale, montant des charges : les acheteurs — et leurs notaires — les demanderont tôt ou tard. Un dossier incomplet retarde la vente et fragilise la négociation. Préparez tout avant la mise en vente : c'est autant de temps gagné et de sérénité pour la suite.",
        ],
      },
      {
        h: '4. Mal gérer les visites',
        p: [
          "Enchaîner les visites sans filtre fait perdre du temps à tout le monde. Les visiteurs sérieux se reconnaissent à leur projet et à leur financement : qualifier les demandes en amont permet de concentrer l'énergie sur les vrais acquéreurs potentiels, et d'éviter que votre quotidien ne soit envahi pendant des mois.",
        ],
      },
      {
        h: '5. Rester seul face à la négociation',
        p: [
          "La négociation ne commence pas à l'offre : elle se joue dès le premier contact. Justifier son prix, répondre aux objections, sécuriser le financement de l'acheteur, tenir les délais jusqu'à la signature — c'est un métier. Un accompagnement professionnel protège votre prix et votre tranquillité.",
          "Vous envisagez de vendre à Marseille ou dans ses environs ? Apimmo vous propose une estimation confidentielle et sans engagement, avec un avis de valeur écrit et documenté. Contactez-nous : la première conversation ne coûte rien et vous apprendra beaucoup.",
        ],
      },
    ],
  },
  {
    id: 'a3',
    slug: 'quartiers-marseille-ou-habiter',
    date: '9 mai 2026',
    titre: "Dans quel quartier de Marseille habiter ? Notre tour d'horizon",
    extrait: "Du Vieux-Port à la Pointe Rouge, chaque quartier a son caractère, ses prix et son ambiance. Petit guide pour trouver celui qui vous correspond.",
    photo: U('photo-1566838217578-1903568a76d9'),
    sections: [
      {
        h: null,
        p: [
          "Marseille n'est pas une ville, c'est une mosaïque. 111 quartiers officiels, des ambiances qui changent d'une rue à l'autre, la mer d'un côté et les collines de l'autre. Choisir où habiter, c'est d'abord choisir un mode de vie. Voici notre lecture des grands secteurs, forgée par des années de terrain.",
        ],
      },
      {
        h: 'Le 7e : la mer au quotidien',
        p: [
          "Entre le Pharo, Endoume, Malmousque et le Roucas Blanc, le 7e arrondissement offre ce que peu de villes françaises peuvent proposer : vivre les pieds dans l'eau tout en restant à dix minutes du centre. Criques, cabanons, vallon des Auffes — le cadre est unique, et les prix parmi les plus élevés de la ville. C'est le secteur idéal pour qui place la qualité de vie et la mer au sommet de ses critères.",
        ],
      },
      {
        h: 'Le 8e : l\u2019équilibre familles et bord de mer',
        p: [
          "Du Prado à la Pointe Rouge en passant par Périer et Saint-Giniez, le 8e séduit les familles : écoles réputées, plages accessibles à pied ou à vélo, larges avenues et beaux immeubles. Le marché y est dynamique et les biens de qualité partent rapidement — mieux vaut être prêt quand la bonne adresse se présente.",
        ],
      },
      {
        h: 'Le centre : Vieux-Port, Chave, la Plaine',
        p: [
          "Le centre de Marseille vit une transformation profonde. Autour du Vieux-Port, du cours Julien, de la Plaine ou du boulevard Chave, une nouvelle génération d'habitants redonne vie aux beaux immeubles anciens. Les prix y restent accessibles au regard d'autres métropoles, avec un potentiel de valorisation réel pour qui sait choisir son immeuble — c'est là que l'accompagnement local prend tout son sens.",
        ],
      },
      {
        h: 'Les villages dans la ville : Saint-Barnabé, Mazargues, les Goudes',
        p: [
          "Marseille cache des villages : Saint-Barnabé et ses maisons de ville dans le 12e, Mazargues aux portes des calanques, les Goudes et leur bout du monde. On y trouve des maisons avec jardin, une vie de quartier authentique, et souvent un excellent compromis entre espace, budget et douceur de vivre.",
        ],
      },
      {
        h: 'Et le bon quartier pour vous ?',
        p: [
          "Il n'existe pas de meilleur quartier dans l'absolu — seulement celui qui correspond à votre vie : trajet quotidien, écoles, besoin de mer ou de calme, budget. C'est exactement la conversation que nous aimons avoir avec nos clients avant même de parler de biens.",
          "Vous cherchez votre adresse à Marseille ? Passez nous voir rue du Capitaine Dessemond, ou confiez-nous votre recherche : nous connaissons chaque secteur, et souvent les biens avant qu'ils n'arrivent sur le marché.",
        ],
      },
    ],
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
