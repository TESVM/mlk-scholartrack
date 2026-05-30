import type {
  AuditLog,
  CheckIn,
  DashboardStats,
  DocumentRecord,
  ParentGuardian,
  SchoolDecision,
  SemesterUpdate,
  Student,
  Task,
  UserProfile
} from "@/lib/types";

const now = "2026-05-29T09:00:00.000Z";

export const demoViewer: UserProfile = {
  id: "user-1",
  auth_user_id: "demo-auth-user",
  full_name: "Angela Brooks",
  email: "angela@mlkcommittee.org",
  phone: "(217) 555-0100",
  role: "super_admin",
  active: true,
  created_at: now,
  updated_at: now
};

export const demoUsers: UserProfile[] = [
  demoViewer,
  {
    id: "user-2",
    auth_user_id: "mentor-auth-user",
    full_name: "Derrick Johnson",
    email: "derrick@mlkcommittee.org",
    phone: "(217) 555-0198",
    role: "mentor",
    active: true,
    created_at: now,
    updated_at: now
  },
  {
    id: "user-3",
    auth_user_id: "committee-auth-user",
    full_name: "Patricia Wells",
    email: "patricia@mlkcommittee.org",
    phone: "(217) 555-0134",
    role: "committee_member",
    active: true,
    created_at: now,
    updated_at: now
  }
];

export const demoStudents: Student[] = [
  {
    id: "student-1",
    first_name: "Ariana",
    last_name: "Fields",
    date_of_birth: "2008-08-14",
    email: "ariana.fields@example.com",
    phone: "(217) 555-0183",
    address: "1204 East Washington St",
    city: "Champaign",
    state: "IL",
    zip: "61820",
    high_school: "Central High School",
    high_school_graduation_year: 2026,
    award_year: 2026,
    award_event_date: "2026-01-15",
    scholarship_amount: 2500,
    scholarship_type: "Academic Excellence",
    status: "Awarded — Awaiting School Decision",
    assigned_mentor_id: "user-2",
    thank_you_letter_received: true,
    needs_support: false,
    support_notes: null,
    school_selected: false,
    school_name: null,
    proof_of_enrollment_uploaded: false,
    admissions_confirmed: false,
    intended_major: null,
    expected_start_date: null,
    last_checkin_date: "2026-02-06",
    parent_name: "Renee Fields",
    parent_phone: "(217) 555-0177",
    created_at: now,
    updated_at: now
  },
  {
    id: "student-2",
    first_name: "Micah",
    last_name: "Turner",
    date_of_birth: "2007-11-09",
    email: "micah.turner@example.com",
    phone: "(217) 555-0145",
    address: "4403 Maple Ridge Rd",
    city: "Urbana",
    state: "IL",
    zip: "61802",
    high_school: "Urbana High School",
    high_school_graduation_year: 2026,
    award_year: 2026,
    award_event_date: "2026-01-15",
    scholarship_amount: 3000,
    scholarship_type: "Leadership Award",
    status: "School Decision Needed",
    assigned_mentor_id: "user-2",
    thank_you_letter_received: false,
    needs_support: true,
    support_notes: "Needs help comparing admissions packages before June 10.",
    school_selected: false,
    school_name: null,
    proof_of_enrollment_uploaded: false,
    admissions_confirmed: false,
    intended_major: null,
    expected_start_date: null,
    last_checkin_date: "2026-05-14",
    parent_name: "Lauren Turner",
    parent_phone: "(217) 555-0174",
    created_at: now,
    updated_at: now
  },
  {
    id: "student-3",
    first_name: "Danielle",
    last_name: "Coleman",
    date_of_birth: "2008-01-22",
    email: "danielle.coleman@example.com",
    phone: "(217) 555-0114",
    address: "982 South Prairie View",
    city: "Rantoul",
    state: "IL",
    zip: "61866",
    high_school: "Rantoul Township High School",
    high_school_graduation_year: 2026,
    award_year: 2026,
    award_event_date: "2026-01-15",
    scholarship_amount: 2500,
    scholarship_type: "Community Impact",
    status: "School Selected",
    assigned_mentor_id: "user-2",
    thank_you_letter_received: true,
    needs_support: false,
    support_notes: null,
    school_selected: true,
    school_name: "Parkland College",
    proof_of_enrollment_uploaded: false,
    admissions_confirmed: true,
    intended_major: "Nursing",
    expected_start_date: "2026-08-18",
    last_checkin_date: "2026-05-20",
    parent_name: "Charles Coleman",
    parent_phone: "(217) 555-0162",
    created_at: now,
    updated_at: now
  },
  {
    id: "student-4",
    first_name: "Jordan",
    last_name: "Ellis",
    date_of_birth: "2007-06-30",
    email: "jordan.ellis@example.com",
    phone: "(217) 555-0119",
    address: "812 Park Avenue",
    city: "Danville",
    state: "IL",
    zip: "61832",
    high_school: "Danville High School",
    high_school_graduation_year: 2026,
    award_year: 2026,
    award_event_date: "2026-01-15",
    scholarship_amount: 3500,
    scholarship_type: "STEM Scholar",
    status: "Enrollment Verified",
    assigned_mentor_id: "user-2",
    thank_you_letter_received: true,
    needs_support: false,
    support_notes: null,
    school_selected: true,
    school_name: "University of Illinois Urbana-Champaign",
    proof_of_enrollment_uploaded: true,
    admissions_confirmed: true,
    intended_major: "Computer Engineering",
    expected_start_date: "2026-08-24",
    last_checkin_date: "2026-05-25",
    parent_name: "Sharon Ellis",
    parent_phone: "(217) 555-0141",
    created_at: now,
    updated_at: now
  },
  {
    id: "student-5",
    first_name: "Tiana",
    last_name: "Morris",
    date_of_birth: "2005-04-12",
    email: "tiana.morris@example.com",
    phone: "(217) 555-0124",
    address: "1031 South Vine St",
    city: "Champaign",
    state: "IL",
    zip: "61820",
    high_school: "Centennial High School",
    high_school_graduation_year: 2024,
    award_year: 2024,
    award_event_date: "2024-01-13",
    scholarship_amount: 4000,
    scholarship_type: "Legacy Award",
    status: "Active Scholar",
    assigned_mentor_id: "user-2",
    thank_you_letter_received: true,
    needs_support: true,
    support_notes: "Requested support locating a summer internship.",
    school_selected: true,
    school_name: "Southern Illinois University Edwardsville",
    proof_of_enrollment_uploaded: true,
    admissions_confirmed: true,
    intended_major: "Social Work",
    expected_start_date: "2024-08-19",
    last_checkin_date: "2026-04-11",
    parent_name: "Lisa Morris",
    parent_phone: "(217) 555-0109",
    created_at: now,
    updated_at: now
  }
];

