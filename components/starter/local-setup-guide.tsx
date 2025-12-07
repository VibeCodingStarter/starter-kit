"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Terminal,
  CheckCircle,
  Copy,
  ExternalLink,
  AlertCircle,
  Database,
  Cloud,
  Settings,
  ArrowRight,
  Zap
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LocalSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const copyToClipboard = async (text: string, stepId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepId);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const setupSteps = [
    {
      id: "env",
      title: "Environment Setup",
      description: "Configure your local environment variables",
      required: true,
      commands: [
        "cp .env.example .env.local",
        "# Edit .env.local with your configuration",
      ],
      details:
        "Copy the example environment file and configure it with your API keys and database connections.",
    },
    {
      id: "backend",
      title: "Backend API",
      description: "Set up backend authentication and database",
      required: true,
      commands: [
        "# Configure backend API URL in .env.local:",
        "NEXT_PUBLIC_API_URL=http://localhost:8000",
      ],
      details:
        "Connect to the backend API for authentication and database services.",
    },
    {
      id: "ai",
      title: "AI Service Keys",
      description: "Configure AI providers (OpenAI, Replicate, etc.)",
      required: false,
      commands: [
        "# Add to .env.local:",
        "OPENAI_API_KEY=your_openai_key_here",
        "REPLICATE_API_TOKEN=your_replicate_token_here",
      ],
      details:
        "Add your AI provider API keys to enable image generation and other AI features.",
    },
    {
      id: "storage",
      title: "File Storage (Optional)",
      description: "Configure S3 or MinIO for file uploads",
      required: false,
      commands: [
        "# For AWS S3:",
        "AWS_ACCESS_KEY_ID=your_access_key",
        "AWS_SECRET_ACCESS_KEY=your_secret_key",
        "AWS_REGION=your_region",
        "AWS_S3_BUCKET=your_bucket_name",
      ],
      details: "Set up file storage for user uploads and generated content.",
    },
  ];

  const serviceCards = [
    {
      title: "Backend API",
      description: "Authentication & Database",
      icon: <Database className="w-6 h-6" />,
      link: "http://localhost:8000",
      setup: "Start backend → Configure NEXT_PUBLIC_API_URL in .env.local",
      free: true,
    },
    {
      title: "OpenAI",
      description: "GPT & DALL-E API",
      icon: <Zap className="w-6 h-6" />,
      link: "https://platform.openai.com",
      setup: "Get API key → Add OPENAI_API_KEY to .env.local",
      free: false,
    },
    {
      title: "Replicate",
      description: "Open-source AI models",
      icon: <Cloud className="w-6 h-6" />,
      link: "https://replicate.com",
      setup: "Get token → Add REPLICATE_API_TOKEN to .env.local",
      free: "Credits included",
    },
  ];

  return (
    <section id="setup-guide" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Settings className="w-4 h-4 mr-2" />
            Local Setup Guide
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Configure Your Development Environment
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get your local Dev Kit for AI fully functional with these one-time
            setup steps. Most services offer <strong>free tiers</strong> perfect
            for development.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Status Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Setup Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {setupSteps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`text-sm ${
                        step.required ? "font-semibold" : ""
                      }`}
                    >
                      {step.title}
                    </span>
                    <Badge
                      variant={step.required ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {step.required ? "Required" : "Optional"}
                    </Badge>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-semibold text-blue-700 dark:text-blue-400">
                          Quick Start
                        </div>
                        <div className="text-blue-600 dark:text-blue-300">
                          You can skip optional steps and add them later as
                          needed.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Setup Steps */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="env" className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-8">
                {setupSteps.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    className="text-xs"
                  >
                    {step.title.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {setupSteps.map((step) => (
                <TabsContent key={step.id} value={step.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{step.title}</span>
                        <Badge
                          variant={step.required ? "destructive" : "secondary"}
                        >
                          {step.required ? "Required" : "Optional"}
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        {step.commands.map((command, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between mb-2 last:mb-0"
                          >
                            <code className="flex-1 text-sm font-mono">
                              {command}
                            </code>
                            {!command.startsWith("#") && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(
                                    command,
                                    `${step.id}-${index}`
                                  )
                                }
                                className="ml-2 h-8 w-8 p-0"
                              >
                                {copiedStep === `${step.id}-${index}` ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Service Provider Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Required Services
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {serviceCards.map((service, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-3">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{service.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        service.free === true
                          ? "secondary"
                          : service.free === false
                          ? "outline"
                          : "default"
                      }
                      className="text-xs"
                    >
                      {service.free === true
                        ? "Free"
                        : service.free === false
                        ? "Paid"
                        : service.free}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {service.setup}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={service.link} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Sign up
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Customize? 🚀
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Environment configured? Great! Now follow our interactive
                checklist to customize your app and make it your own.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/checklist">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Customization Checklist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/example-pages">
                    <Terminal className="w-4 h-4 mr-2" />
                    View Examples
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
