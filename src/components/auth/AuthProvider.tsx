import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface AuthState {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    // Clean up URL hash after Supabase email confirmation redirect (#access_token=...)
    if (typeof window !== 'undefined' && window.location.hash.includes('access_token=')) {
      // supabase-js will parse the hash automatically (detectSessionInUrl true)
      // then we remove it for a clean URL
      setTimeout(() => {
        const { pathname, search } = window.location;
        window.history.replaceState({}, document.title, pathname + search);
      }, 0);
    }
    return () => sub.subscription.unsubscribe();
  }, []);

  const value: AuthState = {
    user,
    loading,
    signIn: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    },
    signUp: async (email, password) => {
      const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      return { error };
    },
    signOut: async () => { await supabase.auth.signOut(); },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
