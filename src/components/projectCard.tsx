export const ProjectCard = ({
  title,
  description,
  creator,
}: {
  title: string;
  description: string;
  creator: string | null;
}) => {
  return (
    <div className="flex max-w-md flex-col rounded-lg bg-purple-600 bg-opacity-[.15] p-4 leading-snug text-gray-800">
      <h6 className="mb-2 text-2xl font-bold">{title}</h6>
      <p className="mb-6">{description}</p>
      <p className="self-end text-sm font-bold">{creator}</p>
    </div>
  );
};
