'use client';

import { Card, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export function DailySummaryCard() {
    const [queryDate] = useState(() => {
        const now = new Date();
        const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        utcDate.setUTCHours(0, 0, 0, 0);
        return utcDate;
    });
  
    const { data: dailySummary, isLoading, error } = api.getData.getDailySummary.useQuery(
        { date: queryDate },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: Infinity,
        }
    );

    if (error) {
        console.error('Error fetching daily summary:', error);
    }

    if (dailySummary) {
        console.log('Fetched daily summary:', dailySummary);
    }

    return (
        <Card className="col-span-1 row-span-1 flex flex-col">
            <CardTitle className="py-2 px-2 bg-slate-100">Daily Summary</CardTitle>
            <CardContent className="py-2 px-2 overflow-auto max-h-[calc(100vh-200px)]">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : dailySummary ? (
                    <div>
                        <p className="font-mono font-bold text-sm mb-4">Date: {new Date(dailySummary.date).toDateString()}</p>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                                h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xl font-semibold my-3" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-lg font-medium my-2" {...props} />,
                                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                                li: ({node, ...props}) => <li className="mb-1 -ml-5" {...props} />,
                                hr: ({node, ...props}) => <hr className="my-6 border-t-2 border-gray-300" {...props} />,
                                br: ({node, ...props}) => <br className="my-2" {...props} />,
                            }}
                            className="font-sans prose dark:prose-invert max-w-none"
                        >
                            {dailySummary.summaryText}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <p>No summary available for {queryDate.toDateString()}</p>
                )}
            </CardContent>
            <CardFooter className="py-2 px-2 bg-slate-100">
                Last updated: {dailySummary?.updatedAt ? new Date(dailySummary.updatedAt).toLocaleString() : 'N/A'}
            </CardFooter>
        </Card>
    );
}
