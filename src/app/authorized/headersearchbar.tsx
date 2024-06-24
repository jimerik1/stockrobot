// headersearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export function HeaderSearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ ticker: string }[]>([]);
  const router = useRouter();

  const searchTickers = api.stock.searchTickers.useQuery({ query }, {
    enabled: query.length > 0,
  });

  useEffect(() => {
    if (searchTickers.data) {
      setSuggestions(searchTickers.data);
    }
  }, [searchTickers.data]);

  const handleSearch = (ticker: string) => {
    console.log(`Navigating to /authorized/${ticker}`);
    router.push(`/authorized/${ticker}`);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tickers..."
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w/[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearch(suggestion.ticker)}
            >
              {suggestion.ticker}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}