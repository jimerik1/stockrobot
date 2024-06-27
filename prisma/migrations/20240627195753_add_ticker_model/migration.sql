-- CreateTable
CREATE TABLE "Ticker" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_ticker_key" ON "Ticker"("ticker");

-- CreateIndex
CREATE INDEX "Ticker_ticker_idx" ON "Ticker"("ticker");
