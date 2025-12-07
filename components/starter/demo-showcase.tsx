"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  ExternalLink,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Palette,
  ArrowRight,
  Play
} from "lucide-react";
import Link from "next/link";

export default function DemoShowcase() {
  const demos = [
    {
      title: "AI Image Generation",
      description: "Upload reference images and generate new variations with AI. Features include multiple AI providers, public gallery, and user management.",
      image: "/placeholder-image-gen.jpg",
      features: ["OpenAI DALL-E", "Replicate Models", "Public Gallery", "User Accounts"],
      liveDemo: "/example-pages/use-cases/image-generation",
      category: "AI Feature",
      icon: <ImageIcon className="w-5 h-5" />
    },
    {
      title: "AI Assistant Chat",
      description: "Interactive chat interface with AI assistant. Includes conversation history, typing indicators, and contextual responses.",
      image: "/placeholder-chat.jpg",
      features: ["GPT-4 Integration", "Chat History", "Real-time UI", "Context Aware"],
      liveDemo: "/example-pages/landing-pages/ai-assistant",
      category: "Conversational AI",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Analytics Dashboard",
      description: "Data visualization and insights dashboard with AI-powered analytics. Features charts, metrics, and predictive analysis.",
      image: "/placeholder-analytics.jpg",
      features: ["Real-time Data", "AI Insights", "Custom Charts", "Export Options"],
      liveDemo: "/example-pages/landing-pages/ai-analytics",
      category: "Data & AI",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "Landing Page Templates",
      description: "Professional landing pages for AI products and services. Multiple layouts and conversion-optimized designs.",
      image: "/placeholder-landing.jpg",
      features: ["Responsive Design", "SEO Optimized", "Multiple Layouts", "CTA Components"],
      liveDemo: "/example-pages/landing-pages",
      category: "UI Templates",
      icon: <Palette className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Play className="w-4 h-4 mr-2" />
            Live Demos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore fully functional demos that showcase the capabilities of your AI application starter.
            Each demo is built with the same components and patterns you&apos;ll use in your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {demos.map((demo, index) => (
            <Card key={index} className="group overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-0">
                {/* Demo image/preview */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-6xl opacity-20">{demo.icon}</div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Button
                      asChild
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      variant="secondary"
                    >
                      <Link href={demo.liveDemo}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Demo
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {demo.category}
                    </Badge>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={demo.liveDemo}>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {demo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {demo.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Key Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {demo.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full" variant="outline">
                      <Link href={demo.liveDemo}>
                        Try Demo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional resources */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Browse our comprehensive collection of components, use cases, and implementation examples
              to understand the full potential of the Dev Kit for AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/example-pages">
                  Browse All Examples
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/example-pages/components">
                  <Palette className="w-4 h-4 mr-2" />
                  View Components
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
