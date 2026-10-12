export async function hashPassword(username: string, password: string): Promise<string> {
  const payload = `${username.trim().toLowerCase()}\0${password}`;
  const bytes = new TextEncoder().encode(payload);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
