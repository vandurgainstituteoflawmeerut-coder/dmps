import { useRef, useState } from "react";
import { toast } from "sonner";
import { can, useSession } from "@/lib/school/access";
import { pushOfficeRegister } from "@/lib/school/office-sync";
import {
  buildRegisterFile,
  downloadRegister,
  parseRegisterFile,
} from "@/lib/school/register-file";
import { useSchoolStore } from "@/lib/school/store";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function RegisterFilePanel() {
  const session = useSession();
  const store = useSchoolStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const canFile = can(session, "file");
  if (!canFile) return null;

  const saveDownload = () => {
    const at = new Date().toISOString();
    const file = buildRegisterFile(useSchoolStore.getState(), at);
    downloadRegister(file);
    store.markFileExported(at);
    toast.success("Register file downloaded. Keep it with the office records.");
  };

  const saveOffice = () => {
    setBusy(true);
    void pushOfficeRegister()
      .then(() => toast.success("Office file updated. The register is stored for this college."))
      .catch(() => toast.error("Could not write the office file just now. Download a copy instead."))
      .finally(() => setBusy(false));
  };

  return (
    <Card>
      <h2 className="font-display text-xl">Permanent register file</h2>
      <p className="mt-1 text-sm text-muted">
        One college register is shared by the office computer and every phone at the same time. It is kept in the database for years, with a yearly archive of admissions, fees and results. Download a JSON copy as a cupboard backup.
      </p>
      {store.lastFileExportAt ? (
        <p className="mt-2 text-xs text-faint">Last saved {store.lastFileExportAt.slice(0, 10)}</p>
      ) : (
        <p className="mt-2 text-xs text-danger">No file saved yet — write the office copy or download one.</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={saveOffice} disabled={busy}>
          {busy ? "Saving…" : "Save office file"}
        </Button>
        <Button type="button" variant="outline" onClick={saveDownload}>
          Download JSON
        </Button>
        {session?.role === "Manager" ? (
          <Button type="button" variant="ghost" onClick={() => inputRef.current?.click()}>
            Open JSON file
          </Button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            void file.text().then((text) => {
              const parsed = parseRegisterFile(text);
              if (typeof parsed === "string") {
                toast.error(parsed);
                return;
              }
              const err = store.applyRegister(parsed.data);
              if (err) {
                toast.error(err);
                return;
              }
              toast.success("Register restored from file.");
              void pushOfficeRegister().catch(() => undefined);
            });
          }}
        />
      </div>
    </Card>
  );
}
