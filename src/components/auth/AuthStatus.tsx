"use client";

import { useEffect, useState } from "react";
import { Shield, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLocalAuthSession,
  LocalAuthSession,
  setLocalRole,
  signInLocal,
  signOutLocal,
} from "@/lib/auth";

export function AuthStatus() {
  const [session, setSession] = useState<LocalAuthSession | null>(null);

  useEffect(() => {
    setSession(getLocalAuthSession());
  }, []);

  const signIn = (role: LocalAuthSession["role"]) => {
    setSession(signInLocal(role));
  };

  const switchRole = () => {
    setSession(setLocalRole(session?.role === "ADMIN" ? "USER" : "ADMIN"));
  };

  const signOut = () => {
    signOutLocal();
    setSession(null);
  };

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => signIn("USER")}
        >
          <UserRound className="mr-2 h-4 w-4" />
          Demo User
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => signIn("ADMIN")}
          className="gradient-primary gradient-primary-hover text-white"
        >
          <Shield className="mr-2 h-4 w-4" />
          Demo Admin
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-card-foreground lg:inline-flex">
        {session.role === "ADMIN" ? "Admin" : "User"} preview
      </span>
      <Button type="button" variant="ghost" size="sm" onClick={switchRole}>
        Switch
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
}
