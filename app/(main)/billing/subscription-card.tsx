"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CreditCard,
  ExternalLink,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { SubscriptionInfo } from "@/lib/payments/actions";
import {
  createCustomerPortalSession,
  cancelSubscription,
} from "@/lib/payments/actions";

interface SubscriptionCardProps {
  subscription: SubscriptionInfo;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatStatus(status: string): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} {
  switch (status.toLowerCase()) {
    case "active":
      return { label: "Active", variant: "default" };
    case "trialing":
      return { label: "Trial", variant: "secondary" };
    case "past_due":
      return { label: "Past Due", variant: "destructive" };
    case "cancelled":
      return { label: "Cancelled", variant: "outline" };
    default:
      return { label: status, variant: "secondary" };
  }
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const statusInfo = formatStatus(subscription.status);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleManageSubscription = () => {
    setError(null);
    startTransition(async () => {
      const returnUrl =
        typeof window !== "undefined" ? window.location.href : "/billing";
      const result = await createCustomerPortalSession(
        returnUrl,
        subscription.is_test_mode
      );
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        setError(result.error || "Failed to open customer portal");
      }
    });
  };

  const handleCancelSubscription = (immediately: boolean) => {
    setError(null);
    startTransition(async () => {
      const result = await cancelSubscription({
        cancelImmediately: immediately,
        testMode: subscription.is_test_mode,
      });
      if (result.success) {
        setCancelDialogOpen(false);
        window.location.reload();
      } else {
        setError(result.error || "Failed to cancel subscription");
      }
    });
  };

  const isActive = ["active", "trialing"].includes(
    subscription.status.toLowerCase()
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Plan</p>
            <p className="font-medium">
              {subscription.plan_name || "Unknown Plan"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Provider</p>
            <p className="font-medium">Stripe</p>
          </div>
        </div>

        {subscription.current_period_start &&
          subscription.current_period_end && (
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Current Period</span>
              </div>
              <div className="text-sm">
                <p>
                  {formatDate(subscription.current_period_start)} →{" "}
                  {formatDate(subscription.current_period_end)}
                </p>
              </div>
            </div>
          )}

        {subscription.cancel_at && (
          <div className="pt-4 border-t">
            <p className="text-sm text-amber-600">
              Cancels on {formatDate(subscription.cancel_at)}
            </p>
          </div>
        )}

        {error && (
          <div className="pt-4 border-t">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Subscription Management Actions */}
        <div className="pt-4 border-t flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleManageSubscription}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4 mr-2" />
            )}
            Manage Subscription
          </Button>

          {isActive && !subscription.cancel_at && (
            <AlertDialog
              open={cancelDialogOpen}
              onOpenChange={setCancelDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                  <AlertDialogDescription>
                    Choose how you want to cancel your subscription:
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-3 py-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleCancelSubscription(false)}
                    disabled={isPending}
                  >
                    {isPending && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    <div className="text-left">
                      <p className="font-medium">Cancel at period end</p>
                      <p className="text-xs text-muted-foreground">
                        Keep access until{" "}
                        {formatDate(subscription.current_period_end)}
                      </p>
                    </div>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => handleCancelSubscription(true)}
                    disabled={isPending}
                  >
                    {isPending && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    <div className="text-left">
                      <p className="font-medium">Cancel immediately</p>
                      <p className="text-xs text-muted-foreground/80">
                        Lose access right away (no refund)
                      </p>
                    </div>
                  </Button>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {subscription.is_test_mode && (
          <div className="pt-4 border-t">
            <Badge variant="outline" className="text-xs">
              Test Mode
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
