import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { FilterSelect, SearchField } from "@/components/search-toolbar";
import { StudentIdCard } from "@/components/student-id-card";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/school/access";
import { CLASSES } from "@/lib/school/config";
import { fullName } from "@/lib/school/compute";

export const Route = createFileRoute("/id-cards")({ component: IdCardsPage });

function IdCardsPage() {
  const { students, families } = useAccess();
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState("all");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return students
      .filter((s) => s.status === "Active")
      .filter((s) => (klass === "all" ? true : s.className === klass))
      .filter((s) => `${fullName(s)} ${s.studentId}`.toLowerCase().includes(query))
      .sort((a, b) => `${a.className}${a.section}${a.rollNo}`.localeCompare(`${b.className}${b.section}${b.rollNo}`));
  }, [students, q, klass]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Identity"
        title="Student ID cards"
        description="Print-ready cards with emergency contact from the family file."
        actions={
          <Button variant="outline" className="no-print" onClick={() => window.print()}>
            <Printer /> Print sheet
          </Button>
        }
      />
      <div className="no-print grid gap-3 md:grid-cols-[1fr_12rem]">
        <SearchField value={q} onChange={setQ} placeholder="Search student…" />
        <FilterSelect value={klass} onChange={setKlass}>
          <option value="all">All classes</option>
          {CLASSES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </FilterSelect>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {rows.map((student) => (
          <StudentIdCard
            key={student.id}
            student={student}
            family={families.find((f) => f.id === student.familyId)}
          />
        ))}
      </div>
    </div>
  );
}
