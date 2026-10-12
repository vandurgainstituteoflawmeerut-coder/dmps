import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import { ExamSchemeCard } from "@/components/exam-scheme";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { ResultDialog } from "@/components/result-dialog";
import { FilterSelect, SearchField } from "@/components/search-toolbar";
import { StudentAvatar } from "@/components/student-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { YearSelect } from "@/components/year-select";
import { useAccess } from "@/lib/school/access";
import { CLASSES } from "@/lib/school/config";
import {
  familyLabel,
  fullName,
  gradeFromPercent,
  resultTotals,
} from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/results")({ component: ResultsPage });

function ResultsPage() {
  const { students, families, studentIds, can } = useAccess();
  const results = useSchoolStore((s) => s.results);
  const exams = useSchoolStore((s) => s.exams);
  const workingYear = useSchoolStore((s) => s.workingYear);
  const setWorkingYear = useSchoolStore((s) => s.setWorkingYear);
  const [q, setQ] = useState("");
  const [exam, setExam] = useState("all");
  const [klass, setKlass] = useState("all");
  const [view, setView] = useState<"student" | "family">("student");
  const [open, setOpen] = useState(false);

  const examOptions = useMemo(() => {
    const names = new Set<string>();
    for (const exam of exams) names.add(exam.name);
    for (const result of results) names.add(result.examName);
    return [...names];
  }, [exams, results]);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return results
      .filter((r) => r.academicYear === workingYear)
      .filter((r) => studentIds.has(r.studentId))
      .filter((r) => (exam === "all" ? true : r.examName === exam))
      .filter((r) => (klass === "all" ? true : r.className === klass))
      .map((r) => {
        const student = students.find((s) => s.id === r.studentId);
        const family = families.find((f) => f.id === student?.familyId);
        return { result: r, student, family, totals: resultTotals(r) };
      })
      .filter(({ student, family, result }) => {
        if (!query) return true;
        const hay = `${student ? fullName(student) : ""} ${student?.studentId ?? ""} ${family?.familyCode ?? ""} ${result.examName}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => b.result.publishedAt.localeCompare(a.result.publishedAt));
  }, [results, students, families, q, exam, klass, studentIds, workingYear]);

  const familyGroups = useMemo(() => {
    const map = new Map<
      string,
      { familyName: string; code: string; id: string; items: typeof rows }
    >();
    for (const row of rows) {
      const id = row.family?.id ?? "none";
      const current = map.get(id) ?? {
        familyName: row.family ? familyLabel(row.family) : "Unlinked",
        code: row.family?.familyCode ?? "—",
        id,
        items: [],
      };
      current.items.push(row);
      map.set(id, current);
    }
    return [...map.values()].sort((a, b) => a.familyName.localeCompare(b.familyName));
  }, [rows]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Academics"
        title="Results"
        description="Examination records for the selected year, individually or grouped by household. Enter a new year to amend without erasing the last."
        actions={
          <div className="flex flex-wrap gap-2">
            <YearSelect value={workingYear} onChange={setWorkingYear} />
            {can("result") ? <Button onClick={() => setOpen(true)}>Enter result</Button> : null}
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={view === "student" ? "default" : "outline"} onClick={() => setView("student")}>
          Student-wise
        </Button>
        <Button size="sm" variant={view === "family" ? "default" : "outline"} onClick={() => setView("family")}>
          Family-wise
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <SearchField value={q} onChange={setQ} placeholder="Search student or family…" />
        <FilterSelect value={exam} onChange={setExam}>
          <option value="all">All exams</option>
          {examOptions.map((ex) => (
            <option key={ex}>{ex}</option>
          ))}
        </FilterSelect>
        <FilterSelect value={klass} onChange={setKlass}>
          <option value="all">All classes</option>
          {CLASSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FilterSelect>
      </div>

      <ExamSchemeCard />

      {rows.length === 0 ? (
        <Card>
          <EmptyState icon={ScrollText} title="No results yet" body="Publish a term examination from this desk." />
        </Card>
      ) : view === "student" ? (
        <Card className="overflow-hidden p-0 md:p-0">
          <ul className="divide-y divide-line">
            {rows.map(({ result, student, totals }) => (
              <li key={result.id} className="flex flex-wrap items-center gap-3 px-4 py-3 md:px-5">
                {student ? <StudentAvatar student={student} size="sm" /> : null}
                <div className="min-w-0 flex-1">
                  {student ? (
                    <Link to="/students/$id" params={{ id: student.id }} className="font-medium hover:underline">
                      {fullName(student)}
                    </Link>
                  ) : (
                    <span>Unknown student</span>
                  )}
                  <p className="text-sm text-muted">
                    {result.examName} · Class {result.className} · {formatDate(result.publishedAt)}
                  </p>
                </div>
                <Badge tone="primary">
                  {totals.percent.toFixed(1)}% · {gradeFromPercent(totals.percent)}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <div className="grid gap-4">
          {familyGroups.map((group) => (
            <Card key={group.id}>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                {group.id !== "none" ? (
                  <Link to="/families/$id" params={{ id: group.id }} className="font-display text-xl hover:underline">
                    {group.familyName}
                  </Link>
                ) : (
                  <h2 className="font-display text-xl">{group.familyName}</h2>
                )}
                <p className="font-mono text-xs text-faint">{group.code}</p>
              </div>
              <ul className="divide-y divide-line">
                {group.items.map(({ result, student, totals }) => (
                  <li key={result.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                    <span className="text-sm">
                      {student ? fullName(student) : "—"} · {result.examName} · Class {result.className}
                    </span>
                    <span className="text-sm tabular-nums">
                      {totals.percent.toFixed(1)}% {gradeFromPercent(totals.percent)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      <ResultDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
