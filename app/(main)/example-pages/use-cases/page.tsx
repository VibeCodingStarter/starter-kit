import PageHeader from "@/components/generic/page-header";
import CTAButton from "@/components/generic/cta-button";
import CategoryGrid, {
  CategoryItem,
  CategoryCard,
} from "@/components/generic/category-grid";
import Link from "next/link";

type UseCase = Pick<CategoryItem, "title" | "description" | "path" | "icon" | "status"> & {
  features: string[];
};

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <CategoryCard item={useCase} clickable={false}>
      <ul className="space-y-2 mb-6">
        {useCase.features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className="flex items-center text-sm text-gray-600 dark:text-gray-300"
          >
            <svg
              className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <CTAButton
        href={useCase.path}
        className="w-full"
        variant="primary"
      >
        Explore Use Case
      </CTAButton>
    </CategoryCard>
  );
}

export default function UseCasesPage() {
  const useCases: UseCase[] = [
    {
      title: "Image Generation",
      description:
        "Generate and modify images using AI models with text prompts and reference images.",
      path: "/example-pages/use-cases/image-gen",
      icon: "🎨",
      status: "Available",
      features: [
        "Text-to-image generation",
        "Image-to-image modification",
        "Multiple AI model support",
        "Gallery and sharing features",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Use Cases"
        description="Explore practical applications and examples of AI-powered features you can build with Dev Kit for AI."
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/example-pages"
          className="text-indigo-600 dark:text-indigo-400 mb-6 inline-block"
        >
          ← Back to Examples
        </Link>

        <CategoryGrid items={useCases}>
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} />
          ))}
        </CategoryGrid>
      </div>

      {/* Getting Started Section */}
      <section className="w-full py-16 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Own Use Case?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Dev Kit for AI provides the foundation and tools to create custom AI-powered
            applications. Start with our templates and extend them for your
            specific needs.
          </p>
          <div className="flex gap-4 justify-center">
            <CTAButton href="/dashboard" variant="primary">
              Get Started
            </CTAButton>
            <CTAButton href="/docs" variant="secondary">
              View Documentation
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
