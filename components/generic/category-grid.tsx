"use client";

import Link from "next/link";

const DISABLED_PATH = "#";

export interface CategoryItem {
  title: string;
  description: string;
  path: string;
  icon: string;
  available?: boolean;
  status?: string;
}

interface CategoryCardProps {
  item: CategoryItem;
  children?: React.ReactNode;
  clickable?: boolean;
}

export function CategoryCard({
  item,
  children,
  clickable = true,
}: CategoryCardProps) {
  const CardContent = (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl">{item.icon}</div>
        {item.available === false && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
            Soon
          </span>
        )}
        {item.status && (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
            {item.status}
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2">{item.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
        {item.description}
      </p>
      {children}
    </div>
  );

  if (item.path === DISABLED_PATH || item.available === false || !clickable || children) {
    return (
      <div
        className={
          item.available === false ? "cursor-not-allowed opacity-75 h-full" : "h-full"
        }
      >
        {CardContent}
      </div>
    );
  }

  return (
    <Link href={item.path} className="block h-full">
      {CardContent}
    </Link>
  );
}

interface CategoryGridProps {
  items: CategoryItem[];
  columns?: "2" | "3";
  children?: React.ReactNode;
}

export default function CategoryGrid({
  items,
  columns = "3",
  children,
}: CategoryGridProps) {
  const gridCols =
    columns === "2" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-6 items-stretch`}>
      {children ||
        items.map((item) => <CategoryCard key={item.title} item={item} />)}
    </div>
  );
}
