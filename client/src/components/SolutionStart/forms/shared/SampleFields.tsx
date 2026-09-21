import { GEOGRAPHY_OPTIONS, INTERVIEW_OPTIONS } from "./surveyOptions";

interface SampleFieldsProps {
  interviews: string;
  geography: string;
  onInterviewsChange: (value: string) => void;
  onGeographyChange: (value: string) => void;
}

/** Reach and geography pickers — identical across all solutions. */
export function SampleFields({
  interviews,
  geography,
  onInterviewsChange,
  onGeographyChange,
}: SampleFieldsProps) {
  return (
    <fieldset className="survey-form__group">
      <legend className="survey-form__legend">Sample</legend>
      <p className="survey-form__hint">
        Choose the number of respondents and where we should run the survey.
      </p>

      <div className="survey-form__selects">
        <label className="survey-form__field">
          <span className="survey-form__label">Number of interviews</span>
          <select
            className="survey-form__select"
            value={interviews}
            required
            onChange={(event) => onInterviewsChange(event.target.value)}
          >
            <option value="">Select a reach</option>
            {INTERVIEW_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="survey-form__field">
          <span className="survey-form__label">Geography</span>
          <select
            className="survey-form__select"
            value={geography}
            required
            onChange={(event) => onGeographyChange(event.target.value)}
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

      <p className="survey-form__hint">
        We survey a representative sample of small and medium businesses. Write
        to us if you need any further screening criteria.
      </p>
    </fieldset>
  );
}
