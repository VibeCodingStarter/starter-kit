import PageHeader from "@/components/generic/page-header";
import CategoryGrid, { CategoryItem } from "@/components/generic/category-grid";
import Link from "next/link";

export default function ComponentsPage() {
  const componentCategories: CategoryItem[] = [
    {
      title: "Base Components",
      description: "Base UI components for building consistent interfaces",
      path: "/example-pages/components/ui",
      icon: "🎨",
    },
    {
      title: "Generic Components",
      description:
        "Reusable components that can be used across different projects",
      path: "/example-pages/components/generic",
      icon: "🧩",
    },
    {
      title: "Project Components",
      description: "Components specific to this project's functionality",
      path: "/example-pages/components/project",
      icon: "🏗️",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Components"
        description="Explore our collection of reusable components with usage examples and source code."
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/example-pages"
          className="text-indigo-600 dark:text-indigo-400 mb-6 inline-block"
        >
          ← Back to Examples
        </Link>

        <CategoryGrid items={componentCategories} />
      </div>
    </div>
  );
}
