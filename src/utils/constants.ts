import { Role } from "@prisma/client";

export const ROLES = {
  [Role.DEV_FRONT]: "Frontend Developer",
  [Role.DEV_BACK]: "Backend Developer",
  [Role.DEV_FULLSTACK]: "Fullstack Developer",
  [Role.DEV_OPS]: "DevOps",
  [Role.UI_DESIGNER]: "UI Designer",
  [Role.UX_DESIGNER]: "UX Designer",
} as const;

export const DEFAULT_ROLE = "Pal";
