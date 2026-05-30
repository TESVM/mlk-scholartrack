"use server";

import { addDays } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentProfile } from "@/lib/auth";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/supabase/server";

function redirectWithNotice(message: string): never {
  redirect(`/student-connection-point?notice=${encodeURIComponent(message)}`);
}

async function requireStudentAccess(studentId: string) {
  const viewer = await getCurrentProfile();

  if (!viewer || viewer.role !== "student") {
    redirectWithNotice("Only signed-in students can submit updates in the live portal.");
  }

  const activeViewer = viewer;

  const supabase = await createServerSupabaseClient();
  const { data: student } = await supabase
    .from("students")
    .select("id, email, assigned_mentor_id")
    .eq("id", studentId)
    .eq("email", activeViewer.email)
    .single();

  if (!student) {
    redirectWithNotice("Your account is not linked to a student record yet.");
  }

  return { supabase, viewer: activeViewer, student };
}

const contactSchema = z.object({
  studentId: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2).max(2),
  zip: z.string().min(5)
});

const schoolDecisionSchema = z.object({
  studentId: z.string().min(1),
  schoolSelected: z.enum(["Yes", "No"]),
  schoolName: z.string().optional(),
  schoolType: z.string().min(2),
  schoolAddress: z.string().optional(),
  intendedMajor: z.string().optional(),
  expectedStartDate: z.string().optional()
});

const semesterUpdateSchema = z.object({
  studentId: z.string().min(1),
  termLabel: z.string().min(3),
  enrollmentStatus: z.string().min(2),
  gpa: z.string().optional(),
  creditsCompleted: z.string().optional(),
  accomplishments: z.string().optional(),
  supportRequested: z.string().optional()
});

const supportRequestSchema = z.object({
  studentId: z.string().min(1),
  supportType: z.string().min(2),
  supportDetails: z.string().min(8)
});

export async function updateStudentContactAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithNotice("Demo mode is active. Add Supabase environment variables to save live data.");
  }

  const parsed = contactSchema.parse({
    studentId: formData.get("studentId"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip")
  });

  const { supabase } = await requireStudentAccess(parsed.studentId);

  await supabase
    .from("students")
    .update({
      email: parsed.email,
      phone: parsed.phone,
      address: parsed.address,
      city: parsed.city,
      state: parsed.state.toUpperCase(),
      zip: parsed.zip
    })
    .eq("id", parsed.studentId);

  revalidatePath("/student-connection-point");
  redirectWithNotice("Your contact information has been updated.");
}

export async function submitSchoolDecisionAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithNotice("Demo mode is active. Add Supabase environment variables to submit live school decisions.");
  }

  const parsed = schoolDecisionSchema.parse({
    studentId: formData.get("studentId"),
    schoolSelected: formData.get("schoolSelected"),
    schoolName: formData.get("schoolName"),
    schoolType: formData.get("schoolType"),
    schoolAddress: formData.get("schoolAddress"),
    intendedMajor: formData.get("intendedMajor"),
    expectedStartDate: formData.get("expectedStartDate")
  });

  const { supabase } = await requireStudentAccess(parsed.studentId);

  await supabase.from("school_decisions").upsert(
    {
      student_id: parsed.studentId,
      school_selected: parsed.schoolSelected === "Yes",
      school_name: parsed.schoolName || null,
      school_type: parsed.schoolType,
      school_address: parsed.schoolAddress || null,
      intended_major: parsed.intendedMajor || null,
      expected_start_date: parsed.expectedStartDate || null,
      completed_at: parsed.schoolSelected === "Yes" ? new Date().toISOString() : null
    },
    { onConflict: "student_id" }
  );

  revalidatePath("/student-connection-point");
  redirectWithNotice("Your school decision has been submitted.");
}

export async function uploadStudentDocumentAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithNotice("Demo mode is active. Add Supabase environment variables to upload files.");
  }

  const studentId = String(formData.get("studentId") ?? "");
  const documentType = String(formData.get("documentType") ?? "Proof of enrollment");
  const file = formData.get("documentFile");

  if (!(file instanceof File) || file.size === 0) {
    redirectWithNotice("Choose a file before uploading.");
  }

  const { supabase, viewer } = await requireStudentAccess(studentId);
  const safeName = `${Date.now()}-${file.name.replaceAll(/\s+/g, "-").toLowerCase()}`;
  const storagePath = `${studentId}/${safeName}`;

  const uploadResult = await supabase.storage
    .from("scholar-documents")
    .upload(storagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (uploadResult.error) {
    redirectWithNotice("The file could not be uploaded. Please try again.");
  }

  await supabase.from("documents").insert({
    student_id: studentId,
    document_type: documentType,
    file_name: file.name,
    file_url: storagePath,
    uploaded_by: viewer.id
  });

  if (documentType === "Proof of enrollment" || documentType === "Acceptance letter") {
    await supabase
      .from("school_decisions")
      .update({ proof_of_enrollment_uploaded: true })
      .eq("student_id", studentId);
  }

  revalidatePath("/student-connection-point");
  redirectWithNotice("Your document has been uploaded.");
}

export async function submitSemesterUpdateAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithNotice("Demo mode is active. Add Supabase environment variables to submit semester updates.");
  }

  const parsed = semesterUpdateSchema.parse({
    studentId: formData.get("studentId"),
    termLabel: formData.get("termLabel"),
    enrollmentStatus: formData.get("enrollmentStatus"),
    gpa: formData.get("gpa"),
    creditsCompleted: formData.get("creditsCompleted"),
    accomplishments: formData.get("accomplishments"),
    supportRequested: formData.get("supportRequested")
  });

  const { supabase } = await requireStudentAccess(parsed.studentId);

  await supabase.from("semester_updates").insert({
    student_id: parsed.studentId,
    term_label: parsed.termLabel,
    enrollment_status: parsed.enrollmentStatus,
    gpa: parsed.gpa || null,
    credits_completed: parsed.creditsCompleted ? Number(parsed.creditsCompleted) : null,
    accomplishments: parsed.accomplishments || null,
    support_requested: parsed.supportRequested || null
  });

  revalidatePath("/student-connection-point");
  redirectWithNotice("Your semester update has been submitted.");
}

export async function submitSupportRequestAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirectWithNotice("Demo mode is active. Add Supabase environment variables to send support requests.");
  }

  const parsed = supportRequestSchema.parse({
    studentId: formData.get("studentId"),
    supportType: formData.get("supportType"),
    supportDetails: formData.get("supportDetails")
  });

  const { supabase, student } = await requireStudentAccess(parsed.studentId);

  await supabase
    .from("students")
    .update({
      needs_support: true,
      support_notes: `${parsed.supportType}: ${parsed.supportDetails}`
    })
    .eq("id", parsed.studentId);

  await supabase.from("tasks").insert({
    student_id: parsed.studentId,
    assigned_to: student.assigned_mentor_id,
    task_title: "Student Support Request",
    task_description: `${parsed.supportType}: ${parsed.supportDetails}`,
    task_type: "Other",
    due_date: addDays(new Date(), 7).toISOString().slice(0, 10),
    priority: "High",
    status: "Open"
  });

  revalidatePath("/student-connection-point");
  redirectWithNotice("Your support request has been sent.");
}
