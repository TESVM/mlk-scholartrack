-- Demo users would normally be linked to auth.users. This seed focuses on application tables.

insert into public.users_profile (id, auth_user_id, full_name, email, phone, role)
values
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Angela Brooks', 'angela@mlkcommittee.org', '(217) 555-0100', 'super_admin'),
  ('22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Derrick Johnson', 'derrick@mlkcommittee.org', '(217) 555-0198', 'mentor'),
  ('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Patricia Wells', 'patricia@mlkcommittee.org', '(217) 555-0134', 'committee_member')
on conflict (id) do nothing;

insert into public.students (
  id, first_name, last_name, date_of_birth, email, phone, address, city, state, zip,
  high_school, high_school_graduation_year, award_year, award_event_date,
  scholarship_amount, scholarship_type, status, assigned_mentor_id,
  thank_you_letter_received, needs_support, support_notes, created_by
)
values
  (
    '10000000-0000-0000-0000-000000000001', 'Ariana', 'Fields', '2008-08-14', 'ariana.fields@example.com',
    '(217) 555-0183', '1204 East Washington St', 'Champaign', 'IL', '61820', 'Central High School',
    2026, 2026, '2026-01-15', 2500, 'Academic Excellence', 'Awarded — Awaiting School Decision',
    '22222222-2222-2222-2222-222222222222', true, false, null, '33333333-3333-3333-3333-333333333333'
  ),
  (
    '10000000-0000-0000-0000-000000000002', 'Micah', 'Turner', '2007-11-09', 'micah.turner@example.com',
    '(217) 555-0145', '4403 Maple Ridge Rd', 'Urbana', 'IL', '61802', 'Urbana High School',
    2026, 2026, '2026-01-15', 3000, 'Leadership Award', 'School Decision Needed',
    '22222222-2222-2222-2222-222222222222', false, true, 'Needs help comparing admissions packages before June 10.',
    '33333333-3333-3333-3333-333333333333'
  ),
  (
    '10000000-0000-0000-0000-000000000003', 'Danielle', 'Coleman', '2008-01-22', 'danielle.coleman@example.com',
    '(217) 555-0114', '982 South Prairie View', 'Rantoul', 'IL', '61866', 'Rantoul Township High School',
    2026, 2026, '2026-01-15', 2500, 'Community Impact', 'School Selected',
    '22222222-2222-2222-2222-222222222222', true, false, null, '33333333-3333-3333-3333-333333333333'
  ),
  (
    '10000000-0000-0000-0000-000000000004', 'Jordan', 'Ellis', '2007-06-30', 'jordan.ellis@example.com',
    '(217) 555-0119', '812 Park Avenue', 'Danville', 'IL', '61832', 'Danville High School',
    2026, 2026, '2026-01-15', 3500, 'STEM Scholar', 'Enrollment Verified',
    '22222222-2222-2222-2222-222222222222', true, false, null, '33333333-3333-3333-3333-333333333333'
  ),
  (
    '10000000-0000-0000-0000-000000000005', 'Tiana', 'Morris', '2005-04-12', 'tiana.morris@example.com',
    '(217) 555-0124', '1031 South Vine St', 'Champaign', 'IL', '61820', 'Centennial High School',
    2024, 2024, '2024-01-13', 4000, 'Legacy Award', 'Active Scholar',
    '22222222-2222-2222-2222-222222222222', true, true, 'Requested support locating a summer internship.',
    '33333333-3333-3333-3333-333333333333'
  )
on conflict (id) do nothing;

