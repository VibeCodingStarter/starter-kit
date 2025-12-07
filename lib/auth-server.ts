import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { UserWithRole } from "@/lib/types/auth";
import { sanitizeReturnUrl } from "@/lib/return-url";

const JWT_COOKIE_NAME = "devkit4ai-token";
const AUTH_REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Get the JWT access token from httpOnly cookies.
 *
 * @returns Access token string or null if not found
 * @internal Use getCurrentUser() instead in most cases
 */
async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME);
  return token?.value ?? null;
}

/**
 * Get the default redirect path for a given role.
 *
 * @param role User role
 * @returns Redirect path
 */
function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "platform_operator":
      return "/portal";
    case "developer":
      return "/console";
    case "end_user":
      return "/dashboard";
    default:
      return "/dashboard";
  }
}

/**
 * Get the current request path for return URL.
 *
 * @returns Current path or '/' if unable to determine
 * @internal Used for return URL functionality
 */
async function getCurrentPath(): Promise<string> {
  try {
    const headersList = await headers();

    // Try x-invoke-path first (Next.js edge runtime header)
    const invokePath = headersList.get("x-invoke-path");
    if (invokePath) {
      return invokePath;
    }

    // Try x-pathname (custom header that might be set)
    const pathname = headersList.get("x-pathname");
    if (pathname) {
      return pathname;
    }

    // Try to construct from x-url header
    const nextUrl = headersList.get("x-url");
    if (nextUrl) {
      try {
        const url = new URL(nextUrl);
        return url.pathname + url.search;
      } catch {
        // Invalid URL, ignore
      }
    }

    // Try referer as fallback
    const referer = headersList.get("referer");
    if (referer) {
      try {
        const url = new URL(referer);
        return url.pathname + url.search;
      } catch {
        // Invalid URL, ignore
      }
    }

    // Default fallback
    return "/";
  } catch {
    // If headers() fails, return default
    return "/";
  }
}

/**
 * Get the current authenticated user from JWT token.
 * Returns user with role information or null if not authenticated.
 *
 * This function is cached per-request to avoid multiple API calls within
 * a single request cycle. The cache is automatically invalidated between
 * requests - each new request gets fresh user data from the backend.
 *
 * Safe to call multiple times in a single request cycle without performance
 * penalty, as React's cache() ensures the function only executes once per request.
 *
 * @returns User with role or null if not authenticated
 *
 * @example
 * ```tsx
 * // In a Server Component
 * export default async function Page() {
 *   const user = await getCurrentUser();
 *   if (!user) {
 *     redirect('/login');
 *   }
 *   return <div>Welcome {user.email}</div>;
 * }
 *
 * // Multiple calls in same request return cached result
 * async function ParentComponent() {
 *   const user1 = await getCurrentUser(); // Fetches from API
 *   const user2 = await getCurrentUser(); // Returns cached result
 *   // user1 === user2 (same object reference)
 * }
 * ```
 */
export const getCurrentUser = cache(async (): Promise<UserWithRole | null> => {
  try {
    // Get access token from cookies
    const token = await getAccessToken();

    if (!token) {
      return null;
    }

    // Get backend API URL
    const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendApiUrl) {
      if (process.env.NODE_ENV === "development") {
        console.error("[auth-server] NEXT_PUBLIC_API_URL is not configured");
      }
      return null;
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      AUTH_REQUEST_TIMEOUT
    );

    try {
      // Call /api/v1/auth/me endpoint
      const response = await fetch(`${backendApiUrl}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Don't cache API responses
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle unauthorized or forbidden
      if (response.status === 401 || response.status === 403) {
        return null;
      }

      // Handle other errors
      if (!response.ok) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            `[auth-server] Failed to fetch user: ${response.status} ${response.statusText}`
          );
        }
        return null;
      }

      // Parse response
      const userData = await response.json();

      // Validate response structure
      if (
        !userData.id ||
        !userData.email ||
        !userData.role ||
        typeof userData.is_active !== "boolean"
      ) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "[auth-server] Invalid user data from /me endpoint:",
            userData
          );
        }
        return null;
      }

      // Validate role is one of the expected values
      const validRoles = ["platform_operator", "developer", "end_user"];
      if (!validRoles.includes(userData.role)) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "[auth-server] Invalid role from /me endpoint:",
            userData.role
          );
        }
        return null;
      }

      // Extract project_id if present (for end users)
      const projectId = userData.project_id ?? null;

      // Extract full_name if present
      const fullName = userData.full_name ?? null;

      // Return user with role (with type assertion after validation)
      return {
        id: userData.id,
        email: userData.email,
        full_name: fullName,
        role: userData.role as "platform_operator" | "developer" | "end_user",
        is_active: userData.is_active,
        created_at: userData.created_at,
        project_id: projectId,
      };
    } catch (fetchError) {
      clearTimeout(timeoutId);

      // Handle abort/timeout errors specifically
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        if (process.env.NODE_ENV === "development") {
          console.error("[auth-server] Request timeout fetching user");
        }
        return null;
      }

      // Re-throw to outer catch block
      throw fetchError;
    }
  } catch (error) {
    // Log errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("[auth-server] Error fetching current user:", error);
    }

    // Return null for any errors (network, parsing, etc.)
    return null;
  }
});

/**
 * Require authentication. Redirects to /login if not authenticated.
 *
 * Use this in Server Components or Server Actions that require
 * a logged-in user. Will automatically redirect unauthenticated
 * users to the login page with a return URL to come back after login.
 *
 * @returns Authenticated user with role
 * @throws Redirects to /login?returnUrl=<current-path> if not authenticated
 *
 * @example
 * ```tsx
 * // In a protected Server Component
 * export default async function ProtectedPage() {
 *   const user = await requireAuth();
 *   // User is guaranteed to be authenticated here
 *   return <div>Hello {user.email}</div>;
 * }
 * ```
 */
export async function requireAuth(): Promise<UserWithRole> {
  const user = await getCurrentUser();

  // Redirect to login if not authenticated
  if (!user) {
    const currentPath = await getCurrentPath();
    const safePath = sanitizeReturnUrl(currentPath) ?? "/";
    const returnUrl = encodeURIComponent(safePath);
    redirect(`/login?returnUrl=${returnUrl}`);
  }

  return user;
}

/**
 * Require specific role(s). Redirects if user doesn't have required role.
 *
 * Enforces role-based access control. If the user is not authenticated,
 * redirects to /login. If authenticated but lacks the required role,
 * redirects to their appropriate dashboard.
 *
 * @param allowedRoles Array of allowed roles
 * @returns Authenticated user with required role
 * @throws Redirects to /login if not authenticated
 * @throws Redirects to role-appropriate page if unauthorized
 *
 * @example
 * ```tsx
 * // Only allow developers
 * export default async function DeveloperPage() {
 *   const user = await requireRole(['developer']);
 *   return <div>Developer Dashboard</div>;
 * }
 *
 * // Allow operators and developers
 * export default async function AdminPage() {
 *   const user = await requireRole(['platform_operator', 'developer']);
 *   return <div>Admin Panel</div>;
 * }
 * ```
 */
export async function requireRole(
  allowedRoles: Array<UserWithRole["role"]>
): Promise<UserWithRole> {
  // First ensure user is authenticated
  const user = await requireAuth();

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate page based on user's actual role
    const redirectPath = getRoleBasedRedirect(user.role);
    redirect(redirectPath);
  }

  return user;
}
