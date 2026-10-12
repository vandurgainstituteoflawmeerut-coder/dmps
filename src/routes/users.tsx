import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/select";
import { ASSIGNABLE_ROLES } from "@/lib/school/access";
import { CLASSES } from "@/lib/school/config";
import { familyLabel, fullName } from "@/lib/school/compute";
import { useSchoolStore, type NewAccountInput } from "@/lib/school/store";
import type { AccountRole } from "@/lib/school/types";

export const Route = createFileRoute("/users")({ component: UsersPage });

function emptyDraft(): NewAccountInput {
  return {
    username: "",
    password: "",
    displayName: "",
    role: "Teacher",
    familyId: "",
    studentId: "",
    classNames: [],
  };
}

function UsersPage() {
  const accounts = useSchoolStore((s) => s.accounts);
  const families = useSchoolStore((s) => s.families);
  const students = useSchoolStore((s) => s.students);
  const addAccount = useSchoolStore((s) => s.addAccount);
  const setAccountPassword = useSchoolStore((s) => s.setAccountPassword);
  const setAccountActive = useSchoolStore((s) => s.setAccountActive);
  const removeAccount = useSchoolStore((s) => s.removeAccount);
  const [draft, setDraft] = useState<NewAccountInput>(emptyDraft());
  const [busy, setBusy] = useState(false);
  const [resetId, setResetId] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  const sorted = useMemo(
    () =>
      [...accounts].sort((a, b) => {
        const order: AccountRole[] = ["Manager", "Principal", "Teacher", "Parent", "Student"];
        return order.indexOf(a.role) - order.indexOf(b.role) || a.displayName.localeCompare(b.displayName);
      }),
    [accounts],
  );

  const setRole = (role: AccountRole) => {
    setDraft((prev) => ({
      ...prev,
      role,
      familyId: role === "Parent" ? prev.familyId || families[0]?.id || "" : "",
      studentId: role === "Student" ? prev.studentId || students[0]?.id || "" : "",
      classNames: role === "Teacher" ? prev.classNames : [],
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Directory"
        title="Logins"
        description="Assign a username and password to the Principal, teachers, parents (one per family) and students."
      />

      <Card>
        <h2 className="font-display text-xl">Issue login</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setBusy(true);
            void addAccount(draft).then((result) => {
              setBusy(false);
              if (typeof result === "string") {
                toast.error(result);
                return;
              }
              toast.success(`Login issued for ${result.username}`);
              setDraft(emptyDraft());
            });
          }}
        >
          <Field label="Role">
            <NativeSelect value={draft.role} onChange={(e) => setRole(e.target.value as AccountRole)}>
              {ASSIGNABLE_ROLES.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Full name">
            <Input value={draft.displayName} onChange={(e) => setDraft((p) => ({ ...p, displayName: e.target.value }))} required />
          </Field>
          <Field label="Username">
            <Input value={draft.username} onChange={(e) => setDraft((p) => ({ ...p, username: e.target.value }))} required />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={draft.password}
              onChange={(e) => setDraft((p) => ({ ...p, password: e.target.value }))}
              required
            />
          </Field>
          {draft.role === "Teacher" ? (
            <Field label="Classes" className="sm:col-span-2" hint="Hold Ctrl or Cmd to select more than one.">
              <select
                multiple
                className="min-h-32 w-full rounded-md bg-raised px-3 py-2 text-sm shadow-card"
                value={draft.classNames}
                onChange={(e) =>
                  setDraft((p) => ({
                    ...p,
                    classNames: [...e.target.selectedOptions].map((o) => o.value),
                  }))
                }
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}
          {draft.role === "Parent" ? (
            <Field label="Family" className="sm:col-span-2">
              <NativeSelect value={draft.familyId} onChange={(e) => setDraft((p) => ({ ...p, familyId: e.target.value }))}>
                {families.map((f) => (
                  <option key={f.id} value={f.id}>
                    {familyLabel(f)} · {f.familyCode}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          ) : null}
          {draft.role === "Student" ? (
            <Field label="Student" className="sm:col-span-2">
              <NativeSelect value={draft.studentId} onChange={(e) => setDraft((p) => ({ ...p, studentId: e.target.value }))}>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {fullName(s)} · {s.studentId}
                  </option>
                ))}
              </NativeSelect>
            </Field>
          ) : null}
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Assign login"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden p-0 md:p-0">
        <ul className="divide-y divide-line">
          {sorted.map((account) => (
            <li key={account.id} className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:px-5">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{account.displayName}</p>
                <p className="font-mono text-xs text-faint">{account.username}</p>
                {account.role === "Teacher" && account.classNames.length ? (
                  <p className="mt-1 text-xs text-muted">Classes {account.classNames.join(", ")}</p>
                ) : null}
                {account.role === "Parent" ? (
                  <p className="mt-1 text-xs text-muted">{familyLabel(families.find((f) => f.id === account.familyId))}</p>
                ) : null}
                {account.role === "Student" ? (
                  <p className="mt-1 text-xs text-muted">
                    {(() => {
                      const pupil = students.find((s) => s.id === account.studentId);
                      return pupil ? fullName(pupil) : "—";
                    })()}
                  </p>
                ) : null}
              </div>
              <Badge tone={account.role === "Manager" ? "primary" : "neutral"}>{account.role}</Badge>
              <Badge tone={account.active ? "ok" : "danger"}>{account.active ? "Active" : "Disabled"}</Badge>
              {account.role !== "Manager" ? (
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setResetId(account.id)}>
                    Reset password
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAccountActive(account.id, !account.active)}>
                    {account.active ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (!window.confirm(`Delete the login ${account.username}? They will not be able to sign in from any phone.`)) {
                        return;
                      }
                      const err = removeAccount(account.id);
                      if (err) toast.error(err);
                      else toast.success("Login deleted.");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-faint">Office Manager</p>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {resetId ? (
        <Card>
          <h2 className="font-display text-xl">Set new password</h2>
          <p className="mt-1 text-sm text-muted">
            {sorted.find((a) => a.id === resetId)?.username}
          </p>
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              void setAccountPassword(resetId, resetPassword).then((err) => {
                if (err) {
                  toast.error(err);
                  return;
                }
                toast.success("Password updated.");
                setResetId("");
                setResetPassword("");
              });
            }}
          >
            <Field label="New password" className="flex-1">
              <Input type="password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} required />
            </Field>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => setResetId("")}>
                Cancel
              </Button>
              <Button type="submit">Save password</Button>
            </div>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
