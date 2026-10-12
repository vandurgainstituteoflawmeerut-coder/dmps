import { hadBrowserCopy } from "./browser-copy";
import { buildRegisterFile, parseRegisterFile } from "./register-file";
import { pullOfficeRegister, pushOfficeRegister as pushOfficeRpc, schoolSignIn, schoolSignOut } from "./register-rpc";
import { useSchoolStore } from "./store";

const TOKEN_KEY = "swami-office-token";

let applying = false;
let dirty = false;
let lastUpdated = "";
let status = "College register";
const listeners = new Set<(value: string) => void>();

function setStatus(value: string) {
  status = value;
  listeners.forEach((listener) => listener(value));
}

export function readOfficeStatus() {
  return status;
}

export function subscribeOfficeStatus(listener: (value: string) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

function writeToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function quietly(run: () => void) {
  applying = true;
  try {
    run();
  } finally {
    applying = false;
  }
}

function applyPayload(payload: string, accountId: string, updatedAt: string) {
  const parsed = parseRegisterFile(payload);
  if (typeof parsed === "string") return false;
  quietly(() => {
    useSchoolStore.getState().applyRegister(parsed.data);
    useSchoolStore.setState({ sessionId: accountId });
    useSchoolStore.getState().markFileExported(updatedAt);
  });
  lastUpdated = updatedAt;
  dirty = false;
  return true;
}

export async function bootOfficeRegister() {
  const token = readToken();
  if (!token) return;
  try {
    const pulled = await pullOfficeRegister({ data: { token } });
    if (!pulled.ok) {
      clearToken();
      quietly(() => useSchoolStore.getState().logout());
      return;
    }
    applyPayload(pulled.payload, pulled.accountId, pulled.updatedAt);
    setStatus("Saved to the college register");
  } catch {
    setStatus("Showing this phone’s last copy");
  }
}

export async function signInShared(username: string, password: string): Promise<boolean> {
  try {
    const remote = await schoolSignIn({ data: { username, password } });
    if (!remote.ok) return false;
    writeToken(remote.token);
    if (remote.seeded && hadBrowserCopy && remote.role === "Manager") {
      const local = useSchoolStore.getState();
      const match = local.accounts.find((row) => row.username.toLowerCase() === username.trim().toLowerCase());
      quietly(() => useSchoolStore.setState({ sessionId: match?.id ?? remote.accountId }));
      await pushOfficeNow();
      setStatus("This browser’s register is now the college copy");
      return true;
    }
    applyPayload(remote.payload, remote.accountId, remote.updatedAt);
    setStatus("Signed in — same register on every phone");
    return true;
  } catch (error) {
    console.error("office sign-in failed", error);
    setStatus("This phone only — the college register did not answer");
    return useSchoolStore.getState().login(username, password);
  }
}

export async function signOutShared() {
  const token = readToken();
  clearToken();
  quietly(() => useSchoolStore.getState().logout());
  if (token) void schoolSignOut({ data: { token } }).catch(() => undefined);
  setStatus("Signed out");
}

export async function pushOfficeRegister() {
  await pushOfficeNow();
}

async function pushOfficeNow() {
  const token = readToken();
  if (!token) return;
  const state = useSchoolStore.getState();
  const file = buildRegisterFile(state, new Date().toISOString());
  setStatus("Saving to the college register…");
  const result = await pushOfficeRpc({
    data: { token, payload: JSON.stringify(file), baseUpdatedAt: lastUpdated },
  });
  if (!result.ok) {
    if (result.reason === "expired") {
      clearToken();
      quietly(() => useSchoolStore.getState().logout());
      setStatus("Sign in again");
    } else if (result.reason === "busy") {
      setStatus("Another desk is saving — try again");
    } else {
      setStatus("Could not save just now");
    }
    return;
  }
  applyPayload(result.payload, state.sessionId ?? "", result.updatedAt);
  setStatus("Saved to the college register");
}

export function startOfficeAutosave() {
  let timer: number | undefined;
  const unsub = useSchoolStore.subscribe(() => {
    if (applying) return;
    if (!readToken()) return;
    dirty = true;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      void pushOfficeNow().catch(() => setStatus("Could not save just now"));
    }, 1200);
  });
  const poll = window.setInterval(() => {
    if (dirty || applying) return;
    const token = readToken();
    if (!token) return;
    void pullOfficeRegister({ data: { token } })
      .then((pulled) => {
        if (!pulled.ok) {
          if (pulled.reason === "expired") {
            clearToken();
            quietly(() => useSchoolStore.getState().logout());
          }
          return;
        }
        if (dirty || Math.abs(Date.parse(pulled.updatedAt) - Date.parse(lastUpdated)) < 1500) return;
        applyPayload(pulled.payload, pulled.accountId, pulled.updatedAt);
        setStatus("Updated from another desk");
      })
      .catch(() => undefined);
  }, 8000);
  return () => {
    unsub();
    window.clearTimeout(timer);
    window.clearInterval(poll);
  };
}
