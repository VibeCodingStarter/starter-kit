"use client";

import React from "react";
import {
  Gift,
  Link,
  Zap,
  Star,
  Gem,
  Target,
  Check,
  Server,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeploymentMode } from "@/lib/auth-context";

export default function PricingModel() {
  const router = useRouter();
  const deploymentMode = useDeploymentMode();

  const handleFreeStarterCta = React.useCallback(() => {
    const targetPath =
      deploymentMode.mode === "project" ? "/dashboard" : "/console";
    router.push(targetPath);
  }, [deploymentMode.mode, router]);

  interface PricingPlan {
    name: string;
    price: string;
    originalPrice?: string;
    period: string;
    description: string;
    badge: string;
    badgeColor: string;
    features: string[];
    ctaText: string;
    ctaAction: () => void;
    comingSoon?: boolean;
    icon: React.ReactNode;
  }

  const mainPlans: PricingPlan[] = [
    {
      name: "Free Starter",
      price: "$0",
      period: "Forever",
      description: "Perfect for individual developers and small projects",
      badge: "Learn & Build",
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      features: [
        "Build. Ship. Iterate. For free",
        "Open-source user application",
        "Next.js + TypeScript + Tailwind CSS",
        "Pre-built components and utilities",
        "Complete frontend starter templates",
        "Community support",
        "Production-ready setup",
        "Documentation included",
        "Starter access to Cloud API",
        "Starter access to Admin Panel",
        "AI-workers for free",
        "Storage for image and video",
      ],
      ctaText: "Get Started Free",
      ctaAction: handleFreeStarterCta,
      icon: <Gift className="w-8 h-8" />,
    },
    {
      name: "Cloud Starter",
      price: "$19",
      originalPrice: "$29",
      period: "per month",
      description: "Add backend power with larger limits and advanced features",
      badge: "Scale Up",
      badgeColor:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      features: [
        "Everything in the free plan",
        "Larger API limits",
        "Larger file storage capabilities",
        "Support multiple simultaneous projects",
        "AI-image generation workflows",
        "AI-video generation workflows",
        "Advanced analytics dashboard",
        "Automated backups",
        "Email notifications",
        "API rate limiting controls",
        "Bring your own AI keys",
        "Priority support",
      ],
      ctaText: "Get Lifetime Deal",
      ctaAction: () =>
        (window.location.href =
          "https://buy.stripe.com/7sYdRag9obyw10qeY6cs801"),
      icon: <Link className="w-8 h-8" />,
    },
    {
      name: "Cloud Premium",
      price: "$99",
      period: "per month",
      description:
        "Complete platform for teams with unlimited access and advanced features",
      badge: "Go Pro",
      badgeColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      features: [
        "Everything in Cloud Starter plan",
        "Designed for teams and larger projects",
        "Advanced AI model access",
        "Unlimited simultaneous projects support",
        "Largest API limits",
        "Largest file storage capabilities",
        "Custom integrations support",
        "Advanced user management",
        "Multi-environment deployments",
        "Performance monitoring",
        "Webhooks for real-time notifications",
        "Custom feature requests",
      ],
      ctaText: "Coming Soon",
      ctaAction: () => {},
      comingSoon: true,
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  const selfHostedPlan = {
    name: "Self-Hosted",
    price: "$499",
    period: "per month",
    description:
      "Deploy on your own infrastructure with complete source code access. Coming in 2026 H2.",
    features: [
      "Complete backend API source code",
      "Complete admin panel source code",
      "Deploy the whole platform on your own infrastructure",
      "Full control over your environment and data",
      "Ideal for organizations with specific compliance or security requirements",
      "PostgreSQL database schema & migrations",
      "Docker deployment configurations",
      "AWS/Railway/Render deployment guides",
      "Self-hosting documentation",
      "Unlimited projects on your infrastructure",
      "1-year of updates included",
      "Priority email & video support",
    ],
    ctaText: "Coming in 2026 H2",
    ctaAction: () => {},
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium">
            <Gem className="w-4 h-4" />
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Start Free, Scale When Ready
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Begin with our free open-source starters. Add backend power and
            admin capabilities as you grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {mainPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col h-full p-8 bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                index === 0
                  ? "border-green-500 shadow-lg shadow-green-500/20"
                  : index === 1
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-blue-500 shadow-lg shadow-blue-500/20"
              }`}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 shadow-md ${plan.badgeColor}`}
                >
                  <Star className="w-4 h-4" />
                  {plan.badge}
                </div>
              </div>

              <div className="text-center mb-8">
                <div
                  className={`mb-4 flex justify-center ${
                    index === 0
                      ? "text-green-600 dark:text-green-400"
                      : index === 1
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <div>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through mr-3">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span
                      className={`text-4xl font-bold ${
                        index === 0
                          ? "text-green-600 dark:text-green-400"
                          : index === 1
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      / {plan.period}
                    </span>
                  </div>
                </div>
                {index === 1 && plan.originalPrice && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
                      🔥 Early Access Deal
                    </span>
                  </div>
                )}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check
                      className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${
                        index === 0
                          ? "text-green-500"
                          : index === 1
                          ? "text-purple-500"
                          : "text-blue-500"
                      }`}
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                {plan.comingSoon ? (
                  <div className="w-full py-4 px-6 rounded-xl font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {plan.ctaText}
                  </div>
                ) : (
                  <button
                    onClick={plan.ctaAction}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg transform ${
                      index === 0
                        ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-500/25"
                        : index === 1
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/25"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/25"
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-full text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Enterprise Solution
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Self-Hosted Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              For organizations that need complete control, compliance, and
              security. Deploy the entire platform on your own infrastructure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-3xl border-2 border-orange-200 dark:border-orange-700 p-8 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selfHostedPlan.name}
                </h4>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-orange-600 dark:text-orange-400">
                    {selfHostedPlan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2 text-lg">
                    / {selfHostedPlan.period}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-8">
                  {selfHostedPlan.description}
                </p>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold cursor-not-allowed opacity-70">
                  <Server className="w-5 h-5" />
                  {selfHostedPlan.ctaText}
                </button>
              </div>

              <div>
                <ul className="space-y-3">
                  {selfHostedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-orange-500" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
            <Target className="w-5 h-5" />
            Why This Approach?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2 text-green-600 flex items-center gap-1">
                <Gift className="w-4 h-4" />
                Start Free
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get full frontend source code and templates. Perfect for
                learning and small projects.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-600 flex items-center gap-1">
                <Link className="w-4 h-4" />
                Add Backend
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Skip backend setup complexity. Use our hosted API when you need
                server-side features.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-600 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Full Platform
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete solution with admin panel. Perfect for teams and
                production applications.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need enterprise deployment? Check out our{" "}
              <span className="text-orange-600 font-medium">
                Self-Hosted solution
              </span>{" "}
              above for complete control and compliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
