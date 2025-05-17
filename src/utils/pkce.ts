// src/utils/pkce.ts

/**
 * Generates a random string for PKCE authentication
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map(x => possible.charAt(x % possible.length))
    .join('');
}

/**
 * Creates a code challenge from a code verifier for PKCE
 * @param codeVerifier - The code verifier string
 * @returns Code challenge string
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates a PKCE code verifier and challenge
 * @returns Object containing code verifier and challenge
 */
export async function generatePKCEPair(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

/**
 * Saves PKCE code verifier to local storage
 * @param codeVerifier - The code verifier to save
 */
export function saveCodeVerifier(codeVerifier: string): void {
  localStorage.setItem('pkce_code_verifier', codeVerifier);
}

/**
 * Gets PKCE code verifier from local storage
 * @returns The stored code verifier or null if not found
 */
export function getCodeVerifier(): string | null {
  return localStorage.getItem('pkce_code_verifier');
}

/**
 * Clears PKCE code verifier from local storage
 */
export function clearCodeVerifier(): void {
  localStorage.removeItem('pkce_code_verifier');
}
