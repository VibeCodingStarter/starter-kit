"use client";

import Link from "next/link";
import React from "react";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  subTitleLink?: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subTitle,
  subTitleLink,
  description,
  children
}: PageHeaderProps) {
  return (
    <section className="w-full max-w-5xl mx-auto text-center px-8 py-8 lg:py-12">
      <header className="mb-10">
        {subTitle && (
          <h2 className="text-primary mb-4">
            {subTitleLink ? (
              <Link href={subTitleLink} className="flex items-center justify-center">
                {subTitle}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            ) : subTitle}
          </h2>
        )}
        <h1 className="text-4xl lg:text-6xl font-bold">
          {title}
        </h1>
      </header>
      <p className="text-lg mb-10">
        {description}
      </p>
      {children}
    </section>
  );
}
