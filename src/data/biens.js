import { useEffect, useState } from 'react';
import { supabase, supabaseReady } from '../lib/supabase';
import { BIENS as DEMO_BIENS, VENDUS as DEMO_VENDUS } from '../data/data';

// Normalise une ligne Supabase vers la forme attendue par les composants.
function normalize(row) {
  return {
    id: row.id,
    ref: row.ref || '',
    titre: row.titre || '',
    prix: Number(row.prix) || 0,
    surface: row.surface || 0,
    chambres: row.chambres || 0,
    type: row.type || 'Appartement',
    transaction: row.transaction || 'vente',
    ville: row.ville || '',
    badge: row.badge || null,
    dpe: row.dpe || 'C',
    extrait: row.extrait || '',
    description: Array.isArray(row.description) ? row.description : [],
    photos: Array.isArray(row.photos) && row.photos.length ? row.photos : [DEMO_BIENS[0].photos[0]],
    statut: row.statut || 'disponible',
    ordre: row.ordre ?? 0,
  };
}

// ---------- LECTURE (site public) ----------
// statut : 'disponible' | 'vendu'
// transaction : 'vente' | 'location' | null (= toutes)
export function useBiens(statut = 'disponible', transaction = null) {
  const [biens, setBiens] = useState(() =>
    supabaseReady ? [] : statut === 'vendu' ? DEMO_VENDUS : DEMO_BIENS
  );
  const [loading, setLoading] = useState(supabaseReady);

  useEffect(() => {
    if (!supabaseReady) return;
    let alive = true;
    (async () => {
      setLoading(true);
      let q = supabase
        .from('biens')
        .select('*')
        .eq('statut', statut)
        .order('ordre', { ascending: false })
        .order('created_at', { ascending: false });
      if (transaction) q = q.eq('transaction', transaction);
      const { data, error } = await q;
      if (!alive) return;
      if (error) {
        console.error('Supabase biens:', error.message);
        setBiens(statut === 'vendu' ? DEMO_VENDUS : DEMO_BIENS); // fallback
      } else {
        setBiens((data || []).map(normalize));
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [statut, transaction]);

  return { biens, loading };
}

// ---------- LECTURE d'un bien ----------
export function useBien(id) {
  const [bien, setBien] = useState(() => (supabaseReady ? null : DEMO_BIENS.find((b) => b.id === id) || null));
  const [loading, setLoading] = useState(supabaseReady);

  useEffect(() => {
    if (!supabaseReady) {
      setBien(DEMO_BIENS.find((b) => b.id === id) || null);
      return;
    }
    let alive = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.from('biens').select('*').eq('id', id).maybeSingle();
      if (!alive) return;
      setBien(error || !data ? null : normalize(data));
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  return { bien, loading };
}

// ---------- CRUD (admin) ----------
export async function listAllBiens() {
  const { data, error } = await supabase
    .from('biens')
    .select('*')
    .order('ordre', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(normalize);
}

export async function saveBien(bien) {
  const payload = {
    ref: bien.ref,
    titre: bien.titre,
    prix: Number(bien.prix) || 0,
    surface: Number(bien.surface) || 0,
    chambres: Number(bien.chambres) || 0,
    type: bien.type,
    transaction: bien.transaction || 'vente',
    ville: bien.ville,
    badge: bien.badge || null,
    dpe: bien.dpe,
    extrait: bien.extrait,
    description: bien.description || [],
    photos: bien.photos || [],
    statut: bien.statut || 'disponible',
    ordre: Number(bien.ordre) || 0,
  };
  if (bien.id) {
    const { error } = await supabase.from('biens').update(payload).eq('id', bien.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('biens').insert(payload);
    if (error) throw error;
  }
}

export async function deleteBien(id) {
  const { error } = await supabase.from('biens').delete().eq('id', id);
  if (error) throw error;
}

// ---------- Upload photos vers Storage ----------
export async function uploadPhoto(file) {
  const ext = file.name.split('.').pop();
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from('biens-photos').upload(name, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('biens-photos').getPublicUrl(name);
  return data.publicUrl;
}
