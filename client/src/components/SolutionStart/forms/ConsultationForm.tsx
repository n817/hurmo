import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import "./shared/surveyForm.css";
import "./consultationForm.css";

import {
  buildConsultationMailtoHref,
  TOTAL_PRICE_LABEL,
  type ConsultationBrief,
} from "./consultationEmail";
import { ConsultationSummary } from "./ConsultationSummary";
import { SubmitPanel } from "./shared/SubmitPanel";
import {
  availableHours,
  earliestBookableDate,
  FIRST_SLOT_HOUR,
  formatHour,
  LAST_SLOT_HOUR,
  TIME_ZONE_LABEL,
} from "./consultationSchedule";

export function ConsultationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Set once the form validates: switches the page over to the review step.
  const [brief, setBrief] = useState<ConsultationBrief | null>(null);

  // Pinned for the life of the form so the options do not shift while typing.
  const minDate = useMemo(() => earliestBookableDate(), []);
  const hours = useMemo(() => availableHours(date), [date]);

  function handleDateChange(value: string) {
    setDate(value);
    // A slot valid for the old day may not exist on the new one.
    if (!availableHours(value).some((hour) => formatHour(hour) === time)) {
      setTime("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hours.some((hour) => formatHour(hour) === time)) {
      setError("Pick a day and a time slot for the call.");
      return;
    }

    setError(null);
    setBrief({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time,
      topic: topic.trim(),
    });
  }

  if (brief) {
    return (
      <ConsultationSummary
        brief={brief}
        onBack={() => setBrief(null)}
        onConfirm={() => {
          // Hands the brief to the client's mail app, addressed to us.
          window.location.href = buildConsultationMailtoHref(brief);
        }}
      />
    );
  }

  return (
    <form className="survey-form" onSubmit={handleSubmit}>
      <div className="consultation__intro">
        <p>
          We have seen thousands of projects across the full range of tasks and
          industries, and we are glad to share that experience — framing the
          research question, picking a method for a standard project, or
          designing a study around your case.
        </p>
        <p>
          We can also go through data you already have and what it means for
          your business.
        </p>
        <p>Pick a time, tell us what you need, and we will call you then.</p>
      </div>

      <fieldset className="survey-form__group">
        <legend className="survey-form__legend">Contact details</legend>
        <p className="survey-form__hint">Let us know how to reach you.</p>

        <div className="consultation__grid">
          <label className="survey-form__field">
            <span className="survey-form__label">First name</span>
            <input
              className="survey-form__input"
              type="text"
              value={firstName}
              placeholder="Your first name"
              autoComplete="given-name"
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>

          <label className="survey-form__field">
            <span className="survey-form__label">Last name</span>
            <input
              className="survey-form__input"
              type="text"
              value={lastName}
              placeholder="Your last name"
              autoComplete="family-name"
              required
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>

          <label className="survey-form__field">
            <span className="survey-form__label">Email</span>
            <input
              className="survey-form__input"
              type="email"
              value={email}
              placeholder="Your email"
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="survey-form__field">
            <span className="survey-form__label">Phone</span>
            <input
              className="survey-form__input"
              type="tel"
              value={phone}
              placeholder="Your phone"
              autoComplete="tel"
              required
              onChange={(event) => setPhone(event.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="survey-form__group">
        <legend className="survey-form__legend">Calendar</legend>
        <p className="survey-form__hint">
          Pick a free slot between {formatHour(FIRST_SLOT_HOUR)} and{" "}
          {formatHour(LAST_SLOT_HOUR)} ({TIME_ZONE_LABEL}), at least 24 hours
          from now.
        </p>

        <div className="consultation__grid">
          <label className="survey-form__field">
            <span className="survey-form__label">Day</span>
            <input
              className="survey-form__input"
              type="date"
              value={date}
              min={minDate}
              required
              onChange={(event) => handleDateChange(event.target.value)}
            />
          </label>

          <label className="survey-form__field">
            <span className="survey-form__label">Time ({TIME_ZONE_LABEL})</span>
            <select
              className="survey-form__select"
              value={time}
              required
              disabled={!hours.length}
              onChange={(event) => setTime(event.target.value)}
            >
              <option value="">
                {date ? "Select a time" : "Pick a day first"}
              </option>
              {hours.map((hour) => (
                <option key={hour} value={formatHour(hour)}>
                  {formatHour(hour)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="survey-form__group">
        <legend className="survey-form__legend">Consultation topic</legend>
        <p className="survey-form__hint">
          Tell us what you would like to discuss.
        </p>

        <textarea
          className="survey-form__input consultation__topic"
          value={topic}
          rows={4}
          placeholder="What do you need help with?"
          aria-label="Consultation topic"
          required
          onChange={(event) => setTopic(event.target.value)}
        />
      </fieldset>

      <SubmitPanel totalLabel={TOTAL_PRICE_LABEL} error={error}>
        <label className="survey-form__field">
          <span className="survey-form__label">Consultation details</span>
          <input
            className="survey-form__input"
            type="text"
            value="Consultation"
            readOnly
          />
        </label>
      </SubmitPanel>
    </form>
  );
}
