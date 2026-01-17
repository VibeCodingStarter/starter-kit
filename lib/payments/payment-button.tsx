"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { createCheckoutSession, type CheckoutOptions } from "./actions";

interface PaymentButtonProps extends Omit<ButtonProps, "onClick" | "onError"> {
  priceId: string;
  quantity?: number;
  successUrl?: string;
  cancelUrl?: string;
  customerId?: string;
  testMode?: boolean;
  onPaymentError?: (error: string) => void;
  onSuccess?: (checkoutUrl: string, sessionId: string) => void;
  children?: React.ReactNode;
}

/**
 * A pre-built button component for initiating checkout sessions.
 *
 * This component handles the checkout flow automatically:
 * 1. Shows a loading state while creating the session
 * 2. Redirects to the payment provider's checkout page
 * 3. Calls error handler if something goes wrong
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PaymentButton priceId="price_abc123">
 *   Subscribe Now
 * </PaymentButton>
 *
 * // With custom URLs and test mode disabled
 * <PaymentButton
 *   priceId="price_abc123"
 *   successUrl="/thank-you"
 *   cancelUrl="/pricing"
 *   testMode={false}
 *   onPaymentError={(error) => toast.error(error)}
 * >
 *   Upgrade to Pro
 * </PaymentButton>
 * ```
 */
export function PaymentButton({
  priceId,
  quantity = 1,
  successUrl,
  cancelUrl,
  customerId,
  testMode = true,
  onPaymentError,
  onSuccess,
  children,
  disabled,
  ...buttonProps
}: PaymentButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);

    startTransition(async () => {
      const options: CheckoutOptions = {
        priceId,
        quantity,
        successUrl,
        cancelUrl,
        customerId,
        testMode,
      };

      const result = await createCheckoutSession(options);

      if (!result.success) {
        const errorMessage = result.error || "Failed to start checkout.";
        setError(errorMessage);
        onPaymentError?.(errorMessage);
        return;
      }

      if (result.checkoutUrl) {
        onSuccess?.(result.checkoutUrl, result.sessionId || "");
        window.location.href = result.checkoutUrl;
      } else {
        const errorMessage = "No checkout URL returned.";
        setError(errorMessage);
        onPaymentError?.(errorMessage);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={handleClick}
        disabled={disabled || isPending}
        {...buttonProps}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children || "Checkout"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
