import type { ComponentType } from "react";

import { ConsultationForm } from "./ConsultationForm";
import { RankingForm } from "./RankingForm";
import { FifteenQuestionsForm, TenQuestionsForm } from "./QuestionsForm";

/**
 * Intake forms keyed by solution slug. Each solution asks for different
 * things, so add an entry here as its questionnaire is built.
 */
export const solutionForms: Record<string, ComponentType> = {
  ranking: RankingForm,
  "ten-questions": TenQuestionsForm,
  "fifteen-questions": FifteenQuestionsForm,
  consultation: ConsultationForm,
};
