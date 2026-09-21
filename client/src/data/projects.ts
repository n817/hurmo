import type { Project } from "../types";
import tenImg from "../assets/projects/10.jpeg";
import fifteenImg from "../assets/projects/15.jpeg";
import rankImg from "../assets/projects/rank.jpeg";
import consultImg from "../assets/projects/consult.jpeg";

// `id` is used as the URL slug of the intake form: /start/<id>
export const projects: Project[] = [
  {
    id: "ten-questions",
    name: "10 Questions",
    description: ["Ask up to 10 custom questions to your potential customers."],
    image: tenImg,
  },
  {
    id: "fifteen-questions",
    name: "15 Questions",
    description: ["Ask up to 15 custom questions to your potential customers."],
    image: fifteenImg,
  },
  {
    id: "ranking",
    name: "Ranking",
    description: [
      "Rank 2 to 10 items in order of preference — designs, names, or short text copy.",
    ],
    image: rankImg,
  },
  {
    id: "consultation",
    name: "Consultation",
    description: [
      "For custom projects, defining research objectives, discussing methodology and questionnaire design, or getting help with data interpretation.",
    ],
    image: consultImg,
  },
];

export function getProjectById(id: string | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}
