"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Play,
  FileCode,
  CheckCircle,
  ArrowRight,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function QuickStart() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const quickStartSteps = [
    {
      title: "Clone Repository",
      description: "Get the starter template",
      command: "git clone https://github.com/VibeCodingStarter/starter-kit.git",
      action: "Copy",
    },
    {
      title: "Install Dependencies",
      description: "Set up the project",
      command: "cd starter-kit && npm install",
      action: "Copy",
    },
    {
      title: "Start Development",
      description: "Launch the dev server",
      command: "npm run dev",
      action: "Copy",
    },
  ];

  const copyToClipboard = async (text: string, stepIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const features = [
    {
      title: "Authentication Ready (Free)",
      description:
        "Backend JWT authentication with role-based access control and session management",
      status: "✨ included",
    },
    {
      title: "Cloud Backend Connected (Free)",
      description:
        "Pre-connected to our hosted Cloud Backend - no setup required, just start coding",
      status: "✨ included",
    },
    {
      title: "Cloud Admin Access (Free)",
      description:
        "Built-in Cloud Admin dashboard already connected and ready for management",
      status: "✨ included",
    },
    {
      title: "AI Integrations (Free)",
      description:
        "OpenAI, Replicate, and Anthropic integrations with image generation example",
      status: "✨ included",
    },
    {
      title: "Cloud+ Scaling Available",
      description:
        "Scale to multiple projects with enhanced limits and additional features",
      status: "☁️ upgrade",
    },
    {
      title: "Self-Hosting Available",
      description:
        "Want full control? Purchase complete backend and admin source code",
      status: "🏠 optional",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Free & Ready to Use
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            From Zero to AI App in 3 Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get your AI-powered application running locally in under 5 minutes.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-2">
            <strong>Free Starter Kit</strong> with Cloud Backend and Cloud Admin
            already connected and configured.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Quick start commands */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Terminal className="w-6 h-6 mr-2" />
              Getting Started
            </h3>

            {quickStartSteps.map((step, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-l-4 border-l-blue-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {index + 1}
                        </Badge>
                        <h4 className="font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm flex items-center justify-between">
                    <code className="flex-1">{step.command}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(step.command, index)}
                      className="ml-2 h-8 w-8 p-0"
                    >
                      {copiedStep === index ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-6">
              <Button asChild className="w-full sm:w-auto">
                <Link
                  href="https://docs.devkit4ai.com/quickstart"
                  target="_blank"
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  View Full Documentation
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* What&apos;s included */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              What&apos;s Included
            </h3>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`ml-4 ${
                          feature.status.includes("✨")
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900"
                            : feature.status.includes("☁️")
                            ? "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900"
                            : "text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900"
                        }`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {feature.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-6">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/example-pages">
                  Browse Examples
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
