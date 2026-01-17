"use client";

import { useState } from "react";
import Link from "next/link";
import appConfig from "@/config/app.config";
import { ThemeSwitcher } from "../theme-switcher";
import { Rocket } from "lucide-react";

interface HeaderProps {
  links?: Array<{ href: string; label: string }>;
}

export default function Header({ links: linksProp }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Use provided links or derive from appConfig
  const links = linksProp ?? appConfig.header.links;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href={appConfig.logo.href}
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {appConfig.logo.text}
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme toggle and mobile menu button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            <div className="hidden md:block">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Rocket className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  /* Icon when menu is open */
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Add CTA button to mobile menu */}
            <div className="pt-2 pb-3 pl-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Rocket className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
            <div className="pt-2 pb-3 pl-3">
              <ThemeSwitcher />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
