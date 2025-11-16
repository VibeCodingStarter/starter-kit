"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Shield, 
  Database, 
  Settings, 
  ChevronRight,
  Eye,
  Download,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useDeploymentMode } from "@/lib/auth-context";

export default function BuiltInFeatures() {
  const deploymentMode = useDeploymentMode();
  const isLocal = deploymentMode.mode === "project";
  const getStartedLink = isLocal ? "/dashboard" : "/console";
  const downloadLink = isLocal 
    ? "https://github.com/VibeCodingStarter/starter-kit/archive/main.zip" 
    : "https://docs.devkit4ai.com/quickstart";
  const downloadText = isLocal ? "Download Starter" : "Quickstart Guide";
  const featureCategories = [
    {
      title: "Open-source Frontend (Free)",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      features: [
        {
          name: "Complete Source Code",
          description: "Full Next.js frontend with TypeScript, open source on GitHub",
          demo: "https://github.com/VibeCodingStarter/starter-kit",
          status: "free"
        },
        {
          name: "Connected to Cloud Backend",
          description: "Pre-configured to use our hosted API (free tier included)",
          demo: "/example-pages/use-cases/image-generation",
          status: "free"
        },
        {
          name: "Connected to Cloud Admin",
          description: "Built-in admin panel access through our cloud service (free tier)",
          demo: "/dashboard",
          status: "free"
        }
      ]
    },
    {
      title: "Cloud+ Scaling",
      icon: <Database className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        {
          name: "Multiple Projects",
          description: "Up to 3 projects with enhanced Cloud Backend and Admin access",
          demo: "#",
          status: "cloud"
        },
        {
          name: "Higher API Limits",
          description: "Increased rate limits, storage, and processing capabilities",
          demo: "#",
          status: "cloud"
        },
        {
          name: "Extra Credits Available",
          description: "Purchase additional credits and extend project limits as needed",
          demo: "#",
          status: "cloud"
        }
      ]
    },
    {
      title: "Self-Hosting Package",
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: [
        {
          name: "Backend Source Code",
          description: "Complete FastAPI backend with all endpoints and AI integrations",
          demo: "#",
          status: "purchase"
        },
        {
          name: "Admin Source Code",
          description: "Full admin panel source code for complete customization",
          demo: "#",
          status: "purchase"
        },
        {
          name: "Deployment Configs",
          description: "Docker, AWS, Railway deployment guides and configurations",
          demo: "#",
          status: "purchase"
        }
      ]
    },
    {
      title: "AI & UI Components (All Plans)",
      icon: <Settings className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      features: [
        {
          name: "AI Integrations",
          description: "OpenAI, Replicate, Claude - ready to use across all plans",
          demo: "/example-pages/use-cases/image-generation",
          status: "free"
        },
        {
          name: "shadcn/ui Components",
          description: "50+ pre-built, customizable UI components",
          demo: "/example-pages/components",
          status: "free"
        },
        {
          name: "Landing Page Templates",
          description: "Professional landing pages for various AI use cases",
          demo: "/example-pages/landing-pages",
          status: "free"
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "free":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">✨ Free</Badge>;
      case "cloud":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">☁️ Cloud+</Badge>;
      case "purchase":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">🏠 Self-Host</Badge>;
      case "ready":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ready</Badge>;
      case "template":
        return <Badge variant="outline">Template</Badge>;
      default:
        return <Badge variant="secondary">Coming Soon</Badge>;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Free Forever + Cloud Scaling + Self-Hosting
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need, Every Step of the Way
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start with our <strong>free open-source frontend</strong> connected to Cloud Backend and Admin. 
            Scale with Cloud+ for multiple projects, or go self-hosted for complete ownership.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featureCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mr-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{feature.name}</h4>
                          {getStatusBadge(feature.status)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                      {feature.demo !== "#" && (
                        <Button asChild variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                          <Link href={feature.demo}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Start Free, Scale Smart, Own Everything
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Begin with our <strong>free open-source frontend</strong> connected to cloud services. 
              Scale with Cloud+ for multiple projects, or go self-hosted for complete control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href={getStartedLink}>
                  Start Free Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={downloadLink} target={isLocal ? "_self" : "_blank"}>
                  <Download className="w-4 h-4 mr-2" />
                  {downloadText}
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Need scaling or self-hosting? <Link href="/#pricing" className="text-blue-600 hover:underline">View all pricing options</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
