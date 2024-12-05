import React from 'react';
import type { StoryElement } from '../types/StoryElements';

interface DropdownProps {
  label: string;
  options: StoryElement[];
  value: string;
  onChange: (value: string) => void;
}

export function Dropdown({ label, options, value, onChange }: DropdownProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}