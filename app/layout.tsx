import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/project/header";
import Footer from "@/components/project/footer";
import appConfig from "@/config/app.config";
import { DevkitDoctor } from "@/components/devkit/devkit-doctor";
import { AuthProvider, DeploymentModeProvider } from "@/lib/auth-context";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";
import { getCurrentUser } from "@/lib/auth-server";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: appConfig.title,
  description: appConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deploymentConfig = hydrateDeploymentMode();
  const hasIssues = deploymentConfig.issues.length > 0;

  // Fetch current user (async - server-side only)
  const user = await getCurrentUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-dvh flex flex-col">
        <DeploymentModeProvider value={deploymentConfig}>
          <AuthProvider user={user}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {hasIssues && (
                <div className="border-b border-amber-200 bg-amber-50 text-amber-800">
                  <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 text-sm">
                    {deploymentConfig.issues.map((issue, index) => (
                      <p
                        key={`${issue.envVar ?? "issue"}-${index}`}
                        className={
                          issue.severity === "error"
                            ? "font-medium text-red-700"
                            : "text-amber-800"
                        }
                      >
                        {issue.severity.toUpperCase()}: {issue.message}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <Header />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
              <Analytics />
              <SpeedInsights />

              {/* Show in development mode or when demo mode is enabled */}
              {(process.env.NODE_ENV === "development" ||
                process.env.NEXT_PUBLIC_DEMO_MODE === "true") && (
                <DevkitDoctor />
              )}
            </ThemeProvider>
          </AuthProvider>
        </DeploymentModeProvider>
      </body>
    </html>
  );
}
