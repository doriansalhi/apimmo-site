import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../lib/auth';
import { supabaseReady } from '../lib/supabase';
import { listAllBiens, saveBien, deleteBien, uploadPhoto } from '../data/biens';
import { fmtPrix } from '../data/data';
import '../admin.css';

const VILLES_SUGG = ['Marseille 7e', 'Marseille 8e', 'Marseille 6e', 'Marseille 1er', 'Cassis', 'Aubagne', 'La Ciotat', 'Aix-en-Provence'];
const BADGES = ['', 'Nouveauté', 'Exclusivité', 'Sous offre'];
const DPES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const EMPTY = {
  ref: '', titre: '', prix: '', surface: '', chambres: '', type: 'Appartement', transaction: 'vente',
  ville: '', badge: '', dpe: 'C', extrait: '', description: [''], photos: [], statut: 'disponible', ordre: 0,
};

/* ============ LOGIN ============ */
function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    const { error } = await signIn(email, pwd);
    setBusy(false);
    if (error) setErr('Identifiants incorrects.');
  }

  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="section-head" style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 30 }}>Espace agence</h2>
          <span className="sub">Apimmo — Administration</span>
          <div className="divider">✦</div>
        </div>
        <form className="form-grid" style={{ gridTemplateColumns: '1fr' }} onSubmit={submit}>
          <div className="field">
            <label htmlFor="l-email">Email</label>
            <input id="l-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div className="field">
            <label htmlFor="l-pwd">Mot de passe</label>
            <input id="l-pwd" type="password" required value={pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="current-password" />
          </div>
          {err && <p style={{ color: '#c0392b', fontSize: 13 }}>{err}</p>}
          <button type="submit" className="btn btn--solid" disabled={busy} style={{ width: '100%' }}>
            {busy ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
        <p style={{ fontSize: 12, color: 'var(--smoke)', marginTop: 20, textAlign: 'center' }}>
          Accès réservé aux membres de l'agence.
        </p>
      </div>
    </section>
  );
}

