import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../legal-page";
import { CONTACT_EMAIL } from "../components";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of alaniaenergy.com.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    paras: [
      `These Terms of Use ("Terms") govern your access to and use of alaniaenergy.com (the "Site"), operated by Alania Energy ("Alania Energy," "we," "us"). By using the Site you agree to these Terms and to our Privacy Policy. If you do not agree, do not use the Site.`,
    ],
  },
  {
    heading: "Informational purposes only",
    paras: [
      "Content on the Site is provided for general information about Alania Energy and the Cedar City Energy Campus. It is not legal, tax, investment, engineering or other professional advice, and you should not rely on it as such.",
    ],
  },
  {
    heading: "No offer of securities",
    paras: [
      "Nothing on the Site is an offer to sell, or a solicitation of an offer to buy, any security or other interest in Alania Energy, the Cedar City Energy Campus or any related entity. Any such offer will be made only through definitive offering documents provided to eligible persons and in compliance with applicable securities laws.",
    ],
  },
  {
    heading: "Forward-looking statements",
    paras: [
      "The Cedar City Energy Campus is in development. Statements on the Site about planned facilities, technology, capacity, infrastructure, partners, timing and similar matters are forward-looking. They reflect current plans and expectations, involve risks and uncertainties, and may change. Actual results may differ materially, and we undertake no obligation to update them.",
    ],
  },
  {
    heading: "Investor Access and confidential materials",
    paras: ["Certain materials are available only through the Investor Access page to people who have been given an access code. If you access those materials, you agree that:"],
    bullets: [
      "The access code is personal to you and may not be shared or published.",
      "The materials are confidential and provided for discussion purposes only. You will not copy, distribute or disclose them except to your professional advisers who are bound to keep them confidential.",
      "The materials do not constitute an offer or commitment of any kind, and any investment decision must be based solely on definitive documents.",
      "We record access attempts and downloads as described in our Privacy Policy, and we may change or revoke access at any time.",
    ],
  },
  {
    heading: "Acceptable use",
    paras: ["You agree not to:"],
    bullets: [
      "Attempt to guess, bypass or defeat access controls, or access areas of the Site you are not authorized to access.",
      "Interfere with the Site's operation, introduce malware, or use automated means to scrape or overload the Site.",
      "Submit false, misleading or unlawful information through the contact form or otherwise.",
      "Use the Site in violation of any applicable law.",
    ],
  },
  {
    heading: "Intellectual property",
    paras: [
      "The Site and its content, including text, illustrations, logos and design, are owned by Alania Energy or its licensors and are protected by intellectual property laws. You may view and print pages for your own informational use. Any other use requires our prior written permission.",
      "Third-party names and trademarks referenced on the Site, including GE, belong to their respective owners. Their mention describes technology or context and does not imply endorsement, sponsorship or partnership.",
    ],
  },
  {
    heading: "Information you submit",
    paras: [
      "If you send us information through the contact form or by email, you confirm it is accurate and that you are entitled to share it. We handle it as described in our Privacy Policy. Please do not send confidential or proprietary information through the contact form.",
    ],
  },
  {
    heading: "Third-party links",
    paras: [
      "The Site may contain links to third-party websites. We do not control and are not responsible for their content, policies or practices.",
    ],
  },
  {
    heading: "Disclaimer of warranties",
    paras: [
      'The Site and its content are provided "as is" and "as available," without warranties of any kind, express or implied, including warranties of accuracy, completeness, merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the Site will be uninterrupted, secure or error-free.',
    ],
  },
  {
    heading: "Limitation of liability",
    paras: [
      "To the fullest extent permitted by law, Alania Energy and its officers, directors, employees and agents will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, data or goodwill, arising from or related to your use of, or inability to use, the Site or its content, even if advised of the possibility of such damages.",
    ],
  },
  {
    heading: "Indemnification",
    paras: [
      "You agree to indemnify and hold harmless Alania Energy from any claims, losses and expenses, including reasonable attorneys' fees, arising from your breach of these Terms or misuse of the Site.",
    ],
  },
  {
    heading: "Governing law",
    paras: [
      "These Terms are governed by the laws of the State of Utah, without regard to its conflict-of-laws rules. Any dispute arising from these Terms or the Site will be brought exclusively in the state or federal courts located in Utah, and you consent to their jurisdiction.",
    ],
  },
  {
    heading: "Changes to these terms",
    paras: [
      "We may update these Terms from time to time. The effective date at the top shows when they were last changed. Continued use of the Site after changes are posted means you accept the updated Terms.",
    ],
  },
  {
    heading: "Contact us",
    paras: [`Questions about these Terms can be sent to ${CONTACT_EMAIL}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      effective="November 8, 2026"
      intro="Please read these terms carefully. They explain the rules for using alaniaenergy.com, including the Investor Access area."
      sections={sections}
    />
  );
}
