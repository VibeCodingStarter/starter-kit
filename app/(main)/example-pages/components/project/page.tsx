import PageHeader from "@/components/generic/page-header";
import CodeBlock from "@/components/generic/code-block";
import FloatingNav from "@/components/generic/floating-nav";
import TableOfContents from "@/components/generic/toc";
import ScrollIndicator from "@/components/generic/scroll-indicator";
import { COMPONENT_DATA, ComponentData } from "../components.data";
import Link from "next/link";

function ComponentSection({ id, data }: { id: string; data: ComponentData }) {
  return (
    <div id={id} className="mb-12 scroll-mt-16">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {data.title}
        <a
          href={`#${id}`}
          className="text-indigo-600 dark:text-indigo-400 text-sm"
        >
          #
        </a>
      </h3>
      <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        {data.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {data.description}
          </p>
        )}
        {data.demo}
      </div>
      <CodeBlock code={data.code} />
    </div>
  );
}

export default function ProjectComponentsPage() {
  const TOC_ITEMS = {
    "Project Components": Object.entries(COMPONENT_DATA.projectComponents).map(
      ([id, data]) => ({
        id,
        label: data.title,
      })
    ),
  };

  return (
    <>
      <ScrollIndicator />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageHeader
          title="Project Components"
          description="Components specific to this project's functionality."
        />

        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link
            href="/example-pages/components"
            className="text-indigo-600 dark:text-indigo-400 mb-6 inline-block"
          >
            ← Back to Components
          </Link>

          <TableOfContents items={TOC_ITEMS} />

          <section>
            <h2 className="text-2xl font-bold mb-8">Project Components</h2>
            {Object.entries(COMPONENT_DATA.projectComponents).map(
              ([id, data]) => (
                <ComponentSection key={id} id={id} data={data} />
              )
            )}
          </section>
        </div>

        <FloatingNav items={TOC_ITEMS} />
      </div>
    </>
  );
}
