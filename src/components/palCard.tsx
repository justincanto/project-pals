import Image from "next/image";

type PalCardProps = {
  user: {
    name: string | null;
    description: string | null;
    role: string | null;
    image: string | null;
    links: string[];
  };
};

const USER_LINKS_ICONS = {
  "linkedin.com": "linkedin",
  "github.com": "github",
  "twitter.com": "twitter",
  "dribbble.com": "dribbble",
  "behance.net": "behance",
};

const WEB_LINK_ICON = "web";

const getIcon = (url: string) => {
  const urlComponents = url.replace(/(https?:\/\/)?(www.)?/i, "").split("/");
  const domainComponents = urlComponents[0]?.split(".") || [];
  const icon =
    domainComponents.slice(domainComponents.length - 2).join(".") || "";
  return (
    USER_LINKS_ICONS[icon as keyof typeof USER_LINKS_ICONS] ?? WEB_LINK_ICON
  );
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
