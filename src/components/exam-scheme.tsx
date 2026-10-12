import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccess } from "@/lib/school/access";
import { useSchoolStore } from "@/lib/school/store";
import type { ExamDefinition } from "@/lib/school/types";
import { uid } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardDesc, CardTitle } from "./ui/card";
import { Field, Input } from "./ui/input";

export function ExamSchemeCard() {
  const { can } = useAccess();
  const exams = useSchoolStore((s) => s.exams);
  const setExams = useSchoolStore((s) => s.setExams);
  const editable = can("exams");
  const [rows, setRows] = useState<ExamDefinition[]>(exams);

  useEffect(() => {
    setRows(exams);
  }, [exams]);

  if (!exams.length && !editable) return null;

  return (
    <Card>
      <CardTitle>Examinations and maximum marks</CardTitle>
      <CardDesc>
        {editable
          ? "Principal only. Rename Unit 1, Unit 2, Terminal, Half Yearly, Annual — or add another — and set the maximum marks for each paper. Marks already published keep the maximum they were entered with."
          : "Set by the Principal. Teachers enter marks against these papers."}
      </CardDesc>
      <div className="mt-4 flex flex-col gap-3">
        {rows.map((row, index) => (
          <div key={row.id} className="grid gap-3 sm:grid-cols-[1fr_8rem_auto] sm:items-end">
            <Field label={index === 0 ? "Examination" : "Examination"} className={index === 0 ? "" : "sm:[&>span]:sr-only"}>
              <Input
                value={row.name}
                disabled={!editable}
                onChange={(e) =>
                  setRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, name: e.target.value } : item)))
                }
              />
            </Field>
            <Field label="Max marks" className={index === 0 ? "" : "sm:[&>span]:sr-only"}>
              <Input
                type="number"
                min={1}
                max={200}
                value={row.maxMarks}
                disabled={!editable}
                onChange={(e) =>
                  setRows((prev) =>
                    prev.map((item) =>
                      item.id === row.id ? { ...item, maxMarks: Number(e.target.value) } : item,
                    ),
                  )
                }
              />
            </Field>
            {editable ? (
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() =>
                    setRows((prev) => {
                      const next = [...prev];
                      const [moved] = next.splice(index, 1);
                      if (moved) next.splice(index - 1, 0, moved);
                      return next;
                    })
                  }
                >
                  Up
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setRows((prev) => prev.filter((item) => item.id !== row.id))}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <p className="pb-2 text-sm text-muted">out of {row.maxMarks}</p>
            )}
          </div>
        ))}
      </div>
      {editable ? (
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setRows((prev) => [...prev, { id: uid("ex"), name: "", maxMarks: 50 }])}
          >
            Add examination
          </Button>
          <Button
            type="button"
            onClick={() => {
              const error = setExams(rows);
              if (error) toast.error(error);
              else toast.success("Examination scheme saved.");
            }}
          >
            Save scheme
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
