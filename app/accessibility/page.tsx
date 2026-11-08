import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../legal-page";
import { CONTACT_EMAIL } from "../components";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Alania Energy's commitment to an accessible website for everyone, including people with disabilities.",
  alternates: { canonical: "/accessibility" },
};

const sections: LegalSection[] = [
  {
    heading: "Our commitment",
    paras: [
      "Alania Energy wants alaniaenergy.com to be usable by everyone, including people with disabilities. We design and test the Site with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our standard.",
    ],
  },
  {
    heading: "What we have done",
    bullets: [
      "Text and buttons meet WCAG AA color-contrast ratios.",
      "Every page can be used with a keyboard alone, with a visible focus outline and a \"Skip to main content\" link.",
      "Pages use proper headings, landmarks and labels so screen readers can navigate them.",
      "Form fields have visible labels, and errors and confirmations are announced to assistive technology.",
      "Decorative illustrations are hidden from screen readers, and motion is reduced for visitors who ask their device to reduce motion.",
      "Text can be resized up to 200 percent without loss of content, and layouts adapt to phones and tablets.",
      "The Site is tested with automated accessibility checks (axe-core) at desktop and mobile widths.",
    ],
  },
  {
    heading: "Known limitations",
    paras: [
      "The downloadable investor briefing (PDF and PowerPoint) was produced as a presentation and may not be fully accessible to every screen reader. If you need it in another format, email us and we will provide an accessible alternative.",
    ],
  },
  {
    heading: "Feedback and help",
    paras: [
      `If you have trouble using any part of the Site, or need information in a different format, email ${CONTACT_EMAIL} with the subject "Accessibility." Tell us the page and the problem, and we will respond and work with you to provide the information you need.`,
    ],
  },
  {
    heading: "Ongoing effort",
    paras: [
      "Accessibility is ongoing work. We review the Site as content changes and welcome feedback that helps us improve.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      effective="November 8, 2026"
      intro="We are committed to making alaniaenergy.com accessible to all visitors, including people with disabilities."
      sections={sections}
    />
  );
}
