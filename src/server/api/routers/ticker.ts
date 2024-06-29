import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

type Ticker = {
  ticker: string;
  companyName: string;
};

type FinancialData = {
  // Define the structure of the financial data here based on the API response
  // Example:
  revenue: number;
  profit: number;
};

type HoldersData = {
  // Define the structure of the holders data here based on the API response
  // Example:
  holders: Array<{
    name: string;
    shares: number;
  }>;
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

  getFinancials: protectedProcedure.input(z.object({
    ticker: z.string(),
  })).query(async ({ input }) => {
    try {
      const response = await fetch(`https://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com/${input.ticker}/financials`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
        }
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch financial data:', errorText);
        throw new Error(`Failed to fetch financial data: ${errorText}`);
      }

      const data: FinancialData = await response.json();
      console.log('Financial data:', data);
      return data;
    } catch (error) {
      console.error('Error in getFinancials:', error);
      throw error;
    }
  }),

  getHolders: protectedProcedure.input(z.object({
    ticker: z.string(),
  })).query(async ({ input }) => {
    try {
      const response = await fetch(`https://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com/${input.ticker}/holders`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
        }
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch holders data:', errorText);
        throw new Error(`Failed to fetch holders data: ${errorText}`);
      }

      const data: HoldersData = await response.json();
      console.log('Holders data:', data);
      return data;
    } catch (error) {
      console.error('Error in getHolders:', error);
      throw error;
    }
  }),
});