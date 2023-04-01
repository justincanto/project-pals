const USER_LINKS_ICONS = {
  "linkedin.com": "linkedin",
  "github.com": "github",
  "twitter.com": "twitter",
  "dribbble.com": "dribbble",
  "behance.net": "behance",
};

const WEB_LINK_ICON = "web";

export const getIcon = (url: string) => {
  const urlComponents = url.replace(/(https?:\/\/)?(www.)?/i, "").split("/");
  const domainComponents = urlComponents[0]?.split(".") || [];
  const icon =
    domainComponents.slice(domainComponents.length - 2).join(".") || "";
  return (
    USER_LINKS_ICONS[icon as keyof typeof USER_LINKS_ICONS] ?? WEB_LINK_ICON
  );
};
