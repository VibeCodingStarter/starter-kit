import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { getMySubscription, getMyTransactions } from "@/lib/payments/actions";
import { SubscriptionCard } from "./subscription-card";
import { TransactionList } from "./transaction-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function BillingPage() {
  const user = await requireAuth();

  // Only end users should see this page
  if (user.role !== "end_user") {
    redirect("/dashboard");
  }

  // Fetch subscription and transactions
  const subscriptionResult = await getMySubscription(true);
  const transactionsResult = await getMyTransactions(true, 1, 50);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and view payment history
        </p>
      </div>

      {/* Error States */}
      {!subscriptionResult.success && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {subscriptionResult.error || "Failed to load subscription"}
          </AlertDescription>
        </Alert>
      )}

      {!transactionsResult.success && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {transactionsResult.error || "Failed to load transactions"}
          </AlertDescription>
        </Alert>
      )}

      {/* Subscription Card */}
      <div className="space-y-6">
        {subscriptionResult.success && subscriptionResult.subscription ? (
          <SubscriptionCard subscription={subscriptionResult.subscription} />
        ) : (
          <Alert className="mb-6">
            <AlertDescription>
              You don&apos;t have an active subscription. Contact the project
              owner to subscribe.
            </AlertDescription>
          </Alert>
        )}

        {/* Transaction List */}
        {transactionsResult.success && transactionsResult.transactions && (
          <TransactionList 
            transactions={transactionsResult.transactions}
            total={transactionsResult.total}
          />
        )}
      </div>
    </div>
  );
}
