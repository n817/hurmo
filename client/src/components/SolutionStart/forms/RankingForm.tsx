import { useState } from "react";
import type { FormEvent } from "react";

import "./RankingForm.css";

import { buildRankingMailtoHref, type RankingBrief } from "./rankingEmail";
import { RankingSummary } from "./RankingSummary";

const PRESET_ATTRIBUTES = ["Appeal", "Uniqueness", "Intent to use"];
const INTERVIEW_OPTIONS = ["50", "100", "200"];
const GEOGRAPHY_OPTIONS = ["All Uzbekistan", "Tashkent"];

// The solution is described as "rank 2 to 10 items", so the form holds to that.
const MIN_ITEMS = 2;
const MAX_ITEMS = 10;

function replaceAt(values: string[], index: number, value: string): string[] {
  return values.map((current, i) => (i === index ? value : current));
}

function removeAt(values: string[], index: number): string[] {
  return values.filter((_, i) => i !== index);
}

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
    <form className="ranking-form" onSubmit={handleSubmit}>
      <fieldset className="ranking-form__group">
        <legend className="ranking-form__legend">Ranking items</legend>
        <p className="ranking-form__hint">
          List the items you would like respondents to rank — names, taglines,
          or short descriptions.
        </p>

        <div className="ranking-form__rows">
          {items.map((item, index) => (
            <div className="ranking-form__row" key={index}>
              <input
                className="ranking-form__input"
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
                  className="ranking-form__remove"
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
            className="ranking-form__add"
            type="button"
            onClick={() => setItems((current) => [...current, ""])}
          >
            <span className="ranking-form__add-icon" aria-hidden="true">
              +
            </span>
            Add item
          </button>
        )}
      </fieldset>

      <fieldset className="ranking-form__group">
        <legend className="ranking-form__legend">Additional attributes</legend>
        <p className="ranking-form__hint">
          Pick the attributes you want the items ranked on, or add your own.
        </p>

        <div className="ranking-form__checkboxes">
          {PRESET_ATTRIBUTES.map((attribute) => (
            <label className="ranking-form__checkbox" key={attribute}>
              <input
                type="checkbox"
                checked={presets.includes(attribute)}
                onChange={() => togglePreset(attribute)}
              />
              {attribute}
            </label>
          ))}
        </div>

        <div className="ranking-form__rows">
          {customAttributes.map((attribute, index) => (
            <div className="ranking-form__row" key={index}>
              <input
                className="ranking-form__input"
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
                  className="ranking-form__remove"
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
          className="ranking-form__add"
          type="button"
          onClick={() => setCustomAttributes((current) => [...current, ""])}
        >
          <span className="ranking-form__add-icon" aria-hidden="true">
            +
          </span>
          Add attribute
        </button>
      </fieldset>

      <fieldset className="ranking-form__group">
        <legend className="ranking-form__legend">Sample</legend>
        <p className="ranking-form__hint">
          Choose the number of respondents and where we should run the survey.
        </p>

        <div className="ranking-form__selects">
          <label className="ranking-form__field">
            <span className="ranking-form__label">Number of interviews</span>
            <select
              className="ranking-form__select"
              value={interviews}
              required
              onChange={(event) => setInterviews(event.target.value)}
            >
              <option value="">Select a reach</option>
              {INTERVIEW_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="ranking-form__field">
            <span className="ranking-form__label">Geography</span>
            <select
              className="ranking-form__select"
              value={geography}
              required
              onChange={(event) => setGeography(event.target.value)}
            >
              <option value="">Select a geography</option>
              {GEOGRAPHY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="ranking-form__hint">
          We survey a representative sample of small and medium businesses.
          Write to us if you need any further screening criteria.
        </p>
      </fieldset>

      <div className="ranking-form__submit">
        <label className="ranking-form__field">
          <span className="ranking-form__label">Survey name</span>
          <input
            className="ranking-form__input"
            type="text"
            value={surveyName}
            placeholder="Enter a survey name"
            required
            onChange={(event) => setSurveyName(event.target.value)}
          />
        </label>

        {error && (
          <p className="ranking-form__error" role="alert">
            {error}
          </p>
        )}

        <button
          className="button button_primary ranking-form__launch"
          type="submit"
        >
          Launch
        </button>

        <p className="ranking-form__note">
          You will see a summary of your brief before anything is sent.
        </p>
      </div>
    </form>
  );
}
