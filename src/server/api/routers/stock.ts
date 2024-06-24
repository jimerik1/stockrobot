import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stockRouter = createTRPCRouter({
  getStockData: protectedProcedure.input(z.object({
    count: z.number().min(1).optional(),
    ticker: z.string().optional(),
  })).query(async ({ input, ctx }) => {
    const count = input.count ?? 10; // Default to 10 if count is not provided
    const ticker = input.ticker;
    const where = ticker ? { ticker } : {};
    return ctx.db.stockData.findMany({
      where,
      orderBy: { date: "desc" },
      take: count,
    });
  }),
  searchTickers: protectedProcedure.input(z.object({
    query: z.string(),
  })).query(async ({ input, ctx }) => {
    return ctx.db.stockData.findMany({
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