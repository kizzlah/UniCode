import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { ConversionSuggestion } from '../types';

interface ConversionSuggestionsProps {
  suggestions: ConversionSuggestion[];
  onConvert: (suggestion: ConversionSuggestion) => void;
  theme?: 'light' | 'dark';
}

export const ConversionSuggestions: React.FC<ConversionSuggestionsProps> = ({
  suggestions,
  onConvert,
  theme = 'light'
}) => {
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 border-gray-600' 
    : 'bg-white text-gray-900 border-gray-300';

  const buttonTheme = theme === 'dark' 
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
    : 'bg-gray-50 hover:bg-gray-100 text-gray-900';

  return (
    <div className={`p-4 border rounded-lg ${themeClasses}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Zap size={18} className="text-blue-500" />
        <h3 className="font-semibold">Smart Suggestions</h3>
      </div>

      <div className="space-y-2">
        {suggestions.length === 0 ? (
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Paste code to see conversion options
          </p>
        ) : (
          suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => onConvert(suggestion)}
              className={`w-full p-3 rounded-lg border transition-all ${buttonTheme} hover:shadow-md group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{suggestion.icon}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{suggestion.name}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {suggestion.description}
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))
        )}
      </div>

      {suggestions.length > 0 && (
        <div className={`mt-3 p-2 rounded-md text-xs ${
          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-blue-50 text-blue-700'
        }`}>
          💡 Click any suggestion to convert instantly
        </div>
      )}
    </div>
  );
};