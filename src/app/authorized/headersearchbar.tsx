// headersearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

// Define the type for suggestions
interface Suggestion {
  ticker: string;
  companyName: string;
}

export function HeaderSearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  const searchTickers = api.ticker.searchTickers.useQuery({ query }, {
    enabled: query.length > 0,
  });

  useEffect(() => {
    if (searchTickers.data && query.length > 0) {
      setSuggestions(searchTickers.data.slice(0, 15));
    } else {
      setSuggestions([]);
    }
  }, [searchTickers.data, query.length]);

  const handleSearch = (ticker: string) => {
    console.log(`Navigating to /authorized/${ticker}`);
    router.push(`/authorized/${ticker}`);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tickers or companies..."
        className="pl-8 sm:w-[400px] md:w-[450px] lg:w/[500px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => handleSearch(suggestion.ticker)}
            >
              <span>{suggestion.ticker}</span>
              <span className="text-gray-500">{suggestion.companyName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}