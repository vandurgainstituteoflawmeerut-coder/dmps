import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SchoolCrest } from "@/components/crest";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { SCHOOL } from "@/lib/school/config";
import { signInShared } from "@/lib/school/office-sync";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-fg">
            <SchoolCrest className="size-9" />
          </span>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ink">{SCHOOL.name}</h1>
          <p className="mt-1 text-sm text-muted">{SCHOOL.address}</p>
        </div>
        <form
          className="rounded-2xl bg-raised p-6 shadow-card md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            setBusy(true);
            void signInShared(username, password)
              .then((ok) => {
                if (!ok) setError("Username or password is not recognised.");
              })
              .finally(() => setBusy(false));
          }}
        >
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">School login</p>
          <p className="mt-1 font-display text-2xl text-ink">Sign in to your desk</p>
          <p className="mt-1 text-sm text-muted">
            The same username works on the office computer and on a phone. Records stay in one college register.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-left text-xs text-ink-soft">
            <li className="rounded-xl bg-canvas px-3 py-2"><span className="font-medium text-ink">Manager</span><br />Issues every username and password</li>
            <li className="rounded-xl bg-canvas px-3 py-2"><span className="font-medium text-ink">Principal</span><br />School records, exams and max marks</li>
            <li className="rounded-xl bg-canvas px-3 py-2"><span className="font-medium text-ink">Teacher</span><br />Assigned classes only</li>
            <li className="rounded-xl bg-canvas px-3 py-2"><span className="font-medium text-ink">Parent</span><br />One family</li>
            <li className="col-span-2 rounded-xl bg-canvas px-3 py-2"><span className="font-medium text-ink">Student</span><br />Own admission, results, fees and identity</li>
          </ul>
          <div className="mt-6 flex flex-col gap-4">
            <Field label="Username">
              <Input
                autoComplete="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
          </div>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="mt-6 w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
          <p className="mt-4 text-center text-xs text-faint">Usernames and passwords are assigned by the Manager.</p>
        </form>
      </div>
    </div>
  );
}
