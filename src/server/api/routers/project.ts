import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const ROLES = [
  "DEV_FRONT",
  "DEV_BACK",
  "DEV_FULLSTACK",
  "DEV_OPS",
  "UI_DESIGNER",
  "UX_DESIGNER",
] as const;

const STATUS = ["DRAFT", "IN_PROGRESS", "FINISHED"] as const;

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({ where: { id: input.projectId } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        neededRoles: z.array(z.enum(ROLES)),
        status: z.enum(STATUS),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: {
          creatorId: ctx.session.user.id,
          title: input.title,
          neededRoles: input.neededRoles,
          description: input.description,
          joinedBy: { connect: [{ id: ctx.session.user.id }] },
          status: input.status,
        },
      });
    }),
});
