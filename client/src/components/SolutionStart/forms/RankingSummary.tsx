import {
  SampleEntries,
  SummaryEntry,
  SummaryShell,
} from "./shared/SummaryShell";
import { TOTAL_PRICE_LABEL, type RankingBrief } from "./rankingEmail";

interface RankingSummaryProps {
  brief: RankingBrief;
  onBack: () => void;
  onConfirm: () => void;
}

export function RankingSummary({
  brief,
  onBack,
  onConfirm,
}: RankingSummaryProps) {
  return (
    <SummaryShell
      totalLabel={TOTAL_PRICE_LABEL}
      onBack={onBack}
      onConfirm={onConfirm}
    >
      <SummaryEntry term="Survey name">{brief.surveyName}</SummaryEntry>

      <SummaryEntry term="Items to rank">
        <ol className="survey-summary__items">
          {brief.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </SummaryEntry>

      <SummaryEntry term="Attributes">
        {brief.attributes.length ? (
          <ul className="survey-summary__items">
            {brief.attributes.map((attribute, index) => (
              <li key={index}>{attribute}</li>
            ))}
          </ul>
        ) : (
          <span className="survey-summary__empty">None selected</span>
        )}
      </SummaryEntry>
      <SampleEntries sample={brief} />
    </SummaryShell>
  );
}
