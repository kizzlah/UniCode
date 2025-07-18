export interface ConversionPair {
  id: string;
  name: string;
  from: string;
  to: string;
  icon: string;
}

export interface ConversionSuggestion {
  id: string;
  name: string;
  description: string;
  icon: string;
  fromLanguage: string;
  toLanguage: string;
}

export interface ConversionHistory {
  id: string;
  conversionType: string;
  sourceCode: string;
  convertedCode: string;
  timestamp: Date;
}

export interface ConversionError {
  message: string;
  line?: number;
  column?: number;
}

export type Theme = 'light' | 'dark';

export type ConversionStatus = 'idle' | 'converting' | 'success' | 'error';