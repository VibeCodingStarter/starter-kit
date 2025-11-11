"use client";
/** Structure for a single table of contents item */
interface TOCItem {
  /** Unique identifier that matches the section's HTML id */
  id: string;
  /** Display text for the table of contents link */
  label: string;
}

/** Structure for organizing TOC items by section */
interface TOCItems {
  /** Key is the section name, value is an array of TOC items */
  [section: string]: TOCItem[];
}

interface TableOfContentsProps {
  /** Object containing all table of contents items organized by section */
  items: TOCItems;
}

/**
 * TableOfContents component that displays a sectioned list of page navigation links.
 * 
 * @component
 * @example
 * ```tsx
 * const tocItems = {
 *   "Getting Started": [
 *     { id: "installation", label: "Installation" },
 *     { id: "quick-start", label: "Quick Start" }
 *   ],
 *   "Components": [
 *     { id: "buttons", label: "Buttons" },
 *     { id: "forms", label: "Forms" }
 *   ]
 * };
 * 
 * <TableOfContents items={tocItems} />
 * ```
 */
export default function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div id="table-of-contents" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(items).map(([section, sectionItems]) => (
          <div key={section}>
            <h3 className="font-semibold mb-2">{section}</h3>
            <ul className="space-y-2">
              {sectionItems.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 
