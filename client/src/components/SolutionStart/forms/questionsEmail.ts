import {
  CONTACT_EMAIL,
  formatUzs,
  sampleEmailLines,
  type SampleChoice,
} from "./shared/surveyOptions";

export type QuestionType = "single" | "multiple" | "open";

export const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "single", label: "Single answer" },
  { value: "multiple", label: "Multiple answers" },
  { value: "open", label: "Open question" },
];

/** Open questions carry no options — the respondent writes their own answer. */
export const OPEN_QUESTION_NOTE =
  "In this question type the respondent provides the number and the content of the answers.";

export function questionTypeLabel(type: QuestionType): string {
  return QUESTION_TYPES.find((option) => option.value === type)!.label;
}

export interface Question {
  type: QuestionType;
  text: string;
  answers: string[];
}

export interface QuestionsBrief extends SampleChoice {
  surveyName: string;
  questions: Question[];
}

/**
 * The 10 and 15 Questions solutions are the same questionnaire; only the
 * question cap and the price differ.
 */
export interface QuestionsConfig {
  name: string;
  maxQuestions: number;
  totalLabel: string;
}

export const TEN_QUESTIONS: QuestionsConfig = {
  name: "10 Questions",
  maxQuestions: 10,
  totalLabel: formatUzs(6_000_000),
};

export const FIFTEEN_QUESTIONS: QuestionsConfig = {
  name: "15 Questions",
  maxQuestions: 15,
  totalLabel: formatUzs(8_000_000),
};

function questionLines(question: Question, index: number): string[] {
  const head = `${index + 1}. [${questionTypeLabel(question.type)}] ${question.text}`;

  if (question.type === "open") {
    return [head, `   (${OPEN_QUESTION_NOTE})`];
  }

  return [head, ...question.answers.map((answer) => `   - ${answer}`)];
}

/** Plain-text brief the client sends us from their own mail app. */
export function buildQuestionsEmailBody(
  brief: QuestionsBrief,
  config: QuestionsConfig,
): string {
  return [
    `Survey name: ${brief.surveyName}`,
    "",
    "Questions:",
    "",
    brief.questions
      .flatMap((question, index) => [...questionLines(question, index), ""])
      .join("\r\n"),
    ...sampleEmailLines(brief, config.totalLabel),
  ].join("\r\n");
}

export function buildQuestionsMailtoHref(
  brief: QuestionsBrief,
  config: QuestionsConfig,
): string {
  const subject = `${config.name} survey request — ${brief.surveyName}`;

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(buildQuestionsEmailBody(brief, config))}`;
}