export const demoParents: ParentGuardian[] = demoStudents.map((student, index) => ({
  id: `parent-${index + 1}`,
  student_id: student.id,
  full_name: student.parent_name ?? "Parent Record",
  relationship: "Parent/Guardian",
  phone: student.parent_phone ?? "(217) 555-0000",
  email: `parent${index + 1}@example.com`,
  address: `${student.address}, ${student.city}, ${student.state} ${student.zip}`,
  consent_signed: true,
  consent_date: "2026-01-15",
  created_at: now,
  updated_at: now
}));

export const demoSchoolDecisions: SchoolDecision[] = [
  {
    id: "sd-1",
    student_id: "student-1",
    school_selected: false,
    school_name: null,
    school_type: "Undecided",
    school_address: null,
    admissions_confirmed: false,
    intended_major: null,
    expected_start_date: null,
    expected_graduation_date: null,
    proof_of_enrollment_uploaded: false,
    scholarship_payment_instructions_received: false,
    protected_student_id: null,
    needs_support: false,
    support_notes: null,
    completed_at: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "sd-2",
    student_id: "student-2",
    school_selected: false,
    school_name: null,
    school_type: "Undecided",
    school_address: null,
    admissions_confirmed: false,
    intended_major: null,
    expected_start_date: null,
    expected_graduation_date: null,
    proof_of_enrollment_uploaded: false,
    scholarship_payment_instructions_received: false,
    protected_student_id: null,
    needs_support: true,
    support_notes: "Family asked for a call about trade school and university options.",
    completed_at: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "sd-3",
    student_id: "student-3",
    school_selected: true,
    school_name: "Parkland College",
    school_type: "College",
    school_address: "2400 W Bradley Ave, Champaign, IL 61821",
    admissions_confirmed: true,
    intended_major: "Nursing",
    expected_start_date: "2026-08-18",
    expected_graduation_date: "2028-05-10",
    proof_of_enrollment_uploaded: false,
    scholarship_payment_instructions_received: false,
    protected_student_id: "PK-22094",
    needs_support: false,
    support_notes: null,
    completed_at: "2026-05-20",
    created_at: now,
    updated_at: now
  },
  {
    id: "sd-4",
    student_id: "student-4",
    school_selected: true,
    school_name: "University of Illinois Urbana-Champaign",
    school_type: "University",
    school_address: "601 E John St, Champaign, IL 61820",
    admissions_confirmed: true,
    intended_major: "Computer Engineering",
    expected_start_date: "2026-08-24",
    expected_graduation_date: "2030-05-15",
    proof_of_enrollment_uploaded: true,
    scholarship_payment_instructions_received: true,
    protected_student_id: "UIN-88204",
    needs_support: false,
    support_notes: null,
    completed_at: "2026-05-25",
    created_at: now,
    updated_at: now
  },
  {
    id: "sd-5",
    student_id: "student-5",
    school_selected: true,
    school_name: "Southern Illinois University Edwardsville",
    school_type: "University",
    school_address: "1 Hairpin Dr, Edwardsville, IL 62026",
    admissions_confirmed: true,
    intended_major: "Social Work",
    expected_start_date: "2024-08-19",
    expected_graduation_date: "2028-05-10",
    proof_of_enrollment_uploaded: true,
    scholarship_payment_instructions_received: true,
    protected_student_id: "SIUE-44018",
    needs_support: true,
    support_notes: "Interested in alumni mentor pairing next summer.",
    completed_at: "2024-05-16",
    created_at: now,
    updated_at: now
  }
];

