import { useState } from "react";
import Link from "next/link";
import { componentRegistry } from "@/lib/component-registry";

interface DoctorContentProps {
  onClose: () => void;
}

export const DoctorContent = ({ onClose }: DoctorContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter components based on search term
  const filteredComponents = componentRegistry.filter((category) => {
    return (
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.items.some((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search components..."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComponents.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={onClose}
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
