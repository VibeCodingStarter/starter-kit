import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "lucide-react";
import type { TransactionInfo } from "@/lib/payments/actions";

interface TransactionListProps {
  transactions: TransactionInfo[];
  total?: number;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatAmount(amount: number, currency: string): string {
  const dollars = amount / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(dollars);
}

function formatStatus(status: string): { label: string; variant: "default" | "secondary" | "destructive" | "outline" } {
  switch (status.toLowerCase()) {
    case "completed":
      return { label: "Completed", variant: "default" };
    case "pending":
      return { label: "Pending", variant: "secondary" };
    case "failed":
      return { label: "Failed", variant: "destructive" };
    case "refunded":
      return { label: "Refunded", variant: "outline" };
    case "partially_refunded":
      return { label: "Partial Refund", variant: "outline" };
    default:
      return { label: status, variant: "secondary" };
  }
}

export function TransactionList({ transactions, total }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No transactions found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Payment History
          {total !== undefined && total > transactions.length && (
            <span className="text-sm font-normal text-muted-foreground">
              (Showing {transactions.length} of {total})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const statusInfo = formatStatus(transaction.status);
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {transaction.description || "Payment"}
                    </p>
                    <Badge variant={statusInfo.variant} className="text-xs">
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(transaction.created_at)}
                  </p>
                  {transaction.refunded_amount_cents > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Refunded:{" "}
                      {formatAmount(
                        transaction.refunded_amount_cents,
                        transaction.currency
                      )}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatAmount(
                      transaction.amount_cents,
                      transaction.currency
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">Stripe</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
