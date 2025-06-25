// src/context/auth-context.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

// Simplified AuthUser - only admin role exists
export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: 'admin'; // Only admin role exists
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
    let isMounted = true;

    // Get initial session - only check, don't create
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          if (isMounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        if (session?.user && isMounted) {
          // Only set user if they have admin role in their metadata
          const supabaseUser = session.user;
          
          // Create simplified admin user object
          const adminUser: AuthUser = {
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || "",
            avatar_url: supabaseUser.user_metadata?.avatar_url || "",
            role: 'admin'
          };

          setUser(adminUser);
        } else if (isMounted) {
          setUser(null);
        }
        
        if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email);
      
      if (!isMounted) return;

      try {
        if (event === "SIGNED_IN" && session?.user) {
          const supabaseUser = session.user;
          
          const adminUser: AuthUser = {
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || "",
            avatar_url: supabaseUser.user_metadata?.avatar_url || "",
            role: 'admin'
          };

          setUser(adminUser);
        } else if (event === "SIGNED_OUT" || !session) {
          setUser(null);
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
        setUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
      // User will be set automatically via onAuthStateChange
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear user immediately to prevent UI delays
      setUser(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        // Don't throw here, just log it
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear the user even if logout fails
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};