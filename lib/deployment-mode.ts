import { cache } from "react";

type RawDeploymentMode = string | undefined;

export type DeploymentMode = "operator" | "console" | "project";

export type ModeIssueSeverity = "error" | "warning";

export interface DeploymentModeIssue {
  severity: ModeIssueSeverity;
  message: string;
  envVar?: string;
}

export interface DeploymentModeSecrets {
  operatorKey?: string;
  developerKey?: string;
  projectId?: string;
  projectKey?: string;
}

export interface DeploymentModeHeaders {
  "X-User-Role"?: string;
  "X-Operator-Key"?: string;
  "X-Developer-Key"?: string;
  "X-Project-ID"?: string;
  "X-API-Key"?: string;
}

export interface DeploymentModeConfig {
  mode: DeploymentMode;
  backendApiUrl: string;
  secrets: DeploymentModeSecrets;
  headers: DeploymentModeHeaders;
  issues: DeploymentModeIssue[];
  isReady: boolean;
}

const KNOWN_MODES: readonly DeploymentMode[] = [
  "operator",
  "console",
  "project",
];

const REQUIRED_SECRETS: Record<
  DeploymentMode,
  Array<keyof DeploymentModeSecrets>
> = {
  operator: ["operatorKey"],
  console: ["developerKey"],
  project: ["developerKey", "projectId", "projectKey"],
};

const USER_ROLE_BY_MODE: Record<DeploymentMode, string> = {
  operator: "platform_operator",
  console: "developer",
  project: "end_user",
};

const isDeploymentMode = (value: RawDeploymentMode): value is DeploymentMode =>
  typeof value === "string" && KNOWN_MODES.includes(value as DeploymentMode);

const normalizeBackendUrl = (url: string) => url.replace(/\/$/, "");

const validateProjectId = (value: string | undefined) => {
  if (!value) {
    return false;
  }

  const uuidRegex =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
  return uuidRegex.test(value);
};

const resolveHeaders = (
  mode: DeploymentMode,
  secrets: DeploymentModeSecrets
): DeploymentModeHeaders => {
  const headers: DeploymentModeHeaders = {
    "X-User-Role": USER_ROLE_BY_MODE[mode],
  };

  if (mode === "operator") {
    if (secrets.operatorKey) {
      headers["X-Operator-Key"] = secrets.operatorKey;
    }
  }

  if (mode === "console" || mode === "project") {
    if (secrets.developerKey) {
      headers["X-Developer-Key"] = secrets.developerKey;
    }
  }

  if (mode === "project") {
    if (secrets.projectId) {
      headers["X-Project-ID"] = secrets.projectId;
    }

    if (secrets.projectKey) {
      headers["X-API-Key"] = secrets.projectKey;
    }
  }

  return headers;
};

const collectIssues = (
  config: Pick<DeploymentModeConfig, "mode" | "backendApiUrl" | "secrets">
): DeploymentModeIssue[] => {
  const issues: DeploymentModeIssue[] = [];

  if (!config.backendApiUrl) {
    issues.push({
      severity: "error",
      envVar: "NEXT_PUBLIC_API_URL",
      message: "NEXT_PUBLIC_API_URL must be defined to reach the backend API.",
    });
  }

  const requiredSecrets = REQUIRED_SECRETS[config.mode];
  for (const key of requiredSecrets) {
    const value = config.secrets[key];
    if (!value) {
      issues.push({
        severity: "error",
        envVar: envVarNameForSecret(key),
        message: `${envVarNameForSecret(key)} is required when DEVKIT4AI_MODE=${
          config.mode
        }.`,
      });
    }
  }

  if (config.mode === "project") {
    if (
      config.secrets.projectId &&
      !validateProjectId(config.secrets.projectId)
    ) {
      issues.push({
        severity: "error",
        envVar: "DEVKIT4AI_PROJECT_ID",
        message: "DEVKIT4AI_PROJECT_ID must be a valid UUID.",
      });
    }
  }

  return issues;
};

const envVarNameForSecret = (key: keyof DeploymentModeSecrets): string => {
  switch (key) {
    case "operatorKey":
      return "DEVKIT4AI_OPERATOR_KEY";
    case "developerKey":
      return "DEVKIT4AI_DEVELOPER_KEY";
    case "projectId":
      return "DEVKIT4AI_PROJECT_ID";
    case "projectKey":
      return "DEVKIT4AI_PROJECT_KEY";
    default:
      throw new Error(`Unknown secret key: ${key}`);
  }
};

export const hydrateDeploymentMode = cache((): DeploymentModeConfig => {
  const rawMode = process.env.DEVKIT4AI_MODE?.toLowerCase();
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL
    ? normalizeBackendUrl(process.env.NEXT_PUBLIC_API_URL)
    : "";

  const secrets: DeploymentModeSecrets = {
    operatorKey: process.env.DEVKIT4AI_OPERATOR_KEY,
    developerKey: process.env.DEVKIT4AI_DEVELOPER_KEY,
    projectId: process.env.DEVKIT4AI_PROJECT_ID,
    projectKey: process.env.DEVKIT4AI_PROJECT_KEY,
  };

  const issues: DeploymentModeIssue[] = [];

  let mode: DeploymentMode = "operator";
  if (!rawMode) {
    issues.push({
      severity: "error",
      envVar: "DEVKIT4AI_MODE",
      message:
        "DEVKIT4AI_MODE must be defined (operator, console, or project).",
    });
  } else if (isDeploymentMode(rawMode)) {
    mode = rawMode;
  } else {
    issues.push({
      severity: "error",
      envVar: "DEVKIT4AI_MODE",
      message: `DEVKIT4AI_MODE must be one of: ${KNOWN_MODES.join(", ")}.`,
    });
  }

  const envIssues = collectIssues({ mode, backendApiUrl, secrets });
  issues.push(...envIssues);

  try {
    if (backendApiUrl) {
      new URL(backendApiUrl);
    }
  } catch {
    issues.push({
      severity: "error",
      envVar: "NEXT_PUBLIC_API_URL",
      message: "NEXT_PUBLIC_API_URL must be a valid URL (including protocol).",
    });
  }

  const headers = resolveHeaders(mode, secrets);
  const isReady = issues.every((issue) => issue.severity !== "error");

  return {
    mode,
    backendApiUrl,
    secrets,
    headers,
    issues,
    isReady,
  };
});
