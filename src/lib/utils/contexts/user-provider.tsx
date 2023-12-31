"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { Component } from "../component";
import type { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type ContextType = {
  user: User | null | "loading";
  setUser: (value: User | null | "loading") => void;
}

const UserContext = createContext<ContextType | null>(null);

export const useUserContext = (): ContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a DateProvider");
  }

  return context;
};

export const UserProvider: Component<PropsWithChildren> = ({ children }) => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null | "loading">("loading");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, [supabase.auth]);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};