"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function FormSubmitButton({
  label,
  pendingLabel,
  className
}: {
  label: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "button-primary disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
