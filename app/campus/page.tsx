import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { CAMPUS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cedar City Energy Campus",
  description: "A purpose-built energy campus in Cedar City, Utah, placing generation next to the loads it serves.",
  alternates: { canonical: "/campus" },
};

export default function Page() {
  return <ServicePage c={CAMPUS} />;
}
