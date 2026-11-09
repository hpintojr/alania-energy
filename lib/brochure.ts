/** Facts about the gated documents. Sizes are fixed at build time (no fs access from pages). */
export const BROCHURE = {
  title: "Cedar City Energy Campus",
  subtitle: "Equity Partner Briefing",
  dated: "September 15, 2026",
  pages: 12,
  files: {
    pdf: {
      fileName: "Alania_Energy_Investor_Briefing.pdf",
      contentType: "application/pdf",
      label: "PDF",
      bytes: 1163002,
      sizeLabel: "1.1 MB",
    },
    pptx: {
      fileName: "Alania_Energy_Investor_Briefing.pptx",
      contentType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      label: "PowerPoint",
      bytes: 3665130,
      sizeLabel: "3.7 MB",
    },
  },
} as const;

export type BrochureFormat = keyof typeof BROCHURE.files;

/** Section titles only. Safe to show before unlock (no figures, no names). */
export const DECK_CONTENTS = [
  "Executive summary",
  "Ownership and capital structure",
  "Development milestones",
  "Site infrastructure",
  "Delivery team",
  "Capital stack",
  "Equity investment opportunity",
  "Risk management framework",
  "Path to financial close",
];

/** Highlights shown only after unlock. Taken from the deck as written. */
export const HIGHLIGHTS = {
  headline: "The project has crossed the highest-risk development gates.",
  stats: [
    { value: "7,000 MW", label: "Energy campus scale", note: "Designed for large research and industrial loads in Cedar City, Utah." },
    { value: "3,000 MW", label: "Committed offtake", note: "Across three credit-worthy counterparties; PPA execution is the final pending step." },
    { value: "4,000 MW", label: "Embedded growth", note: "Approved large-load capacity ready to contract behind the initial phase." },
    { value: "$8.0B", label: "Senior capital", note: "Taxable conduit revenue bonds for the City; Stifel has agreed to lead the issuance." },
  ],
  milestones: [
    { item: "Offtake", status: "Complete, execution pending" },
    { item: "Senior financing", status: "Committed" },
    { item: "Site control", status: "Complete" },
    { item: "City partnership", status: "Complete" },
    { item: "Utilities and infrastructure", status: "In hand" },
    { item: "Design and procurement", status: "Underway" },
  ],
  site: [
    "5,000 acres controlled under long-term ground leases",
    "350 kV and 550 kV high-voltage lines on the property",
    "1,000 acre-feet of water rights secured",
    "Natural gas will-serve letter received",
    "High-capacity fiber on site",
    "Direct rail access on the property",
  ],
  opportunity: [
    { title: "Vehicle", body: "ProjectCo LLC, 100% privately owned; holds title to all generation assets." },
    { title: "Use of proceeds", body: "PPAs, FEED, design, EPC finalization and construction working capital." },
    { title: "Governance", body: "Alania retains sponsorship and operating control, with customary partner consents and reporting." },
    { title: "Exit and liquidity", body: "Refinancing at commercial operation, expansion tranches, or sale of ProjectCo interests." },
  ],
  nextSteps: ["NDA and data-room access", "Management and site visit", "Term sheet and diligence"],
};
