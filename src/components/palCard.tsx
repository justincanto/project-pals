import Image from "next/image";

export const PalCard = ({
  name,
  description,
  role,
  image,
}: {
  name: string | null;
  description: string | null;
  role: string | null;
  image: string | null;
}) => {
  return (
    <div className="relative flex max-w-xs flex-col gap-2 rounded-lg bg-purple-600 bg-opacity-[.15] p-4 leading-snug text-gray-800">
      {/* <span className="absolute top-2 right-2 rounded-xl bg-green-300 px-3 py-0.5 text-sm">
        Disponible
      </span> */}
      <div className="flex items-center justify-start gap-4">
        {image ? (
          <Image
            src={image}
            alt={`${name || ""} profile picture`}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : null}
        <p>
          <span className="text-lg font-bold">{name}</span>
          <br />
          {role}
        </p>
      </div>
      <p className="leading-tight">{description}</p>
    </div>
  );
};
