import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "On-Campus Available Jobs & Assistantships — LPU PATH",
  description:
    "Explore 16+ verified on-campus part-time student employment profiles, selection workflow, eligibility criteria, and UMS registration paths at Lovely Professional University.",
};

export default function CampusJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
