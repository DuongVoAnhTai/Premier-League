"use client";

import React, { createContext, useContext } from "react";

import useAuth, { AuthState } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!auth.isAuthenticated && pathname !== "/") {
      router.push("/");
    }
  }, [auth.isAuthenticated, router]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};