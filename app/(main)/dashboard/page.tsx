import { requireAuth } from "@/lib/auth-server";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Code2, Users } from "lucide-react";
import Link from "next/link";

function formatRole(role: string): string {
  const roleMap: Record<string, string> = {
    platform_operator: "Platform Operator",
    developer: "Developer",
    end_user: "End User",
  };
  return roleMap[role] || role;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-muted-foreground">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
            <Badge variant="secondary">{formatRole(user.role)}</Badge>
            {!user.is_active && (
              <Badge variant="destructive">Account Inactive</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Member since {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      {/* Role-Specific Content */}
      <div className="space-y-6">
        {user.role === "platform_operator" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Platform Operator Panel
            </h2>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-4">
                Manage developers, monitor projects, and oversee platform
                health.
              </p>
              <div className="space-y-2">
                <Button variant="outline" disabled className="w-full">
                  View All Developers
                </Button>
                <Button variant="outline" disabled className="w-full">
                  Platform Analytics
                </Button>
                <Button variant="outline" disabled className="w-full">
                  System Settings
                </Button>
              </div>
            </div>
          </div>
        )}

        {user.role === "developer" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Developer Console
            </h2>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-4">
                Manage your projects, API keys, and end users.
              </p>
              <div className="space-y-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/console" className="font-semibold">
                    Go to Console
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/console/projects" className="font-semibold">
                    View Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {user.role === "end_user" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Account
            </h2>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-4">
                Access your profile, settings, and usage information.
              </p>
              <div className="grid gap-2 md:grid-cols-3">
                <Button variant="outline" disabled className="w-full">
                  Profile Settings
                </Button>
                <Button variant="outline" disabled className="w-full">
                  Usage History
                </Button>
                <Button variant="outline" disabled className="w-full">
                  Billing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sign Out Button */}
      <div className="mt-8 flex justify-end">
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
