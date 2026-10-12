import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAccess } from "@/lib/school/access";
import { SCHOOL, subjectsForClass } from "@/lib/school/config";
import { fullName } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import { todayIso } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Field, Input } from "./ui/input";
import { NativeSelect } from "./ui/select";

export function ResultDialog({
  open,
  onOpenChange,
  presetStudentId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presetStudentId?: string;
}) {
  const { students } = useAccess();
  const addResult = useSchoolStore((s) => s.addResult);
  const exams = useSchoolStore((s) => s.exams);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const papers = exams.length ? exams : [{ id: "ex_annual", name: "Annual", maxMarks: 100 }];
  const active = students.filter((s) => s.status === "Active");
  const [studentId, setStudentId] = useState(presetStudentId ?? active[0]?.id ?? "");
  const [examName, setExamName] = useState(papers[0]?.name ?? "Annual");
  const [publishedAt, setPublishedAt] = useState(todayIso());
  const [remarks, setRemarks] = useState("");

  const student = students.find((s) => s.id === studentId);
  const paper = papers.find((item) => item.name === examName) ?? papers[0];
  const subjectDefs = useMemo(() => {
    if (!student || !paper) return [];
    return subjectsForClass(student.className).map((subject) => ({
      ...subject,
      maxMarks: paper.maxMarks,
    }));
  }, [student, paper]);
  const [scores, setScores] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      const id = presetStudentId ?? active[0]?.id ?? "";
      setStudentId(id);
      setExamName(papers[0]?.name ?? "Annual");
      setPublishedAt(todayIso());
      setRemarks("");
      const stu = students.find((s) => s.id === id);
      const defs = stu ? subjectsForClass(stu.className) : [];
      setScores(Object.fromEntries(defs.map((d) => [d.name, ""])));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, presetStudentId]);

  useEffect(() => {
    if (!student) return;
    setScores((prev) => {
      const next: Record<string, string> = {};
      for (const d of subjectsForClass(student.className)) next[d.name] = prev[d.name] ?? "";
      return next;
    });
  }, [student]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Enter or amend result" description={`Marks for ${workingYear}. Saving the same exam again updates that year’s file.`}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!student) return;
            addResult({
              studentId: student.id,
              academicYear: workingYear || SCHOOL.academicYear,
              examName,
              className: student.className,
              publishedAt,
              remarks,
              subjects: subjectDefs.map((d) => ({
                name: d.name,
                maxMarks: d.maxMarks,
                marks: Math.min(d.maxMarks, Math.max(0, Number(scores[d.name] || 0))),
              })),
            });
            toast.success(`Result saved for ${fullName(student)} · ${workingYear}`);
            onOpenChange(false);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Student">
              <NativeSelect value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                {active.map((s) => (
                  <option key={s.id} value={s.id}>
                    {fullName(s)} · {s.className}-{s.section}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Examination">
              <NativeSelect value={examName} onChange={(e) => setExamName(e.target.value)}>
                {papers.map((ex) => (
                  <option key={ex.id} value={ex.name}>
                    {ex.name} · max {ex.maxMarks}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {subjectDefs.map((d) => (
              <Field key={d.name} label={`${d.name} / ${d.maxMarks}`}>
                <Input
                  type="number"
                  min={0}
                  max={d.maxMarks}
                  value={scores[d.name] ?? ""}
                  onChange={(e) => setScores((prev) => ({ ...prev, [d.name]: e.target.value }))}
                  required
                />
              </Field>
            ))}
          </div>
          <Field label="Published">
            <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
          </Field>
          <Field label="Remarks">
            <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Optional" />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save result</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
