import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

const prisma = new PrismaClient();

// Simple in-memory cache
const cache = new Map();

// Define the shape of your DailySummary
const DailySummarySchema = z.object({
  id: z.number(),
  date: z.date(),
  summaryText: z.string(),
  ticker: z.string().nullable(),
  tickerText: z.string().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
});


type DailySummary = z.infer<typeof DailySummarySchema>;

export const dataRouter = createTRPCRouter({
  getDailySummary: protectedProcedure
  .input(z.object({
    date: z.date(),
  }))
  .query(async ({ input }) => {
    const { date } = input;
    const cacheKey = date.toISOString().split('T')[0];
    
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < 10000) { // 1 minute cache
      console.log('Returning cached result for:', cacheKey);
      return cachedData.data as DailySummary | null;
    }

      console.log('getDailySummary input:', { date });
      
      const dateString = date.toISOString().split('T')[0];
      
      const query = `
        SELECT * FROM "DailySummary"
        WHERE DATE(date) = $1::date
        LIMIT 1
      `;
      
      console.log('SQL Query:', query);
      console.log('SQL Parameters:', [dateString]);
      
      const result = await prisma.$queryRawUnsafe(query, dateString);
      
      console.log('getDailySummary raw query result:', result);
      
      let summaryResult: DailySummary | null = null;
      
      if (Array.isArray(result) && result.length > 0) {
        try {
          summaryResult = DailySummarySchema.parse(result[0]);
        } catch (error) {
          console.error('Failed to parse DailySummary:', error);
        }
      }
      
      // Cache the result
      cache.set(cacheKey, summaryResult);
      
      return summaryResult;
    }),
});