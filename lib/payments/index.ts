/**
 * Payment utilities for Starter Kit developers.
 *
 * This module provides easy-to-use functions and components for
 * integrating Stripe payments into your project.
 *
 * @example
 * ```tsx
 * // Using the server action directly
 * import { createCheckoutSession } from "@/lib/payments";
 *
 * const result = await createCheckoutSession({
 *   priceId: "price_abc123",
 *   successUrl: "/success",
 *   testMode: true, // defaults to true
 * });
 *
 * if (result.success) {
 *   redirect(result.checkoutUrl);
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using the PaymentButton component
 * import { PaymentButton } from "@/lib/payments";
 *
 * export function PricingCard() {
 *   return (
 *     <PaymentButton
 *       priceId="price_abc123"
 *       successUrl="/dashboard"
 *       cancelUrl="/pricing"
 *     >
 *       Subscribe Now
 *     </PaymentButton>
 *   );
 * }
 * ```
 *
 * @module
 */

export {
  createCheckoutSession,
  getSubscription,
  getMySubscription,
  getMyTransactions,
  createCustomerPortalSession,
  cancelSubscription,
  updateSubscription,
  type CheckoutOptions,
  type CheckoutResult,
  type SubscriptionInfo,
  type GetSubscriptionResult,
  type TransactionInfo,
  type GetTransactionsResult,
  type CustomerPortalResult,
  type CancelSubscriptionOptions,
  type CancelSubscriptionResult,
  type UpdateSubscriptionOptions,
  type UpdateSubscriptionResult,
} from "./actions";

export { PaymentButton } from "./payment-button";
