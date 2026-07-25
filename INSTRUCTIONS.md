# Ajout du back-office admin — Instructions

## 1. Copier les nouveaux fichiers

Copie le contenu de ce zip dans ton dossier `apimmo` en respectant les chemins :

- `src/pages/Admin.jsx`
- `src/lib/supabase.js`
- `src/lib/auth.jsx`
- `src/data/biens.js`
- `src/admin.css`
- `supabase/schema.sql`
- `.env.example`

(Les dossiers `src/lib` et `supabase` n'existent pas encore : crée-les.)

## 2. Installer la librairie Supabase

Dans PowerShell, à la racine du projet :

```powershell
npm install @supabase/supabase-js
```

## 3. Modifier 5 fichiers existants (petits patchs)

### a) `src/App.jsx`

**En haut**, après la ligne des imports de pages, ajoute :

```jsx
import Admin from './pages/Admin';
import { AuthProvider } from './lib/auth';
```

**Remplace tout le bloc `export default function App() { ... }`** (à la fin du fichier) par :

```jsx
function PublicSite() {
  return (
    <>
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
```

### b) `src/pages/Home.jsx`

**Ligne d'import des données** — remplace :

```jsx
import { AGENCE, HERO_SLIDES, BIENS, EQUIPE, ACTUS, AVIS, PARTENAIRES } from '../data/data';
```

par :

```jsx
import { AGENCE, HERO_SLIDES, EQUIPE, ACTUS, AVIS, PARTENAIRES } from '../data/data';
import { useBiens } from '../data/biens';
```

**Début du composant** — remplace :

```jsx
export default function Home() {
  const [newsSent, setNewsSent] = useState(false);
```

par :

```jsx
export default function Home() {
  const [newsSent, setNewsSent] = useState(false);
  const { biens } = useBiens('disponible');
  const derniers = biens.slice(0, 8);
```

**Dans le carrousel « Nos derniers biens »** — remplace `{BIENS.map((b) => (` par `{derniers.map((b) => (`.

### c) `src/pages/Acheter.jsx`

**Import** — remplace `import { BIENS } from '../data/data';` par `import { useBiens } from '../data/biens';`

**Début du composant** — remplace :

```jsx
  const villes = useMemo(() => [...new Set(BIENS.map((b) => b.ville))], []);

  const results = useMemo(
    () =>
      BIENS.filter(
```

par :

```jsx
  const { biens, loading } = useBiens('disponible');

  const villes = useMemo(() => [...new Set(biens.map((b) => b.ville))].filter(Boolean), [biens]);

  const results = useMemo(
    () =>
      biens.filter(
```

**Fin du useMemo** — remplace `    [f]` par `    [f, biens]`.

**Affichage** — remplace :

```jsx
          {results.length === 0 ? (
```

par :

```jsx
          {loading ? (
            <p className="no-results" style={{ fontStyle: 'normal' }}>Chargement des biens…</p>
          ) : results.length === 0 ? (
```

### d) `src/pages/BienDetail.jsx`

**Import** — remplace :

```jsx
import { BIENS, fmtPrix, AGENCE } from '../data/data';
```

par :

```jsx
import { fmtPrix, AGENCE } from '../data/data';
import { useBien } from '../data/biens';
```

**Début du composant** — remplace :

```jsx
  const bien = BIENS.find((b) => b.id === id);
```

par :

```jsx
  const { bien, loading } = useBien(id);
```

**Juste avant `if (!bien)`**, ajoute :

```jsx
  if (loading)
    return (
      <section className="section container" style={{ minHeight: '50vh' }}>
        <p style={{ color: 'var(--smoke)' }}>Chargement…</p>
      </section>
    );
```

### e) `src/pages/Autres.jsx`

**Import** — remplace :

```jsx
import { PROGRAMMES, VENDUS, EQUIPE, ACTUS, AGENCE, COMMUNES } from '../data/data';
```

par :

```jsx
import { PROGRAMMES, EQUIPE, ACTUS, AGENCE, COMMUNES } from '../data/data';
import { useBiens } from '../data/biens';
```

**Fonction `BiensVendus`** — remplace la ligne :

```jsx
export function BiensVendus() {
  return (
```

par :

```jsx
export function BiensVendus() {
  const { biens, loading } = useBiens('vendu');
  return (
```

Puis remplace `{VENDUS.map((v, i) => (` par :

```jsx
            {biens.map((v, i) => (
```

et la ligne de l'image `src={v.photo}` par `src={(v.photo || (v.photos && v.photos[0]))}`.

## 4. Tester

```powershell
npm run dev
```

- Le site public doit s'afficher normalement (données de démo tant que Supabase n'est pas configuré).
- `http://localhost:5173/admin` doit afficher « Administration non configurée ».

## 5. Configuration Supabase

Voir le message de Claude : création du projet, exécution de `supabase/schema.sql`,
fichier `.env`, création du compte admin, variables Netlify.
