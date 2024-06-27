// src/server/api/router/ticker.ts
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const tickerRouter = createTRPCRouter({
  searchTickers: protectedProcedure.input(z.object({
    query: z.string(),
  })).query(async ({ input, ctx }) => {
    return ctx.db.ticker.findMany({
      where: {
        ticker: {
          contains: input.query,
          mode: "insensitive",
        },
      },
      select: {
        ticker: true,
      },
      distinct: ["ticker"],
    });
  }),
});