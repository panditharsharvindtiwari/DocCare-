# Supabase setup for Doctor Care Plus

The current checkout has no Supabase project, URL, key, SDK dependency, or existing database schema. The application therefore remains on its current browser-local prototype store. This guide records the values and security decisions needed before connecting a real project; it does not contain credentials or enable a partial backend.

## Required client environment

Create .env.local in the project root (it is ignored by Git) with values from your Supabase project's Connect dialog:

VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable-key>

The project's publishable key (or legacy anon key) is designed for browser clients; database access must still be restricted by Row Level Security (RLS). Never place a service_role or secret key in a VITE_ variable, source file, browser storage, or client request. The checked-in .env.example intentionally contains blank values.

## Recommended data mapping

Keep the current TypeScript types and public directory fields as the starting contract:

- profiles: id references auth.users.id; display name, phone, and role (patient, receptionist, doctor, admin). Public signup must always create a patient. Staff roles must be granted through a trusted dashboard/server workflow, never selected in the browser.
- specialities: existing specialty IDs, names, categories, descriptions, active state.
- doctors: existing IDs and public-reference fields including profile_type, source_url, source_verified_at, photo_url, photo_source_url, and photo_license.
- doctor_schedules: doctor, weekday, start/end time, slot duration, and active state. Import only schedules that are confirmed for this prototype; no schedule means no bookable availability.
- appointments: patient, doctor, date/time, visit type, reason, status and timestamps.
- appointment_events: append-only status changes with actor and timestamp.

Preserve the current appointment statuses and transitions from src/types/appointment.ts. Enforce one active appointment per doctor/time in Postgres (including a database uniqueness constraint) so concurrent requests cannot double-book. Create and update the appointment plus its event inside one database transaction or server-side function.

## Access rules to establish before exposing tables

Enable RLS on every table exposed through Supabase's Data API and grant only the required operations:

- Signed-out visitors: read active specialty and public-reference doctor fields only. Do not expose patient profiles, appointment reasons, contact details, or event history.
- Patients: read and cancel/reschedule only their own eligible appointments; create appointments only for themselves.
- Receptionists: access only the appointment and contact information required for their assigned clinic.
- Doctors: access only appointments assigned to their doctor profile and update allowed clinical workflow statuses.
- Admins: manage directory and staff access only through trusted role-checked policies or server-side operations.

Do not trust a role value stored in editable profile metadata for authorization unless a trusted workflow controls its changes. Test each policy with signed-out, patient, receptionist, doctor, and admin accounts before switching the app from prototype storage.

## Integration sequence

1. Create the Supabase project and configure email sign-in/verification and password reset.
2. Apply a reviewed schema and RLS policies in a development project.
3. Add @supabase/supabase-js and initialize one client from the two environment variables above.
4. Replace the auth provider with Supabase Auth state subscription and server-validated profiles; remove the browser-local password/session credential code only after the Supabase path passes sign-in, role, refresh, and sign-out checks.
5. Move doctors, specialties, schedules and appointments behind a repository interface. Keep the existing mock repository as an explicit local demo option until Supabase data is seeded and verified.
6. Seed the existing verified directory without fabricating schedules or credentials; compare row counts and IDs before changing the default data source.
7. Exercise booking collisions, appointment visibility, role boundaries and direct-route refresh against the development project before deployment.

Official references: [React authentication quickstart](https://supabase.com/docs/guides/auth/quickstarts/react), [API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), and [managing user data](https://supabase.com/docs/guides/auth/managing-user-data).
