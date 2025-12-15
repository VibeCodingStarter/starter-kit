"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Zap, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useDeploymentMode } from "@/lib/auth-context";

export default function StarterHero() {
  const deploymentMode = useDeploymentMode();
  const isLocal = deploymentMode.mode === "project";
  const getStartedLink = isLocal ? "/dashboard" : "/console";
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
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Starter Kit & Cloud Connected
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">
                Ship your startup
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                In minutes, not months
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong>Free, open-source</strong> starter template with pre-connected Cloud Backend and Cloud Admin.
              Everything you need to launch your AI-powered SaaS, plus scaling and self-hosting options available.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span>Free Starter & Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span>Cloud Backend Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Cloud Admin Included</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-4 h-auto">
              <Link href={getStartedLink}>
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 h-auto">
              <Link href="https://github.com/VibeCodingStarter/starter-kit" target="_blank">
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">FREE</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Forever</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">CLOUD</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">SCALE</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">On Demand</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
