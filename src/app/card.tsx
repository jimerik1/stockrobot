import React, { useState } from 'react';

type CardType = {
  id: string;
  name: string;
};

const cardTypes: CardType[] = [
  { id: 'candlestick', name: 'Candlestick Chart' },
  { id: 'line', name: 'Line Chart' },
  { id: 'data', name: 'Data Table' },
  // Add more card types as needed
];

const defaultCardType: CardType = cardTypes[0] ?? { id: 'default', name: 'Default Chart' };

interface CardProps {
  id: string;
  onRemove: (id: string) => void;
  onTypeChange: (id: string, type: string) => void;
}

export function Card({ id, onRemove, onTypeChange }: CardProps) {
  const [selectedType, setSelectedType] = useState<CardType>(defaultCardType);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = cardTypes.find(type => type.id === e.target.value);
    if (newType) {
      setSelectedType(newType);
      onTypeChange(id, newType.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <select 
          value={selectedType.id} 
          onChange={handleTypeChange}
          className="p-2 border rounded"
        >
          {cardTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <button 
          onClick={() => onRemove(id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
      {/* Render different content based on selectedType */}
      {selectedType.id === 'candlestick' && <div>Candlestick Chart Placeholder</div>}
      {selectedType.id === 'line' && <div>Line Chart Placeholder</div>}
      {selectedType.id === 'data' && <div>Data Table Placeholder</div>}
    </div>
  );
}