export const demoTasks: Task[] = [
  {
    id: "task-1",
    student_id: "student-1",
    assigned_to: "user-3",
    task_title: "May School Decision Follow-Up",
    task_description: "Call student and parent to confirm school decision and contact information.",
    task_type: "May Follow-Up",
    due_date: "2026-05-01",
    priority: "High",
    status: "Open",
    completed_at: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "task-2",
    student_id: "student-2",
    assigned_to: "user-2",
    task_title: "May School Decision Follow-Up",
    task_description: "Student is still undecided. Offer support resources and schedule next call.",
    task_type: "May Follow-Up",
    due_date: "2026-05-01",
    priority: "High",
    status: "In Progress",
    completed_at: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "task-3",
    student_id: "student-3",
    assigned_to: "user-3",
    task_title: "Collect proof of enrollment",
    task_description: "Send upload link for enrollment verification.",
    task_type: "Enrollment Proof",
    due_date: "2026-06-05",
    priority: "High",
    status: "Open",
    completed_at: null,
    created_at: now,
    updated_at: now
  },
  {
    id: "task-4",
    student_id: "student-4",
    assigned_to: "user-3",
    task_title: "Confirm scholarship payment instructions",
    task_description: "Bursar contact information received; verify account routing and memo line.",
    task_type: "Payment",
    due_date: "2026-06-10",
    priority: "Medium",
    status: "Completed",
    completed_at: "2026-05-27",
    created_at: now,
    updated_at: now
  },
  {
    id: "task-5",
    student_id: "student-5",
    assigned_to: "user-2",
    task_title: "End-of-semester check-in",
    task_description: "Discuss internship support and sophomore year planning.",
    task_type: "Check-In",
    due_date: "2026-06-15",
    priority: "Medium",
    status: "Open",
    completed_at: null,
    created_at: now,
    updated_at: now
  }
];

