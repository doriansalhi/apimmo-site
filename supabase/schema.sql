-- ============================================================
-- APIMMO — Schéma Supabase (à exécuter dans SQL Editor)
-- Projet dédié Apimmo · accès multi-comptes agence
-- ============================================================

-- 1) TABLE DES BIENS -----------------------------------------
create table if not exists public.biens (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  ref         text not null,
  titre       text not null,
  prix        bigint not null default 0,
  surface     int not null default 0,
  chambres    int not null default 0,
  type        text not null default 'Appartement',   -- Appartement | Maison | Autre
  ville       text not null default '',
  badge       text,                                   -- Nouveauté | Exclusivité | Sous offre | null
  dpe         text default 'C',                       -- A..G
  extrait     text default '',
  description text[] default '{}',                    -- paragraphes
  photos      text[] default '{}',                    -- URLs (Storage)
  statut      text not null default 'disponible',     -- disponible | vendu
  ordre       int not null default 0
);

create index if not exists biens_statut_idx on public.biens (statut);
create index if not exists biens_ordre_idx  on public.biens (ordre desc, created_at desc);

-- 2) TABLE DES ADMINS (agence) -------------------------------
-- Seuls les user_id présents ici peuvent créer/modifier/supprimer.
create table if not exists public.admins (
  user_id  uuid primary key references auth.users(id) on delete cascade,
  email    text,
  added_at timestamptz not null default now()
);

-- Helper : un utilisateur connecté est-il admin ?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- 3) RLS (Row Level Security) --------------------------------
alter table public.biens  enable row level security;
alter table public.admins enable row level security;

-- Lecture publique des biens (site vitrine)
drop policy if exists "biens lisibles par tous" on public.biens;
create policy "biens lisibles par tous"
  on public.biens for select
  using (true);

-- Écriture réservée aux admins
drop policy if exists "biens modifiables par admins" on public.biens;
create policy "biens modifiables par admins"
  on public.biens for all
  using (public.is_admin())
  with check (public.is_admin());

-- Un admin peut voir la liste des admins
drop policy if exists "admins lisibles par admins" on public.admins;
create policy "admins lisibles par admins"
  on public.admins for select
  using (public.is_admin());

-- 4) STORAGE : bucket photos ---------------------------------
insert into storage.buckets (id, name, public)
values ('biens-photos', 'biens-photos', true)
on conflict (id) do nothing;

-- Lecture publique des images
drop policy if exists "photos lisibles par tous" on storage.objects;
create policy "photos lisibles par tous"
  on storage.objects for select
  using (bucket_id = 'biens-photos');

-- Upload / suppression réservés aux admins
drop policy if exists "photos gérées par admins" on storage.objects;
create policy "photos gérées par admins"
  on storage.objects for all
  using (bucket_id = 'biens-photos' and public.is_admin())
  with check (bucket_id = 'biens-photos' and public.is_admin());

-- ============================================================
-- 5) AJOUTER UN MEMBRE DE L'AGENCE
-- ============================================================
-- a. Dans le dashboard : Authentication > Users > "Add user"
--    (ou "Invite") — crée le compte email + mot de passe.
-- b. Récupère son user_id (colonne UID dans la liste) puis :
--
--    insert into public.admins (user_id, email)
--    values ('COLLER-LE-UID-ICI', 'membre@apimmo.fr');
--
-- Pour te déclarer toi-même admin après ta 1re connexion,
-- exécute ceci (remplace par ton email) :
--
--    insert into public.admins (user_id, email)
--    select id, email from auth.users where email = 'apimmo13@gmail.com'
--    on conflict (user_id) do nothing;
-- ============================================================
