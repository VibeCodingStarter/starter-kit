"use server";

import { cookies } from "next/headers";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";

const JWT_COOKIE_NAME = "devkit4ai-token";
const API_REQUEST_TIMEOUT = 30000; // 30 seconds for checkout

/**
 * Get the JWT access token from httpOnly cookies.
 */
async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME);
  return token?.value ?? null;
}

/**
 * Build authentication headers from deployment mode configuration.
 * Reusable helper to avoid duplication across payment action functions.
 */
function buildAuthHeaders(
  token: string | null,
  config: ReturnType<typeof hydrateDeploymentMode>
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.secrets.projectId) {
    headers["X-Project-ID"] = config.secrets.projectId;
  }

  if (config.headers["X-API-Key"]) {
    headers["X-API-Key"] = config.headers["X-API-Key"] as string;
  }

  if (config.headers["X-Developer-Key"]) {
    headers["X-Developer-Key"] = config.headers["X-Developer-Key"] as string;
  }

  if (config.headers["X-User-Role"]) {
    headers["X-User-Role"] = config.headers["X-User-Role"] as string;
  }

  return headers;
}

export interface CheckoutOptions {
  priceId: string;
  quantity?: number;
  successUrl?: string;
  cancelUrl?: string;
  customerId?: string;
  testMode?: boolean;
}

export interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
}

/**
 * Create a Stripe checkout session.
 *
 * This is a server action that can be called from client components.
 * Uses the project's Stripe configuration from the backend.
 *
 * @param options - Checkout configuration options
 * @param options.priceId - The Stripe price ID (e.g., price_abc123)
 * @param options.quantity - Quantity of items (default: 1)
 * @param options.successUrl - URL to redirect after successful payment
 * @param options.cancelUrl - URL to redirect if payment is cancelled
 * @param options.customerId - Optional Stripe customer ID if user already exists
 * @param options.testMode - Use test mode credentials (default: true)
 *
 * @example
 * ```tsx
 * // In a client component
 * const result = await createCheckoutSession({
 *   priceId: "price_abc123",
 *   successUrl: "/success",
 *   cancelUrl: "/pricing",
 * });
 *
 * if (result.success && result.checkoutUrl) {
 *   window.location.href = result.checkoutUrl;
 * }
 * ```
 */
export async function createCheckoutSession(
  options: CheckoutOptions
): Promise<CheckoutResult> {
  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    const testMode = options.testMode ?? true;

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/checkout-session?test_mode=${testMode}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            price_id: options.priceId,
            quantity: options.quantity ?? 1,
            success_url: options.successUrl,
            cancel_url: options.cancelUrl,
          }),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let message = "Failed to create checkout session.";
        try {
          const errorBody = await response.json();
          if (errorBody?.detail) {
            message = errorBody.detail;
          }
        } catch {
          // ignore
        }
        return { success: false, error: message };
      }

      const data = await response.json();
      return {
        success: true,
        checkoutUrl: data.checkout_url,
        sessionId: data.session_id,
      };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[createCheckoutSession] Error:", error);
    }
    return { success: false, error: "Unexpected error creating checkout." };
  }
}

export interface SubscriptionInfo {
  id: string;
  status: string;
  subscription_id: string;
  customer_id: string | null;
  plan_name: string | null;
  quantity: number;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  cancelled_at: string | null;
  is_test_mode: boolean;
  created_at: string;
}

export interface GetSubscriptionResult {
  success: boolean;
  subscription?: SubscriptionInfo;
  error?: string;
}

/**
 * Get subscription information for a user.
 *
 * @param subscriptionId - The subscription ID to look up
 * @param testMode - Use test mode (default: true)
 */
export async function getSubscription(
  subscriptionId: string,
  testMode: boolean = true
): Promise<GetSubscriptionResult> {
  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    if (!config.secrets.projectId) {
      return { success: false, error: "Project ID not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/projects/${config.secrets.projectId}/subscriptions?test_mode=${testMode}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        return { success: false, error: "Failed to fetch subscription." };
      }

      const data = await response.json();
      const subscription = data.subscriptions?.find(
        (s: SubscriptionInfo) => s.id === subscriptionId
      );

      if (!subscription) {
        return { success: false, error: "Subscription not found." };
      }

      return { success: true, subscription };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getSubscription] Error:", error);
    }
    return { success: false, error: "Unexpected error fetching subscription." };
  }
}

/**
 * Get the current user's subscription.
 * Only works for end users in project mode.
 *
 * @param testMode - Use test mode (default: true)
 */
export async function getMySubscription(
  testMode: boolean = true
): Promise<GetSubscriptionResult> {
  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/my-subscription?test_mode=${testMode}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `Failed to fetch subscription (status ${response.status} ${response.statusText})`;
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage += `: ${errorText}`;
          }
        } catch {
          // ignore body parsing errors and fall back to status-only message
        }
        return { success: false, error: errorMessage };
      }

      const subscription = (await response.json()) ?? null;

      return { success: true, subscription };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getMySubscription] Error:", error);
    }
    return { success: false, error: "Unexpected error fetching subscription." };
  }
}

export interface TransactionInfo {
  id: string;
  project_id: string;
  subscription_id: string | null;
  user_id: string | null;
  is_test_mode: boolean;
  payment_intent_id: string;
  status: string;
  amount_cents: number;
  currency: string;
  description: string | null;
  refunded_amount_cents: number;
  created_at: string;
}

export interface GetTransactionsResult {
  success: boolean;
  transactions?: TransactionInfo[];
  total?: number;
  page?: number;
  page_size?: number;
  error?: string;
}

