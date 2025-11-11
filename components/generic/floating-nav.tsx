"use client";

import { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
}

interface NavSection {
  [key: string]: NavItem[];
}

interface FloatingNavProps {
  items: NavSection;
}

export default function FloatingNav({ items }: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav when scrolled past the table of contents
      const tocElement = document.getElementById('table-of-contents');
      if (tocElement) {
        const tocBottom = tocElement.getBoundingClientRect().bottom;
        setIsVisible(tocBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          {Object.entries(items).map(([section, sectionItems]) => (
            <div key={section} className="mb-4 last:mb-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {section}
              </h4>
              <ul className="space-y-2">
                {sectionItems.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => setIsExpanded(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
