export type UserRole =
  | "super_admin"
  | "committee_member"
  | "mentor"
  | "student"
  | "parent_guardian";

export type StudentStatus =
  | "Awarded — Awaiting School Decision"
  | "School Decision Needed"
  | "School Selected"
  | "Proof of Enrollment Needed"
  | "Enrollment Verified"
  | "Scholarship Payment Ready"
  | "Active Scholar"
  | "Needs Follow-Up"
  | "Needs Support"
  | "Graduated"
  | "Alumni"
  | "Inactive / Unable to Contact";

export type SchoolType =
  | "College"
  | "University"
  | "Trade School"
  | "Military"
  | "Workforce"
  | "Undecided"
  | "Other";

export type ContactMethod = "Phone" | "Text" | "Email" | "Zoom" | "In-Person";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Open" | "In Progress" | "Completed";
export type TaskType =
  | "May Follow-Up"
  | "Enrollment Proof"
  | "Payment"
  | "Check-In"
  | "Graduation"
  | "Other";

export interface UserProfile {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  high_school: string;
  high_school_graduation_year: number;
  award_year: number;
  award_event_date: string;
  scholarship_amount: number;
  scholarship_type: string;
  status: StudentStatus;
  assigned_mentor_id: string | null;
  thank_you_letter_received: boolean;
  needs_support: boolean;
  support_notes: string | null;
  notes?: string | null;
  school_name?: string | null;
  school_selected?: boolean;
  proof_of_enrollment_uploaded?: boolean;
  admissions_confirmed?: boolean;
  intended_major?: string | null;
  expected_start_date?: string | null;
  last_checkin_date?: string | null;
  parent_name?: string | null;
  parent_phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParentGuardian {
  id: string;
  student_id: string;
  full_name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  consent_signed: boolean;
  consent_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchoolDecision {
  id: string;
  student_id: string;
  school_selected: boolean;
  school_name: string | null;
  school_type: SchoolType;
  school_address: string | null;
  admissions_confirmed: boolean;
  intended_major: string | null;
  expected_start_date: string | null;
  expected_graduation_date: string | null;
  proof_of_enrollment_uploaded: boolean;
  scholarship_payment_instructions_received: boolean;
  protected_student_id: string | null;
  needs_support: boolean;
  support_notes: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckIn {
  id: string;
  student_id: string;
  checkin_date: string;
  contact_method: ContactMethod;
  contacted_by: string;
  student_response: string;
  current_school_status: string;
  academic_concerns: string | null;
  financial_concerns: string | null;
  housing_concerns: string | null;
  personal_concerns: string | null;
  support_needed: string | null;
  follow_up_required: boolean;
  follow_up_due_date: string | null;
  private_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentRecord {
  id: string;
  student_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
}

export interface SemesterUpdate {
  id: string;
  student_id: string;
  term_label: string;
  update_date: string;
  enrollment_status: string;
  gpa: string | null;
  credits_completed: number | null;
  campus_involvement: string | null;
  accomplishments: string | null;
  challenges: string | null;
  support_requested: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  student_id: string;
  assigned_to: string | null;
  task_title: string;
  task_description: string;
  task_type: TaskType;
  due_date: string;
  priority: TaskPriority;
  status: TaskStatus;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  details: string;
  created_at: string;
}

export interface DashboardStats {
  totalAwarded: number;
  awaitingDecision: number;
  needingMayFollowUp: number;
  missingProof: number;
  enrolled: number;
  activeScholars: number;
  needingSupport: number;
  graduated: number;
  alumni: number;
  openTasks: number;
}
