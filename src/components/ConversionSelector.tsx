import React from 'react';
import { ChevronDown, Code, FileText, Braces } from 'lucide-react';
import { ConversionPair } from '../types';

interface ConversionSelectorProps {
  selectedConversion: ConversionPair | null;
  onConversionChange: (conversion: ConversionPair) => void;
  theme?: 'light' | 'dark';
}

export const ConversionSelector: React.FC<ConversionSelectorProps> = ({
  selectedConversion,
  onConversionChange,
  theme = 'light'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const conversionOptions: ConversionPair[] = [
    { id: 'js-ts', name: 'JavaScript → TypeScript', from: 'javascript', to: 'typescript', icon: 'code' },
    { id: 'ts-js', name: 'TypeScript → JavaScript', from: 'typescript', to: 'javascript', icon: 'code' },
    { id: 'py-js', name: 'Python → JavaScript', from: 'python', to: 'javascript', icon: 'code' },
    { id: 'json-yaml', name: 'JSON → YAML', from: 'json', to: 'yaml', icon: 'braces' },
    { id: 'yaml-json', name: 'YAML → JSON', from: 'yaml', to: 'json', icon: 'braces' },
    { id: 'css-scss', name: 'CSS → SCSS', from: 'css', to: 'scss', icon: 'fileText' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code size={16} />;
      case 'braces': return <Braces size={16} />;
      case 'fileText': return <FileText size={16} />;
      default: return <Code size={16} />;
    }
  };

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 border-gray-600' 
    : 'bg-white text-gray-900 border-gray-300';

  const dropdownTheme = theme === 'dark' 
    ? 'bg-gray-800 border-gray-600' 
    : 'bg-white border-gray-300';

  const hoverTheme = theme === 'dark' 
    ? 'hover:bg-gray-700' 
    : 'hover:bg-gray-50';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full p-3 border rounded-lg transition-colors ${themeClasses} ${hoverTheme}`}
      >
        <div className="flex items-center space-x-2">
          {selectedConversion && getIcon(selectedConversion.icon)}
          <span className="font-medium">
            {selectedConversion ? selectedConversion.name : 'Select conversion type'}
          </span>
        </div>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-1 w-full border rounded-lg shadow-lg z-50 ${dropdownTheme}`}>
          {conversionOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onConversionChange(option);
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 w-full p-3 text-left transition-colors ${hoverTheme} first:rounded-t-lg last:rounded-b-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
            >
              {getIcon(option.icon)}
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};