/* ============ FORMULAIRE BIEN ============ */
function BienForm({ initial, onDone, onCancel }) {
  const [b, setB] = useState(() => ({ ...EMPTY, ...initial, description: initial?.description?.length ? initial.description : [''] }));
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setB({ ...b, [k]: e.target.value });

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadPhoto(f));
      setB((prev) => ({ ...prev, photos: [...prev.photos, ...urls] }));
    } catch (err) {
      alert('Erreur upload : ' + err.message);
    }
    setUploading(false);
    e.target.value = '';
  }

  const movePhoto = (i, dir) => {
    const arr = [...b.photos];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setB({ ...b, photos: arr });
  };
  const removePhoto = (i) => setB({ ...b, photos: b.photos.filter((_, k) => k !== i) });

  const setPara = (i, v) => {
    const arr = [...b.description];
    arr[i] = v;
    setB({ ...b, description: arr });
  };

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await saveBien({ ...b, description: b.description.filter((p) => p.trim()) });
      onDone();
    } catch (err) {
      alert('Erreur : ' + err.message);
      setBusy(false);
    }
  }

  const isLocation = b.transaction === 'location';

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="form-grid">
        <div className="field"><label>Référence *</label><input required value={b.ref} onChange={set('ref')} placeholder="AP-2407" /></div>
        <div className="field"><label>Statut</label>
          <select value={b.statut} onChange={set('statut')}><option value="disponible">Disponible</option><option value="vendu">{isLocation ? 'Loué' : 'Vendu'}</option></select>
        </div>
        <div className="field full"><label>Titre *</label><input required value={b.titre} onChange={set('titre')} placeholder="Villa contemporaine vue mer — Roucas Blanc" /></div>
        <div className="field"><label>Transaction</label>
          <select value={b.transaction} onChange={set('transaction')}>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
        </div>
        <div className="field"><label>{isLocation ? 'Loyer (€/mois CC) *' : 'Prix (€) *'}</label><input type="number" min="0" required value={b.prix} onChange={set('prix')} placeholder={isLocation ? '1850' : '2450000'} /></div>
        <div className="field"><label>Surface (m²)</label><input type="number" min="0" value={b.surface} onChange={set('surface')} /></div>
        <div className="field"><label>Chambres</label><input type="number" min="0" value={b.chambres} onChange={set('chambres')} /></div>
        <div className="field"><label>Type</label>
          <select value={b.type} onChange={set('type')}><option>Appartement</option><option>Maison</option><option>Autre</option></select>
        </div>
        <div className="field"><label>Ville / secteur</label>
          <input list="villes" value={b.ville} onChange={set('ville')} />
          <datalist id="villes">{VILLES_SUGG.map((v) => <option key={v} value={v} />)}</datalist>
        </div>
        <div className="field"><label>Badge</label>
          <select value={b.badge} onChange={set('badge')}>{BADGES.map((x) => <option key={x} value={x}>{x || '— aucun —'}</option>)}</select>
        </div>
        <div className="field"><label>DPE</label>
          <select value={b.dpe} onChange={set('dpe')}>{DPES.map((x) => <option key={x}>{x}</option>)}</select>
        </div>
        <div className="field"><label>Ordre d'affichage</label><input type="number" value={b.ordre} onChange={set('ordre')} title="Plus grand = affiché en premier" /></div>
        <div className="field full"><label>Extrait (carte)</label><textarea value={b.extrait} onChange={set('extrait')} style={{ minHeight: 70 }} /></div>

        <div className="field full">
          <label>Description (paragraphes)</label>
          {b.description.map((p, i) => (
            <textarea key={i} value={p} onChange={(e) => setPara(i, e.target.value)} style={{ minHeight: 80, marginBottom: 8 }} placeholder={`Paragraphe ${i + 1}`} />
          ))}
          <button type="button" className="link-gold" onClick={() => setB({ ...b, description: [...b.description, ''] })} style={{ alignSelf: 'flex-start' }}>+ Ajouter un paragraphe</button>
        </div>

        <div className="field full">
          <label>Photos {uploading && '— envoi en cours…'}</label>
          <input type="file" accept="image/*" multiple onChange={handleFiles} />
          <div className="photo-grid">
            {b.photos.map((url, i) => (
              <div className="photo-thumb" key={url + i}>
                <img src={url} alt="" />
                {i === 0 && <span className="cover">Principale</span>}
                <div className="photo-actions">
                  <button type="button" onClick={() => movePhoto(i, -1)} title="Reculer">←</button>
                  <button type="button" onClick={() => movePhoto(i, 1)} title="Avancer">→</button>
                  <button type="button" onClick={() => removePhoto(i)} title="Supprimer" className="del">✕</button>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--smoke)', marginTop: 6 }}>La 1re photo sert de visuel principal. Utilisez ← → pour réordonner.</p>
        </div>
      </div>

      <div className="admin-form-foot">
        <button type="button" className="btn" onClick={onCancel}>Annuler</button>
        <button type="submit" className="btn btn--solid" disabled={busy || uploading}>{busy ? 'Enregistrement…' : 'Enregistrer le bien'}</button>
      </div>
    </form>
  );
}

