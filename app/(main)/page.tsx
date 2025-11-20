import LocalOnboardingHero from "@/components/starter/local-onboarding-hero";
import LocalSetupGuide from "@/components/starter/local-setup-guide";
import FeaturePreview from "@/components/starter/feature-preview";
import TechStack from "@/components/starter/tech-stack";
import QuickStart from "@/components/starter/quick-start";
import DemoShowcase from "@/components/starter/demo-showcase";
import PricingModel from "@/components/starter/pricing-model";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Local Onboarding Hero */}
      <LocalOnboardingHero />

      {/* Local Setup Guide */}
      <LocalSetupGuide />

      {/* Feature Preview */}
      <FeaturePreview />

      {/* Quick Start Guide */}
      <QuickStart />

      {/* Demo Showcase */}
      <DemoShowcase />

      {/* Tech Stack Overview */}
      <TechStack />

      {/* Pricing Model */}
      <PricingModel />
    </main>
  );
}
