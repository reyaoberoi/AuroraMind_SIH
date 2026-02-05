import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthApi } from "@/lib/api";

type AuthUser = { email: string } | null;

type AuthContextType = {
  user: AuthUser;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    const raw = localStorage.getItem("authUser");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const persist = (data: AuthUser) => {
    if (data) localStorage.setItem("authUser", JSON.stringify(data));
    else localStorage.removeItem("authUser");
  };

  const login = async (email: string, password: string) => {
    // Temporary static credentials
    if (email === "user@gmail.com" && password === "user123") {
      const next = { email };
      setUser(next);
      persist(next);
      localStorage.setItem("authToken", "static-dev-token");
      return;
    }

    // Fallback to API (kept for future integration)
    const res = await AuthApi.login(email, password);
    const next = { email: res.user.email };
    setUser(next);
    persist(next);
    localStorage.setItem("authToken", res.token);
  };

  const signup = async (email: string, password: string) => {
    const res = await AuthApi.signup(email, password);
    const next = { email: res.user.email };
    setUser(next);
    persist(next);
    localStorage.setItem("authToken", res.token);
  };

  const logout = () => {
    setUser(null);
    persist(null);
    localStorage.removeItem("authToken");
  };

  const value = useMemo(() => ({ user, login, signup, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};


