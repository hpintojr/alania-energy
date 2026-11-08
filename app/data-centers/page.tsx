import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { DATA_CENTERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Power for Data Centers",
  description: "Dedicated, always-on power for data centers at the Cedar City Energy Campus.",
  alternates: { canonical: "/data-centers" },
};

export default function Page() {
  return <ServicePage c={DATA_CENTERS} />;
}
