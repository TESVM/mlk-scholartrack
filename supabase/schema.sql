-- MLK ScholarTrack schema for Supabase
-- Major sections: enums, tables, helpers, triggers, audit logging, and row-level security.

create extension if not exists pgcrypto;

create type public.app_role as enum (
  'super_admin',
  'committee_member',
  'mentor',
  'student',
  'parent_guardian'
);

create type public.student_status as enum (
  'Awarded — Awaiting School Decision',
  'School Decision Needed',
  'School Selected',
  'Proof of Enrollment Needed',
  'Enrollment Verified',
  'Scholarship Payment Ready',
  'Active Scholar',
  'Needs Follow-Up',
  'Needs Support',
  'Graduated',
  'Alumni',
  'Inactive / Unable to Contact'
);

create type public.school_type as enum (
  'College',
  'University',
  'Trade School',
  'Military',
  'Workforce',
  'Undecided',
  'Other'
);

create type public.contact_method as enum ('Phone', 'Text', 'Email', 'Zoom', 'In-Person');
create type public.task_priority as enum ('Low', 'Medium', 'High');
create type public.task_status as enum ('Open', 'In Progress', 'Completed');
create type public.task_type as enum (
  'May Follow-Up',
  'Enrollment Proof',
  'Payment',
  'Check-In',
  'Graduation',
  'Other'
);

