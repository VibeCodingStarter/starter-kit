"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Github,
  CheckCircle,
  Code2,
  Sparkles,
  Play,
  Terminal
} from "lucide-react";
import Link from "next/link";

export default function LocalOnboardingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              <Terminal className="w-4 h-4 mr-2" />
              You&apos;re Running Locally!
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dev Kit for AI
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your <strong>free, open-source</strong> AI application starter is
              running! This local environment is connected to cloud services and
              ready for development.
            </p>
          </div>

          {/* Status indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-green-700 dark:text-green-400">
                  Local Setup Complete
                </div>
                <div className="text-sm text-green-600 dark:text-green-300">
                  Next.js app running
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-blue-700 dark:text-blue-400">
                  Cloud Connected
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-300">
                  Backend & Admin ready
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <Code2 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="font-semibold text-purple-700 dark:text-purple-400">
                  AI Ready
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-300">
                  Integrations available
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎉 What&apos;s Next?
            </h2>

            {/* Featured CTA - Setup Checklist */}
            <div className="max-w-2xl mx-auto mb-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-white mb-1">
                        Start Your Setup Journey
                      </h3>
                      <p className="text-white/90 text-sm">
                        Follow our interactive checklist to customize your app
                        in minutes. Track your progress and get it done!
                      </p>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="flex-shrink-0 font-semibold shadow-lg"
                    >
                      <Link href="/checklist">
                        Go to Checklist
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <Button
                asChild
                variant="default"
                size="lg"
                className="h-auto p-4 flex-col"
              >
                <Link href="#setup-guide">
                  <Terminal className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Configure</span>
                  <span className="text-xs opacity-80">Set up services</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto p-4 flex-col"
              >
                <Link href="#features">
                  <Play className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Preview</span>
                  <span className="text-xs opacity-80">See features</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto p-4 flex-col"
              >
                <Link href="/example-pages">
                  <Code2 className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Examples</span>
                  <span className="text-xs opacity-80">View demos</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto p-4 flex-col"
              >
                <Link href="https://docs.devkit4ai.com/" target="_blank">
                  <Github className="w-6 h-6 mb-2" />
                  <span className="font-semibold">Docs</span>
                  <span className="text-xs opacity-80">Learn more</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              💡 <strong>First time here?</strong> Follow the setup guide below
              to configure your environment
            </p>
            <Button asChild className="animate-pulse">
              <Link href="#setup-guide">
                Get Started with Setup
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
