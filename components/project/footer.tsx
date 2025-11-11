"use client";

import Link from "next/link";
import appConfig from "@/config/app.config";
import { ThemeSwitcher } from "../theme-switcher";
import { ExternalLink } from "lucide-react";

interface FooterProps {
  companyName?: string;
}

export default function Footer({
  companyName = appConfig.footer.title,
}: FooterProps) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and company info - takes up more space */}
          <div className="md:max-w-sm space-y-4">
            <Link
              href={appConfig.logo.href}
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {companyName}
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {appConfig.footer.description}
            </p>
            <ThemeSwitcher />
          </div>

          {/* Links container - pushed to the right */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {Object.entries(appConfig.footer.links).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm inline-flex items-center gap-1.5"
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.label}
                        {link.external && (
                          <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-600" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright section remains the same */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-400 dark:text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
