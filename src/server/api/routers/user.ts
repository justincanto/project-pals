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

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: { joinedProjects: true },
      });
    }),
  updateMe: protectedProcedure
    .input(
      z.object({
        role: z.enum(ROLES).optional(),
        description: z.string().optional(),
        name: z.string().optional(),
        links: z.array(z.string()).default([]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          role: input.role || undefined,
          description: input.description || undefined,
          name: input.name || undefined,
          links: input.links,
        },
      });
    }),
});