insert into public.parents (student_id, full_name, relationship, phone, email, address, consent_signed, consent_date)
values
  ('10000000-0000-0000-0000-000000000001', 'Renee Fields', 'Mother', '(217) 555-0177', 'renee.fields@example.com', '1204 East Washington St, Champaign, IL 61820', true, '2026-01-15'),
  ('10000000-0000-0000-0000-000000000002', 'Lauren Turner', 'Mother', '(217) 555-0174', 'lauren.turner@example.com', '4403 Maple Ridge Rd, Urbana, IL 61802', true, '2026-01-15'),
  ('10000000-0000-0000-0000-000000000003', 'Charles Coleman', 'Father', '(217) 555-0162', 'charles.coleman@example.com', '982 South Prairie View, Rantoul, IL 61866', true, '2026-01-15'),
  ('10000000-0000-0000-0000-000000000004', 'Sharon Ellis', 'Mother', '(217) 555-0141', 'sharon.ellis@example.com', '812 Park Avenue, Danville, IL 61832', true, '2026-01-15'),
  ('10000000-0000-0000-0000-000000000005', 'Lisa Morris', 'Mother', '(217) 555-0109', 'lisa.morris@example.com', '1031 South Vine St, Champaign, IL 61820', true, '2024-01-13')
on conflict (student_id) do nothing;

update public.school_decisions
set
  school_selected = case student_id
    when '10000000-0000-0000-0000-000000000003' then true
    when '10000000-0000-0000-0000-000000000004' then true
    when '10000000-0000-0000-0000-000000000005' then true
    else false
  end,
  school_name = case student_id
    when '10000000-0000-0000-0000-000000000003' then 'Parkland College'
    when '10000000-0000-0000-0000-000000000004' then 'University of Illinois Urbana-Champaign'
    when '10000000-0000-0000-0000-000000000005' then 'Southern Illinois University Edwardsville'
    else null
  end,
  school_type = case student_id
    when '10000000-0000-0000-0000-000000000003' then 'College'::public.school_type
    when '10000000-0000-0000-0000-000000000004' then 'University'::public.school_type
    when '10000000-0000-0000-0000-000000000005' then 'University'::public.school_type
    else 'Undecided'::public.school_type
  end,
  school_address = case student_id
    when '10000000-0000-0000-0000-000000000003' then '2400 W Bradley Ave, Champaign, IL 61821'
    when '10000000-0000-0000-0000-000000000004' then '601 E John St, Champaign, IL 61820'
    when '10000000-0000-0000-0000-000000000005' then '1 Hairpin Dr, Edwardsville, IL 62026'
    else null
  end,
  admissions_confirmed = student_id in (
    '10000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000005'
  ),
  intended_major = case student_id
    when '10000000-0000-0000-0000-000000000003' then 'Nursing'
    when '10000000-0000-0000-0000-000000000004' then 'Computer Engineering'
    when '10000000-0000-0000-0000-000000000005' then 'Social Work'
    else null
  end,
  expected_start_date = case student_id
    when '10000000-0000-0000-0000-000000000003' then '2026-08-18'
    when '10000000-0000-0000-0000-000000000004' then '2026-08-24'
    when '10000000-0000-0000-0000-000000000005' then '2024-08-19'
    else null
  end,
  proof_of_enrollment_uploaded = student_id in (
    '10000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000005'
  ),
  scholarship_payment_instructions_received = student_id in (
    '10000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000005'
  ),
  protected_student_id = case student_id
    when '10000000-0000-0000-0000-000000000003' then 'PK-22094'
    when '10000000-0000-0000-0000-000000000004' then 'UIN-88204'
    when '10000000-0000-0000-0000-000000000005' then 'SIUE-44018'
    else null
  end;

insert into public.semester_updates (
  student_id,
  term_label,
  update_date,
  enrollment_status,
  gpa,
  credits_completed,
  campus_involvement,
  accomplishments,
  challenges,
  support_requested
)
values
  (
    '10000000-0000-0000-0000-000000000005',
    'Spring 2026',
    '2026-05-01',
    'Full-time',
    '3.6',
    30,
    'Student Social Work Association',
    'Completed first-year field placement application.',
    'Needs a paid summer role related to community outreach.',
    'Internship introductions and resume review'
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'Fall 2026 Prep',
    '2026-05-25',
    'Confirmed to start',
    null,
    null,
    null,
    'Orientation registration completed.',
    'None reported',
    null
  );
