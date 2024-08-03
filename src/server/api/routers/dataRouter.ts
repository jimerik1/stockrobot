import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

const prisma = new PrismaClient();

// Define the shape of your DailySummary
const DailySummarySchema = z.object({
  id: z.number(),
  date: z.date(),
  summaryText: z.string(),
  ticker: z.string().nullable(),
  tickerText: z.string().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
  parsedTickerText: z.object({
    tickers: z.array(z.string()),
    signals: z.array(z.string()),
    comments: z.array(z.string()),
    tascores: z.array(z.union([z.string(), z.number()])),
  }).optional(),
});


type DailySummary = z.infer<typeof DailySummarySchema>;

// Define the structure for cache entries
interface CacheEntry {
  timestamp: number;
  data: DailySummary | null;
}

// Typed cache
const cache = new Map<string, CacheEntry>();

export const dataRouter = createTRPCRouter({
  getDailySummary: protectedProcedure
  .input(z.object({
    date: z.date(),
  }))
  .query(async ({ input }) => {
    const { date } = input;
    const cacheKey = date.toISOString().split('T')[0];
    
    if (!cacheKey) {
      throw new Error("Invalid date: unable to generate cache key");
    }

    const cachedEntry = cache.get(cacheKey);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < 60000) { // 1 minute cache
      console.log('Returning cached result for:', cacheKey);
      return cachedEntry.data;
    }

      console.log('getDailySummary input:', { date });
      
      const dateString = date.toISOString().split('T')[0];
      
      const query = `
      SELECT * FROM "DailySummary"
      WHERE DATE(date) = $1::date
      LIMIT 1
    `;
    
    const result = await prisma.$queryRawUnsafe<unknown[]>(query, dateString);
    
    let summaryResult: DailySummary | null = null;
    
    if (Array.isArray(result) && result.length > 0) {
      try {
        const rawSummary = result[0] as Record<string, unknown>;
        if (typeof rawSummary.tickerText === 'string') {
          const parsedTickerText = JSON.parse(rawSummary.tickerText);
          rawSummary.parsedTickerText = parsedTickerText;
        }
        summaryResult = DailySummarySchema.parse(rawSummary);
      } catch (error) {
        console.error('Failed to parse DailySummary:', error);
      }
    }
    
    // Cache the result
    cache.set(cacheKey, { timestamp: Date.now(), data: summaryResult });
    
    return summaryResult;
  }),
});

