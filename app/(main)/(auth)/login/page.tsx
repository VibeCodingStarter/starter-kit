import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { sanitizeReturnUrl } from "@/lib/return-url";
import { getCurrentUser } from "@/lib/auth-server";

export const metadata: Metadata = {
  title: "Login - Dev Kit for AI",
  description: "Sign in to your Dev Kit for AI account",
};

export default async function LoginPage(props: {
  searchParams: Promise<{
    error?: string;
    message?: string;
    returnUrl?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const safeReturnUrl =
    sanitizeReturnUrl(searchParams.returnUrl ?? null) ?? undefined;

  // Check if user is already logged in
  const user = await getCurrentUser();
  if (user) {
    // If returnUrl is provided, redirect there
    if (safeReturnUrl) {
      redirect(safeReturnUrl);
    }

    // Otherwise, redirect based on user role
    switch (user.role) {
      case "platform_operator":
        redirect("/portal");
        break;
      case "developer":
        redirect("/console");
        break;
      case "end_user":
        redirect("/dashboard");
        break;
      default:
        redirect("/dashboard");
    }
  }

  return (
    <>
      {/* Success message from query params (e.g., after email verification) */}
      {searchParams.message && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 dark:text-green-300">
            {searchParams.message}
          </p>
        </div>
      )}

      {/* Error message from query params */}
      {searchParams.error && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{searchParams.error}</p>
        </div>
      )}

      <LoginForm returnUrl={safeReturnUrl} />
    </>
  );
}
