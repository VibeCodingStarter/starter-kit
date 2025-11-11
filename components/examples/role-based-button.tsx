"use client";

import { useRequireRole, useHasRole } from "@/lib/auth-context";

/**
 * Example component demonstrating type-safe role checking
 *
 * This component shows how TypeScript enforces valid role values at compile time.
 * Try changing 'developer' to 'admin' or any other invalid role - you'll get a TypeScript error!
 */
export function DeveloperOnlyButton() {
  // ✅ TypeScript enforces that only valid roles can be passed
  // Valid roles: 'platform_operator' | 'developer' | 'end_user'
  const developer = useRequireRole(["developer"]);

  // Hide button for non-developers
  if (!developer) {
    return null;
  }

  return (
    <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
      Developer Action
    </button>
  );
}

/**
 * Example with multiple roles
 */
export function AdminButton() {
  // ✅ Multiple valid roles are allowed
  const admin = useRequireRole(["platform_operator", "developer"]);

  if (!admin) {
    return null;
  }

  return (
    <button className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
      Admin Action
    </button>
  );
}

/**
 * Example using boolean helper
 */
export function ConditionalFeatures() {
  // ✅ Boolean helper also has type safety
  const isDeveloper = useHasRole(["developer"]);
  const isOperator = useHasRole(["platform_operator"]);

  return (
    <div className="space-y-2">
      {isDeveloper && (
        <div className="rounded bg-green-100 p-4 dark:bg-green-900">
          <p className="text-green-800 dark:text-green-100">
            Developer Feature
          </p>
        </div>
      )}

      {isOperator && (
        <div className="rounded bg-orange-100 p-4 dark:bg-orange-900">
          <p className="text-orange-800 dark:text-orange-100">
            Operator Feature
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * ❌ INVALID EXAMPLES (commented out to prevent compilation errors)
 *
 * Uncomment any of these to see TypeScript catch the error at compile time:
 */

// export function InvalidExample1() {
//   // ❌ TypeScript Error: 'admin' is not a valid role
//   const user = useRequireRole(['admin']);
//   return <div>...</div>;
// }

// export function InvalidExample2() {
//   // ❌ TypeScript Error: 'superuser' is not a valid role
//   const isSuperUser = useHasRole(['superuser']);
//   return <div>...</div>;
// }

// export function InvalidExample3() {
//   // ❌ TypeScript Error: Typo in 'developer'
//   const user = useRequireRole(['develper']);
//   return <div>...</div>;
// }
