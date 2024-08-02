-- CreateTable
CREATE TABLE "Indicator" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ticker" TEXT NOT NULL,
    "marketName" TEXT NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "high" DOUBLE PRECISION NOT NULL,
    "low" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "adjClose" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "macd" DOUBLE PRECISION,
    "macdHistogram" DOUBLE PRECISION,
    "macdSignal" DOUBLE PRECISION,
    "rsi" DOUBLE PRECISION,
    "bblower" DOUBLE PRECISION,
    "bbmiddle" DOUBLE PRECISION,
    "bbupper" DOUBLE PRECISION,
    "bbwidth" DOUBLE PRECISION,
    "bbpercent" DOUBLE PRECISION,
    "obv" DOUBLE PRECISION NOT NULL,
    "sma20" DOUBLE PRECISION,
    "ema50" DOUBLE PRECISION,
    "stochK" DOUBLE PRECISION,
    "stochD" DOUBLE PRECISION,
    "adx" DOUBLE PRECISION,
    "dmp" DOUBLE PRECISION,
    "dmn" DOUBLE PRECISION,
    "williamsR" DOUBLE PRECISION,
    "cmf" DOUBLE PRECISION,
    "psarLong" DOUBLE PRECISION,
    "psarShort" DOUBLE PRECISION,
    "psarAf" DOUBLE PRECISION NOT NULL,
    "psarReverse" DOUBLE PRECISION NOT NULL,
    "obvInMillions" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Indicator_ticker_marketName_date_idx" ON "Indicator"("ticker", "marketName", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Indicator_date_ticker_marketName_key" ON "Indicator"("date", "ticker", "marketName");
