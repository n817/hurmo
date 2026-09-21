import { useEffect, useRef, type ReactNode } from "react";

import "./surveySummary.css";

import { CONTACT_EMAIL, type SampleChoice } from "./surveyOptions";

interface SummaryShellProps {
  totalLabel: string;
  /** Every row of the brief; the shell only appends the total. */
  children: ReactNode;
  onBack: () => void;
  onConfirm: () => void;
}

export function SummaryEntry({
  term,
  children,
  modifier,
}: {
  term: string;
  children: ReactNode;
  modifier?: string;
}) {
  return (
    <div className={`survey-summary__entry ${modifier ?? ""}`}>
      <dt className="survey-summary__term">{term}</dt>
      <dd className="survey-summary__value">{children}</dd>
    </div>
  );
}

/** Reach and geography rows, for the solutions that ask for them. */
export function SampleEntries({ sample }: { sample: SampleChoice }) {
  return (
    <>
      <SummaryEntry term="Number of interviews">
        {sample.interviews}
      </SummaryEntry>
      <SummaryEntry term="Geography">{sample.geography}</SummaryEntry>
    </>
  );
}

/** Last look at the brief before it is handed to the client's mail app. */
export function SummaryShell({
  totalLabel,
  children,
  onBack,
  onConfirm,
}: SummaryShellProps) {
  const root = useRef<HTMLElement>(null);

  // The form above can be long, so bring the summary into view on mobile.
  useEffect(() => {
    root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="survey-summary" ref={root}>
      <h2 className="survey-summary__title">Check your brief</h2>
      <p className="survey-summary__hint">
        Review the details below. Nothing is sent until you confirm.
      </p>

      <dl className="survey-summary__list">
        {children}

        <SummaryEntry term="Total" modifier="survey-summary__entry_total">
          <span className="survey-summary__total">{totalLabel}</span>
        </SummaryEntry>
      </dl>

      <div className="survey-summary__actions">
        <button
          className="button button_secondary survey-summary__action"
          type="button"
          onClick={onBack}
        >
          Back to edit
        </button>
        <button
          className="button button_primary survey-summary__action"
          type="button"
          onClick={onConfirm}
        >
          Confirm and send
        </button>
      </div>

      <p className="survey-summary__note">
        Confirming opens your email app with the brief filled in, addressed to{" "}
        {CONTACT_EMAIL}. We reply within two business days.
      </p>
    </section>
  );
}
