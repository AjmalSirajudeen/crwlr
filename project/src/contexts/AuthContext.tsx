import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const DEMO_STORAGE_KEY = 'crwlr_demo';

export const DEMO_USER = {
  id: 'demo-user',
  email: 'demo@crwlr.app',
  app_metadata: {},
  user_metadata: { full_name: 'Riley Chen', username: 'riley' },
  aud: 'authenticated',
  created_at: '2025-04-01T00:00:00.000Z',
} as User;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemo: boolean;
  enterDemo: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (localStorage.getItem(DEMO_STORAGE_KEY) === '1') {
        setUser(DEMO_USER);
        setIsDemo(true);
        setLoading(false);
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setUser(session?.user ?? null);
        setLoading(false);

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error checking auth session:', error);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data?.user) {
        setUser(data.user);
        navigate('/');
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing in:', authError.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        setUser(data.user);
        navigate('/');
      }
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing up:', authError.message);
      throw error;
    }
  };

  const enterDemo = () => {
    localStorage.setItem(DEMO_STORAGE_KEY, '1');
    setUser(DEMO_USER);
    setIsDemo(true);
    navigate('/');
  };

  const signOut = async () => {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setIsDemo(false);
      if (!isDemo) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      setUser(null);
      navigate('/login');
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing out:', authError.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDemo, enterDemo, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}