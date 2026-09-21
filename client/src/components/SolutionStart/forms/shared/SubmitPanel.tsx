import type { ReactNode } from "react";

interface SubmitPanelProps {
  /** The field(s) shown to the left of the price — varies per solution. */
  children: ReactNode;
  totalLabel: string;
  error: string | null;
}

export function SurveyNameField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="survey-form__field">
      <span className="survey-form__label">Survey name</span>
      <input
        className="survey-form__input"
        type="text"
        value={value}
        placeholder="Enter a survey name"
        required
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

/** Price and the Launch button — the grey panel at the bottom of every form. */
export function SubmitPanel({ children, totalLabel, error }: SubmitPanelProps) {
  return (
    <div className="survey-form__submit">
      {children}

      {error && (
        <p className="survey-form__error" role="alert">
          {error}
        </p>
      )}

      <div className="survey-form__total-row">
        <p className="survey-form__total">
          <span className="survey-form__total-label">Total:</span>{" "}
          <span className="survey-form__total-value">{totalLabel}</span>
        </p>
        <button
          className="button button_primary survey-form__launch"
          type="submit"
        >
          Launch
        </button>
      </div>

      <p className="survey-form__note">
        You will see a summary of your brief before anything is sent.
      </p>
    </div>
  );
}
