import { useState, useEffect } from 'react';
import type { StoryElement, StoryElementsState } from '../types/StoryElements';

const DEFAULT_STATE: StoryElementsState = {
  protagonist: [
    { id: '1', category: 'protagonist', value: '高校生' },
    { id: '2', category: 'protagonist', value: '探偵' },
    { id: '3', category: 'protagonist', value: '魔法使い' },
  ],
  setting: [
    { id: '1', category: 'setting', value: '学校' },
    { id: '2', category: 'setting', value: '異世界' },
    { id: '3', category: 'setting', value: '近未来都市' },
  ],
  world: [
    { id: '1', category: 'world', value: 'ファンタジー' },
    { id: '2', category: 'world', value: 'SF' },
    { id: '3', category: 'world', value: '日常' },
  ],
  selected: {
    protagonist: '',
    setting: '',
    world: '',
  },
};

const validateState = (state: any): state is StoryElementsState => {
  if (!state || typeof state !== 'object') return false;
  
  const requiredArrays = ['protagonist', 'setting', 'world'];
  const requiredSelected = ['protagonist', 'setting', 'world'];
  
  // Check if all required arrays exist and are arrays
  const hasArrays = requiredArrays.every(key => 
    Array.isArray(state[key]) && 
    state[key].every((item: any) => 
      typeof item === 'object' &&
      typeof item.id === 'string' &&
      typeof item.value === 'string' &&
      typeof item.category === 'string'
    )
  );

  // Check if selected object exists and has all required properties
  const hasSelected = 
    state.selected &&
    typeof state.selected === 'object' &&
    requiredSelected.every(key => 
      typeof state.selected[key] === 'string'
    );

  return hasArrays && hasSelected;
};

export function useStoryElements() {
  const [state, setState] = useState<StoryElementsState>(() => {
    try {
      const saved = localStorage.getItem('storyElements');
      if (!saved) return DEFAULT_STATE;
      
      const parsed = JSON.parse(saved);
      return validateState(parsed) ? parsed : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('storyElements', JSON.stringify(state));
  }, [state]);

  const updateSelected = (category: keyof typeof state.selected, value: string) => {
    setState(prev => ({
      ...prev,
      selected: { ...prev.selected, [category]: value }
    }));
  };

  const addElement = (category: keyof Omit<StoryElementsState, 'selected'>, value: string) => {
    setState(prev => ({
      ...prev,
      [category]: [...prev[category], {
        id: Date.now().toString(),
        category: category,
        value,
      } as StoryElement]
    }));
  };

  const removeElement = (category: keyof Omit<StoryElementsState, 'selected'>, id: string) => {
    setState(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  return {
    state,
    updateSelected,
    addElement,
    removeElement,
  };
}