/*
  Warnings:

  - You are about to drop the column `stockPrice` on the `StockData` table. All the data in the column will be lost.
  - Added the required column `Volume` to the `StockData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceClose` to the `StockData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceHigh` to the `StockData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceLow` to the `StockData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceOpen` to the `StockData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockData" DROP COLUMN "stockPrice",
ADD COLUMN     "Volume" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceClose" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceHigh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceLow" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceOpen" DOUBLE PRECISION NOT NULL;
