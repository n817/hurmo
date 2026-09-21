import { useEffect, useRef } from "react";

import "./RankingSummary.css";

import { CONTACT_EMAIL, type RankingBrief } from "./rankingEmail";

interface RankingSummaryProps {
  brief: RankingBrief;
  onBack: () => void;
  onConfirm: () => void;
}

/** Last look at the brief before it is handed to the client's mail app. */
export function RankingSummary({
  brief,
  onBack,
  onConfirm,
}: RankingSummaryProps) {
  const root = useRef<HTMLElement>(null);

  // The form above can be long, so bring the summary into view on mobile.
  useEffect(() => {
    root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="ranking-summary" ref={root}>
      <h2 className="ranking-summary__title">Check your brief</h2>
      <p className="ranking-summary__hint">
        Review the details below. Nothing is sent until you confirm.
      </p>

      <dl className="ranking-summary__list">
        <div className="ranking-summary__entry">
          <dt className="ranking-summary__term">Survey name</dt>
          <dd className="ranking-summary__value">{brief.surveyName}</dd>
        </div>

        <div className="ranking-summary__entry">
          <dt className="ranking-summary__term">Items to rank</dt>
          <dd className="ranking-summary__value">
            <ol className="ranking-summary__items">
              {brief.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </dd>
        </div>

        <div className="ranking-summary__entry">
          <dt className="ranking-summary__term">Attributes</dt>
          <dd className="ranking-summary__value">
            {brief.attributes.length ? (
              <ul className="ranking-summary__items">
                {brief.attributes.map((attribute, index) => (
                  <li key={index}>{attribute}</li>
                ))}
              </ul>
            ) : (
              <span className="ranking-summary__empty">None selected</span>
            )}
          </dd>
        </div>

        <div className="ranking-summary__entry">
          <dt className="ranking-summary__term">Number of interviews</dt>
          <dd className="ranking-summary__value">{brief.interviews}</dd>
        </div>

        <div className="ranking-summary__entry">
          <dt className="ranking-summary__term">Geography</dt>
          <dd className="ranking-summary__value">{brief.geography}</dd>
        </div>
      </dl>

      <div className="ranking-summary__actions">
        <button
          className="button button_secondary ranking-summary__action"
          type="button"
          onClick={onBack}
        >
          Back to edit
        </button>
        <button
          className="button button_primary ranking-summary__action"
          type="button"
          onClick={onConfirm}
        >
          Confirm and send
        </button>
      </div>

      <p className="ranking-summary__note">
        Confirming opens your email app with the brief filled in, addressed to{" "}
        {CONTACT_EMAIL}. We reply within two business days.
      </p>
    </section>
  );
}
