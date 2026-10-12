import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { readStudentPhoto } from "@/lib/school/photo";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function StudentPhotoField({
  value,
  onChange,
  name = "student",
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  name?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-canvas-warm text-muted shadow-card",
          "transition-[box-shadow] duration-150 hover:shadow-card-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
        )}
        aria-label={value ? `Change ${name} photograph` : `Upload ${name} photograph`}
      >
        {value ? (
          <img src={value} alt="" className="size-full object-cover" />
        ) : (
          <Camera className="size-7" />
        )}
      </button>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-soft">Photograph</p>
        <p className="mt-0.5 max-w-xs text-xs text-faint">Passport-style, face clearly visible. JPEG or PNG.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? "Reading…" : value ? "Replace photo" : "Upload photo"}
          </Button>
          {value ? (
            <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>
              Remove
            </Button>
          ) : null}
        </div>
        {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          setBusy(true);
          setError("");
          void readStudentPhoto(file)
            .then((url) => onChange(url))
            .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not read photo."))
            .finally(() => setBusy(false));
        }}
      />
    </div>
  );
}
