import { requireAuth } from "@/lib/auth-server";
import { signOutAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert, Code2, Users } from "lucide-react";
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

      {/* Role-Based Sections - Each on Own Row */}
      <div className="space-y-6">
        {/* Platform Operator Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Platform Operator Panel
          </h2>
          {user.role === "platform_operator" ? (
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
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg border border-dashed">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-muted-foreground">
                    Platform Operator Access Required
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don&apos;t have permission to view this section. Contact
                    your platform administrator.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Developer Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Developer Console
          </h2>
          {user.role === "developer" ? (
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-4">
                Manage your projects, API keys, and end users.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">API Keys</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">End Users</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="default" asChild className="w-full">
                  <Link href="/console">Go to Console</Link>
                </Button>
                <Button variant="outline" disabled className="w-full">
                  View Projects
                </Button>
                <Button variant="outline" disabled className="w-full">
                  Manage API Keys
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg border border-dashed">
              <div className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-muted-foreground">
                    Developer Access Required
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don&apos;t have permission to view this section.
                    Register as a developer to access the console.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* End User Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Account
          </h2>
          {user.role === "end_user" ? (
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
          ) : (
            <div className="bg-muted/50 p-6 rounded-lg border border-dashed">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-muted-foreground">
                    End User Access Required
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don&apos;t have permission to view this section. This
                    area is for end users only.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
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
