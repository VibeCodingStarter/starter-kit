"use client";

import { useState } from "react";
import Link from "next/link";
import { backendLoginAction } from "@/app/actions";
import { useDeploymentMode } from "@/lib/auth-context";
import { sanitizeReturnUrl } from "@/lib/return-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

function getRegistrationLink(mode: string): string {
  switch (mode) {
    case "operator":
      return "/register/developer";
    case "console":
      return "/register/developer";
    case "project":
      return "/register/developer"; // TODO: end-user registration flow (TASK_008)
    default:
      return "/register/developer";
  }
}

interface LoginFormProps {
  returnUrl?: string;
}

export default function LoginForm({ returnUrl }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mode } = useDeploymentMode();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Add returnUrl to formData if provided
    const safeReturnUrl = sanitizeReturnUrl(returnUrl ?? null);

    if (safeReturnUrl) {
      formData.set("returnUrl", safeReturnUrl);
    }

    try {
      const result = await backendLoginAction(formData);

      if (result.success) {
        // No need for manual redirect - backendLoginAction handles it
        // This code won't execute due to redirect() throwing
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      // Catch any errors including redirect() throws
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        // This is a Next.js redirect, let it propagate
        throw err;
      }
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-destructive font-medium">Login Failed</p>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link className="text-xs text-primary hover:underline" href="#">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Registration link (mode-aware) */}
      <div className="text-center text-sm">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            href={getRegistrationLink(mode)}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
