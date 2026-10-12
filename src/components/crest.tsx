import { cn } from "@/lib/utils";

export function SchoolCrest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="currentColor" className="text-primary-fg/10" />
      <circle cx="24" cy="24" r="12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
        <path d="M24 12.4v4.6" />
        <path d="M24 31v4.6" />
        <path d="M12.4 24h4.6" />
        <path d="M31 24h4.6" />
        <path d="M15.7 15.7l3.3 3.3" />
        <path d="M29 29l3.3 3.3" />
        <path d="M32.3 15.7l-3.3 3.3" />
        <path d="M19 29l-3.3 3.3" />
      </g>
    </svg>
  );
}
