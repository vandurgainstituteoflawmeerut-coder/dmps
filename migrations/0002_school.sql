create table if not exists school_profiles (
  user_id text primary key,
  username text not null unique,
  role text not null,
  family_id text,
  student_id text,
  display_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists school_profiles_role_idx on school_profiles (role);
create index if not exists school_profiles_family_idx on school_profiles (family_id);
create index if not exists school_profiles_student_idx on school_profiles (student_id);

create table if not exists school_register (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