create table if not exists public.users_profile (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  role public.app_role not null default 'committee_member',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  email text not null,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  high_school text,
  high_school_graduation_year integer,
  award_year integer not null,
  award_event_date date,
  scholarship_amount numeric(10,2) not null default 0,
  scholarship_type text,
  status public.student_status not null default 'Awarded — Awaiting School Decision',
  assigned_mentor_id uuid references public.users_profile(id) on delete set null,
  thank_you_letter_received boolean not null default false,
  needs_support boolean not null default false,
  support_notes text,
  created_by uuid references public.users_profile(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.parents (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references public.students(id) on delete cascade,
  full_name text not null,
  relationship text,
  phone text,
  email text,
  address text,
  consent_signed boolean not null default false,
  consent_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.school_decisions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references public.students(id) on delete cascade,
  school_selected boolean not null default false,
  school_name text,
  school_type public.school_type not null default 'Undecided',
  school_address text,
  admissions_confirmed boolean not null default false,
  intended_major text,
  expected_start_date date,
  expected_graduation_date date,
  proof_of_enrollment_uploaded boolean not null default false,
  scholarship_payment_instructions_received boolean not null default false,
  protected_student_id text,
  needs_support boolean not null default false,
  support_notes text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  checkin_date date not null default current_date,
  contact_method public.contact_method not null,
  contacted_by text not null,
  student_response text,
  current_school_status text,
  academic_concerns text,
  financial_concerns text,
  housing_concerns text,
  personal_concerns text,
  support_needed text,
  follow_up_required boolean not null default false,
  follow_up_due_date date,
  private_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  document_type text not null,
  file_name text not null,
  file_url text not null,
  uploaded_by uuid references public.users_profile(id) on delete set null,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.semester_updates (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  term_label text not null,
  update_date date not null default current_date,
  enrollment_status text not null,
  gpa text,
  credits_completed integer,
  campus_involvement text,
  accomplishments text,
  challenges text,
  support_requested text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  assigned_to uuid references public.users_profile(id) on delete set null,
  task_title text not null,
  task_description text,
  task_type public.task_type not null default 'Other',
  due_date date not null,
  priority public.task_priority not null default 'Medium',
  status public.task_status not null default 'Open',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id) on delete set null,
  action text not null,
  table_name text not null,
  record_id text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
as $$
  select coalesce(
    (select role from public.users_profile where auth_user_id = auth.uid()),
    'student'::public.app_role
  );
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
as $$
  select id from public.users_profile where auth_user_id = auth.uid();
$$;

create or replace function public.user_can_access_student(target_student_id uuid)
returns boolean
language sql
stable
as $$
  select case
    when public.current_app_role() in ('super_admin', 'committee_member') then true
    when public.current_app_role() = 'mentor' then exists (
      select 1 from public.students s
      where s.id = target_student_id and s.assigned_mentor_id = public.current_profile_id()
    )
    when public.current_app_role() = 'student' then exists (
      select 1 from public.students s
      where s.id = target_student_id and lower(s.email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
    )
    when public.current_app_role() = 'parent_guardian' then exists (
      select 1
      from public.parents p
      join public.students s on s.id = p.student_id
      where p.student_id = target_student_id
        and lower(p.email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
    )
    else false
  end;
$$;

create or replace function public.sync_student_status_from_school_decision()
returns trigger
language plpgsql
as $$
begin
  update public.students
  set
    status = case
      when new.scholarship_payment_instructions_received then 'Scholarship Payment Ready'
      when new.proof_of_enrollment_uploaded then 'Enrollment Verified'
      when new.school_selected then 'School Selected'
      else status
    end,
    needs_support = coalesce(new.needs_support, false),
    support_notes = new.support_notes
  where id = new.student_id;

  if new.school_selected and new.completed_at is null then
    new.completed_at = now();
  end if;

  return new;
end;
$$;

create or replace function public.create_may_follow_up_task()
returns trigger
language plpgsql
as $$
declare
  assigned_person uuid;
begin
  new.status = 'Awarded — Awaiting School Decision';
  assigned_person := coalesce(new.assigned_mentor_id, public.current_profile_id());

  insert into public.tasks (
    student_id,
    assigned_to,
    task_title,
    task_description,
    task_type,
    due_date,
    priority,
    status
  ) values (
    new.id,
    assigned_person,
    'May School Decision Follow-Up',
    'Contact student and family to confirm school selection, intended program, start date, and proof of enrollment.',
    'May Follow-Up',
    make_date(new.award_year, 5, 1),
    'High',
    'Open'
  );

  insert into public.school_decisions (student_id)
  values (new.id)
  on conflict (student_id) do nothing;

  return new;
end;
$$;

create or replace function public.run_may_followup_audit(target_year integer default extract(year from now())::integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.students s
  set status = 'School Decision Needed',
      updated_at = now()
  where s.award_year = target_year
    and extract(month from now()) = 5
    and exists (
      select 1
      from public.school_decisions sd
      where sd.student_id = s.id
        and coalesce(sd.school_selected, false) = false
    )
    and s.status in ('Awarded — Awaiting School Decision', 'Needs Follow-Up');

  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;

create or replace function public.get_protected_student_id(target_student_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
  secure_value text;
begin
  allowed := public.current_app_role() in ('super_admin', 'committee_member');

  if not allowed then
    raise exception 'Not authorized to access protected student ID numbers';
  end if;

  select protected_student_id
  into secure_value
  from public.school_decisions
  where student_id = target_student_id;

  return secure_value;
end;
$$;

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor uuid;
begin
  actor := public.current_profile_id();

  insert into public.audit_logs (user_id, action, table_name, record_id, details)
  values (
    actor,
    tg_op,
    tg_table_name,
    coalesce(new.id, old.id)::text,
    case
      when tg_op = 'DELETE' then jsonb_build_object('old', to_jsonb(old))
      when tg_op = 'INSERT' then jsonb_build_object('new', to_jsonb(new))
      else jsonb_build_object('old', to_jsonb(old), 'new', to_jsonb(new))
    end
  );

  return coalesce(new, old);
end;
$$;

create trigger set_users_profile_updated_at
before update on public.users_profile
for each row execute function public.set_updated_at();

create trigger set_students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

create trigger set_parents_updated_at
before update on public.parents
for each row execute function public.set_updated_at();

create trigger set_school_decisions_updated_at
before update on public.school_decisions
for each row execute function public.set_updated_at();

create trigger set_checkins_updated_at
before update on public.checkins
for each row execute function public.set_updated_at();

create trigger set_tasks_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

create trigger set_semester_updates_updated_at
before update on public.semester_updates
for each row execute function public.set_updated_at();

create trigger students_after_insert_setup
after insert on public.students
for each row execute function public.create_may_follow_up_task();

create trigger school_decisions_after_write_sync_status
before insert or update on public.school_decisions
for each row execute function public.sync_student_status_from_school_decision();

create trigger audit_students
after insert or update or delete on public.students
for each row execute function public.write_audit_log();

create trigger audit_school_decisions
after insert or update or delete on public.school_decisions
for each row execute function public.write_audit_log();

create trigger audit_checkins
after insert or update or delete on public.checkins
for each row execute function public.write_audit_log();

create trigger audit_documents
after insert or update or delete on public.documents
for each row execute function public.write_audit_log();

create trigger audit_semester_updates
after insert or update or delete on public.semester_updates
for each row execute function public.write_audit_log();

create trigger audit_tasks
after insert or update or delete on public.tasks
for each row execute function public.write_audit_log();

alter table public.users_profile enable row level security;
alter table public.students enable row level security;
alter table public.parents enable row level security;
alter table public.school_decisions enable row level security;
alter table public.checkins enable row level security;
alter table public.documents enable row level security;
alter table public.semester_updates enable row level security;
alter table public.tasks enable row level security;
alter table public.audit_logs enable row level security;

create policy "users profile self or admin read"
on public.users_profile
for select
using (
  public.current_app_role() = 'super_admin'
  or auth_user_id = auth.uid()
);

create policy "super admins manage users"
on public.users_profile
for all
using (public.current_app_role() = 'super_admin')
with check (public.current_app_role() = 'super_admin');

create policy "students visible by role scope"
on public.students
for select
using (public.user_can_access_student(id));

create policy "committee and mentors create students"
on public.students
for insert
with check (public.current_app_role() in ('super_admin', 'committee_member', 'mentor'));

create policy "students updatable by scoped role"
on public.students
for update
using (public.user_can_access_student(id))
with check (
  public.current_app_role() in ('super_admin', 'committee_member', 'mentor', 'student', 'parent_guardian')
);

create policy "only admins delete students"
on public.students
for delete
using (public.current_app_role() = 'super_admin');

create policy "parents visible by linked student"
on public.parents
for select
using (public.user_can_access_student(student_id));

create policy "parents insert by committee or admin"
on public.parents
for insert
with check (public.current_app_role() in ('super_admin', 'committee_member'));

create policy "parents update by scope"
on public.parents
for update
using (public.user_can_access_student(student_id))
with check (public.user_can_access_student(student_id));

create policy "school decisions visible by linked student"
on public.school_decisions
for select
using (public.user_can_access_student(student_id));

create policy "school decisions upsert by scope"
on public.school_decisions
for all
using (public.user_can_access_student(student_id))
with check (public.user_can_access_student(student_id));

create policy "checkins visible by linked student"
on public.checkins
for select
using (public.user_can_access_student(student_id));

create policy "committee and mentors manage checkins"
on public.checkins
for all
using (
  public.user_can_access_student(student_id)
  and public.current_app_role() in ('super_admin', 'committee_member', 'mentor')
)
with check (
  public.user_can_access_student(student_id)
  and public.current_app_role() in ('super_admin', 'committee_member', 'mentor')
);

create policy "documents visible by linked student"
on public.documents
for select
using (public.user_can_access_student(student_id));

create policy "documents insert by authorized users"
on public.documents
for insert
with check (public.user_can_access_student(student_id));

create policy "semester updates visible by linked student"
on public.semester_updates
for select
using (public.user_can_access_student(student_id));

create policy "semester updates insert by linked student scope"
on public.semester_updates
for insert
with check (public.user_can_access_student(student_id));

create policy "semester updates update by linked student scope"
on public.semester_updates
for update
using (public.user_can_access_student(student_id))
with check (public.user_can_access_student(student_id));

create policy "tasks visible by linked student or assignee"
on public.tasks
for select
using (
  (student_id is not null and public.user_can_access_student(student_id))
  or assigned_to = public.current_profile_id()
);

create policy "committee and mentors manage tasks"
on public.tasks
for all
using (
  public.current_app_role() in ('super_admin', 'committee_member', 'mentor')
  and ((student_id is null) or public.user_can_access_student(student_id))
)
with check (
  public.current_app_role() in ('super_admin', 'committee_member', 'mentor')
  and ((student_id is null) or public.user_can_access_student(student_id))
);

create policy "audit logs admin only"
on public.audit_logs
for select
using (public.current_app_role() = 'super_admin');

insert into storage.buckets (id, name, public)
values ('scholar-documents', 'scholar-documents', false)
on conflict (id) do nothing;

create policy "storage read by authorized users"
on storage.objects
for select
using (
  bucket_id = 'scholar-documents'
  and public.user_can_access_student((storage.foldername(name))[1]::uuid)
);

create policy "storage upload by authorized users"
on storage.objects
for insert
with check (
  bucket_id = 'scholar-documents'
  and public.user_can_access_student((storage.foldername(name))[1]::uuid)
);
