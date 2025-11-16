"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Image as ImageIcon, 
  MessageSquare, 
  Users,
  BarChart3,
  Shield,
  Database,
  ArrowRight,
  Eye,
  Play,
  CheckCircle,
  Palette,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function FeaturePreview() {
  const features = [
    {
      category: "AI Features",
      icon: <Zap className="w-6 h-6" />,
      items: [
        {
          title: "AI Image Generation",
          description:
            "Create and modify images using DALL-E, Stable Diffusion, and other AI models",
          demo: "/example-pages/use-cases/image-generation",
          status: "Ready",
          icon: <ImageIcon className="w-5 h-5" />,
        },
        {
          title: "AI Chat Assistant",
          description:
            "Interactive chat interface with GPT-4 and context-aware responses",
          demo: "/example-pages/landing-pages/ai-assistant",
          status: "Ready",
          icon: <MessageSquare className="w-5 h-5" />,
        },
      ],
    },
    {
      category: "User Management",
      icon: <Users className="w-6 h-6" />,
      items: [
        {
          title: "Authentication System",
          description:
            "Complete auth with email/password, social logins, and user profiles",
          demo: "/login",
          status: "Ready",
          icon: <Shield className="w-5 h-5" />,
        },
        {
          title: "User Dashboard",
          description:
            "Personal dashboard for managing projects, files, and account settings",
          demo: "/dashboard",
          status: "Ready",
          icon: <BarChart3 className="w-5 h-5" />,
        },
      ],
    },
    {
      category: "Development Tools",
      icon: <Palette className="w-6 h-6" />,
      items: [
        {
          title: "UI Components Library",
          description:
            "50+ shadcn/ui components with dark mode and responsive design",
          demo: "/example-pages/components",
          status: "Ready",
          icon: <Palette className="w-5 h-5" />,
        },
        {
          title: "Database Integration",
          description: "PostgreSQL database with migrations and event sourcing",
          demo: "/example-pages/database",
          status: "Ready",
          icon: <Database className="w-5 h-5" />,
        },
      ],
    },
  ];

  const useCases = [
    {
      title: "AI Image Editor",
      description: "Build Canva-like editor with AI-powered image generation and editing",
      image: "/placeholder-image-editor.jpg",
      tags: ["DALL-E", "Stable Diffusion", "Image Upload", "Gallery"],
      difficulty: "Intermediate"
    },
    {
      title: "AI Writing Assistant",
      description: "Create document editor with AI writing suggestions and grammar checking",
      image: "/placeholder-writing.jpg",
      tags: ["GPT-4", "Text Editor", "Suggestions", "Export"],
      difficulty: "Beginner"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Build business intelligence dashboard with AI-powered insights",
      image: "/placeholder-analytics.jpg",
      tags: ["Charts", "AI Insights", "Real-time", "Exports"],
      difficulty: "Advanced"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Feature Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore What&apos;s Built-In
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your local environment includes all these features ready to use. 
            Click any demo to see them in action or examine the code.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="space-y-12 mb-20">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={feature.demo}>
                            <Play className="w-4 h-4 mr-2" />
                            Try Demo
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="px-3">
                          <Link href={feature.demo}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Use Case Examples */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What You Can Build
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-world application examples using the included features and components.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="overflow-hidden bg-white dark:bg-gray-900 group hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {index === 0 ? <ImageIcon /> : index === 1 ? <MessageSquare /> : <BarChart3 />}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">
                      {useCase.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {useCase.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Start Building Your AI App Today</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                All features are pre-built and ready to customize. Follow the examples or create something entirely new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/example-pages">
                    Browse All Examples
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="https://github.com/VibeCodingStarter/starter-kit#examples" target="_blank">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View Source Code
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
