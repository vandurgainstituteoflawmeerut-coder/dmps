import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
import { HydrateGate } from "@/components/hydrate-gate";
import { SessionGate } from "@/components/session-gate";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Swami Inter College Register";

function publicShareHost(): string {
  const fromEnv = String(import.meta.env.VITE_PUBLIC_HOSTNAME ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  const fromWindow = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";
  const host = fromEnv || fromWindow;
  if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
  if (
    host === "vercel.app" ||
    host.endsWith(".vercel.app") ||
    host === "vercel.com" ||
    host.endsWith(".vercel.com")
  ) {
    return "";
  }
  return host;
}

export const Route = createRootRoute({
  head: () => {
    const host = publicShareHost();
    const xBanner = host ? `https://${host}/x-banner.jpg` : "";
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#1F4A3E" },
      {
        name: "description",
        content:
          "Registrar desk for Dr. M. P. Swami Mem. G. Inter College, New Prabhat Nagar, Meerut — admissions, student IDs, results, fees and transfer certificates, student-wise and family-wise.",
      },
      ...(xBanner ? [{ property: "x:game:image", content: xBanner }] : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap",
      },
    ],
    };
  },
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <HydrateGate>
            <SessionGate>
              <AppShell>
                <Outlet />
              </AppShell>
            </SessionGate>
          </HydrateGate>
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: "bg-raised text-ink shadow-overlay border-0 font-sans",
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