export const demoCheckins: CheckIn[] = [
  {
    id: "checkin-1",
    student_id: "student-2",
    checkin_date: "2026-05-14",
    contact_method: "Phone",
    contacted_by: "Derrick Johnson",
    student_response: "Wants more time to compare options with family.",
    current_school_status: "Still deciding",
    academic_concerns: null,
    financial_concerns: "Worried about dorm costs.",
    housing_concerns: null,
    personal_concerns: null,
    support_needed: "Financial aid coaching",
    follow_up_required: true,
    follow_up_due_date: "2026-06-02",
    private_notes: "Parent requested callback after 6 PM.",
    created_at: now,
    updated_at: now
  },
  {
    id: "checkin-2",
    student_id: "student-5",
    checkin_date: "2026-04-11",
    contact_method: "Zoom",
    contacted_by: "Derrick Johnson",
    student_response: "Doing well and applying for campus jobs.",
    current_school_status: "Finishing freshman year",
    academic_concerns: null,
    financial_concerns: "Needs paid summer placement.",
    housing_concerns: null,
    personal_concerns: null,
    support_needed: "Internship introductions",
    follow_up_required: true,
    follow_up_due_date: "2026-06-20",
    private_notes: "Potential alumni mentor match through social work network.",
    created_at: now,
    updated_at: now
  }
];

export const demoDocuments: DocumentRecord[] = [
  {
    id: "doc-1",
    student_id: "student-4",
    document_type: "Proof of enrollment",
    file_name: "jordan-ellis-enrollment-proof.pdf",
    file_url: "#",
    uploaded_by: "Patricia Wells",
    uploaded_at: "2026-05-25"
  },
  {
    id: "doc-2",
    student_id: "student-5",
    document_type: "Graduation confirmation",
    file_name: "tiana-morris-semester-update.pdf",
    file_url: "#",
    uploaded_by: "Tiana Morris",
    uploaded_at: "2026-04-11"
  }
];

export const demoSemesterUpdates: SemesterUpdate[] = [
  {
    id: "semester-1",
    student_id: "student-5",
    term_label: "Spring 2026",
    update_date: "2026-05-01",
    enrollment_status: "Full-time",
    gpa: "3.6",
    credits_completed: 30,
    campus_involvement: "Student Social Work Association",
    accomplishments: "Completed first-year field placement application.",
    challenges: "Needs a paid summer role related to community outreach.",
    support_requested: "Internship introductions and resume review",
    created_at: now,
    updated_at: now
  },
  {
    id: "semester-2",
    student_id: "student-4",
    term_label: "Fall 2026 Prep",
    update_date: "2026-05-25",
    enrollment_status: "Confirmed to start",
    gpa: null,
    credits_completed: null,
    campus_involvement: null,
    accomplishments: "Orientation registration completed.",
    challenges: "None reported",
    support_requested: null,
    created_at: now,
    updated_at: now
  }
];

export const demoAuditLogs: AuditLog[] = [
  {
    id: "audit-1",
    user_id: "user-3",
    action: "create",
    table_name: "students",
    record_id: "student-1",
    details: "Scholarship recipient created from January event intake.",
    created_at: "2026-01-15T19:20:00.000Z"
  },
  {
    id: "audit-2",
    user_id: "user-2",
    action: "update",
    table_name: "checkins",
    record_id: "checkin-1",
    details: "Added family financial aid concern and follow-up due date.",
    created_at: "2026-05-14T18:40:00.000Z"
  }
];

export function getDashboardStats(): DashboardStats {
  return {
    totalAwarded: demoStudents.length,
    awaitingDecision: demoStudents.filter(
      (student) => student.status === "Awarded — Awaiting School Decision"
    ).length,
    needingMayFollowUp: demoStudents.filter((student) =>
      ["Awarded — Awaiting School Decision", "School Decision Needed"].includes(
        student.status
      )
    ).length,
    missingProof: demoStudents.filter(
      (student) => student.school_selected && !student.proof_of_enrollment_uploaded
    ).length,
    enrolled: demoStudents.filter(
      (student) =>
        student.status === "Enrollment Verified" ||
        student.status === "Scholarship Payment Ready" ||
        student.status === "Active Scholar"
    ).length,
    activeScholars: demoStudents.filter((student) => student.status === "Active Scholar").length,
    needingSupport: demoStudents.filter((student) => student.needs_support).length,
    graduated: 0,
    alumni: 0,
    openTasks: demoTasks.filter((task) => task.status !== "Completed").length
  };
}
