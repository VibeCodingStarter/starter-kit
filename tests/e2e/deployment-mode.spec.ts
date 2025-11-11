import { type Page, expect, test } from "@playwright/test";

const CONFIG_ERROR_TEXT =
  "DEVKIT4AI_OPERATOR_KEY is required when DEVKIT4AI_MODE=operator.";

const expectMissingSecretWarning = async (page: Page) => {
  await page.goto("/");

  const banner = page.locator("text=ERROR: " + CONFIG_ERROR_TEXT);
  await expect(banner).toBeVisible();

  const severityBadge = page.locator("text=ERROR:");
  await expect(severityBadge).toBeVisible();

  // Ensure no readiness message is shown indicating the app is aware of the misconfiguration
  await expect(page.locator("text=Configuration looks good")).not.toBeVisible();
};

test("surface configuration issues when required secrets are missing", async ({
  page,
}) => {
  await expectMissingSecretWarning(page);
});
