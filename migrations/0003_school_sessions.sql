-- Device logins for the shared college register. Rows are kept for years;
-- a session token simply expires if that phone is not used.
create table if not exists school_sessions (
  token text primary key,
  account_id text not null,
  role text not null,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists school_sessions_account_idx on school_sessions (account_id);
