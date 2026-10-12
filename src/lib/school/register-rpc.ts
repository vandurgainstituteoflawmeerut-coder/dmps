import { createServerFn } from "@tanstack/react-start";

export const schoolSignIn = createServerFn({ method: "POST" })
  .validator((input: { username: string; password: string }) => {
    const username = typeof input?.username === "string" ? input.username.slice(0, 80) : "";
    const password = typeof input?.password === "string" ? input.password.slice(0, 200) : "";
    if (!username || !password) throw new Error("Username and password are required.");
    return { username, password };
  })
  .handler(async ({ data }) => {
    const { signInOffice } = await import("./register-store.server");
    return signInOffice(data.username, data.password);
  });

export const schoolSignOut = createServerFn({ method: "POST" })
  .validator((input: { token: string }) => ({ token: String(input?.token ?? "").slice(0, 128) }))
  .handler(async ({ data }) => {
    const { signOutOffice } = await import("./register-store.server");
    return signOutOffice(data.token);
  });

export const pullOfficeRegister = createServerFn({ method: "POST" })
  .validator((input: { token: string }) => ({ token: String(input?.token ?? "").slice(0, 128) }))
  .handler(async ({ data }) => {
    const { pullOffice } = await import("./register-store.server");
    return pullOffice(data.token);
  });

export const pushOfficeRegister = createServerFn({ method: "POST" })
  .validator((input: { token: string; payload: string; baseUpdatedAt?: string }) => {
    const token = String(input?.token ?? "").slice(0, 128);
    const payload = typeof input?.payload === "string" ? input.payload : "";
    const baseUpdatedAt = typeof input?.baseUpdatedAt === "string" ? input.baseUpdatedAt.slice(0, 40) : "";
    if (!token || !payload) throw new Error("Missing register.");
    if (payload.length > 12_000_000) throw new Error("Register file is too large.");
    return { token, payload, baseUpdatedAt };
  })
  .handler(async ({ data }) => {
    const { pushOffice } = await import("./register-store.server");
    return pushOffice(data.token, data.payload, data.baseUpdatedAt);
  });
