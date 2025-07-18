import React from 'react';
import { Clock, Trash2, RotateCcw } from 'lucide-react';
import { ConversionHistory } from '../types';

interface ConversionHistoryProps {
  history: ConversionHistory[];
  onRestore: (item: ConversionHistory) => void;
  onClear: () => void;
  theme?: 'light' | 'dark';
}

export const ConversionHistoryPanel: React.FC<ConversionHistoryProps> = ({
  history,
  onRestore,
  onClear,
  theme = 'light'
}) => {
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 border-gray-600' 
    : 'bg-white text-gray-900 border-gray-300';

  const itemTheme = theme === 'dark' 
    ? 'bg-gray-700 hover:bg-gray-600' 
    : 'bg-gray-50 hover:bg-gray-100';

  return (
    <div className={`p-4 border rounded-lg ${themeClasses}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock size={18} />
          <h3 className="font-semibold">Conversion History</h3>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={14} />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {history.length === 0 ? (
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No conversions yet</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${itemTheme}`}
              onClick={() => onRestore(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RotateCcw size={14} />
                  <span className="font-medium text-sm">{item.conversionType}</span>
                </div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className={`text-xs mt-1 truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.sourceCode.substring(0, 50)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};