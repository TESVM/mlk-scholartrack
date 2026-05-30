import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "MLK ScholarTrack",
  description:
    "Secure scholarship tracking app for the MLK Advocacy for Justice Committee.",
  applicationName: "MLK ScholarTrack"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
