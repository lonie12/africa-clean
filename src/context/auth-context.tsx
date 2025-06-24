// src/context/auth-context.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  supabase,
  type AuthUser,
  getUserProfile,
  upsertUserProfile,
} from "../lib/supabase";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await handleUserSession(session.user);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        await handleUserSession(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (supabaseUser: SupabaseUser) => {
    try {
      // Get or create user profile
      let profile = await getUserProfile(supabaseUser.id);

      if (!profile) {
        // Create profile if it doesn't exist
        profile = await upsertUserProfile({
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          name:
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.user_metadata?.name ||
            "",
          avatar_url: supabaseUser.user_metadata?.avatar_url || "",
          role: "user", // Default role
        });
      }

      const authUser: AuthUser = {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name: profile?.name || supabaseUser.user_metadata?.full_name || "",
        avatar_url:
          profile?.avatar_url || supabaseUser.user_metadata?.avatar_url || "",
        role: profile?.role || "user",
      };

      setUser(authUser);
    } catch (error) {
      console.error("Error handling user session:", error);
      // Fallback to basic user info if profile operations fail
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name: supabaseUser.user_metadata?.full_name || "",
        role: "user",
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
