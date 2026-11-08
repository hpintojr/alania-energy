import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { TECHNOLOGY } from "@/lib/content";

export const metadata: Metadata = {
  title: "GE Turbine Technology",
  description: "Alania Energy's natural gas generation is built on proven GE gas turbine technology.",
  alternates: { canonical: "/technology" },
};

export default function Page() {
  return <ServicePage c={TECHNOLOGY} />;
}
