"use server";

import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";
import { sanitizeReturnUrl } from "@/lib/return-url";
import { storeProvisioningBundle } from "@/lib/provisioning-store";
import type {
  RegistrationResponse,
  ApiErrorResponse,
  TokenResponse,
  UserWithRole,
} from "@/lib/types/auth";

const JWT_COOKIE_NAME = "devkit4ai-token";
const REFRESH_TOKEN_COOKIE_NAME = "devkit4ai-refresh-token";
const AUTH_REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Helper to store JWT tokens in secure httpOnly cookies
 */
async function storeTokensInCookies(tokens: TokenResponse): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(JWT_COOKIE_NAME, tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 30, // 30 minutes
    path: "/",
  });

  if (tokens.refresh_token) {
    cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
}

/**
 * Helper to clear JWT tokens from cookies
 */
async function clearTokensFromCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}

export async function backendRegisterAction(formData: FormData): Promise<{
  success: boolean;
  redirectTo?: string;
  error?: string;
}> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString() ?? "";
  const fullName = formData.get("full_name")?.toString().trim();
  const role = formData.get("role")?.toString() ?? "developer"; // Default to developer for backward compatibility

  if (!email) {
    return { success: false, error: "Email is required." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: "Enter a valid email address." };
  }

  if (!password || password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long.",
    };
  }

  // Enhanced password validation matching backend requirements
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordPattern.test(password)) {
    return {
      success: false,
      error:
        "Password must contain uppercase, lowercase, and digit characters.",
    };
  }

  const deploymentConfig = hydrateDeploymentMode();

  // Role-specific deployment mode validation
  if (role === "developer" && deploymentConfig.mode === "project") {
    return {
      success: false,
      error: "Developer registration is not available in project mode.",
    };
  }

  if (role === "end_user" && deploymentConfig.mode === "operator") {
    return {
      success: false,
      error: "End user registration is not available in operator mode.",
    };
  }

  if (!deploymentConfig.isReady) {
    return {
      success: false,
      error: "Application is not properly configured. Please contact support.",
    };
  }

  // Build headers based on role
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-User-Role": role,
  };

  if (role === "developer") {
    // Developer registration requires operator key
    const operatorKey =
      deploymentConfig.headers["X-Operator-Key"] ??
      deploymentConfig.secrets.operatorKey ??
      null;

    if (!operatorKey) {
      return {
        success: false,
        error: "Operator key is not configured for this deployment.",
      };
    }

    headers["X-Operator-Key"] = operatorKey;
  } else if (role === "end_user") {
    // End user registration requires developer key
    const developerKey =
      deploymentConfig.headers["X-Developer-Key"] ??
      deploymentConfig.secrets.developerKey ??
      null;

    if (!developerKey) {
      return {
        success: false,
        error: "Developer key is not configured for this deployment.",
      };
    }

    headers["X-Developer-Key"] = developerKey;

    // Project mode requires additional headers
    if (deploymentConfig.mode === "project") {
      const projectId =
        deploymentConfig.headers["X-Project-ID"] ??
        deploymentConfig.secrets.projectId ??
        null;
      const apiKey =
        deploymentConfig.headers["X-API-Key"] ??
        deploymentConfig.secrets.projectKey ??
        null;

      if (!projectId || !apiKey) {
        return {
          success: false,
          error: "Project configuration is incomplete.",
        };
      }

      headers["X-Project-ID"] = projectId;
      headers["X-API-Key"] = apiKey;
    }
  }

  if (!deploymentConfig.backendApiUrl) {
    return { success: false, error: "Backend API URL is not configured." };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AUTH_REQUEST_TIMEOUT);

  try {
    let response: Response;

    try {
      response = await fetch(
        `${deploymentConfig.backendApiUrl}/api/v1/auth/register`,
        {
          method: "POST",
          headers,
          cache: "no-store",
          body: JSON.stringify(
            fullName
              ? {
                  email,
                  password,
                  full_name: fullName,
                }
              : {
                  email,
                  password,
                }
          ),
          signal: controller.signal,
        }
      );
    } catch (networkError) {
      clearTimeout(timeoutId);

      if (networkError instanceof Error && networkError.name === "AbortError") {
        return {
          success: false,
          error: "Registration timed out. Please try again.",
        };
      }

      if (process.env.NODE_ENV === "development") {
        console.error("[backendRegisterAction] Network error", networkError);
      }

      return {
        success: false,
        error:
          "Unable to reach the registration service. Please retry shortly.",
      };
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorPayload = (await response
        .json()
        .catch(() => null)) as Partial<ApiErrorResponse> | null;

      if (response.status === 429) {
        return {
          success: false,
          error: "Too many registration attempts. Please try again later.",
        };
      }

      if (response.status === 409) {
        return {
          success: false,
          error: "An account already exists for this email.",
        };
      }

      if (response.status === 400) {
        const detail = errorPayload?.detail ?? "Registration failed.";
        const normalizedDetail = detail.toLowerCase();
        return {
          success: false,
          error: normalizedDetail.includes("already")
            ? "An account already exists for this email."
            : detail,
        };
      }

      if (response.status >= 500) {
        return {
          success: false,
          error: "Unexpected server error. Please try again.",
        };
      }

      return {
        success: false,
        error: errorPayload?.detail ?? "Registration failed. Please try again.",
      };
    }

    const registrationData = (await response.json()) as RegistrationResponse;

    // Store JWT tokens for immediate authentication (both roles)
    if (registrationData.access_token && registrationData.refresh_token) {
      await storeTokensInCookies({
        access_token: registrationData.access_token,
        refresh_token: registrationData.refresh_token,
        token_type: registrationData.token_type ?? "bearer",
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          "[backendRegisterAction] Stored JWT tokens for user",
          registrationData.id
        );
      }
    }

    // Handle developer-specific provisioning
    if (role === "developer") {
      const provisioning = registrationData?.provisioning;

      if (process.env.NODE_ENV === "development") {
        console.log("[backendRegisterAction] Received provisioning data:", {
          has_provisioning: !!provisioning,
          has_project_id: !!provisioning?.project_id,
          has_developer_key: !!provisioning?.developer_key,
          has_api_key: !!provisioning?.api_key,
        });
      }

      if (
        !provisioning?.project_id ||
        !provisioning?.developer_key ||
        !provisioning?.api_key
      ) {
        return {
          success: false,
          error: "Provisioning data is missing from the registration response.",
        };
      }

      // Store provisioning data in secure httpOnly cookie
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[backendRegisterAction] About to store provisioning bundle"
        );
      }

      await storeProvisioningBundle({
        project_id: provisioning.project_id?.toString(),
        developer_key: provisioning.developer_key,
        api_key: provisioning.api_key,
      });

      if (process.env.NODE_ENV === "development") {
        console.log(
          "[backendRegisterAction] Successfully stored provisioning bundle"
        );
      }

      // Developer registration: redirect to success page with provisioning in URL
      // We pass minimal data in URL because cookies set in Server Actions
      // may not be immediately available in the next page render
      const successUrl = new URL(
        "/register/developer/success",
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      );
      successUrl.searchParams.set("email", email);

      return {
        success: true,
        redirectTo: successUrl.pathname + successUrl.search,
      };
    } else if (role === "end_user") {
      // End user registration: redirect to dashboard (already authenticated via tokens)
      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    // Fallback (shouldn't reach here)
    return {
      success: true,
      redirectTo: "/login",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (process.env.NODE_ENV === "development") {
      console.error("[backendRegisterAction] Unexpected error:", error);
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Registration failed due to an unexpected error.",
    };
  }
}

