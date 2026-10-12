-- Revision stops two desks from overwriting each other.
alter table school_register add column if not exists revision bigint not null default 1;

-- One frozen copy per academic year, kept after later edits.
create table if not exists school_year_archive (
  academic_year text primary key,
  data jsonb not null,
  saved_at timestamptz not null default now()
);
