import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stockRouter = createTRPCRouter({
  getStockData: protectedProcedure.input(z.object({
    count: z.number().min(1).optional(),
  })).query(async ({ input, ctx }) => {
    const count = input.count ?? 10; // Default to 10 if count is not provided
    return ctx.db.stockData.findMany({
      orderBy: { date: "desc" },
      take: count,
    });
  }),
});