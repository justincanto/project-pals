import Image from "next/image";
import { getIcon } from "../utils/icons";

type PalCardProps = {
  user: {
    name: string | null;
    description: string | null;
    role: string | null;
    image: string | null;
    links: string[];
  };
};

export const PalCard = ({ user }: PalCardProps) => {
  return (
    <div className="relative flex w-96 flex-col gap-2 rounded-lg bg-purple-600 bg-opacity-[.15] p-4 leading-snug text-gray-800">
      <div className="flex items-center justify-start gap-4">
        {user.image ? (
          <Image
            src={user.image}
            alt={`${user.name || ""} profile picture`}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : null}
        <p>
          <span className="text-lg font-bold">{user.name}</span>
          <br />
          {user.role}
        </p>
      </div>
      <p className="leading-tight">{user.description}</p>
      <div className="flex gap-x-2">
        {user.links.map((link) => (
          <a href={link} key={link} target="_blank" rel="noreferrer">
            <Image
              src={`/icons/${getIcon(link)}.svg`}
              alt={getIcon(link) + " link"}
              width={20}
              height={20}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
