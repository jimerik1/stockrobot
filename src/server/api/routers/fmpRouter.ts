import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const API_BASE_URL = "https://financialmodelingprep.com/api/v3";
const API_KEY = process.env.FMP_API_KEY;

async function fetchFromFMPAPI(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}?apikey=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const fmpRouter = createTRPCRouter({
  // Real-time data
  getRealtimeQuote: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/quote/${input.ticker}`);
    }),

  // Historical data
  getHistoricalData: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      from: z.string(),
      to: z.string()
    }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/historical-price-full/${input.ticker}?from=${input.from}&to=${input.to}`);
    }),

  // Company data
  getCompanyProfile: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/profile/${input.ticker}`);
    }),

  // Additional suggested endpoints:

  // Financial Statements
  getIncomeStatement: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      period: z.enum(['annual', 'quarter'])
    }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/income-statement/${input.ticker}?period=${input.period}`);
    }),

  // Key Metrics
  getKeyMetrics: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/key-metrics-ttm/${input.ticker}`);
    }),

  // Analyst Estimates
  getAnalystEstimates: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/analyst-estimates/${input.ticker}`);
    }),

  // Stock News
  getStockNews: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      const limit = input.limit || 10;
      return fetchFromFMPAPI(`/stock_news?tickers=${input.ticker}&limit=${limit}`);
    }),

  // Insider Trading
  getInsiderTrading: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      const limit = input.limit || 100;
      return fetchFromFMPAPI(`/insider-trading?symbol=${input.ticker}&limit=${limit}`);
    }),

  // Stock Screener
  stockScreener: protectedProcedure
    .input(z.object({
      marketCapMoreThan: z.number().optional(),
      betaMoreThan: z.number().optional(),
      volumeMoreThan: z.number().optional(),
      dividentMoreThan: z.number().optional(),
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      const params = new URLSearchParams(input as Record<string, string>);
      return fetchFromFMPAPI(`/stock-screener?${params.toString()}`);
    }),
});