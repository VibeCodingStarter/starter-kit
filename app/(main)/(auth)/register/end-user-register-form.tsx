"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AlertCircle, Loader2 } from "lucide-react";
import { backendRegisterAction } from "@/app/actions";
import { useDeploymentMode, useDeploymentIssues } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import type { DeploymentModeIssue } from "@/lib/deployment-mode";

interface FieldErrors {
  email?: string;
  password?: string;
  confirm_password?: string;
  terms?: string;
}

const issueSort = (a: DeploymentModeIssue, b: DeploymentModeIssue) => {
  const weight = { error: 0, warning: 1 } as const;
  return weight[a.severity] - weight[b.severity];
};

export default function EndUserRegisterForm() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deployment = useDeploymentMode();
  const issues = useDeploymentIssues();

  const highestIssue = [...issues].sort(issueSort)[0];

  if (deployment.mode === "operator") {
    return (
      <div className="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
        End user registration is not available in operator mode. Please use
        project or console mode.
      </div>
    );
  }

  if (!deployment.isReady) {
    return (
      <div className="rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        Deployment configuration is incomplete. Verify the required environment
        variables and refresh this page.
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirmPassword = formData.get("confirm_password")?.toString() ?? "";

    const nextFieldErrors: FieldErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      nextFieldErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextFieldErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextFieldErrors.password = "Password must be at least 8 characters long.";
    } else {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordPattern.test(password)) {
        nextFieldErrors.password =
          "Password must contain uppercase, lowercase, and digit characters.";
      }
    }

    if (confirmPassword !== password) {
      nextFieldErrors.confirm_password = "Passwords must match.";
    }

    if (!termsAccepted) {
      nextFieldErrors.terms = "You must accept the terms and privacy policy.";
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    // Add role to form data for end user registration
    formData.append("role", "end_user");

    startTransition(async () => {
      try {
        const result = await backendRegisterAction(formData);

        if (result.success && result.redirectTo) {
          // Small delay to ensure cookie is committed before navigation
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Client-side navigation after cookie is committed
          router.push(result.redirectTo);
        } else if (!result.success && result.error) {
          // Handle error returned from Server Action
          setFormError(result.error);
        }
      } catch (error) {
        if (isRedirectError(error)) {
          // Re-throw redirect errors to allow navigation
          throw error;
        }

        // This should only happen for unexpected errors
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.";
        setFormError(errorMessage);
      }
    });
  };

  return (
    <div className="space-y-6">
      {highestIssue && (
        <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <p>{highestIssue.message}</p>
        </div>
      )}

      {formError && (
        <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-destructive">
              Registration failed
            </p>
            <p className="text-sm text-destructive/80">{formError}</p>
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="full_name">Full name (optional)</Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Your full name"
            autoComplete="name"
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isPending}
            required
          />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isPending}
            required
          />
          {fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Repeat password"
            autoComplete="new-password"
            disabled={isPending}
            required
          />
          {fieldErrors.confirm_password && (
            <p className="text-sm text-destructive">
              {fieldErrors.confirm_password}
            </p>
          )}
        </div>

        <div className="rounded-md border border-muted bg-muted/50 p-4 text-sm text-muted-foreground dark:bg-muted/40">
          <p className="font-medium text-foreground">Password requirements</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Minimum of 8 characters</li>
            <li>Use a mix of letters, numbers, or symbols</li>
            <li>Avoid reusing passwords from other services</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              disabled={isPending}
            />
            <div className="leading-tight">
              <Label
                htmlFor="terms"
                className="cursor-pointer text-sm font-normal text-muted-foreground"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>
          {fieldErrors.terms && (
            <p className="text-sm text-destructive">{fieldErrors.terms}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          className="font-medium text-primary hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
