import PageHeader from "@/components/generic/page-header";
import CategoryGrid, { CategoryItem } from "@/components/generic/category-grid";
import Link from "next/link";

export default function LandingPagesPage() {
  const landingPageCategories: CategoryItem[] = [
    {
      title: "Marketing Pages",
      description: "Landing pages focused on marketing and promotion",
      path: "#",
      icon: "📣",
      available: false,
    },
    {
      title: "Product Pages",
      description: "Landing pages that showcase products and services",
      path: "#",
      icon: "🚀",
      available: false,
    },
    {
      title: "Portfolio Pages",
      description: "Landing pages to showcase work and achievements",
      path: "#",
      icon: "📂",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Topic-Specific Pages"
        description="Explore our collection of topic-specific landing pages designed to help you get started quickly with various use cases."
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