/* ============ TABLEAU DE BORD ============ */
function Dashboard() {
  const { session, isAdmin, signOut } = useAuth();
  const [biens, setBiens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | {} (nouveau) | bien
  const [filter, setFilter] = useState('tous');

  async function refresh() {
    setLoading(true);
    try {
      setBiens(await listAllBiens());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }
  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin]);

  const shown = useMemo(() => {
    if (filter === 'tous') return biens;
    if (filter === 'vente' || filter === 'location') return biens.filter((b) => b.transaction === filter);
    return biens.filter((b) => b.statut === filter);
  }, [biens, filter]);

  if (!isAdmin) {
    return (
      <section className="section container" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div className="section-head"><h2 style={{ fontSize: 26 }}>Accès non autorisé</h2><div className="divider">✦</div></div>
        <p style={{ color: 'var(--smoke)' }}>
          Votre compte <strong>{session?.user?.email}</strong> n'est pas encore déclaré comme administrateur.<br />
          Ajoutez-le dans la table <code>admins</code> de Supabase (voir <code>supabase/schema.sql</code>).
        </p>
        <button className="btn" style={{ marginTop: 24 }} onClick={signOut}>Se déconnecter</button>
      </section>
    );
  }

  if (editing !== null) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="admin-bar">
            <h1 className="admin-title">{editing.id ? 'Modifier le bien' : 'Nouveau bien'}</h1>
          </div>
          <BienForm
            initial={editing.id ? editing : {}}
            onCancel={() => setEditing(null)}
            onDone={() => { setEditing(null); refresh(); }}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin-bar">
          <div>
            <h1 className="admin-title">Gestion des annonces</h1>
            <p style={{ fontSize: 12.5, color: 'var(--smoke)' }}>Connecté : {session?.user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn--solid" onClick={() => setEditing({})}>+ Nouveau bien</button>
            <button className="btn" onClick={signOut}>Déconnexion</button>
          </div>
        </div>

        <div className="admin-filters">
          {[
            ['tous', 'Tous'],
            ['vente', 'Ventes'],
            ['location', 'Locations'],
            ['disponible', 'Disponibles'],
            ['vendu', 'Vendus / Loués'],
          ].map(([f, label]) => (
            <button key={f} className={`chip${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>
              {label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--smoke)' }}>{shown.length} bien(s)</span>
        </div>

        {loading ? (
          <p style={{ color: 'var(--smoke)', padding: '40px 0' }}>Chargement…</p>
        ) : shown.length === 0 ? (
          <div className="admin-empty">
            <p>Aucune annonce pour l'instant.</p>
            <button className="btn btn--solid" onClick={() => setEditing({})}>Créer votre première annonce</button>
          </div>
        ) : (
          <div className="admin-list">
            {shown.map((b) => (
              <div className="admin-row" key={b.id}>
                <div className="ar-thumb" style={{ backgroundImage: `url(${b.photos[0]})` }} />
                <div className="ar-main">
                  <div className="ar-title">{b.titre || '(sans titre)'} {b.badge && <span className="badge" style={{ marginLeft: 8 }}>{b.badge}</span>}</div>
                  <div className="ar-meta">Réf. {b.ref} · {b.transaction === 'location' ? 'Location' : 'Vente'} · {b.ville} · {b.surface} m² · {b.chambres} ch.</div>
                </div>
                <div className="ar-price">{fmtPrix(b.prix)}{b.transaction === 'location' ? ' /mois' : ''}</div>
                <div className={`ar-status ${b.statut}`}>{b.statut === 'vendu' ? (b.transaction === 'location' ? 'Loué' : 'Vendu') : 'En ligne'}</div>
                <div className="ar-actions">
                  <button className="link-gold" onClick={() => setEditing(b)}>Modifier</button>
                  <button
                    className="del-link"
                    onClick={async () => {
                      if (confirm(`Supprimer définitivement « ${b.titre} » ?`)) {
                        await deleteBien(b.id);
                        refresh();
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ============ ENTRÉE /admin ============ */
export default function Admin() {
  const { session, loading } = useAuth();

  if (!supabaseReady)
    return (
      <section className="section container" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <div className="section-head"><h2 style={{ fontSize: 26 }}>Administration non configurée</h2><div className="divider">✦</div></div>
        <p style={{ color: 'var(--smoke)', maxWidth: 560, margin: '0 auto' }}>
          Renseignez <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> dans un fichier <code>.env</code>,
          puis exécutez <code>supabase/schema.sql</code>. Le site public reste fonctionnel avec les données de démonstration.
        </p>
      </section>
    );

  if (loading) return <section className="section container"><p style={{ color: 'var(--smoke)' }}>Chargement…</p></section>;
  return session ? <Dashboard /> : <Login />;
}
