/* eslint-disable */
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.STOCK_API_KEY;

async function fetchFromStockAPI(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "X-API-Key": API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const stockRouter = createTRPCRouter({
  getStockInfo: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromStockAPI(`/${input.ticker}/info`);
    }),

  getStockHistory: protectedProcedure
    .input(z.object({ ticker: z.string(), period: z.string() }))
    .query(async ({ input }) => {
      return fetchFromStockAPI(`/${input.ticker}/history/${input.period}`);
    }),

  // Add more procedures for other endpoints as needed
  getStockActions: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromStockAPI(`/${input.ticker}/actions`);
    }),

  getFinancials: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromStockAPI(`/${input.ticker}/financials`);
    }),

  getHolders: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromStockAPI(`/${input.ticker}/holders`);
    }),
});