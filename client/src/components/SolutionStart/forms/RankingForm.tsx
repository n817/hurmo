import { useState } from "react";
import type { FormEvent } from "react";

import "./shared/surveyForm.css";

import {
  buildRankingMailtoHref,
  TOTAL_PRICE_LABEL,
  type RankingBrief,
} from "./rankingEmail";
import { RankingSummary } from "./RankingSummary";
import { SampleFields } from "./shared/SampleFields";
import { SubmitPanel, SurveyNameField } from "./shared/SubmitPanel";
import { removeAt, replaceAt } from "./shared/surveyOptions";

const PRESET_ATTRIBUTES = ["Appeal", "Uniqueness", "Intent to use"];

// The solution is described as "rank 2 to 10 items", so the form holds to that.
const MIN_ITEMS = 2;
const MAX_ITEMS = 10;

export function RankingForm() {
  const [items, setItems] = useState<string[]>(["", ""]);
  const [presets, setPresets] = useState<string[]>([]);
  const [customAttributes, setCustomAttributes] = useState<string[]>([""]);
  const [interviews, setInterviews] = useState("");
  const [geography, setGeography] = useState("");
  const [surveyName, setSurveyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Set once the form validates: switches the page over to the review step.
  const [brief, setBrief] = useState<RankingBrief | null>(null);

  function togglePreset(attribute: string) {
    setPresets((current) =>
      current.includes(attribute)
        ? current.filter((value) => value !== attribute)
        : [...current, attribute],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filledItems = items.map((item) => item.trim()).filter(Boolean);
    if (filledItems.length < MIN_ITEMS) {
      setError(`Add at least ${MIN_ITEMS} items to rank.`);
      return;
    }

    setError(null);
    setBrief({
      surveyName: surveyName.trim(),
      items: filledItems,
      attributes: [
        ...presets,
        ...customAttributes.map((value) => value.trim()).filter(Boolean),
      ],
      interviews,
      geography,
    });
  }

  if (brief) {
    return (
      <RankingSummary
        brief={brief}
        onBack={() => setBrief(null)}
        onConfirm={() => {
          // Hands the brief to the client's mail app, addressed to us.
          window.location.href = buildRankingMailtoHref(brief);
        }}
      />
    );
  }

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <fieldset className="survey-form__group">
        <legend className="survey-form__legend">Ranking items</legend>
        <p className="survey-form__hint">
          List the items you would like respondents to rank — names, taglines,
          or short descriptions.
        </p>

        <div className="survey-form__rows">
          {items.map((item, index) => (
            <div className="survey-form__row" key={index}>
              <input
                className="survey-form__input"
                type="text"
                value={item}
                placeholder="Enter an item"
                aria-label={`Item ${index + 1}`}
                onChange={(event) =>
                  setItems((current) =>
                    replaceAt(current, index, event.target.value),
                  )
                }
              />
              {items.length > MIN_ITEMS && (
                <button
                  className="survey-form__remove"
                  type="button"
                  aria-label={`Remove item ${index + 1}`}
                  onClick={() => setItems((current) => removeAt(current, index))}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {items.length < MAX_ITEMS && (
          <button
            className="survey-form__add"
            type="button"
            onClick={() => setItems((current) => [...current, ""])}
          >
            <span className="survey-form__add-icon" aria-hidden="true">
              +
            </span>
            Add item
          </button>
        )}
      </fieldset>

      <fieldset className="survey-form__group">
        <legend className="survey-form__legend">Additional attributes</legend>
        <p className="survey-form__hint">
          Pick the attributes you want the items ranked on, or add your own.
        </p>

        <div className="survey-form__checkboxes">
          {PRESET_ATTRIBUTES.map((attribute) => (
            <label className="survey-form__checkbox" key={attribute}>
              <input
                type="checkbox"
                checked={presets.includes(attribute)}
                onChange={() => togglePreset(attribute)}
              />
              {attribute}
            </label>
          ))}
        </div>

        <div className="survey-form__rows">
          {customAttributes.map((attribute, index) => (
            <div className="survey-form__row" key={index}>
              <input
                className="survey-form__input"
                type="text"
                value={attribute}
                placeholder="Enter an attribute"
                aria-label={`Custom attribute ${index + 1}`}
                onChange={(event) =>
                  setCustomAttributes((current) =>
                    replaceAt(current, index, event.target.value),
                  )
                }
              />
              {customAttributes.length > 1 && (
                <button
                  className="survey-form__remove"
                  type="button"
                  aria-label={`Remove custom attribute ${index + 1}`}
                  onClick={() =>
                    setCustomAttributes((current) => removeAt(current, index))
                  }
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="survey-form__add"
          type="button"
          onClick={() => setCustomAttributes((current) => [...current, ""])}
        >
          <span className="survey-form__add-icon" aria-hidden="true">
            +
          </span>
          Add attribute
        </button>
      </fieldset>

      <SampleFields
        interviews={interviews}
        geography={geography}
        onInterviewsChange={setInterviews}
        onGeographyChange={setGeography}
      />

      <SubmitPanel totalLabel={TOTAL_PRICE_LABEL} error={error}>
        <SurveyNameField value={surveyName} onChange={setSurveyName} />
      </SubmitPanel>
    </form>
  );
}
