export const Button = ({ content }: { content: string }) => {
  return (
    <span className="block rounded-lg bg-purple-600 bg-opacity-50 px-6 py-2.5 text-gray-800 transition-colors hover:cursor-pointer hover:bg-opacity-70">
      {content}
    </span>
  );
};
