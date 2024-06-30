import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

type statusmessage = {
  status: string;
};

export const getStockInfoRouter = createTRPCRouter({
  getStockInfo: protectedProcedure.input(z.object({
    ticker: z.string(),
  })).query(async ({ input, ctx }) => {
    const response = await fetch(`https://ec2-16-170-98-89.eu-north-1.compute.amazonaws.com/${input.ticker}/status`, {
      headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data: statusmessage = await response.json();
    console.log("Endpoint triggered");
    console.log(data);
    return data;
  }),
});