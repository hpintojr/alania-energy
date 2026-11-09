import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { RESEARCH_INDUSTRIAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research & Industrial",
  description: "A planned research facility and industrial space with on-site power at the Cedar City Energy Campus.",
  alternates: { canonical: "/research-industrial" },
};

export default function Page() {
  return <ServicePage c={RESEARCH_INDUSTRIAL} />;
}
