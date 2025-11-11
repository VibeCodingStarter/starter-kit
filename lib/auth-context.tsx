"use client";

import { createContext, useContext, type PropsWithChildren } from "react";
import type {
  DeploymentModeConfig,
  DeploymentModeHeaders,
  DeploymentModeIssue,
} from "./deployment-mode";
import type { AuthContextValue, UserWithRole } from "./types/auth";

export type DeploymentContextValue = DeploymentModeConfig;

const DeploymentModeContext = createContext<DeploymentContextValue | null>(
  null
);

export interface DeploymentModeProviderProps extends PropsWithChildren {
  value: DeploymentModeConfig;
}

export const DeploymentModeProvider = ({
  value,
  children,
}: DeploymentModeProviderProps) => (
  <DeploymentModeContext.Provider value={value}>
    {children}
  </DeploymentModeContext.Provider>
);

export const useDeploymentMode = (): DeploymentContextValue => {
  const context = useContext(DeploymentModeContext);

  if (!context) {
    throw new Error(
      "useDeploymentMode must be used within a DeploymentModeProvider"
    );
  }

  return context;
};

export const useDeploymentIssues = (): DeploymentModeIssue[] => {
  const { issues } = useDeploymentMode();
  return issues;
};

export const useRegistrationHeaders = (): DeploymentModeHeaders => {
  const { headers } = useDeploymentMode();
  return headers;
};

export const useDeploymentReadiness = (): boolean => {
  const { isReady } = useDeploymentMode();
  return isReady;
};

/**
 * Authentication Context
 *
 * Provides authenticated user information to Client Components.
 * Data is fetched server-side and passed via props - no client-side API calls.
 */

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps extends PropsWithChildren {
  /** User data from server-side getCurrentUser() or null if not authenticated */
  user: UserWithRole | null;
}

/**
 * Authentication Provider
 *
 * Wraps Client Components to provide access to authenticated user data.
 * Should be rendered in Server Components with user data from getCurrentUser().
 *
 * @param user - User data from server-side authentication check
 * @param children - Child components that can access auth context
 *
 * @example
 * ```tsx
 * // In a Server Component layout
 * import { getCurrentUser } from '@/lib/auth-server';
 * import { AuthProvider } from '@/lib/auth-context';
 *
 * export default async function Layout({ children }) {
 *   const user = await getCurrentUser();
 *
 *   return (
 *     <AuthProvider user={user}>
 *       {children}
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const contextValue: AuthContextValue = {
    user,
    isLoading: false, // Always false - data comes from server
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context
 *
 * Returns the current user and loading state. Use this in Client Components
 * for role-based rendering or to access user information.
 *
 * @returns Authentication context value
 * @throws Error if used outside AuthProvider
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * export function UserMenu() {
 *   const { user, isLoading } = useAuth();
 *
 *   if (isLoading) {
 *     return <Skeleton />;
 *   }
 *
 *   if (!user) {
 *     return <LoginButton />;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Welcome {user.email}</p>
 *       <p>Role: {user.role}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

/**
 * Hook to access current authenticated user
 *
 * Convenience hook that returns just the user object.
 * Returns null if not authenticated.
 *
 * @returns Current user or null
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * export function ProfileButton() {
 *   const user = useCurrentUser();
 *
 *   if (!user) return null;
 *
 *   return <button>{user.email}</button>;
 * }
 * ```
 */
export const useCurrentUser = (): UserWithRole | null => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook to check if user is authenticated
 *
 * Convenience hook that returns boolean authentication status.
 *
 * @returns True if user is authenticated, false otherwise
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * export function ProtectedFeature() {
 *   const isAuthenticated = useIsAuthenticated();
 *
 *   if (!isAuthenticated) {
 *     return <LoginPrompt />;
 *   }
 *
 *   return <FeatureContent />;
 * }
 * ```
 */
export const useIsAuthenticated = (): boolean => {
  const { user } = useAuth();
  return user !== null;
};

/**
 * Hook to enforce role-based access in Client Components
 *
 * Returns user if they have one of the allowed roles, null otherwise.
 * Use this for conditional rendering based on role.
 *
 * Does NOT redirect - just returns null if unauthorized.
 * For redirects, use requireRole() in Server Components.
 *
 * @param allowedRoles - Array of allowed role strings (TypeScript enforced)
 * @returns User if authorized, null if not
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * export function DeveloperOnlyButton() {
 *   const developer = useRequireRole(['developer']);
 *
 *   if (!developer) {
 *     return null; // Hide for non-developers
 *   }
 *
 *   return <button>Developer Action</button>;
 * }
 *
 * // Multiple roles
 * export function AdminButton() {
 *   const admin = useRequireRole(['platform_operator', 'developer']);
 *
 *   if (!admin) return null;
 *
 *   return <button>Admin Action</button>;
 * }
 * ```
 */
export const useRequireRole = (
  allowedRoles: Array<UserWithRole["role"]>
): UserWithRole | null => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return user;
};

/**
 * Hook to check if user has specific role
 *
 * Convenience hook that returns boolean for role check.
 *
 * @param allowedRoles - Array of allowed role strings (TypeScript enforced)
 * @returns True if user has one of the allowed roles, false otherwise
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * export function ConditionalFeature() {
 *   const isDeveloper = useHasRole(['developer']);
 *   const isAdmin = useHasRole(['platform_operator', 'developer']);
 *
 *   return (
 *     <div>
 *       {isDeveloper && <DeveloperFeature />}
 *       {isAdmin && <AdminFeature />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useHasRole = (
  allowedRoles: Array<UserWithRole["role"]>
): boolean => {
  const user = useRequireRole(allowedRoles);
  return user !== null;
};
