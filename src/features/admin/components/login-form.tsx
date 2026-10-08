"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { api, setAdminToken } from "@/features/admin/api/client";
import { establishAdminSession } from "@/features/admin/auth/actions";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "");

    startTransition(async () => {
      setError(null);
      try {
        const data = await api.login(username, password);
        setAdminToken(data.token);
        await establishAdminSession();
        router.push("/admin");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Could not sign in. Is the API running?"
        );
      }
    });
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-primary uppercase">
          {siteConfig.name}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Admin sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in against the Express API (MongoDB). Default credentials come
          from your env files.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-lg border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            required
            defaultValue="admin"
            className="h-10 rounded-md border border-input bg-background px-3"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="h-10 rounded-md border border-input bg-background px-3"
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Default: <code className="text-foreground">admin</code> /{" "}
          <code className="text-foreground">grandview</code>
        </p>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/" className="underline-offset-4 hover:underline">
          ← Back to website
        </Link>
      </p>
    </div>
  );
}
