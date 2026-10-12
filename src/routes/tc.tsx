import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { IssueTcDialog } from "@/components/issue-tc-dialog";
import { PageHeader } from "@/components/page-header";
import { SearchField } from "@/components/search-toolbar";
import { TcCertificate } from "@/components/tc-certificate";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/select";
import { useAccess } from "@/lib/school/access";
import { familyLabel, fullName } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import type { Student } from "@/lib/school/types";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/tc")({ component: TcPage });

function TcPage() {
  const { students, families, studentIds, can } = useAccess();
  const certificates = useSchoolStore((s) => s.certificates);
  const [q, setQ] = useState("");
  const [previewId, setPreviewId] = useState(certificates[0]?.id ?? "");
  const [issueFor, setIssueFor] = useState<Student | null>(null);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return certificates
      .filter((c) => studentIds.has(c.studentId))
      .map((c) => {
        const student = students.find((s) => s.id === c.studentId);
        const family = families.find((f) => f.id === student?.familyId);
        return { c, student, family };
      })
      .filter(({ c, student, family }) => {
        if (!query) return true;
        return `${c.tcNo} ${student ? fullName(student) : ""} ${family?.familyCode ?? ""}`.toLowerCase().includes(query);
      })
      .sort((a, b) => b.c.issueDate.localeCompare(a.c.issueDate));
  }, [certificates, students, families, q, studentIds]);

  const preview = rows.find((r) => r.c.id === previewId) ?? rows[0];
  const eligible = students.filter(
    (s) => s.status === "Active" && !certificates.some((c) => c.studentId === s.id && c.status === "Issued"),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Leaving"
        title="Transfer certificates"
        description="Issue a TC from a student file. Issued papers are listed here, student-wise, with the family on record."
        actions={
          eligible.length && can("tc") ? (
            <div className="flex flex-wrap gap-2">
              <NativeSelect
                className="w-52"
                defaultValue=""
                onChange={(e) => {
                  const stu = students.find((s) => s.id === e.target.value);
                  if (stu) setIssueFor(stu);
                  e.target.value = "";
                }}
              >
                <option value="" disabled>
                  Issue for…
                </option>
                {eligible.map((s) => (
                  <option key={s.id} value={s.id}>
                    {fullName(s)}
                  </option>
                ))}
              </NativeSelect>
            </div>
          ) : null
        }
      />

      <SearchField value={q} onChange={setQ} placeholder="Search TC number or student…" />

      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        <Card className="overflow-hidden p-0 md:p-0 h-fit">
          {rows.length === 0 ? (
            <EmptyState
              icon={ScrollText}
              title="No certificates yet"
              body="Issue a TC when a pupil leaves. The student is then marked Transferred."
            />
          ) : (
            <ul className="divide-y divide-line">
              {rows.map(({ c, student, family }) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setPreviewId(c.id)}
                    className="flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-canvas-warm/70"
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="font-mono text-xs">{c.tcNo}</span>
                      <StatusBadge value={c.status} />
                    </span>
                    <span className="text-sm font-medium">{student ? fullName(student) : "—"}</span>
                    <span className="text-xs text-muted">
                      {formatDate(c.issueDate)}
                      {family ? ` · ${familyLabel(family)}` : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {preview?.student ? (
          <div className="flex flex-col gap-3">
            <div className="no-print flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                Print
              </Button>
              <Button asChild variant="ghost">
                <Link to="/students/$id" params={{ id: preview.student.id }}>
                  Open student file
                </Link>
              </Button>
            </div>
            <TcCertificate student={preview.student} family={preview.family} certificate={preview.c} />
          </div>
        ) : null}
      </div>

      <IssueTcDialog student={issueFor} open={Boolean(issueFor)} onOpenChange={(o) => !o && setIssueFor(null)} />
    </div>
  );
}
