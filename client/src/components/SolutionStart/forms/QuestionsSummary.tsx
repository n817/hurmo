import {
  SampleEntries,
  SummaryEntry,
  SummaryShell,
} from "./shared/SummaryShell";
import {
  OPEN_QUESTION_NOTE,
  questionTypeLabel,
  type QuestionsBrief,
} from "./questionsEmail";

interface QuestionsSummaryProps {
  brief: QuestionsBrief;
  totalLabel: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function QuestionsSummary({
  brief,
  totalLabel,
  onBack,
  onConfirm,
}: QuestionsSummaryProps) {
  return (
    <SummaryShell
      totalLabel={totalLabel}
      onBack={onBack}
      onConfirm={onConfirm}
    >
      <SummaryEntry term="Survey name">{brief.surveyName}</SummaryEntry>

      {brief.questions.map((question, index) => (
        <SummaryEntry key={index} term={`Question #${index + 1}`}>
          <span className="question-summary__type">
            {questionTypeLabel(question.type)}
          </span>
          <span className="question-summary__text">{question.text}</span>

          {question.type === "open" ? (
            <span className="survey-summary__empty">{OPEN_QUESTION_NOTE}</span>
          ) : (
            <ul className="survey-summary__items">
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>{answer}</li>
              ))}
            </ul>
          )}
        </SummaryEntry>
      ))}
      <SampleEntries sample={brief} />
    </SummaryShell>
  );
}
