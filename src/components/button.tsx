export const Button = ({ content }: { content: string }) => {
  return (
    <span className="rounded-lg bg-purple-600 bg-opacity-25 px-6 py-2.5 text-gray-800 transition-colors hover:cursor-pointer hover:bg-opacity-50">
      {content}
    </span>
  );
};
