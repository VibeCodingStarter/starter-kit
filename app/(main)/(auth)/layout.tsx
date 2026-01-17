import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-background shadow-2xl dark:border-neutral-800">
        {/* Left side - Branding (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 p-12 flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Dev Kit for AI
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Build and ship AI-powered SaaS applications fast with
              production-ready foundations.
            </p>
          </div>

          <div className="text-sm text-white/70">
            © Dev Kit for AI. All rights reserved.
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="flex w-full flex-1 flex-col items-center justify-center bg-background p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <div className="space-y-6">{children}</div>
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground hover:underline transition-colors"
            >
              ← Back to Home
            </Link>
            <span>
              Need help?{" "}
              <a
                href="mailto:support@devkit4ai.com"
                className="text-primary hover:underline"
              >
                support@devkit4ai.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
