"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield,
  Sparkles,
  Database,
  ChevronRight,
  ArrowRight,
  PlayCircle,
  Settings,
  FileText,
  Rocket,
  ExternalLink,
  CheckCircle2,
  Circle,
  Copy,
  Check,
} from "lucide-react";

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load checked items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devkit-checklist");
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save checked items to localStorage
  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
    localStorage.setItem(
      "devkit-checklist",
      JSON.stringify(Array.from(newChecked))
    );
  };

  const copyToClipboard = async (text: string, code: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const checklistItems = [
    {
      id: "metadata",
      title: "Update app metadata",
      description: "Customize your app title, description, and SEO settings",
      file: "app/layout.tsx",
      priority: "high",
      code: `export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description"
}`,
    },
    {
      id: "homepage",
      title: "Customize the homepage",
      description: "Edit the main landing page to match your brand",
      file: "app/page.tsx",
      priority: "high",
    },
    {
      id: "config",
      title: "Configure app settings",
      description: "Update app name, logo, navigation, and footer links",
      file: "config/app.config.ts",
      priority: "high",
      code: `export const appConfig = {
  name: "Your App Name",
  title: "Your Title"
}`,
    },
    {
      id: "env",
      title: "Set up environment variables",
      description: "Configure API keys for AI providers and backend",
      file: ".env",
      priority: "high",
      code: `NEXT_PUBLIC_API_URL=https://api.vibecoding.ad
DEVKIT4AI_DEVELOPER_KEY=your_developer_key
DEVKIT4AI_PROJECT_ID=your_project_id
DEVKIT4AI_PROJECT_KEY=your_project_key`,
    },
    {
      id: "auth",
      title: "Configure authentication",
      description: "Backend JWT authentication is already set up",
      file: "lib/auth-server.ts",
      priority: "medium",
    },
    {
      id: "storage",
      title: "Set up file storage",
      description: "Configure S3 or compatible storage for uploads",
      file: ".env",
      priority: "medium",
      code: `AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket
AWS_REGION=us-east-1`,
    },
    {
      id: "icons",
      title: "Update favicon and app icons",
      description: "Replace default icons with your brand assets",
      file: "public/",
      priority: "low",
    },
    {
      id: "colors",
      title: "Customize theme colors",
      description: "Update color scheme in Tailwind config",
      file: "tailwind.config.ts",
      priority: "low",
    },
  ];

  const completionPercentage = Math.round(
    (checkedItems.size / checklistItems.length) * 100
  );

  const configurationCards = [
    {
      title: "Authentication Setup",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      status: "Built-in JWT authentication",
      description:
        "Backend JWT authentication is already configured and ready to use",
      action: "View Documentation",
      link: "https://docs.devkit4ai.com/starter-kit/auth",
      steps: [
        "Authentication is built-in with JWT",
        "Register via /api/v1/auth/register",
        "Login and get access tokens",
      ],
    },
    {
      title: "AI Integrations",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      status: "Required for AI features",
      description: "Add your AI provider API keys to enable AI functionality",
      action: "Configure AI APIs",
      link: "/example-pages/use-cases/image-generation",
      steps: [
        "Get OpenAI API key",
        "Get Replicate API token",
        "Add keys to .env file",
        "Test image generation",
      ],
    },
    {
      title: "File Storage",
      icon: <Database className="w-6 h-6 text-green-600" />,
      status: "Optional but recommended",
      description: "Setup S3-compatible storage for file uploads",
      action: "Configure Storage",
      link: "https://docs.devkit4ai.com/starter-kit/deployment",
      steps: [
        "Create AWS S3 bucket or MinIO instance",
        "Configure storage credentials in .env",
        "Test file upload functionality",
      ],
    },
  ];

  const quickActions = [
    {
      title: "View Live Examples",
      description: "Explore working AI features and UI components",
      link: "/example-pages",
      icon: <PlayCircle className="w-5 h-5" />,
      color:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
    },
    {
      title: "User Dashboard",
      description: "See the authenticated user experience",
      link: "/dashboard",
      icon: <Settings className="w-5 h-5" />,
      color:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    },
    {
      title: "Documentation",
      description: "Read setup guides and API documentation",
      link: "https://docs.devkit4ai.com/starter-kit",
      icon: <FileText className="w-5 h-5" />,
      color:
        "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
      external: true,
    },
    {
      title: "Deploy to Production",
      description: "Deploy your application to Vercel or other platforms",
      link: "https://vercel.com/new",
      icon: <Rocket className="w-5 h-5" />,
      color:
        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Page Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Setup & Customization Guide
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track your Dev Kit for AI setup and customization progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Bar */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Setup Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {checkedItems.size} of {checklistItems.length} tasks
                      completed
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {completionPercentage}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                {completionPercentage === 100 && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      🎉 All done! Your app is ready to deploy!
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customization Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 text-lg">
                      ✓
                    </span>
                  </span>
                  Customization Checklist
                </h3>
                {checkedItems.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCheckedItems(new Set());
                      localStorage.removeItem("devkit-checklist");
                    }}
                    className="text-xs"
                  >
                    Reset All
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {checklistItems.map((item, index) => {
                  const isChecked = checkedItems.has(index);
                  const getPriorityColor = () => {
                    switch (item.priority) {
                      case "high":
                        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
                      case "medium":
                        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
                      case "low":
                        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
                      default:
                        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
                    }
                  };

                  return (
                    <div
                      key={index}
                      className={`group p-4 rounded-lg border-2 transition-all ${
                        isChecked
                          ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                          : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <button
                          onClick={() => toggleItem(index)}
                          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
                          }`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`font-semibold ${
                                isChecked
                                  ? "text-green-700 dark:text-green-300 line-through"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-0 ${getPriorityColor()}`}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                              {item.file}
                            </code>
                            {item.code && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(item.code!, item.id)
                                }
                                className="h-6 text-xs px-2"
                              >
                                {copiedCode === item.id ? (
                                  <>
                                    <Check className="w-3 h-3 mr-1" />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy code
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configuration Cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400 text-sm">
                    ⚙️
                  </span>
                </span>
                Configuration Guides
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Step-by-step guides for key integrations and features
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {configurationCards.map((card, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all hover:scale-[1.02] duration-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                          {card.icon}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {card.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {card.description}
                      </p>
                      <div className="space-y-1.5 mb-3">
                        {card.steps.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="flex items-start text-xs text-gray-500 dark:text-gray-400"
                          >
                            <ChevronRight className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0 text-blue-500" />
                            <span className="flex-1">{step}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full group"
                      >
                        <Link
                          href={card.link}
                          target={
                            card.link.startsWith("http") ? "_blank" : undefined
                          }
                        >
                          {card.action}
                          <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Customization Guide */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    💡
                  </span>
                </span>
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-blue-700 dark:text-blue-400">
                      Start with high priority items
                    </strong>{" "}
                    - These are essential for your app to work properly
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-purple-700 dark:text-purple-400">
                      Click on tasks to mark them complete
                    </strong>{" "}
                    - Your progress is automatically saved
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong className="text-green-700 dark:text-green-400">
                      Use the copy button
                    </strong>{" "}
                    - Quick copy code snippets to get started faster
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Demos */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    ✨
                  </span>
                </span>
                Dev Kit for AI Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    AI Integration
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Ready for Replicate, OpenAI &amp; more
                  </p>
                  <div className="w-full h-8 bg-gradient-to-r from-purple-200 to-blue-300 dark:from-purple-600 dark:to-blue-700 rounded"></div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Authentication
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Backend JWT Auth built-in
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-8 h-8 bg-green-200 dark:bg-green-700 rounded"></div>
                    <div className="w-6 h-8 bg-green-300 dark:bg-green-600 rounded"></div>
                    <div className="w-4 h-8 bg-green-400 dark:bg-green-500 rounded"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    File Storage
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    S3 compatible storage
                  </p>
                  <code className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    AWS S3 | MinIO
                  </code>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Database
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    PostgreSQL with SQLAlchemy
                  </p>
                  <code className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    Alembic migrations
                  </code>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-600 dark:text-orange-400 text-sm">
                    ⚡
                  </span>
                </span>
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="outline"
                    className={`h-auto p-4 flex-col items-start text-left hover:shadow-md transition-all hover:scale-[1.02] ${action.color}`}
                  >
                    <Link
                      href={action.link}
                      {...(action.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      <div className="flex items-center w-full mb-2">
                        {action.icon}
                        <span className="font-semibold ml-2 text-sm">
                          {action.title}
                        </span>
                        {action.external && (
                          <ExternalLink className="w-3 h-3 ml-auto" />
                        )}
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed">
                        {action.description}
                      </p>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Project Info
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Frontend
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Next.js 15.5.2
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Backend
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    FastAPI + Python
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Database
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    PostgreSQL
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Styling
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Tailwind CSS v4
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    AI Providers
                  </span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Replicate, OpenAI
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <div className="space-y-2">
                <a
                  href="https://docs.devkit4ai.com/starter-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  📖 Dev Kit Documentation
                </a>
                <a
                  href="/dashboard"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  🎨 Dashboard Demo
                </a>
                <a
                  href="/example-pages"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  🧩 Example Pages
                </a>
                <a
                  href="https://github.com/VibeCodingStarter/starter-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  🚀 GitHub Repository
                </a>
                <a
                  href="https://vibecoding.ad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  🌐 VibeCoding.ad
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
