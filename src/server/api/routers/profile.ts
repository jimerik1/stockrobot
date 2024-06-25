/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// Define the Profile type based on your Prisma schema
type Profile = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  actualname: string;
  bio: string;
  userId: string;
};

export const profileRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.db.profile.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
    });
    return profile as Profile;
  }),

  editProfile: protectedProcedure
    .input(z.object({ actualname: z.string(), bio: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Fetch the profile first to get its id
      const profile = await ctx.db.profile.findFirstOrThrow({
        where: { userId: ctx.session.user.id },
      });

      const updatedProfile = await ctx.db.profile.update({
        where: { id: profile.id },
        data: {
          actualname: input.actualname,
          bio: input.bio,
        },
      });

      return updatedProfile as Profile;
    }),
});
