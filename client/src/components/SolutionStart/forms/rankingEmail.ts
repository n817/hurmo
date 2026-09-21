import {
  CONTACT_EMAIL,
  formatUzs,
  sampleEmailLines,
  type SampleChoice,
} from "./shared/surveyOptions";

// Flat price for the Ranking solution, regardless of the chosen reach.
export const TOTAL_PRICE_LABEL = formatUzs(3_000_000);

export interface RankingBrief extends SampleChoice {
  surveyName: string;
  items: string[];
  attributes: string[];
}

/** Plain-text brief the client sends us from their own mail app. */
export function buildRankingEmailBody(brief: RankingBrief): string {
  return [
    `Survey name: ${brief.surveyName}`,
    "",
    "Items to rank:",
    brief.items.map((item, index) => `${index + 1}. ${item}`).join("\r\n"),
    "",
    "Attributes:",
    brief.attributes.length
      ? brief.attributes.map((value) => `- ${value}`).join("\r\n")
      : "- (none selected)",
    "",
    ...sampleEmailLines(brief, TOTAL_PRICE_LABEL),
  ].join("\r\n");
}

export function buildRankingMailtoHref(brief: RankingBrief): string {
  const subject = `Ranking survey request — ${brief.surveyName}`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(buildRankingEmailBody(brief))}`;
}
