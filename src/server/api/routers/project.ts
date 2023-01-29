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
    return ctx.prisma.project.findMany({ include: { creator: true } });
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
    .mutation(({ ctx, input }) => {
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
  update: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        neededRoles: z.array(z.enum(ROLES)).optional(),
        status: z.enum(STATUS).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.update({
        where: { id: input.projectId },
        data: {
          title: input.title || undefined,
          neededRoles: input.neededRoles || undefined,
          description: input.description || undefined,
          status: input.status || undefined,
        },
      });
    }),
  interstedIn: protectedProcedure
    .input(z.object({ projectid: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.update({
        where: { id: input.projectid },
        data: {
          interestedUsers: {
            connect: [{ id: ctx.session.user.id }],
          },
        },
      });
    }),
  join: protectedProcedure
    .input(z.object({ projectid: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.update({
        where: { id: input.projectid },
        data: {
          joinedBy: {
            connect: [{ id: ctx.session.user.id }],
          },
        },
      });
    }),
});
