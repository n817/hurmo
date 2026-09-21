import type { ComponentType } from "react";

import { RankingForm } from "./RankingForm";

/**
 * Intake forms keyed by solution slug. Each solution asks for different
 * things, so add an entry here as its questionnaire is built.
 */
export const solutionForms: Record<string, ComponentType> = {
  ranking: RankingForm,
};
