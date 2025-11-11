"use client";

import CategoryGrid, { CategoryItem } from "@/components/generic/category-grid";

export default function DevKitElements() {
  const exampleCategories: CategoryItem[] = [
    {
      title: "Use Cases",
      description:
        "Practical applications and examples of AI-powered features you can build with Dev Kit for AI.",
      path: "/example-pages/use-cases",
      icon: "💡",
      available: true,
    },
    {
      title: "Landing Pages",
      description: "Discover our landing page templates for various purposes",
      path: "/example-pages/landing-pages",
      icon: "🏞️",
      available: true,
    },
    {
      title: "Components",
      description:
        "Explore our collection of reusable components with usage examples and source code",
      path: "/example-pages/components",
      icon: "🧩",
      available: true,
    },
    {
      title: "Dashboard Templates",
      description:
        "Ready-to-use dashboard templates for your applications",
      path: "#",
      icon: "📊",
      available: false,
    },
    {
      title: "Form Examples",
      description:
        "Various form implementations with validation and submission handling",
      path: "#",
      icon: "📝",
      available: false,
    },
    {
      title: "Authentication Screens",
      description:
        "Login, registration, and other authentication UI examples",
      path: "#",
      icon: "🔐",
      available: false,
    },
    {
      title: "Topic-Specific Pages",
      description:
        "Explore our collection of topic-specific landing pages designed to help you get started quickly with various use cases.",
      path: "/example-pages/topic-specific-pages",
      icon: "📄",
      available: true,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built-in Dev Kit Elements
        </h2>
        <p className="text-center text-lg mb-8">
          Explore our collection of reusable components, landing pages, and use
          cases to kickstart your AI application development.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <CategoryGrid items={exampleCategories} />
      </div>
    </div>
  );
}