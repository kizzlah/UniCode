import { useState, useCallback, useEffect } from 'react';
import { ConversionPair, ConversionHistory, ConversionStatus } from '../types';
import {
  convertJavaScriptToTypeScript,
  convertTypeScriptToJavaScript,
  convertJsonToYaml,
  convertYamlToJson,
  convertCssToScss,
  convertPythonToJavaScript
} from '../utils/converters';

export const useCodeConverter = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [selectedConversion, setSelectedConversion] = useState<ConversionPair | null>(null);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const convert = useCallback(async (code: string, conversionType: ConversionPair) => {
    if (!code.trim()) {
      setConvertedCode('');
      setStatus('idle');
      return;
    }

    setStatus('converting');
    setErrorMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing time
      
      let result = '';
      
      switch (conversionType.id) {
        case 'js-ts':
          result = convertJavaScriptToTypeScript(code);
          break;
        case 'ts-js':
          result = convertTypeScriptToJavaScript(code);
          break;
        case 'py-js':
          result = convertPythonToJavaScript(code);
          break;
        case 'json-yaml':
          result = convertJsonToYaml(code);
          break;
        case 'yaml-json':
          result = convertYamlToJson(code);
          break;
        case 'css-scss':
          result = convertCssToScss(code);
          break;
        default:
          throw new Error('Unsupported conversion type');
      }

      setConvertedCode(result);
      setStatus('success');

      // Add to history
      const historyItem: ConversionHistory = {
        id: Date.now().toString(),
        conversionType: conversionType.name,
        sourceCode: code,
        convertedCode: result,
        timestamp: new Date()
      };

      setConversionHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setConvertedCode('');
    }
  }, []);

  const handleSourceCodeChange = useCallback((code: string) => {
    setSourceCode(code);
    if (selectedConversion) {
      convert(code, selectedConversion);
    }
  }, [selectedConversion, convert]);

  const handleConversionTypeChange = useCallback((conversionType: ConversionPair) => {
    setSelectedConversion(conversionType);
    if (sourceCode.trim()) {
      convert(sourceCode, conversionType);
    }
  }, [sourceCode, convert]);

  const restoreFromHistory = useCallback((item: ConversionHistory) => {
    setSourceCode(item.sourceCode);
    setConvertedCode(item.convertedCode);
    setStatus('success');
  }, []);

  const clearHistory = useCallback(() => {
    setConversionHistory([]);
  }, []);

  return {
    sourceCode,
    convertedCode,
    selectedConversion,
    conversionHistory,
    status,
    errorMessage,
    handleSourceCodeChange,
    handleConversionTypeChange,
    restoreFromHistory,
    clearHistory
  };
};