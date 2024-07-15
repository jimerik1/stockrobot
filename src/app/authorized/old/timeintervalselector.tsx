// TimeIntervalSelector.tsx
import React from "react";

interface TimeIntervalSelectorProps {
  currentInterval: string;
  onIntervalChange: (interval: string) => void;
}

const timeIntervals = [
  { value: "1d", label: "1d" },
  { value: "5d", label: "5d" },
  { value: "1mo", label: "1M" },
  { value: "6mo", label: "6M" },
  { value: "ytd", label: "YTD" },
  { value: "1y", label: "1Y" },
  { value: "5y", label: "5Y" },
  { value: "max", label: "All" },
];

export function TimeIntervalSelector({ currentInterval, onIntervalChange }: TimeIntervalSelectorProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {timeIntervals.map(interval => (
        <button
          key={interval.value}
          onClick={() => onIntervalChange(interval.value)}
          style={{
            background: 'none',
            color: currentInterval === interval.value ? '#0052CC' : 'black',
            border: 'none',
            padding: '5px 10px',
            marginRight: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: currentInterval === interval.value ? 'bold' : 'normal'
          }}
        >
          {interval.label}
        </button>
      ))}
    </div>
  );
}