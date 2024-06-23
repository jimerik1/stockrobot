const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

async function main() {
    const csvFilePath = path.resolve(__dirname, "./tempdata/TSLA.csv");
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const row of results) {
                await prisma.stockData.create({
                    data: {
                        ticker: 'TSLA',
                        stockPrice: parseFloat(row['Close']),
                        unit: 'USD',
                        date: new Date(row['Date']),
                        keyMetrics: {
                            open: parseFloat(row['Open']),
                            high: parseFloat(row['High']),
                            low: parseFloat(row['Low']),
                            adjClose: parseFloat(row['Adj Close']),
                            volume: parseInt(row['Volume'], 10)
                        }
                    }
                });
            }
            console.log('Data successfully loaded');
        });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });