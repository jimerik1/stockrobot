-- CreateTable
CREATE TABLE "DailySummary" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "summaryText" TEXT NOT NULL,
    "ticker" TEXT,
    "tickerText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailySummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailySummary_date_idx" ON "DailySummary"("date");

-- CreateIndex
CREATE INDEX "DailySummary_ticker_idx" ON "DailySummary"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "DailySummary_date_ticker_key" ON "DailySummary"("date", "ticker");
