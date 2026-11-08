import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { NATURAL_GAS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Natural Gas Generation",
  description: "Firm, dispatchable natural gas generation at the Cedar City Energy Campus in Utah.",
  alternates: { canonical: "/natural-gas" },
};

export default function Page() {
  return <ServicePage c={NATURAL_GAS} />;
}
