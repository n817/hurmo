export const CONTACT_EMAIL = "info@hurmo.uz";

export interface RankingBrief {
  surveyName: string;
  items: string[];
  attributes: string[];
  interviews: string;
  geography: string;
}

function list(values: string[], empty: string): string {
  return values.length ? values.map((value) => `- ${value}`).join("\r\n") : empty;
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
    list(brief.attributes, "- (none selected)"),
    "",
    "Sample:",
    `- Interviews: ${brief.interviews}`,
    `- Geography: ${brief.geography}`,
  ].join("\r\n");
}

export function buildRankingMailtoHref(brief: RankingBrief): string {
  const subject = `Ranking survey request — ${brief.surveyName}`;
  const body = buildRankingEmailBody(brief);

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
