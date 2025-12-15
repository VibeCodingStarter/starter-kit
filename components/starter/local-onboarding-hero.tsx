"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Terminal,
  Play,
} from "lucide-react";
import Link from "next/link";

export default function LocalOnboardingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/30 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Badge with pulse animation */}
          <div className="flex justify-center">
            <Badge className="px-4 py-2 text-sm font-medium bg-green-500/20 text-green-300 border-green-500/30 animate-pulse">
              <Terminal className="w-4 h-4 mr-2" />
              Running locally on your machine
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-white mb-2">You&apos;re all set</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Start building now
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Your local development environment is ready. Connected to cloud
              services and AI integrations.
            </p>
          </div>

          {/* Status indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="font-semibold text-white">Local Dev Server</div>
                <div className="text-sm text-gray-400">localhost:3004</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="font-semibold text-white">Cloud Connected</div>
                <div className="text-sm text-gray-400">Backend & Admin</div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Play className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="font-semibold text-white">AI Ready</div>
                <div className="text-sm text-gray-400">Start building</div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-medium px-8 h-12"
            >
              <Link href="/checklist">
                Setup Checklist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-gray-700 text-white hover:bg-white/10 font-medium px-8 h-12"
            >
              <Link href="/example-pages">
                View Examples
                <Play className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Quick tip */}
          <div className="pt-8">
            <p className="text-gray-500 text-sm">
              💡 First time? Check the{" "}
              <Link href="/checklist" className="text-blue-400 hover:underline">
                setup checklist
              </Link>{" "}
              to customize your app
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0A0A0F] to-transparent" />
    </section>
  );
}
