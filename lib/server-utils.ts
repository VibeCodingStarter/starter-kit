import { headers } from "next/headers";

/**
 * Server-only utilities for Next.js App Router.
 * These functions use Next.js server APIs and can only be imported in Server Components.
 */

/**
 * Get the current pathname from request headers.
 * Used to determine the current route in Server Components.
 *
 * @returns Current pathname or "/" if unable to determine
 */
export async function getCurrentPathname(): Promise<string> {
  try {
    const headersList = await headers();
    return headersList.get("x-pathname") || "/";
  } catch {
    return "/";
  }
}

/**
 * Check if the current pathname matches a given route pattern.
 *
 * @param pattern Route pattern to match (e.g., "/console")
 * @returns True if pathname starts with the pattern
 */
export async function isCurrentRoute(pattern: string): Promise<boolean> {
  const pathname = await getCurrentPathname();
  return pathname.startsWith(pattern);
}
