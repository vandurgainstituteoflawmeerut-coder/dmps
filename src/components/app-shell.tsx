import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CreditCard,
  GraduationCap,
  Home,
  IndianRupee,
  KeyRound,
  LogOut,
  Megaphone,
  Menu,
  ScrollText,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { navItemsFor, useSession } from "@/lib/school/access";
import { noticeVisibleTo } from "@/lib/school/compute";
import { SCHOOL } from "@/lib/school/config";
import { readOfficeStatus, signOutShared, subscribeOfficeStatus } from "@/lib/school/office-sync";
import { useSchoolStore } from "@/lib/school/store";
import { cn } from "@/lib/utils";
import { SchoolCrest } from "./crest";
import { OfficeSync } from "./office-sync";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent } from "./ui/sheet";

const NAV = [
  { to: "/", label: "Desk", icon: Home },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/families", label: "Families", icon: UsersRound },
  { to: "/admissions", label: "Admissions", icon: BookOpen },
  { to: "/results", label: "Results", icon: ScrollText },
  { to: "/fees", label: "Fees", icon: IndianRupee },
  { to: "/id-cards", label: "ID cards", icon: CreditCard },
  { to: "/tc", label: "Transfer cert.", icon: Users },
  { to: "/notices", label: "Notices", icon: Megaphone },
  { to: "/users", label: "Logins", icon: KeyRound },
] as const;

function NavLinks({
  pathname,
  onNavigate,
  inverted,
  allowed,
  noticeUnread,
}: {
  pathname: string;
  onNavigate?: () => void;
  inverted?: boolean;
  allowed: string[];
  noticeUnread: number;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.filter((item) => allowed.includes(item.to)).map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-[background-color,color] duration-150",
              inverted
                ? active
                  ? "bg-primary-fg/12 text-primary-fg"
                  : "text-primary-fg/70 hover:bg-primary-fg/8 hover:text-primary-fg"
                : active
                  ? "bg-canvas-warm text-ink"
                  : "text-ink-soft hover:bg-canvas-warm hover:text-ink",
            )}
          >
            <Icon className="size-4" />
            <span className="flex-1">{item.label}</span>
            {item.to === "/notices" && noticeUnread > 0 ? (
              <span
                className={cn(
                  "min-w-5 rounded-full px-1.5 text-center text-[10px] font-semibold",
                  inverted ? "bg-primary-fg/20 text-primary-fg" : "bg-primary text-primary-fg",
                )}
              >
                {noticeUnread}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ inverted }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 px-1 py-1">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          inverted ? "bg-primary-fg/10 text-primary-fg" : "bg-primary text-primary-fg",
        )}
      >
        <SchoolCrest className="size-7" />
      </span>
      <span className="min-w-0">
        <span className={cn("block font-display text-sm leading-snug", inverted ? "text-primary-fg" : "text-ink")}>
          {SCHOOL.shortName}
        </span>
        <span className={cn("block text-xs leading-snug", inverted ? "text-primary-fg/60" : "text-muted")}>
          Shared college register
        </span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const session = useSession();
  const [officeStatus, setOfficeStatus] = useState(readOfficeStatus);
  const notices = useSchoolStore((s) => s.notices);
  const reads = useSchoolStore((s) => s.noticeReads);
  const students = useSchoolStore((s) => s.students);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return subscribeOfficeStatus(setOfficeStatus);
  }, []);

  const noticeUnread = useMemo(() => {
    if (!session) return 0;
    return notices.filter(
      (n) => noticeVisibleTo(n, session, students) && !reads.some((r) => r.noticeId === n.id && r.accountId === session.id),
    ).length;
  }, [notices, reads, session, students]);

  if (!session) {
    return <>{children}</>;
  }

  const allowed = navItemsFor(session.role);

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <OfficeSync />
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-primary px-3 py-4 text-primary-fg lg:flex">
        <Brand inverted />
        <div className="mt-8 flex-1 overflow-y-auto px-0.5">
          <NavLinks pathname={pathname} inverted allowed={allowed} noticeUnread={noticeUnread} />
        </div>
        <div className="px-3 pt-4">
          <p className="text-xs leading-snug text-primary-fg/80">{session.displayName}</p>
          <p className="mt-1 text-xs font-medium tracking-wide text-primary-fg uppercase">Signed in as {session.role}</p>
          {session.role === "Manager" ? (
            <p className="mt-1 text-[11px] leading-snug text-primary-fg/55">You issue usernames and passwords for everyone else.</p>
          ) : null}
          <button
            type="button"
            className="mt-3 flex h-10 items-center gap-2 text-sm text-primary-fg/70 hover:text-primary-fg"
            onClick={() => {
              void signOutShared();
            }}
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <header className="no-print sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-canvas/90 px-3 py-2.5 backdrop-blur-sm lg:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
        <Brand />
        <span className="ml-auto">
          <Badge tone="primary">Signed in as {session.role}</Badge>
        </span>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent title={SCHOOL.name}>
          <div className="mt-6 px-2">
            <p className="px-3 pb-3 text-sm text-primary-fg/80">
              {session.displayName}
              <span className="mt-1 block text-xs font-medium tracking-wide text-primary-fg uppercase">
                Signed in as {session.role}
              </span>
            </p>
            <NavLinks
              pathname={pathname}
              inverted
              allowed={allowed}
              noticeUnread={noticeUnread}
              onNavigate={() => setOpen(false)}
            />
            <button
              type="button"
              className="mt-4 flex h-11 items-center gap-3 px-3 text-sm text-primary-fg/70"
              onClick={() => {
                setOpen(false);
                void signOutShared();
              }}
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="lg:pl-60">
        <div className="no-print border-b border-line bg-canvas-warm/80 px-4 py-2 md:px-8">
          <p className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 text-sm text-ink-soft">
            <Badge tone="primary">Signed in as {session.role}</Badge>
            <span>{session.displayName}</span>
            <span className="text-muted">· {officeStatus}</span>
          </p>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
