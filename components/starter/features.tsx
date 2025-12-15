"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Code2,
  Rocket,
  Shield,
  Database,
  Palette,
  Zap,
  Lock,
  Cloud,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered",
      description:
        "Built-in integrations with OpenAI, Replicate, and Anthropic. Generate images, chat, and more.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Modern Stack",
      description:
        "Next.js 15, React 19, TypeScript, and Tailwind CSS. Built with the latest technologies.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Auth Ready",
      description:
        "Complete authentication system with JWT, role-based access control, and session management.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Backend",
      description:
        "Pre-connected to hosted API. No backend setup required—just start building.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Included",
      description:
        "PostgreSQL with event sourcing and migrations. Production-ready data layer.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "50+ Components",
      description:
        "shadcn/ui library with dark mode. Beautiful, accessible, and customizable.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Type-Safe",
      description:
        "Full TypeScript support with strict mode. Catch errors before they ship.",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Deploy Anywhere",
      description:
        "Vercel, Railway, AWS, or self-host. Built for flexibility and scale.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Developer Experience",
      description:
        "Hot reload, TypeScript intellisense, and comprehensive documentation.",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white dark:bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to ship fast
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Production-ready features and integrations. No more
            boilerplate—start building your product immediately.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-6 space-y-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
