"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  MessageSquare,
  BarChart3,
  FileText,
  Wand2,
  Brain,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function BuildAnything() {
  const useCases = [
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "AI Image Generator",
      description:
        "Create Midjourney-style apps with DALL-E and Stable Diffusion integration",
      tags: ["DALL-E", "Stable Diffusion", "Image Upload"],
      demo: "/example-pages/use-cases/image-generation",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chat Assistant",
      description:
        "Build ChatGPT-like interfaces with streaming responses and context",
      tags: ["GPT-4", "Claude", "Streaming"],
      demo: "/example-pages/landing-pages/ai-assistant",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Content Generator",
      description:
        "Create AI-powered writing tools for blogs, social media, and marketing",
      tags: ["GPT-4", "Templates", "Export"],
      demo: "/example-pages/landing-pages/ai-content",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description:
        "Build data visualization tools with AI-powered insights and reporting",
      tags: ["Charts", "Real-time", "AI Insights"],
      demo: "/example-pages/landing-pages/ai-analytics",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Design Assistant",
      description:
        "Create tools for designers with AI suggestions and automation",
      tags: ["UI/UX", "Automation", "Templates"],
      demo: "/example-pages",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Your Idea Here",
      description: "The stack is flexible—build whatever you can imagine",
      tags: ["Custom", "Scalable", "Production"],
      demo: "/dashboard",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Use Cases
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Build anything with AI
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From simple prototypes to complex SaaS platforms. See what&apos;s
            possible with the starter kit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group border-0 bg-white dark:bg-white/5 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center text-white`}
                >
                  {useCase.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs border-gray-300 dark:border-gray-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-gray-100 dark:group-hover:bg-white/10"
                >
                  <Link href={useCase.demo}>
                    View Example
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to build your own AI application?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/example-pages">
              Explore All Examples
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
