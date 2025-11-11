import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type EnvOverrides = Record<string, string | undefined>;

const loadHydrator = async () => {
  vi.resetModules();
  const deploymentModule = await import("../../lib/deployment-mode");
  return deploymentModule.hydrateDeploymentMode;
};

const applyEnv = (overrides: EnvOverrides) => {
  const nextEnv: NodeJS.ProcessEnv = { ...process.env };

  for (const [key, value] of Object.entries(overrides)) {
    if (typeof value === "undefined") {
      delete nextEnv[key];
    } else {
      nextEnv[key] = value;
    }
  }

  process.env = nextEnv;
};

const restoreEnv = (envSnapshot: NodeJS.ProcessEnv) => {
  process.env = envSnapshot;
};

describe("hydrateDeploymentMode", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    restoreEnv(originalEnv);
  });

  it("derives operator configuration and headers when operator mode is configured", async () => {
    applyEnv({
      DEVKIT4AI_MODE: "operator",
      DEVKIT4AI_OPERATOR_KEY: "op-secret",
      NEXT_PUBLIC_API_URL: "https://api.example.com/api/v1/",
    });

    const hydrate = await loadHydrator();
    const config = hydrate();

    expect(config.mode).toBe("operator");
    expect(config.backendApiUrl).toBe("https://api.example.com/api/v1");
    expect(config.headers).toStrictEqual({
      "X-User-Role": "platform_operator",
      "X-Operator-Key": "op-secret",
    });
    expect(config.issues).toHaveLength(0);
    expect(config.isReady).toBe(true);
  });

  it("collects missing API URL issue when backend URL is absent", async () => {
    applyEnv({
      DEVKIT4AI_MODE: "console",
      DEVKIT4AI_DEVELOPER_KEY: "dev-secret",
      NEXT_PUBLIC_API_URL: undefined,
    });

    const hydrate = await loadHydrator();
    const config = hydrate();

    expect(config.mode).toBe("console");
    expect(config.headers).toMatchObject({
      "X-User-Role": "developer",
      "X-Developer-Key": "dev-secret",
    });
    expect(config.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          severity: "error",
          envVar: "NEXT_PUBLIC_API_URL",
        }),
      ])
    );
    expect(config.isReady).toBe(false);
  });

  it("validates project mode requirements including UUID shape", async () => {
    applyEnv({
      DEVKIT4AI_MODE: "project",
      DEVKIT4AI_DEVELOPER_KEY: "dev-key",
      DEVKIT4AI_PROJECT_ID: "not-a-uuid",
      DEVKIT4AI_PROJECT_KEY: undefined,
      NEXT_PUBLIC_API_URL: "https://api.example.com",
    });

    const hydrate = await loadHydrator();
    const config = hydrate();

    expect(config.mode).toBe("project");
    expect(config.headers["X-User-Role"]).toBe("end_user");
    expect(config.headers["X-Developer-Key"]).toBe("dev-key");
    expect(config.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ envVar: "DEVKIT4AI_PROJECT_KEY" }),
        expect.objectContaining({ envVar: "DEVKIT4AI_PROJECT_ID" }),
      ])
    );
    expect(config.isReady).toBe(false);
  });

  it("flags invalid deployment mode values while retaining default role headers", async () => {
    applyEnv({
      DEVKIT4AI_MODE: "staging",
      NEXT_PUBLIC_API_URL: "https://api.example.com",
    });

    const hydrate = await loadHydrator();
    const config = hydrate();

    expect(config.mode).toBe("operator");
    expect(config.headers["X-User-Role"]).toBe("platform_operator");
    expect(config.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          envVar: "DEVKIT4AI_MODE",
          severity: "error",
        }),
      ])
    );
    expect(config.isReady).toBe(false);
  });
});
