import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { FilterSelect, SearchField } from "@/components/search-toolbar";
import { StudentAvatar } from "@/components/student-avatar";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAccess } from "@/lib/school/access";
import { CLASSES } from "@/lib/school/config";
import { classLabel, familyLabel, fullName } from "@/lib/school/compute";

export const Route = createFileRoute("/students")({ component: StudentsPage });

function StudentsPage() {
  const { students, families, can } = useAccess();
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("all");
  const [status, setStatus] = useState("Active");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return students
      .filter((s) => (klass === "all" ? true : s.className === klass))
      .filter((s) => (status === "all" ? true : s.status === status))
      .filter((s) => {
        if (!query) return true;
        const family = families.find((f) => f.id === s.familyId);
        const hay = `${fullName(s)} ${s.studentId} ${s.admissionNo} ${familyLabel(family)} ${family?.familyCode ?? ""}`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => fullName(a).localeCompare(fullName(b)));
  }, [students, families, q, klass, status]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Register"
        title="Students"
        description="Every pupil file — identity, class, and the family it belongs to."
        actions={
          can("admit") ? (
            <Button asChild>
              <Link to="/admissions/new">New admission</Link>
            </Button>
          ) : undefined
        }
      />

      <div className="grid gap-3 md:grid-cols-[1fr_10rem_10rem]">
        <SearchField value={q} onChange={setQ} placeholder="Search name, ID, family…" />
        <FilterSelect value={klass} onChange={setKlass}>
          <option value="all">All classes</option>
          {CLASSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect value={status} onChange={setStatus}>
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Transferred">Transferred</option>
          <option value="Alumni">Alumni</option>
        </FilterSelect>
      </div>

      <Card className="overflow-hidden p-0 md:p-0">
        {rows.length === 0 ? (
          <EmptyState
            icon={GraduationCap}
            title="No matching students"
            body="Try a different search or admit a new pupil."
            action={
              can("admit") ? (
                <Button asChild>
                  <Link to="/admissions/new">New admission</Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((student) => {
              const family = families.find((f) => f.id === student.familyId);
              return (
                <li key={student.id}>
                  <Link
                    to="/students/$id"
                    params={{ id: student.id }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-canvas-warm/70 md:px-5"
                  >
                    <StudentAvatar student={student} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{fullName(student)}</span>
                      <span className="block truncate font-mono text-xs text-faint">
                        {student.studentId}
                      </span>
                    </span>
                    <span className="hidden text-sm text-muted sm:block">{classLabel(student)}</span>
                    <span className="hidden max-w-40 truncate text-sm text-muted lg:block">
                      {family ? familyLabel(family) : "—"}
                    </span>
                    <StatusBadge value={student.status} />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
