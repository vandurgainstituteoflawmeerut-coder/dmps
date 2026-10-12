import { useEffect, useState, type ReactNode } from "react";
import { SchoolCrest } from "@/components/crest";
import { SCHOOL } from "@/lib/school/config";
import { bootOfficeRegister, startOfficeAutosave } from "@/lib/school/office-sync";
import { useSchoolStore } from "@/lib/school/store";

export function HydrateGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = () => {};
    let cancelled = false;
    const start = async () => {
      const api = useSchoolStore.persist;
      if (api && !api.hasHydrated()) {
        await Promise.resolve(api.rehydrate());
      }
      await Promise.race([
        bootOfficeRegister(),
        new Promise<void>((resolve) => {
          window.setTimeout(resolve, 4000);
        }),
      ]);
      if (cancelled) return;
      stop = startOfficeAutosave();
      setReady(true);
    };
    void start();
    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-fg">
          <SchoolCrest className="size-9" />
        </span>
        <p className="mt-4 font-display text-2xl text-ink">{SCHOOL.shortName}</p>
        <p className="mt-1 text-sm text-muted">Opening the college register…</p>
      </div>
    );
  }
  return children;
}
