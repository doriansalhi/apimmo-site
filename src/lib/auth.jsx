import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseReady } from '../lib/supabase';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkAdmin(sess) {
    if (!sess) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', sess.user.id)
      .maybeSingle();
    setIsAdmin(Boolean(data));
  }

  useEffect(() => {
    if (!supabaseReady) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      await checkAdmin(data.session);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, sess) => {
      setSession(sess);
      await checkAdmin(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signOut = () => supabase.auth.signOut();

  return (
    <AuthCtx.Provider value={{ session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
