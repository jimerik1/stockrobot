import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { subDays, subWeeks, subMonths, subYears, format } from 'date-fns';

const API_BASE_URL = "https://financialmodelingprep.com/api/v3";
const API_KEY = process.env.FMP_API_KEY;
console.log("FMP Key :")
console.log(API_KEY);

type TimeRange = '1d' | '3d' | '1w' | '1m' | '1y' | '5y';

const getDateRange = (timeRange: TimeRange) => {
  const now = new Date();
  let fromDate;

  switch (timeRange) {
    case '1d':
      fromDate = subDays(now, 1);
      break;
    case '3d':
      fromDate = subDays(now, 3);
      break;
    case '1w':
      fromDate = subWeeks(now, 1);
      break;
    case '1m':
      fromDate = subMonths(now, 1);
      break;
    case '1y':
      fromDate = subYears(now, 1);
      break;
    case '5y':
      fromDate = subYears(now, 5);
      break;
    default:
      fromDate = subMonths(now, 1); // default to 1 month
  }

  return {
    from: format(fromDate, 'yyyy-MM-dd'),
    to: format(now, 'yyyy-MM-dd'),
  };
};

async function fetchFromFMPAPI(endpoint: string) {

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('apikey', API_KEY as string);
  console.log('Fetching from URL:', url.toString());
  
  const response = await fetch(url.toString());
  console.log('Response status:', response.status);
  
  const data = await response.json();
  console.log('Response data:', data);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`);
  }
  return data;
}





export const fmpRouter = createTRPCRouter({
  // Real-time data
  getRealtimeQuote: protectedProcedure
    .input(z.object({ ticker: z.string() }))
    .query(async ({ input }) => {
      return fetchFromFMPAPI(`/quote/${input.ticker}`);
    }),

    getHistoricalData: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      timeRange: z.enum(['1d', '3d', '1w', '1m', '1y', '5y'] as const)
    }))
    .query(async ({ input }) => {
      const { ticker, timeRange } = input;
      const { from, to } = getDateRange(timeRange);
      
      let endpoint;
      if (timeRange === '1d') {
        endpoint = `/historical-chart/1min/${ticker}?from=${from}&to=${to}`;
      } else {
        endpoint = `/historical-price-full/${ticker}?from=${from}&to=${to}`;
      }
  
      try {
        const data = await fetchFromFMPAPI(endpoint);
        return data;
      } catch (error) {
        console.error('Error fetching historical data:', error);
        throw error;
      }
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
      const limit = input.limit ?? 10;
      return fetchFromFMPAPI(`/stock_news?tickers=${input.ticker}&limit=${limit}`);
    }),

  // Insider Trading
  getInsiderTrading: protectedProcedure
    .input(z.object({ 
      ticker: z.string(),
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      const limit = input.limit ?? 100;
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