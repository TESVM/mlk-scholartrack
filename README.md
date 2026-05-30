# MLK ScholarTrack

MLK ScholarTrack is a secure scholarship tracking web app for the MLK Advocacy for Justice Committee.

Tagline: `Tracking Scholars. Supporting Dreams. Building Legacy.`

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, Row Level Security, and Storage

## What is included

- Secure login page design for Supabase Auth
- Dashboard with scholarship tracking metrics
- Student directory with search and filters
- Add student intake form
- Student profile with tabs for overview, May follow-up, timeline, check-ins, documents, and tasks
- Student portal called `Student Connection Point`
- Dedicated May Follow-Up page with built-in email and text templates
- Tasks page
- Reports page with CSV export
- Settings page with user, privacy, consent, and audit sections
- Supabase SQL schema, RLS policies, automation triggers, storage policy, and seed data
- Five sample students with different statuses
- Demo semester updates for student self-reporting

## Project structure

```text
mlk-scholartrack/
  app/
  components/
  lib/
  supabase/
    schema.sql
    seed.sql
```

## Local setup

1. Install dependencies:

```bash
cd /Users/tes/aoh-directory/mlk-scholartrack
npm install
```

2. Create local env:

```bash
cp .env.example .env.local
```

3. Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Run the app:

```bash
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql).
3. Run [`supabase/seed.sql`](./supabase/seed.sql).
4. Create Auth users for admins, committee members, mentors, students, and parents.
5. Link each Auth user to `users_profile.auth_user_id`.
6. Create a private storage bucket named `scholar-documents` if it is not created by the SQL script.

## Security notes

- All app views are intended to require login in production.
- Row-level security limits records by role and student relationship.
- `protected_student_id` should be retrieved only through the `get_protected_student_id()` RPC for admins and committee members.
- Uploaded files should use private object paths like `<student_uuid>/<filename>`.
- Deletions should always be confirmed in the UI before calling delete mutations.
- Audit logging triggers are included for key tables.

## Automation included in SQL

- New students default to `Awarded — Awaiting School Decision`
- New students automatically get a `May School Decision Follow-Up` task due on May 1 of the award year
- School decision updates automatically advance status:
  - `School Selected`
  - `Enrollment Verified`
  - `Scholarship Payment Ready`
- `run_may_followup_audit()` flags students in May who still have no school selected

## Design direction

- Royal blue, gold, white, and dark navy palette
- Large readable type
- Card-driven dashboard
- Dignified, hopeful visual tone
- Mobile bottom navigation and desktop sidebar

## Notes

- The current UI renders from demo data so the app is immediately navigable before Supabase wiring is finished.
- To make forms fully live, connect each page to server actions or route handlers that call Supabase using the schema in `supabase/schema.sql`.
