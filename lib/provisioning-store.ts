import { cookies, headers } from "next/headers";
import type { ProvisioningData } from "./types/auth";

const shouldUseSecureCookies = async (): Promise<boolean> => {
  const headerStore = await headers();
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const host = headerStore.get("host") ?? "";

  const isLocalHost =
    host.startsWith("localhost") || host.startsWith("127.0.0.1");

  const isHttps = forwardedProto === "https";

  if (isHttps && !isLocalHost) {
    return true;
  }

  return false;
};

const COOKIE_NAME = "devkit4ai-provisioning";
const PROVISIONING_STORE_TTL = 60 * 60 * 24; // 24 hours

type StoredBundle = ProvisioningData & { recorded_at: string };

const serializeBundle = (bundle: StoredBundle): string =>
  JSON.stringify(bundle);

const deserializeBundle = (value: string): StoredBundle | null => {
  if (!value || value.trim() === "") {
    if (process.env.NODE_ENV === "development") {
      console.error("[provisioning-store] Empty cookie value");
    }
    return null;
  }

  try {
    const parsed = JSON.parse(value) as StoredBundle;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[provisioning-store] Failed to parse bundle:", {
        value,
        error,
      });
    }
    return null;
  }
};

const toProvisioningData = (
  bundle: StoredBundle | null
): ProvisioningData | null => {
  if (!bundle) {
    return null;
  }

  return {
    project_id: bundle.project_id,
    api_key: bundle.api_key,
    developer_key: bundle.developer_key,
  };
};

export async function storeProvisioningBundle(
  bundle: ProvisioningData
): Promise<void> {
  // Validate input
  if (!bundle) {
    throw new Error("[provisioning-store] Bundle is null or undefined");
  }

  if (!bundle.project_id || !bundle.api_key || !bundle.developer_key) {
    throw new Error(
      `[provisioning-store] Invalid bundle: missing fields - project_id: ${!!bundle.project_id}, api_key: ${!!bundle.api_key}, developer_key: ${!!bundle.developer_key}`
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] Storing bundle:", {
      project_id: bundle.project_id,
      has_api_key: !!bundle.api_key,
      has_developer_key: !!bundle.developer_key,
    });
  }

  const cookieStore = await cookies();
  const existing = cookieStore.get(COOKIE_NAME);

  if (existing) {
    const current = deserializeBundle(existing.value);
    const isDuplicate =
      current?.api_key === bundle.api_key &&
      current?.developer_key === bundle.developer_key &&
      current?.project_id === bundle.project_id;

    if (isDuplicate) {
      if (process.env.NODE_ENV === "development") {
        console.log("[provisioning-store] Duplicate bundle, skipping");
      }
      return;
    }
  }

  const payload: StoredBundle = {
    project_id: bundle.project_id,
    api_key: bundle.api_key,
    developer_key: bundle.developer_key,
    recorded_at: new Date().toISOString(),
  };

  const secure = await shouldUseSecureCookies();
  const serialized = serializeBundle(payload);

  // Validate serialized data before setting cookie
  if (!serialized || serialized.trim() === "") {
    throw new Error("[provisioning-store] Cannot set cookie with empty value");
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] About to set cookie with:");
    console.log("  - Cookie name:", COOKIE_NAME);
    console.log("  - Serialized length:", serialized.length);
    console.log("  - Serialized payload:", serialized);
    console.log("  - Secure:", secure);
    console.log("  - HttpOnly: true");
    console.log("  - SameSite: lax");
    console.log("  - MaxAge:", PROVISIONING_STORE_TTL);
    console.log("  - Path: /");
  }

  try {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, serialized, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      maxAge: PROVISIONING_STORE_TTL,
      path: "/",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[provisioning-store] Cookie set successfully");

      // Verify it was set immediately
      const verification = cookieStore.get(COOKIE_NAME);
      console.log(
        "[provisioning-store] Verification - cookie exists:",
        !!verification
      );
      if (verification) {
        console.log(
          "[provisioning-store] Verification - value length:",
          verification.value?.length
        );
        console.log(
          "[provisioning-store] Verification - first 50 chars:",
          verification.value?.substring(0, 50)
        );
      } else {
        console.error("[provisioning-store] ERROR: Cookie was not set!");
      }
    }
  } catch (error) {
    console.error("[provisioning-store] Failed to set cookie:", error);
    throw error;
  }
}

export async function getProvisioningBundle(): Promise<ProvisioningData | null> {
  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] getProvisioningBundle called");
  }

  const cookieStore = await cookies();

  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] Cookie store obtained");

    // List all cookies
    const allCookies = cookieStore.getAll();
    console.log(
      "[provisioning-store] All cookies:",
      allCookies.map((c) => c.name)
    );
  }

  const stored = cookieStore.get(COOKIE_NAME);

  if (!stored) {
    if (process.env.NODE_ENV === "development") {
      console.log("[provisioning-store] No provisioning cookie found");
    }
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] Found cookie");
    console.log(
      "[provisioning-store] Cookie value length:",
      stored.value?.length || 0
    );
    console.log(
      "[provisioning-store] Cookie value (first 100 chars):",
      stored.value?.substring(0, 100) || "(empty)"
    );
  }

  const deserialized = deserializeBundle(stored.value);
  if (!deserialized) {
    if (process.env.NODE_ENV === "development") {
      console.error("[provisioning-store] Failed to deserialize cookie");
    }
    return null;
  }

  return toProvisioningData(deserialized);
}

export async function consumeProvisioningBundle(): Promise<ProvisioningData | null> {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "[provisioning-store] consumeProvisioningBundle called (read + delete)"
    );
  }

  const cookieStore = await cookies();
  const stored = cookieStore.get(COOKIE_NAME);

  if (!stored) {
    if (process.env.NODE_ENV === "development") {
      console.log("[provisioning-store] No cookie to consume");
    }
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      "[provisioning-store] Consuming cookie, value length:",
      stored.value?.length || 0
    );
  }

  const bundle = toProvisioningData(deserializeBundle(stored.value));

  // Clear the cookie to enforce one-time visibility
  cookieStore.delete(COOKIE_NAME);

  if (process.env.NODE_ENV === "development") {
    console.log("[provisioning-store] Cookie deleted (one-time visibility)");
  }

  return bundle;
}

export async function clearProvisioningBundle(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
