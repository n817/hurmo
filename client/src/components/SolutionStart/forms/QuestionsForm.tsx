import { useState } from "react";
import type { FormEvent } from "react";

import "./shared/surveyForm.css";
import "./questionsForm.css";

import {
  buildQuestionsMailtoHref,
  FIFTEEN_QUESTIONS,
  OPEN_QUESTION_NOTE,
  QUESTION_TYPES,
  TEN_QUESTIONS,
  type Question,
  type QuestionsBrief,
  type QuestionsConfig,
  type QuestionType,
} from "./questionsEmail";
import { QuestionsSummary } from "./QuestionsSummary";
import { SampleFields } from "./shared/SampleFields";
import { SubmitPanel, SurveyNameField } from "./shared/SubmitPanel";
import { removeAt, replaceAt } from "./shared/surveyOptions";

const MIN_ANSWERS = 2;
const MAX_ANSWERS = 10;

function emptyQuestion(): Question {
  return { type: "single", text: "", answers: ["", ""] };
}

/** Shared questionnaire behind both the 10 and 15 Questions solutions. */
export function QuestionsForm({ config }: { config: QuestionsConfig }) {
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion()]);
  const [interviews, setInterviews] = useState("");
  const [geography, setGeography] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Set once the form validates: switches the page over to the review step.
  const [brief, setBrief] = useState<QuestionsBrief | null>(null);

  function updateQuestion(index: number, patch: Partial<Question>) {
    setQuestions((current) =>
      current.map((question, i) =>
        i === index ? { ...question, ...patch } : question,
      ),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed: Question[] = questions.map((question) => ({
      ...question,
      text: question.text.trim(),
      // Open questions keep no options; the respondent writes their own.
      answers:
        question.type === "open"
          ? []
          : question.answers.map((answer) => answer.trim()).filter(Boolean),
    }));

    const blank = trimmed.findIndex((question) => !question.text);
    if (blank !== -1) {
      setError(`Question #${blank + 1} is empty.`);
      return;
    }

    const short = trimmed.findIndex(
      (question) =>
        question.type !== "open" && question.answers.length < MIN_ANSWERS,
    );
    if (short !== -1) {
      setError(
        `Question #${short + 1} needs at least ${MIN_ANSWERS} answer options.`,
      );
      return;
    }

    setError(null);
    setBrief({
      surveyName: surveyName.trim(),
      questions: trimmed,
      interviews,
      geography,
    });
  }

  if (brief) {
    return (
      <QuestionsSummary
        brief={brief}
        totalLabel={config.totalLabel}
        onBack={() => setBrief(null)}
        onConfirm={() => {
          // Hands the brief to the client's mail app, addressed to us.
          window.location.href = buildQuestionsMailtoHref(brief, config);
        }}
      />
    );
  }

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      {questions.map((question, questionIndex) => (
        <fieldset className="survey-form__group" key={questionIndex}>
          <legend className="survey-form__legend">
            Question #{questionIndex + 1}
          </legend>

          <div className="question__type" role="group">
            <span className="survey-form__hint">Select question type:</span>
            {QUESTION_TYPES.map((option) => (
              <label
                className={`question__tab${
                  question.type === option.value ? " question__tab_active" : ""
                }`}
                key={option.value}
              >
                <input
                  className="question__tab-input"
                  type="radio"
                  name={`question-type-${questionIndex}`}
                  value={option.value}
                  checked={question.type === option.value}
                  onChange={() =>
                    updateQuestion(questionIndex, {
                      type: option.value as QuestionType,
                    })
                  }
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="survey-form__row">
            <input
              className="survey-form__input"
              type="text"
              value={question.text}
              placeholder="Enter a question"
              aria-label={`Question ${questionIndex + 1}`}
              required
              onChange={(event) =>
                updateQuestion(questionIndex, { text: event.target.value })
              }
            />
            {questions.length > 1 && (
              <button
                className="survey-form__remove"
                type="button"
                aria-label={`Remove question ${questionIndex + 1}`}
                onClick={() =>
                  setQuestions((current) => removeAt(current, questionIndex))
                }
              >
                ×
              </button>
            )}
          </div>

          {question.type === "open" ? (
            <p className="question__open-note">{OPEN_QUESTION_NOTE}</p>
          ) : (
            <div className="question__answers">
              <span className="survey-form__label">Answers</span>

              <div className="survey-form__rows">
                {question.answers.map((answer, answerIndex) => (
                  <div className="survey-form__row" key={answerIndex}>
                    <input
                      className="survey-form__input"
                      type="text"
                      value={answer}
                      placeholder={`Enter answer #${answerIndex + 1}`}
                      aria-label={`Question ${questionIndex + 1} answer ${
                        answerIndex + 1
                      }`}
                      onChange={(event) =>
                        updateQuestion(questionIndex, {
                          answers: replaceAt(
                            question.answers,
                            answerIndex,
                            event.target.value,
                          ),
                        })
                      }
                    />
                    {question.answers.length > MIN_ANSWERS && (
                      <button
                        className="survey-form__remove"
                        type="button"
                        aria-label={`Remove answer ${answerIndex + 1} of question ${
                          questionIndex + 1
                        }`}
                        onClick={() =>
                          updateQuestion(questionIndex, {
                            answers: removeAt(question.answers, answerIndex),
                          })
                        }
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {question.answers.length < MAX_ANSWERS && (
                <button
                  className="survey-form__add"
                  type="button"
                  onClick={() =>
                    updateQuestion(questionIndex, {
                      answers: [...question.answers, ""],
                    })
                  }
                >
                  <span className="survey-form__add-icon" aria-hidden="true">
                    +
                  </span>
                  Add answer
                </button>
              )}
            </div>
          )}
        </fieldset>
      ))}

      {questions.length < config.maxQuestions && (
        <button
          className="survey-form__add question__add"
          type="button"
          onClick={() => setQuestions((current) => [...current, emptyQuestion()])}
        >
          <span className="survey-form__add-icon" aria-hidden="true">
            +
          </span>
          Add question
        </button>
      )}

      <SampleFields
        interviews={interviews}
        geography={geography}
        onInterviewsChange={setInterviews}
        onGeographyChange={setGeography}
      />

      <SubmitPanel totalLabel={config.totalLabel} error={error}>
        <SurveyNameField value={surveyName} onChange={setSurveyName} />
      </SubmitPanel>
    </form>
  );
}

export function TenQuestionsForm() {
  return <QuestionsForm config={TEN_QUESTIONS} />;
}

export function FifteenQuestionsForm() {
  return <QuestionsForm config={FIFTEEN_QUESTIONS} />;
}
