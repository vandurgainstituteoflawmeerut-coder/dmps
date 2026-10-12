import { useState } from "react";
import { toast } from "sonner";
import { TC_REASONS } from "@/lib/school/config";
import { fullName } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import type { Student } from "@/lib/school/types";
import { todayIso } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Field, Input } from "./ui/input";
import { NativeSelect } from "./ui/select";

export function IssueTcDialog({
  student,
  open,
  onOpenChange,
}: {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const issueTc = useSchoolStore((s) => s.issueTc);
  const [reason, setReason] = useState<string>(TC_REASONS[0]);
  const [issueDate, setIssueDate] = useState(todayIso());
  const [lastAttendanceDate, setLastAttendanceDate] = useState(todayIso());
  const [character, setCharacter] = useState("Good");
  const [remarks, setRemarks] = useState("All dues cleared.");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {student ? (
        <DialogContent
          title="Issue transfer certificate"
          description={`${fullName(student)} will be marked transferred.`}
        >
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const row = issueTc({
                studentId: student.id,
                reason,
                lastAttendanceDate,
                character,
                remarks,
                issueDate,
              });
              if (row) toast.success(`${row.tcNo} issued`);
              onOpenChange(false);
            }}
          >
            <Field label="Reason">
              <NativeSelect value={reason} onChange={(e) => setReason(e.target.value)}>
                {TC_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Last attendance">
                <Input
                  type="date"
                  value={lastAttendanceDate}
                  onChange={(e) => setLastAttendanceDate(e.target.value)}
                  required
                />
              </Field>
              <Field label="Issue date">
                <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required />
              </Field>
            </div>
            <Field label="Character">
              <NativeSelect value={character} onChange={(e) => setCharacter(e.target.value)}>
                {["Excellent", "Good", "Satisfactory"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Remarks">
              <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Issue certificate</Button>
            </div>
          </form>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
