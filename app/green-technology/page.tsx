import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { GREEN } from "@/lib/content";

export const metadata: Metadata = {
  title: "Green Technology",
  description: "Green buildings, on-site power and planned carbon capture at the Cedar City Energy Campus.",
  alternates: { canonical: "/green-technology" },
};

export default function Page() {
  return <ServicePage c={GREEN} />;
}
