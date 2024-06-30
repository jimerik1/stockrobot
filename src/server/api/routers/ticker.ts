import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

type Ticker = {
  ticker: string;
  companyName: string;
};


export const tickerRouter = createTRPCRouter({
  searchTickers: protectedProcedure.input(z.object({
    query: z.string(),
  })).query(async ({ input, ctx }) => {
    const tickers: Ticker[] = await ctx.db.ticker.findMany({
      where: {
        OR: [
          {
            ticker: {
              contains: input.query,
              mode: "insensitive",
            },
          },
          {
            companyName: {
              contains: input.query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        ticker: true,
        companyName: true,
      },
      distinct: ["ticker", "companyName"],
    });

    return tickers;
  }),
});