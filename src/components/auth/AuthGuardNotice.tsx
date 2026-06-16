"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLocalAuthSession,
  LocalAuthSession,
  LocalUserRole,
  signInLocal,
} from "@/lib/auth";

interface AuthGuardNoticeProps {
  requiredRole?: LocalUserRole;
  label: string;
}

export function AuthGuardNotice({
  requiredRole = "USER",
  label,
}: AuthGuardNoticeProps) {
  const [session, setSession] = useState<LocalAuthSession | null>(null);

  useEffect(() => {
    setSession(getLocalAuthSession());
  }, []);

  const hasAccess = Boolean(
    session && (requiredRole === "USER" || session.role === "ADMIN")
  );

  if (hasAccess) {
    return (
      <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
        <p className="font-semibold text-primary">
          Local auth preview active · {session?.role}
        </p>
        <p className="mt-1 text-muted-foreground">
          {label} is using browser-local demo auth. Real provider setup comes
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 flex-none text-accent" />
        <div>
          <p className="font-semibold">Local auth preview required</p>
          <p className="mt-1 text-muted-foreground">
            {label} expects {requiredRole} access. This route remains open for
            local development.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSession(signInLocal("USER"))}
        >
          Sign in user
        </Button>
        <Button
          type="button"
          onClick={() => setSession(signInLocal("ADMIN"))}
          className="gradient-primary gradient-primary-hover text-white"
        >
          Sign in admin
        </Button>
      </div>
    </div>
  );
}
