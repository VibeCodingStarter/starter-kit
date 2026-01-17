import { getCurrentUser } from "@/lib/auth-server";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";
import { TestPaymentForm } from "./test-payment-form";
import { Badge } from "@/components/ui/badge";
import { User, FolderKanban } from "lucide-react";

export default async function TestPaymentPage() {
  const user = await getCurrentUser();
  const deploymentConfig = await hydrateDeploymentMode();

  const projectId = deploymentConfig.secrets.projectId;

  return (
    <div className="container mx-auto py-12 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Test Payment Integration</h1>

      {/* Context Info */}
      <div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">User:</span>
          {user ? (
            <span className="font-medium">{user.email}</span>
          ) : (
            <Badge variant="outline" className="text-amber-600">
              Not authenticated
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FolderKanban className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Project:</span>
          {projectId ? (
            <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
              {projectId}
            </code>
          ) : (
            <Badge variant="outline" className="text-amber-600">
              No project configured
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Mode:</span>
          <Badge variant="secondary">{deploymentConfig.mode}</Badge>
        </div>
      </div>

      <TestPaymentForm />
    </div>
  );
}