export const signOutAction = async () => {
  // Clear backend JWT tokens
  await clearTokensFromCookies();

  return redirect("/login");
};

/**
 * Universal Login Action
 * Authenticates any user type via the FastAPI backend and redirects based on role
 *
 * This action works for all deployment modes and user roles (platform_operator,
 * developer, end_user). After successful authentication, it determines the user's
 * role via /api/v1/auth/me and redirects to the appropriate dashboard.
 *
 * If a returnUrl is provided in the form data, it will be validated for security
 * (decoded and constrained to same-origin relative paths) before redirecting.
 *
 * @param formData Form data containing email, password, and optional returnUrl
 * @returns Result object with success flag and optional error message
 *
 * @example
 * ```tsx
 * // In a login form component
 * const result = await backendLoginAction(formData);
 * if (result.success) {
 *   // User will be redirected automatically
 * } else {
 *   setError(result.error);
 * }
 * ```
 */
export async function backendLoginAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Safely handle URL-encoded returnUrl and validate for security
  const rawReturnUrl = formData.get("returnUrl")?.toString() ?? null;
  const safeReturnUrl = sanitizeReturnUrl(rawReturnUrl);

  if (process.env.NODE_ENV === "development" && rawReturnUrl) {
    console.log("[backendLoginAction] Return URL validation:", {
      raw: rawReturnUrl,
      safe: safeReturnUrl,
      rejected: !safeReturnUrl,
    });
  }

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  // Get backend API URL and deployment config
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!backendApiUrl) {
    return {
      success: false,
      error: "Application is not properly configured. Please contact support.",
    };
  }

  // Get deployment config to extract project-specific headers
  const deploymentConfig = hydrateDeploymentMode();

  try {
    // Step 1: Authenticate user via /api/v1/auth/login (role-agnostic)
    // Create AbortController for timeout protection
    const loginController = new AbortController();
    const loginTimeoutId = setTimeout(
      () => loginController.abort(),
      AUTH_REQUEST_TIMEOUT
    );

    // Build headers with optional X-Project-ID for project mode
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add X-Project-ID for project mode deployments (required for end user login)
    if (deploymentConfig.mode === "project") {
      const projectId =
        deploymentConfig.headers["X-Project-ID"] ??
        deploymentConfig.secrets.projectId ??
        null;
      if (projectId) {
        headers["X-Project-ID"] = projectId;
      }
    }

    let response: Response;
    try {
      response = await fetch(`${backendApiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          password,
        }),
        cache: "no-store", // Never cache authentication requests
        signal: loginController.signal,
      });

      clearTimeout(loginTimeoutId);
    } catch (fetchError) {
      clearTimeout(loginTimeoutId);

      // Handle timeout errors specifically
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return {
          success: false,
          error: "Request timeout. Please try again.",
        };
      }

      // Re-throw other fetch errors to outer catch
      throw fetchError;
    }

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json().catch(() => ({
        detail: "Login failed. Please check your credentials.",
      }));

      // Check for specific error types
      if (errorData.detail?.toLowerCase().includes("not activated")) {
        return {
          success: false,
          error:
            "Account not activated. Please check your email for the verification link.",
        };
      }

      return {
        success: false,
        error:
          errorData.detail || "Login failed. Please check your credentials.",
      };
    }

    const tokenData: TokenResponse = await response.json();

    // Step 2: Store JWT tokens in secure httpOnly cookies
    await storeTokensInCookies(tokenData);

    // Step 3: Get user information to determine role
    // Create AbortController for /me endpoint timeout
    const meController = new AbortController();
    const meTimeoutId = setTimeout(
      () => meController.abort(),
      AUTH_REQUEST_TIMEOUT
    );

    let meResponse: Response;
    try {
      meResponse = await fetch(`${backendApiUrl}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // Never cache user information
        signal: meController.signal,
      });

      clearTimeout(meTimeoutId);
    } catch (fetchError) {
      clearTimeout(meTimeoutId);

      // Handle timeout errors specifically
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        await clearTokensFromCookies();
        return {
          success: false,
          error: "Request timeout. Please try again.",
        };
      }

      // Re-throw other fetch errors to outer catch
      throw fetchError;
    }

    if (!meResponse.ok) {
      // Clear tokens if we can't get user info
      await clearTokensFromCookies();
      return {
        success: false,
        error: "Failed to retrieve user information. Please try again.",
      };
    }

    const userData = await meResponse.json();

    // Validate response structure before using as UserWithRole
    if (
      !userData.id ||
      !userData.email ||
      !userData.role ||
      typeof userData.is_active !== "boolean"
    ) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[backendLoginAction] Invalid user data from /me endpoint:",
          userData
        );
      }
      await clearTokensFromCookies();
      return {
        success: false,
        error: "Invalid user data received. Please try again.",
      };
    }

    // Validate role is one of the expected values
    const validRoles: Array<UserWithRole["role"]> = [
      "platform_operator",
      "developer",
      "end_user",
    ];
    if (!validRoles.includes(userData.role)) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[backendLoginAction] Invalid role from /me endpoint:",
          userData.role
        );
      }
      await clearTokensFromCookies();
      return {
        success: false,
        error: "Invalid user role. Please contact support.",
      };
    }

    // Now safe to use as UserWithRole
    const user = userData as UserWithRole;

    // Step 4: Redirect to safeReturnUrl if provided, otherwise based on user role
    let redirectPath: string;

    if (safeReturnUrl) {
      // If safe returnUrl provided, use it
      redirectPath = safeReturnUrl;
    } else {
      // Otherwise, redirect based on user role
      switch (user.role) {
        case "platform_operator":
          redirectPath = "/portal";
          break;
        case "developer":
          redirectPath = "/console";
          break;
        case "end_user":
          redirectPath = "/dashboard";
          break;
        default:
          redirectPath = "/dashboard";
      }
    }

    redirect(redirectPath);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.error("[backendLoginAction] Login error:", error);
    }

    // Clear any partially stored tokens
    await clearTokensFromCookies();

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
    };
  }
}
