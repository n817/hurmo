import type { Project } from "../types";
import tenImg from "../assets/projects/10.jpeg";
import fifteenImg from "../assets/projects/15.jpeg";
import rankImg from "../assets/projects/rank.jpeg";
import consultImg from "../assets/projects/consult.jpeg";

export const projects: Project[] = [
  {
    id: "taskflow",
    name: "10 Questions",
    description: ["Ask up to 10 custom questions to your potential customers."],
    image: tenImg,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "recipebox",
    name: "15 Questions",
    description: ["Ask up to 15 custom questions to your potential customers."],
    image: fifteenImg,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "weathernow",
    name: "Ranking",
    description: [
      "Rank 2 to 10 items in order of preference — designs, names, or short text copy.",
    ],
    image: rankImg,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "placeholder",
    name: "Consultation",
    description: [
      "For custom projects, defining research objectives, discussing methodology and questionnaire design, or getting help with data interpretation.",
    ],
    image: consultImg,
    githubUrl: "#",
    liveUrl: "#",
  },
];
