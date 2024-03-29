import { api } from "../utils/api";
import { ProjectCard } from "./projectCard";

export const ProjectsList = () => {
  const projects = api.project.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {projects.data?.map((project) => (
        <ProjectCard
          key={project.id}
          creator={project.creator.name}
          title={project.title}
          description={project.description}
        />
      ))}
    </div>
  );
};
