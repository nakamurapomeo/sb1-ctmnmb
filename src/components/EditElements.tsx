import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { StoryElementsState } from '../types/StoryElements';

interface EditElementsProps {
  state: StoryElementsState;
  onAdd: (category: keyof Omit<StoryElementsState, 'selected'>, value: string) => void;
  onRemove: (category: keyof Omit<StoryElementsState, 'selected'>, id: string) => void;
  onBack: () => void;
}

export function EditElements({ state, onAdd, onRemove, onBack }: EditElementsProps) {
  const [newValues, setNewValues] = useState({
    protagonist: '',
    setting: '',
    world: '',
  });

  const handleAdd = (category: keyof typeof newValues) => {
    if (newValues[category].trim()) {
      onAdd(category, newValues[category].trim());
      setNewValues(prev => ({ ...prev, [category]: '' }));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        戻る
      </button>

      {(['protagonist', 'setting', 'world'] as const).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {category === 'protagonist' ? '主人公' : category === 'setting' ? '舞台' : '世界'}
          </h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newValues[category]}
              onChange={(e) => setNewValues(prev => ({ ...prev, [category]: e.target.value }))}
              className="flex-1 p-2 border rounded-lg"
              placeholder="新しい項目を追加"
            />
            <button
              onClick={() => handleAdd(category)}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <ul className="space-y-2">
            {state[category].map((item) => (
              <li key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span>{item.value}</span>
                <button
                  onClick={() => onRemove(category, item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}