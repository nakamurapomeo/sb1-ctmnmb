import React, { useState } from 'react';
import { Copy, Settings } from 'lucide-react';
import { Dropdown } from './components/Dropdown';
import { EditElements } from './components/EditElements';
import { useStoryElements } from './hooks/useStoryElements';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const { state, updateSelected, addElement, removeElement } = useStoryElements();

  const handleCopy = async () => {
    const text = `主人公: ${state.selected.protagonist}\n舞台: ${state.selected.setting}\n世界観: ${state.selected.world}`;
    await navigator.clipboard.writeText(text);
    alert('クリップボードにコピーしました！');
  };

  if (isEditing) {
    return (
      <EditElements
        state={state}
        onAdd={addElement}
        onRemove={removeElement}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">ストーリー要素ジェネレーター</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <Dropdown
            label="主人公"
            options={state.protagonist}
            value={state.selected.protagonist}
            onChange={(value) => updateSelected('protagonist', value)}
          />

          <Dropdown
            label="舞台"
            options={state.setting}
            value={state.selected.setting}
            onChange={(value) => updateSelected('setting', value)}
          />

          <Dropdown
            label="世界"
            options={state.world}
            value={state.selected.world}
            onChange={(value) => updateSelected('world', value)}
          />

          <div className="mt-6">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Copy className="w-5 h-5" />
              結果をコピー
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;