import LocalOnboardingHero from "@/components/starter/local-onboarding-hero";
import Features from "@/components/starter/features";
import BuildAnything from "@/components/starter/build-anything";
import LocalQuickStart from "@/components/starter/local-quick-start";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Local Onboarding Hero */}
      <LocalOnboardingHero />

      {/* Features Section */}
      <Features />

      {/* Build Anything Section */}
      <BuildAnything />

      {/* Local Quick Start Section */}
      <LocalQuickStart />
    </main>
  );
}
