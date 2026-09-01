import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'saffan_auth_session';

/**
 * Validate credentials against environment variables.
 * Default fallback credentials for local development if not set in .env.
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || 'saffanakbar942@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'saffan_secure_pass_2026';

  if (!email || !password) return false;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase() && password === adminPassword;
}

/**
 * Check whether the current user is authenticated
 */
export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;

  const expectedSecret = process.env.AUTH_SECRET || 'saffan_default_jwt_secret_key_2026';
  return sessionCookie.value.startsWith('saffan_authenticated_') && sessionCookie.value.includes(expectedSecret.slice(0, 8));
}

/**
 * Generate a session token
 */
export function generateSessionToken(): string {
  const secret = process.env.AUTH_SECRET || 'saffan_default_jwt_secret_key_2026';
  return `saffan_authenticated_${Date.now()}_${secret.slice(0, 8)}`;
}
