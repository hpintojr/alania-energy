import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../legal-page";
import { CONTACT_EMAIL } from "../components";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Alania Energy collects, uses and protects information through alaniaenergy.com.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paras: [
      `Alania Energy ("Alania Energy," "we," "us") operates the website alaniaenergy.com (the "Site"). This Privacy Policy explains what information we collect through the Site, how we use and share it, and the choices you have. Questions can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
  {
    heading: "Information we collect",
    paras: ["We collect only the information described below."],
    bullets: [
      "Information you give us through the contact form: first and last name, email address, phone number, company, your area of interest, your message, and your confirmation that we may contact you.",
      "Information you send us by email to our published address.",
      "Investor access records: when someone enters an access code on the Investor Access page or downloads investor materials, we record the event (for example a successful or unsuccessful access attempt or a download), the date and time, the IP address and the browser user agent.",
      "Contact form technical data: the IP address and browser user agent associated with each form submission, used to prevent spam and abuse.",
      "QR code scans: some of our printed QR codes route through a link-tracking service before reaching the Site. That service records that a scan occurred and when, so we can count scans.",
      "Standard server logs kept by our hosting provider, such as IP address, request time, page requested and browser type, used to operate and secure the Site.",
    ],
  },
  {
    heading: "Cookies",
    paras: [
      "The Site uses one cookie, and only on the Investor Access page. After a valid access code is entered, we set a strictly necessary, encrypted session cookie that keeps the investor page unlocked for up to 12 hours. It contains no personal information and is not used for advertising or tracking.",
      "We do not use advertising cookies, analytics cookies or third-party tracking pixels on the Site, and our fonts are hosted on our own servers.",
    ],
  },
  {
    heading: "How we use information",
    bullets: [
      "To respond to your inquiry and follow up with you about it.",
      "To provide access to investor materials to invited parties and to keep a record of that access.",
      "To protect the Site, including detecting and blocking spam, abuse and repeated failed access attempts.",
      "To understand how our QR codes and materials are being used.",
      "To comply with legal obligations and enforce our Terms of Use.",
    ],
  },
  {
    heading: "How we share information",
    paras: [
      "We do not sell personal information, and we do not share it for cross-context behavioral advertising. We share information only with service providers that help us run the Site and respond to you, under obligations to use it only on our behalf:",
    ],
    bullets: [
      "Website hosting (Vercel).",
      "Database hosting for contact submissions and access records (Neon).",
      "Customer relationship management and link-tracking services, which store inquiries so our team can follow up and count QR code scans.",
      "Professional advisers, and authorities where required by law or to protect rights and safety.",
      "A successor entity in connection with a merger, financing, acquisition or sale of assets.",
    ],
  },
  {
    heading: "Communications",
    paras: [
      "If you submit the contact form, you agree that we may contact you about your inquiry by email or phone. We do not add you to marketing lists or send marketing text messages based on a form submission. You can ask us to stop contacting you at any time by emailing us.",
    ],
  },
  {
    heading: "How long we keep information",
    paras: [
      "We keep contact submissions for as long as needed to respond to and manage the relationship arising from your inquiry, and investor access records for as long as needed to administer and document access to confidential materials, generally not longer than three years unless a longer period is required by law. We then delete or de-identify the information.",
    ],
  },
  {
    heading: "Security",
    paras: [
      "We use reasonable administrative, technical and physical safeguards, including encrypted connections (HTTPS), restricted access to databases and encrypted session cookies. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your choices and rights",
    paras: [
      `Depending on where you live, you may have the right to request access to, correction of, or deletion of personal information we hold about you, and to opt out of certain processing. To make a request, email ${CONTACT_EMAIL} with the subject "Privacy Request." We will verify your request using the information you provide and respond within the time required by applicable law. We will not discriminate against you for exercising these rights.`,
      "California residents: in the past 12 months we have collected identifiers (such as name, email, phone and IP address), commercial and professional information you choose to provide, and internet activity information (such as access and download records), for the purposes described above. We have not sold or shared personal information for cross-context behavioral advertising.",
    ],
  },
  {
    heading: "Children",
    paras: [
      "The Site is intended for business audiences and is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us information, contact us and we will delete it.",
    ],
  },
  {
    heading: "Links to other sites",
    paras: [
      "The Site may link to other websites. We are not responsible for the privacy practices of those sites, and we encourage you to read their policies.",
    ],
  },
  {
    heading: "Changes to this policy",
    paras: [
      "We may update this Privacy Policy from time to time. The effective date at the top shows when it was last changed. Material changes will be posted on this page.",
    ],
  },
  {
    heading: "Contact us",
    paras: [`Alania Energy, Cedar City, Utah. Email: ${CONTACT_EMAIL}.`],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effective="November 8, 2026"
      intro="Your privacy matters to us. This policy describes the limited information alaniaenergy.com collects and how it is handled."
      sections={sections}
    />
  );
}
