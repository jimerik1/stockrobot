import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { stockRouter } from "./routers/stock";
import { tickerRouter } from "./routers/ticker";
import { getStockInfoRouter } from "./routers/getStockInfo";
import { fmpRouter } from "./routers/fmpRouter";
import { dataRouter } from "./routers/dataRouter";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  stock: stockRouter,
  ticker: tickerRouter,
  getstockinfo: getStockInfoRouter,
  fmpdata: fmpRouter,
  getData: dataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
