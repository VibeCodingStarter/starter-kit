/**
 * TypeScript types matching backend API auth payloads
 */

export interface ProvisioningData {
  project_id?: string;
  api_key?: string;
  developer_key?: string;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  provisioning?: ProvisioningData;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
}

export interface ApiErrorResponse {
  detail: string;
}

export interface RegistrationFormData {
  email: string;
  password: string;
}

/**
 * User data with role information from /api/v1/auth/me
 */
export interface UserWithRole {
  id: string;
  email: string;
  role: 'platform_operator' | 'developer' | 'end_user';
  is_active: boolean;
  created_at: string;
}

/**
 * Authentication error types
 */
export type AuthError = 
  | 'no_token'
  | 'invalid_token'
  | 'expired_token'
  | 'inactive_user'
  | 'network_error'
  | 'unauthorized_role';

/**
 * Result of authentication check
 */
export interface AuthResult {
  success: boolean;
  user?: UserWithRole;
  error?: AuthError;
  message?: string;
}

/**
 * Authentication context value for client components
 */
export interface AuthContextValue {
  /** Current authenticated user or null if not authenticated */
  user: UserWithRole | null;
  /** Whether authentication check is in progress (always false after hydration) */
  isLoading: boolean;
}
