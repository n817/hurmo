export const CONTACT_EMAIL = "info@hurmo.uz";

export const INTERVIEW_OPTIONS = ["50", "100", "200"];
export const GEOGRAPHY_OPTIONS = ["All Uzbekistan", "Tashkent"];

export function formatUzs(amount: number): string {
  return `${new Intl.NumberFormat("en-US").format(amount)} UZS`;
}

/** Shared by every solution brief; each form adds its own fields on top. */
export interface SampleChoice {
  interviews: string;
  geography: string;
}

export function replaceAt<T>(values: T[], index: number, value: T): T[] {
  return values.map((current, i) => (i === index ? value : current));
}

export function removeAt<T>(values: T[], index: number): T[] {
  return values.filter((_, i) => i !== index);
}

/** Lines shared by the tail of every brief email. */
export function sampleEmailLines(
  sample: SampleChoice,
  totalLabel: string,
): string[] {
  return [
    "Sample:",
    `- Interviews: ${sample.interviews}`,
    `- Geography: ${sample.geography}`,
    "",
    `Total: ${totalLabel}`,
  ];
}
