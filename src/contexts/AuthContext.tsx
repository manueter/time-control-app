import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from "react";
import { supabase } from "../utils/supabase";
import { Session, AuthError, User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error?: AuthError }>;
  register: (email: string, password: string,username?: string) => Promise<{ error?: AuthError }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch session on startup
  useEffect(() => {

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };

    setSession(data.session);
    setUser(data.session?.user || null);

    return { data: data.session };
  }, []);


  // Register Function
  const register = useCallback(async (email: string, password: string, username?: string) => {
    try {
      // Check if the user already exists
      const {data:userExists,error:checkUserError} = await supabase.rpc('check_user_exists',{email}); 
      
      if (userExists) {
        return { error: new AuthError("Usuario ya existe") };
      }
      else if(checkUserError){
        return { error: new AuthError(checkUserError.message) };
      }

      // Register new user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: username ? { data: { username } } : undefined,
      });

      if (error) return { error };

      return { data };
    } catch (err) {
      return { error: new AuthError("Error inesperado") };
    }
  }, []);

  // Logout Function
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
  }, []);


  const contextValue = useMemo(() => ({ user, session, login, register, logout }), [user, session, login, register, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
