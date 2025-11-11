"use client";

import Link from 'next/link'
import { ReactNode } from 'react'

interface CTAButtonProps {
  /** URL that the button links to */
  href: string
  /** Content to display inside the button */
  children: ReactNode
  /** Optional CSS classes to add to the button */
  className?: string
  /** Button style variant - 'primary' (default) or 'secondary' */
  variant?: 'primary' | 'secondary'
}

/**
 * CTAButton component for call-to-action links styled as buttons.
 * 
 * @component
 * @example
 * ```tsx
 * <CTAButton href="/signup">
 *   Get Started
 * </CTAButton>
 * ```
 */
export default function CTAButton({
  href,
  children,
  className = '',
  variant = 'primary'
}: CTAButtonProps) {
  const baseStyles = "inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

  const variants = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 border-transparent",
    secondary: "text-gray-900 bg-white hover:bg-gray-100 border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:border-gray-600"
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
