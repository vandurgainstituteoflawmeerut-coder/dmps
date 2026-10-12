import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { canVisit, useSession } from "@/lib/school/access";

export function SessionGate({ children }: { children: ReactNode }) {
  const session = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!session && pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  if (session && pathname === "/login") {
    return <Navigate to="/" />;
  }
  if (session && pathname !== "/login" && !canVisit(session, pathname)) {
    return <Navigate to="/" />;
  }
  return children;
}
