import React from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { ConversionStatus } from '../types';

interface StatusBarProps {
  status: ConversionStatus;
  message?: string;
  theme?: 'light' | 'dark';
}

export const StatusBar: React.FC<StatusBarProps> = ({
  status,
  message,
  theme = 'light'
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'converting':
        return <Loader2 size={16} className="animate-spin" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'converting':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'converting':
        return 'Converting...';
      case 'success':
        return 'Conversion successful';
      case 'error':
        return 'Conversion failed';
      default:
        return 'Ready';
    }
  };

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 border-gray-600' 
    : 'bg-white text-gray-900 border-gray-300';

  return (
    <div className={`flex items-center justify-between p-3 border rounded-lg ${themeClasses}`}>
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      {message && (
        <span className={`text-sm max-w-md truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {message}
        </span>
      )}
    </div>
  );
};