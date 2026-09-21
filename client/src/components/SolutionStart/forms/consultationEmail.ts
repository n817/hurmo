import { CONTACT_EMAIL, formatUzs } from "./shared/surveyOptions";
import { TIME_ZONE_LABEL } from "./consultationSchedule";

export const TOTAL_PRICE_LABEL = formatUzs(500_000);

export interface ConsultationBrief {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** YYYY-MM-DD, as picked in the date input. */
  date: string;
  /** HH:00, Tashkent time. */
  time: string;
  topic: string;
}

export function formatSlot(brief: ConsultationBrief): string {
  return `${brief.date} at ${brief.time} (${TIME_ZONE_LABEL})`;
}

/** Plain-text brief the client sends us from their own mail app. */
export function buildConsultationEmailBody(brief: ConsultationBrief): string {
  return [
    `Name: ${brief.firstName} ${brief.lastName}`,
    `Email: ${brief.email}`,
    `Phone: ${brief.phone}`,
    "",
    `Preferred time: ${formatSlot(brief)}`,
    "",
    "Topic:",
    brief.topic,
    "",
    `Total: ${TOTAL_PRICE_LABEL}`,
  ].join("\r\n");
}

export function buildConsultationMailtoHref(brief: ConsultationBrief): string {
  const subject = `Consultation request — ${brief.firstName} ${brief.lastName}`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(buildConsultationEmailBody(brief))}`;
}
