"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Terminal,
  CheckCircle,
  ArrowRight,
  FileCode,
  Settings,
  Folder,
} from "lucide-react";
import Link from "next/link";

export default function LocalQuickStart() {
  const nextSteps = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Customize Your App",
      description: "Update branding, colors, and content in the checklist",
      action: "Open Checklist",
      href: "/checklist",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Folder className="w-6 h-6" />,
      title: "Explore Examples",
      description: "Browse pre-built components and use case demos",
      action: "View Examples",
      href: "/example-pages",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FileCode className="w-6 h-6" />,
      title: "Read the Docs",
      description: "Learn about architecture, API, and deployment",
      action: "Documentation",
      href: "https://docs.devkit4ai.com",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const localTips = [
    {
      title: "Hot Reload Active",
      description: "Changes to your code will automatically refresh the page",
    },
    {
      title: "Cloud Services Connected",
      description: "Authentication and AI features work out of the box",
    },
    {
      title: "TypeScript Enabled",
      description: "Full type safety and IntelliSense in your editor",
    },
    {
      title: "Ready to Deploy",
      description: "Push to Vercel, Railway, or any Node.js host",
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-white dark:bg-[#0A0A0F] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-blue-500/5" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What to do next
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your local environment is ready. Here&apos;s how to make it your
            own.
          </p>
        </div>

        {/* Main actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {nextSteps.map((step, index) => (
            <Card
              key={index}
              className="group border-0 bg-gray-50 dark:bg-white/5 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-green-500/10 transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white`}
                >
                  {step.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600"
                >
                  <Link
                    href={step.href}
                    target={step.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {step.action}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Local development features */}
        <Card className="border-0 bg-gray-900 dark:bg-white/5 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-white">
                Your Local Development Environment
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {localTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white mb-1">
                      {tip.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {tip.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                Running on{" "}
                <span className="text-white font-mono">localhost:3004</span> •
                Press <span className="text-white font-mono">Ctrl+C</span> in
                terminal to stop
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
