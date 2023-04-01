import Image from "next/image";
import { DEFAULT_ROLE, ROLES } from "../utils/constants";
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
      <div className="flex h-20 flex-col flex-wrap content-start justify-center gap-x-4">
        {user.image ? (
          <Image
            src={user.image}
            alt={`${user.name || ""} profile picture`}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : null}
        <div className="text-lg font-bold">{user.name}</div>
        <div>
          {user.role ? ROLES[user.role as keyof typeof ROLES] : DEFAULT_ROLE}
        </div>
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
