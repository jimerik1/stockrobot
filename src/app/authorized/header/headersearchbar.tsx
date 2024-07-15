"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface Suggestion {
  ticker: string;
  companyName: string;
}

export function HeaderSearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let currentDashboard: string | null = searchParams.get("dashboard");

  // Extract dashboard from the pathname if it's not in the search parameters
  if (!currentDashboard) {
    const pathSegments = pathname.split('/');
    currentDashboard = pathSegments[pathSegments.length - 1] ?? "dashboard1"; // Default to dashboard1 if undefined
  }

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
    router.push(`/authorized/old/${ticker}?dashboard=${currentDashboard}`);
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