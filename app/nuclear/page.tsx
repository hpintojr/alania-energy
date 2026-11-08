import type { Metadata } from "next";
import { ServicePage } from "../service-page";
import { NUCLEAR } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nuclear",
  description: "Advanced nuclear as the long-term green power source in Alania Energy's generation mix.",
  alternates: { canonical: "/nuclear" },
};

export default function Page() {
  return <ServicePage c={NUCLEAR} />;
}
