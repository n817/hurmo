import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="section">
      <div className="section__inner">
        <h1 className="section__title">Page not found</h1>
        <Link className="button button_primary" to="/#solutions">
          Back to solutions
        </Link>
      </div>
    </section>
  );
}
