"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PublicUser } from "@/lib/users";

export type AgroUser = PublicUser;

type AuthContextValue = {
  user: AgroUser | null;
  ready: boolean;
  login: (user: AgroUser, remember?: boolean) => void;
  logout: () => void;
};

const STORAGE_KEY = "agro-connect-user";
const SESSION_KEY = "agro-connect-user-session";
const AuthContext = createContext<AuthContextValue | null>(null);

function readUser(raw: string | null) {
  if (!raw) return null;
  return JSON.parse(raw) as AgroUser;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AgroUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = readUser(localStorage.getItem(STORAGE_KEY)) ?? readUser(sessionStorage.getItem(SESSION_KEY));
      if (saved) setUser(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    }
    setReady(true);
  }, []);

  const login = useCallback((next: AgroUser, remember = true) => {
    setUser(next);
    const payload = JSON.stringify(next);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, payload);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, payload);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export async function authenticate(payload: {
  method: "password" | "otp";
  mobile: string;
  password?: string;
  otp?: string;
}): Promise<AgroUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as { user?: AgroUser; code?: string; error?: string };
  if (!response.ok || !data.user) {
    throw new Error(data.code || data.error || "LOGIN_FAILED");
  }
  return data.user;
}
