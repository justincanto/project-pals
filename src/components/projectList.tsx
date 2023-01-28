import { api } from "../utils/api";

export const ProjectList = () => {
  const projects = api.project.getAll.useQuery();

  return (
    <div className="mt-4 text-white">
      <h3 className="text-2xl font-bold">Open Projects</h3>
      {projects.data?.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
};
