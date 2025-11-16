"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Globe, 
  Shield, 
  Cloud, 
  Zap, 
  Brain,
  Server,
  Palette,
  Code
} from "lucide-react";

export default function TechStack() {
  const stackCategories = [
    {
      title: "Frontend",
      icon: <Palette className="w-6 h-6" />,
      color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
      technologies: [
        { name: "Next.js 14", description: "React framework with App Router" },
        { name: "TypeScript", description: "Type-safe development" },
        { name: "Tailwind CSS", description: "Utility-first styling" },
        { name: "shadcn/ui", description: "Beautiful components" },
      ],
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      color:
        "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
      technologies: [
        { name: "FastAPI", description: "High-performance Python API" },
        { name: "Pydantic", description: "Data validation" },
        { name: "SQLAlchemy", description: "Database ORM" },
        { name: "Alembic", description: "Database migrations" },
      ],
    },
    {
      title: "AI & ML",
      icon: <Brain className="w-6 h-6" />,
      color:
        "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
      technologies: [
        { name: "OpenAI", description: "GPT models integration" },
        { name: "Replicate", description: "AI model hosting" },
        { name: "Anthropic", description: "Claude AI models" },
        {
          name: "Image Generation",
          description: "DALL-E, Midjourney, Stable Diffusion",
        },
      ],
    },
    {
      title: "Infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      color:
        "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
      technologies: [
        { name: "PostgreSQL", description: "Database & Event Store" },
        { name: "AWS S3", description: "File storage" },
        { name: "Docker", description: "Containerization" },
        { name: "Vercel", description: "Frontend deployment" },
      ],
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Code className="w-4 h-4 mr-2" />
            Technology Stack
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Production-Ready Architecture
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built with modern, battle-tested technologies that scale from prototype to production.
            Every component is carefully selected for performance, developer experience, and maintainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stackCategories.map((category, index) => (
            <Card key={index} className={`${category.color} transition-all duration-300 hover:scale-105`}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-lg font-semibold ml-2">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="space-y-1">
                      <div className="font-medium text-sm">{tech.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{tech.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized for performance with edge computing, caching, and modern build tools.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built-in authentication, authorization, and security best practices from day one.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Global Scale</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ready for worldwide deployment with CDN, edge functions, and multi-region support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
