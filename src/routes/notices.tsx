import { createFileRoute } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/select";
import { toast } from "sonner";
import { useAccess } from "@/lib/school/access";
import { CLASSES, NOTICE_AUDIENCES } from "@/lib/school/config";
import { familyLabel, fullName, noticeAudienceLabel, noticeVisibleTo } from "@/lib/school/compute";
import { useSchoolStore } from "@/lib/school/store";
import type { NoticeAudience } from "@/lib/school/types";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/notices")({ component: NoticesPage });

function NoticesPage() {
  const { session, students, families, can } = useAccess();
  const notices = useSchoolStore((s) => s.notices);
  const reads = useSchoolStore((s) => s.noticeReads);
  const addNotice = useSchoolStore((s) => s.addNotice);
  const markNoticeRead = useSchoolStore((s) => s.markNoticeRead);
  const allStudents = useSchoolStore((s) => s.students);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<NoticeAudience>(session?.role === "Teacher" ? "class" : "school");
  const [classNames, setClassNames] = useState<string[]>(session?.classNames.slice(0, 1) ?? []);
  const [familyIds, setFamilyIds] = useState<string[]>([]);
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [pin, setPin] = useState(false);

  const visible = useMemo(() => {
    if (!session) return [];
    return notices
      .filter((n) => noticeVisibleTo(n, session, allStudents))
      .sort((a, b) => Number(b.pin) - Number(a.pin) || b.createdAt.localeCompare(a.createdAt));
  }, [notices, session, allStudents]);

  const classChoices = session?.role === "Teacher" ? session.classNames : [...CLASSES];

  const send = () => {
    const result = addNotice({ title, body, audience, classNames, familyIds, studentIds, pin });
    if (typeof result === "string") {
      toast.error(result);
      return;
    }
    toast.success("Notice sent.");
    setTitle("");
    setBody("");
    setPin(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Office"
        title="Notices"
        description="Circulars from the Manager, Principal or class teacher — whole school, class-wise, family-wise or student-wise."
      />

      {can("notice") ? (
        <Card>
          <h2 className="font-display text-xl">Send a notice</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="To">
              <NativeSelect
                value={audience}
                onChange={(e) => setAudience(e.target.value as NoticeAudience)}
              >
                {NOTICE_AUDIENCES.filter((row) => session?.role !== "Teacher" || row.id !== "school").map(
                  (row) => (
                    <option key={row.id} value={row.id}>
                      {row.label}
                    </option>
                  ),
                )}
              </NativeSelect>
            </Field>
            {audience === "class" ? (
              <Field label="Classes">
                <select
                  multiple
                  className="min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card"
                  value={classNames}
                  onChange={(e) => setClassNames([...e.target.selectedOptions].map((o) => o.value))}
                >
                  {classChoices.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
            {audience === "family" ? (
              <Field label="Families">
                <select
                  multiple
                  className="min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card"
                  value={familyIds}
                  onChange={(e) => setFamilyIds([...e.target.selectedOptions].map((o) => o.value))}
                >
                  {families.map((f) => (
                    <option key={f.id} value={f.id}>
                      {familyLabel(f)} · {f.familyCode}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
            {audience === "student" ? (
              <Field label="Students">
                <select
                  multiple
                  className="min-h-28 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card"
                  value={studentIds}
                  onChange={(e) => setStudentIds([...e.target.selectedOptions].map((o) => o.value))}
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {fullName(s)} · {s.className}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
            <Field label="Title" className="sm:col-span-2">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>
            <Field label="Message" className="sm:col-span-2">
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} required />
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {session?.role === "Manager" || session?.role === "Principal" ? (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={pin} onChange={(e) => setPin(e.target.checked)} />
                Pin on every desk
              </label>
            ) : (
              <span />
            )}
            <Button type="button" onClick={send}>
              Send notice
            </Button>
          </div>
        </Card>
      ) : null}

      <Card className="overflow-hidden p-0 md:p-0">
        {visible.length === 0 ? (
          <EmptyState icon={Megaphone} title="No notices" body="When the office writes, the circular will appear here." />
        ) : (
          <ul className="divide-y divide-line">
            {visible.map((notice) => {
              const read = session
                ? reads.some((r) => r.noticeId === notice.id && r.accountId === session.id)
                : false;
              return (
                <li key={notice.id} className="px-4 py-4 md:px-5">
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{notice.title}</p>
                      <p className="mt-1 text-xs text-faint">
                        {notice.fromName} · {notice.fromRole} · {formatDate(notice.createdAt.slice(0, 10))} ·{" "}
                        {noticeAudienceLabel(notice, families, allStudents)}
                      </p>
                    </div>
                    {notice.pin ? <Badge tone="primary">Pinned</Badge> : null}
                    {!read && session ? <Badge tone="ok">New</Badge> : null}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{notice.body}</p>
                  {session && !read ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => markNoticeRead(notice.id, session.id)}
                    >
                      Mark as read
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
