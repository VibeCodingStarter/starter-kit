import PageHeader from "@/components/generic/page-header";
import CategoryGrid, { CategoryItem } from "@/components/generic/category-grid";
import Link from "next/link";

export default function LandingPagesPage() {
  const landingPageCategories: CategoryItem[] = [
    {
      title: "AI SaaS Product",
      description:
        "Modern SaaS product landing page with features, pricing, and testimonials",
      path: "/example-pages/landing-pages/ai-saas-product",
      icon: "🚀",
    },
    {
      title: "AI Developer Tool",
      description:
        "Technical landing page for AI-powered developer tools with code samples",
      path: "/example-pages/landing-pages/ai-developer-tool",
      icon: "👨‍💻",
    },
    {
      title: "AI Assistant Platform",
      description:
        "Showcase an AI virtual assistant or chatbot service with interactive demo",
      path: "/example-pages/landing-pages/ai-assistant",
      icon: "🤖",
    },
    {
      title: "AI-Powered Analytics",
      description:
        "Landing page for data analytics platform with AI insights visualization",
      path: "/example-pages/landing-pages/ai-analytics",
      icon: "📊",
    },
    {
      title: "AI Content Generator",
      description:
        "Landing page for AI tool that generates marketing copy, images, or videos",
      path: "/example-pages/landing-pages/ai-content",
      icon: "✍️",
    },
    {
      title: "SaaS Enterprise Solution",
      description:
        "B2B SaaS landing page targeting enterprise clients with case studies",
      path: "/example-pages/landing-pages/enterprise-saas",
      icon: "🏢",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Landing Pages"
        description="Explore our collection of landing page templates with usage examples and source code."
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/example-pages"
          className="text-indigo-600 dark:text-indigo-400 mb-6 inline-block"
        >
          ← Back to Examples
        </Link>

        <CategoryGrid items={landingPageCategories} />
      </div>
    </div>
  );
}
