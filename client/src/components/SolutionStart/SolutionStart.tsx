import { Link, useParams } from "react-router-dom";

import "./SolutionStart.css";

import { getProjectById } from "../../data/projects";
import { NotFound } from "../NotFound/NotFound";
import { solutionForms } from "./forms";

/**
 * Landing page for a solution's intake survey. Solutions whose questionnaire
 * is not built yet fall back to a "contact us" placeholder.
 */
export function SolutionStart() {
  const { solutionId } = useParams();
  const solution = getProjectById(solutionId);

  if (!solution) {
    return <NotFound />;
  }

  const Form = solutionForms[solution.id];

  return (
    <section className="solution-start section">
      <div className="section__inner solution-start__inner">
        <Link className="solution-start__back" to="/#solutions">
          ← All solutions
        </Link>

        <h1 className="section__title solution-start__title">
          {solution.name}
        </h1>

        <div className="solution-start__description">
          {solution.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {Form ? (
          <Form />
        ) : (
          <div className="solution-start__form">
            <p className="solution-start__form-note">
              The questionnaire for this solution is being prepared. Meanwhile,
              write to us and we will start your project manually.
            </p>
            <Link className="button button_primary" to="/#contacts">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
