import { SummaryEntry, SummaryShell } from "./shared/SummaryShell";
import {
  formatSlot,
  TOTAL_PRICE_LABEL,
  type ConsultationBrief,
} from "./consultationEmail";

interface ConsultationSummaryProps {
  brief: ConsultationBrief;
  onBack: () => void;
  onConfirm: () => void;
}

export function ConsultationSummary({
  brief,
  onBack,
  onConfirm,
}: ConsultationSummaryProps) {
  return (
    <SummaryShell
      totalLabel={TOTAL_PRICE_LABEL}
      onBack={onBack}
      onConfirm={onConfirm}
    >
      <SummaryEntry term="Name">
        {brief.firstName} {brief.lastName}
      </SummaryEntry>
      <SummaryEntry term="Email">{brief.email}</SummaryEntry>
      <SummaryEntry term="Phone">{brief.phone}</SummaryEntry>
      <SummaryEntry term="Preferred time">{formatSlot(brief)}</SummaryEntry>
      <SummaryEntry term="Topic">{brief.topic}</SummaryEntry>
    </SummaryShell>
  );
}
