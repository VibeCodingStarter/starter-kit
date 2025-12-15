import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";
import EndUserRegisterForm from "@/app/(main)/(auth)/register/end-user-register-form";

export const metadata: Metadata = {
  title: "Create Account - Dev Kit for AI",
  description: "Create your account to get started with Dev Kit for AI.",
};

type SearchParams = Promise<{ error?: string; message?: string }>;

export default async function RegisterPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const deploymentConfig = hydrateDeploymentMode();

  // Operator mode should use developer registration
  if (deploymentConfig.mode === "operator") {
    redirect("/register/developer");
  }

  return (
    <div className="space-y-8">
      {searchParams.message && (
        <div className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/20">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-300">
            {searchParams.message}
          </p>
        </div>
      )}

      {searchParams.error && (
        <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{searchParams.error}</p>
        </div>
      )}

      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to get started with your AI-powered application.
        </p>
      </div>

      <EndUserRegisterForm />
    </div>
  );
}
