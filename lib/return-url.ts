/**
 * Sanitize a return URL to prevent open redirect vulnerabilities.
 *
 * Only allows same-origin relative paths that start with a single forward
 * slash. Rejects double-slash prefixes, control characters, and overly long
 * values to guard against malicious input.
 */
export function sanitizeReturnUrl(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    // Ignore decoding errors and fall back to the trimmed value
  }

  if (!decoded.startsWith("/")) {
    return null;
  }

  if (decoded.startsWith("//")) {
    return null;
  }

  if (
    decoded.includes("\\") ||
    decoded.includes("\n") ||
    decoded.includes("\r")
  ) {
    return null;
  }

  if (decoded.length > 2048) {
    return null;
  }

  return decoded;
}
