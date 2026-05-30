import { demoDocuments, demoSchoolDecisions, demoSemesterUpdates, demoStudents, demoTasks, demoUsers } from "@/lib/demo-data";
import { getCurrentProfile } from "@/lib/auth";
import type {
  DocumentRecord,
  SchoolDecision,
  SemesterUpdate,
  Student,
  Task,
  UserProfile
} from "@/lib/types";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/supabase/server";

export interface StudentPortalData {
  viewer: UserProfile;
  student: Student;
  mentor: UserProfile | null;
  decision: SchoolDecision | null;
  tasks: Task[];
  documents: DocumentRecord[];
  updates: SemesterUpdate[];
  liveMode: boolean;
}

export async function getStudentPortalData(): Promise<StudentPortalData | null> {
  if (!hasSupabaseEnv()) {
    const student = demoStudents[4];
    const mentor = demoUsers.find((user) => user.id === student.assigned_mentor_id) ?? null;

    return {
      viewer: {
        ...demoUsers[0],
        role: "student",
        full_name: `${student.first_name} ${student.last_name}`,
        email: student.email
      },
      student,
      mentor,
      decision: demoSchoolDecisions.find((item) => item.student_id === student.id) ?? null,
      tasks: demoTasks.filter((item) => item.student_id === student.id),
      documents: demoDocuments.filter((item) => item.student_id === student.id),
      updates: demoSemesterUpdates.filter((item) => item.student_id === student.id),
      liveMode: false
    };
  }

  const viewer = await getCurrentProfile();

  if (!viewer) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  let student: Student | null = null;

  if (viewer.role === "student") {
    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("email", viewer.email)
      .single();

    student = data as Student | null;
  }

  if (viewer.role === "parent_guardian") {
    const { data } = await supabase
      .from("parents")
      .select("student_id, students(*)")
      .eq("email", viewer.email)
      .single();

    student = (data?.students ?? null) as Student | null;
  }

  if (!student) {
    return null;
  }

  const [
    decisionResult,
    tasksResult,
    documentsResult,
    updatesResult,
    mentorResult
  ] = await Promise.all([
    supabase.from("school_decisions").select("*").eq("student_id", student.id).maybeSingle(),
    supabase.from("tasks").select("*").eq("student_id", student.id).order("due_date", { ascending: true }),
    supabase.from("documents").select("*").eq("student_id", student.id).order("uploaded_at", { ascending: false }),
    supabase
      .from("semester_updates")
      .select("*")
      .eq("student_id", student.id)
      .order("update_date", { ascending: false }),
    student.assigned_mentor_id
      ? supabase.from("users_profile").select("*").eq("id", student.assigned_mentor_id).maybeSingle()
      : Promise.resolve({ data: null })
  ]);

  return {
    viewer,
    student,
    mentor: (mentorResult.data as UserProfile | null) ?? null,
    decision: (decisionResult.data as SchoolDecision | null) ?? null,
    tasks: (tasksResult.data as Task[] | null) ?? [],
    documents: (documentsResult.data as DocumentRecord[] | null) ?? [],
    updates: (updatesResult.data as SemesterUpdate[] | null) ?? [],
    liveMode: true
  };
}
