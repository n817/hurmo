import { useState } from "react";
import { projects } from "../../data/projects";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import "./Projects.css";

export function Projects() {
  const [numberShown, setNumberShown] = useState(Math.min(projects.length, 3));

  function showMore() {
    setNumberShown(numberShown + 3);
  }

  return (
    <section id="solutions" className="projects section">
      <div className="section__inner">
        <h2 className="section__title">Choose a Solution</h2>
        <ul className="projects__grid">
          {projects.slice(0, numberShown).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
        {projects.length > 3 && numberShown < projects.length && (
          <button
            className="button button_secondary projects__show-more"
            type="button"
            onClick={showMore}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}
