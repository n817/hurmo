import { Link } from "react-router-dom";

import type { Project } from "../../types";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <li className="project-card">
      <img
        className="project-card__image"
        src={project.image}
        alt={`Screenshot of ${project.name}`}
      />
      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <div className="project-card__description">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="project-card__links">
          <Link
            to={`/start/${project.id}`}
            className="button button_primary"
            aria-label={`Start the ${project.name} brief`}
          >
            Start
          </Link>
        </div>
      </div>
    </li>
  );
}