/**
 * Get the current user's transaction history.
 * Only works for end users in project mode.
 *
 * @param testMode - Use test mode (default: true)
 * @param page - Page number (default: 1)
 * @param pageSize - Items per page (default: 50)
 */
export async function getMyTransactions(
  testMode: boolean = true,
  page: number = 1,
  pageSize: number = 50
): Promise<GetTransactionsResult> {
  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/my-payments?test_mode=${testMode}&page=${page}&page_size=${pageSize}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorBodyText: string | undefined;
        try {
          errorBodyText = await response.text();
        } catch {
          // ignore body parsing errors in error handler
        }

        if (process.env.NODE_ENV === "development") {
          console.error("[getMyTransactions] HTTP error response", {
            status: response.status,
            statusText: response.statusText,
            body: errorBodyText,
          });
        }

        const statusDescription = response.statusText
          ? `${response.status} ${response.statusText}`
          : `${response.status}`;

        return {
          success: false,
          error: `Failed to fetch transactions (status ${statusDescription}).`,
        };
      }

      const data = await response.json();

      return {
        success: true,
        transactions: data.payments,
        total: data.total,
        page: data.page,
        page_size: data.page_size,
      };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getMyTransactions] Error:", error);
    }
    return { success: false, error: "Unexpected error fetching transactions." };
  }
}

// ============================================================================
// Subscription Management Actions
// ============================================================================

export interface CustomerPortalResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Create a Stripe Customer Portal session.
 * Allows users to manage their subscription, update payment methods, and view invoices.
 *
 * @param returnUrl - URL to redirect back to after portal session
 * @param testMode - Use test mode credentials (default: true)
 */
export async function createCustomerPortalSession(
  returnUrl: string,
  testMode: boolean = true
): Promise<CustomerPortalResult> {
  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/customer-portal?test_mode=${testMode}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ return_url: returnUrl }),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let message = "Failed to create customer portal session.";
        try {
          const errorBody = await response.json();
          if (errorBody?.detail) {
            message = errorBody.detail;
          }
        } catch {
          // ignore
        }
        return { success: false, error: message };
      }

      const data = await response.json();
      return { success: true, url: data.portal_url };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[createCustomerPortalSession] Error:", error);
    }
    return { success: false, error: "Unexpected error creating portal session." };
  }
}

export interface CancelSubscriptionOptions {
  cancelImmediately?: boolean;
  testMode?: boolean;
}

export interface CancelSubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  status?: string;
  message?: string;
  cancelAt?: string | null;
  cancelledAt?: string | null;
  error?: string;
}

/**
 * Cancel the current user's subscription.
 *
 * @param options.cancelImmediately - If true, cancels immediately. Otherwise cancels at period end (default: false)
 * @param options.testMode - Use test mode credentials (default: true)
 */
export async function cancelSubscription(
  options: CancelSubscriptionOptions = {}
): Promise<CancelSubscriptionResult> {
  const { cancelImmediately = false, testMode = true } = options;

  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/cancel-subscription?test_mode=${testMode}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ cancel_immediately: cancelImmediately }),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let message = "Failed to cancel subscription.";
        try {
          const errorBody = await response.json();
          if (errorBody?.detail) {
            message = errorBody.detail;
          }
        } catch {
          // ignore
        }
        return { success: false, error: message };
      }

      const data = await response.json();
      return {
        success: true,
        subscriptionId: data.subscription_id,
        status: data.status,
        message: data.message,
        cancelAt: data.cancel_at,
        cancelledAt: data.cancelled_at,
      };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[cancelSubscription] Error:", error);
    }
    return { success: false, error: "Unexpected error canceling subscription." };
  }
}

export interface UpdateSubscriptionOptions {
  newPriceId: string;
  prorate?: boolean;
  testMode?: boolean;
}

export interface UpdateSubscriptionResult {
  success: boolean;
  message?: string;
  newPriceId?: string;
  effectiveDate?: string;
  error?: string;
}

/**
 * Update (upgrade/downgrade) the current user's subscription to a different plan.
 *
 * @param options.newPriceId - The Stripe price ID of the new plan
 * @param options.prorate - Whether to prorate charges (default: true)
 * @param options.testMode - Use test mode credentials (default: true)
 */
export async function updateSubscription(
  options: UpdateSubscriptionOptions
): Promise<UpdateSubscriptionResult> {
  const { newPriceId, prorate = true, testMode = true } = options;

  try {
    const token = await getAuthToken();
    const config = hydrateDeploymentMode();

    if (!config.backendApiUrl) {
      return { success: false, error: "Backend API not configured." };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_REQUEST_TIMEOUT);

    const headers = buildAuthHeaders(token, config);

    try {
      const response = await fetch(
        `${config.backendApiUrl}/api/v1/payments/stripe/update-subscription?test_mode=${testMode}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            new_price_id: newPriceId,
            proration_behavior: prorate ? "create_prorations" : "none",
          }),
          cache: "no-store",
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        let message = "Failed to update subscription.";
        try {
          const errorBody = await response.json();
          if (errorBody?.detail) {
            message = errorBody.detail;
          }
        } catch {
          // ignore
        }
        return { success: false, error: message };
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message,
        newPriceId: data.price_id,
      };
    } catch (requestError) {
      clearTimeout(timeoutId);
      if (requestError instanceof Error && requestError.name === "AbortError") {
        return { success: false, error: "Request timed out." };
      }
      throw requestError;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[updateSubscription] Error:", error);
    }
    return { success: false, error: "Unexpected error updating subscription." };
  }
}
