"use client";

import { PaymentButton } from "@/lib/payments";
import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ExternalLink,
  XCircle,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";
import {
  getMySubscription,
  createCustomerPortalSession,
  cancelSubscription,
  updateSubscription,
  type SubscriptionInfo,
} from "@/lib/payments/actions";

export function TestPaymentForm() {
  const [priceId, setPriceId] = useState("");
  const [newPriceId, setNewPriceId] = useState("");
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
    null
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  // Auto-load subscription on mount
  useEffect(() => {
    startTransition(async () => {
      const result = await getMySubscription(true);
      if (result.success) {
        setSubscription(result.subscription || null);
      }
    });
  }, []);

  const handleRefreshSubscription = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await getMySubscription(true);
      if (result.success) {
        setSubscription(result.subscription || null);
        setMessage({
          type: "success",
          text: result.subscription
            ? "Subscription loaded"
            : "No active subscription",
        });
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to load subscription",
        });
      }
    });
  };

  const handleCustomerPortal = () => {
    setMessage(null);
    startTransition(async () => {
      const returnUrl =
        typeof window !== "undefined" ? window.location.href : "/test-payment";
      const result = await createCustomerPortalSession(returnUrl, true);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to open portal",
        });
      }
    });
  };

  const handleCancelSubscription = (immediately: boolean) => {
    setMessage(null);
    startTransition(async () => {
      const result = await cancelSubscription({
        cancelImmediately: immediately,
        testMode: true,
      });
      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Subscription canceled",
        });
        handleRefreshSubscription();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to cancel" });
      }
    });
  };

  const handleUpdateSubscription = () => {
    if (!newPriceId) {
      setMessage({ type: "error", text: "Enter a new price ID" });
      return;
    }
    setMessage(null);
    startTransition(async () => {
      const result = await updateSubscription({
        newPriceId,
        prorate: true,
        testMode: true,
      });
      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Subscription updated",
        });
        handleRefreshSubscription();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update" });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Message Display */}
      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Create Checkout Session */}
      <div className="p-6 border rounded-lg bg-card space-y-4">
        <h3 className="font-semibold">1. Create Subscription</h3>
        <div>
          <label className="block text-sm font-medium mb-1">
            Stripe Price ID
          </label>
          <input
            type="text"
            value={priceId}
            onChange={(e) => setPriceId(e.target.value)}
            placeholder="price_xxxxxxxxxxxxx"
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Get this from Stripe Dashboard → Products → Price ID
          </p>
        </div>

        <PaymentButton
          priceId={priceId}
          testMode={true}
          successUrl={`${
            typeof window !== "undefined" ? window.location.origin : ""
          }/test-payment?success=true`}
          cancelUrl={`${
            typeof window !== "undefined" ? window.location.origin : ""
          }/test-payment?cancelled=true`}
          onPaymentError={(error) => setMessage({ type: "error", text: error })}
          disabled={!priceId}
          className="w-full"
        >
          Test Checkout (Test Mode)
        </PaymentButton>

        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <p className="font-medium">Test Card Numbers:</p>
          <p>
            ✓ Success: <code>4242 4242 4242 4242</code>
          </p>
          <p>
            ✗ Decline: <code>4000 0000 0000 0002</code>
          </p>
          <p>
            ⚠ Auth Required: <code>4000 0025 0000 3155</code>
          </p>
        </div>
      </div>

      {/* Current Subscription */}
      <div className="p-6 border rounded-lg bg-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">2. Current Subscription</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshSubscription}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>

        {subscription ? (
          <div className="space-y-2 p-3 bg-muted/50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {subscription.plan_name || "Unknown Plan"}
              </span>
              <Badge
                variant={
                  subscription.status === "active" ? "default" : "secondary"
                }
              >
                {subscription.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              ID: <code>{subscription.subscription_id}</code>
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Click refresh to load your current subscription
          </p>
        )}
      </div>

      {/* Customer Portal */}
      <div className="p-6 border rounded-lg bg-card space-y-4">
        <h3 className="font-semibold">3. Customer Portal</h3>
        <p className="text-sm text-muted-foreground">
          Open Stripe&apos;s hosted portal to manage payment methods, view
          invoices, and more.
        </p>
        <Button
          variant="outline"
          onClick={handleCustomerPortal}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ExternalLink className="h-4 w-4 mr-2" />
          )}
          Open Customer Portal
        </Button>
      </div>

      {/* Update Subscription */}
      <div className="p-6 border rounded-lg bg-card space-y-4">
        <h3 className="font-semibold">4. Upgrade/Downgrade Plan</h3>
        <div>
          <label className="block text-sm font-medium mb-1">New Price ID</label>
          <input
            type="text"
            value={newPriceId}
            onChange={(e) => setNewPriceId(e.target.value)}
            placeholder="price_xxxxxxxxxxxxx"
            className="w-full px-3 py-2 border rounded-md bg-background"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter a different price ID to upgrade or downgrade
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleUpdateSubscription}
          disabled={isPending || !newPriceId || !subscription}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <ArrowUpDown className="h-4 w-4 mr-2" />
          )}
          Update Subscription
        </Button>
      </div>

      {/* Cancel Subscription */}
      <div className="p-6 border rounded-lg bg-card space-y-4">
        <h3 className="font-semibold">5. Cancel Subscription</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleCancelSubscription(false)}
            disabled={isPending || !subscription}
            className="flex-1"
          >
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Cancel at Period End
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleCancelSubscription(true)}
            disabled={isPending || !subscription}
            className="flex-1"
          >
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <XCircle className="h-4 w-4 mr-2" />
            Cancel Immediately
          </Button>
        </div>
      </div>
    </div>
  );
}
