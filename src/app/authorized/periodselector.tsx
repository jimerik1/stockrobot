// PeriodSelector.tsx
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface PeriodSelectorProps {
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
}

const periods = [
  { value: "1d", label: "1 Day" },
  { value: "5d", label: "5 Days" },
  { value: "1mo", label: "1 Month" },
  { value: "3mo", label: "3 Months" },  // Fixed this line
  { value: "1y", label: "1 Year" },
  { value: "5y", label: "5 Years" },
];

export function PeriodSelector({ currentPeriod, onPeriodChange }: PeriodSelectorProps) {
  return (
    <Select value={currentPeriod} onValueChange={onPeriodChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period) => (
          <SelectItem key={period.value} value={period.value}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}