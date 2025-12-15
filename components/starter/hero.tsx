"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useDeploymentMode } from "@/lib/auth-context";

export default function Hero() {
  const deploymentMode = useDeploymentMode();
  const isLocal = deploymentMode.mode === "project";
  const getStartedLink = isLocal ? "/dashboard" : "/console";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main content */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-white mb-2">Build AI apps</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              at the speed of thought
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A complete Next.js starter with AI integrations, authentication, and
            cloud backend. Ship your MVP in hours, not weeks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-medium px-8 h-12"
            >
              <Link href={getStartedLink}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gray-700 text-white hover:bg-white/10 font-medium px-8 h-12"
            >
              <Link href="https://docs.devkit4ai.com" target="_blank">
                Documentation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">STARTER</div>
              <Link
                href="https://github.com/VibeCodingStarter/starter-kit"
                target="_blank"
                className="text-gray-500 hover:text-gray-400 transition-all flex items-center justify-center gap-1 group"
              >
                Free
                <Github className="w-3 h-3 animate-pulse group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">CLOUD</div>
              <div className="text-gray-500">Connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">SCALE</div>
              <div className="text-gray-500">On Demand</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0A0A0F] to-transparent" />
    </section>
  );
}
