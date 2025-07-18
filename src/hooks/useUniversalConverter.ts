import { useState, useCallback, useEffect } from 'react';
import { ConversionHistory, ConversionStatus, ConversionSuggestion } from '../types';
import { detectLanguage, generateSuggestions, performConversion } from '../utils/universalConverter';
import { validateInput, conversionRateLimiter } from '../utils/validation';
import { performanceMonitor, debounce } from '../utils/performance';
import { analytics } from '../utils/analytics';

export const useUniversalConverter = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<ConversionSuggestion[]>([]);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Debounced language detection for better performance
  const debouncedDetectLanguage = useCallback(
    debounce((code: string) => {
      if (!code.trim()) {
        setDetectedLanguage(null);
        setSuggestions([]);
        return;
      }

      const endTiming = performanceMonitor.startTiming('language_detection');
      const detected = detectLanguage(code);
      const detectionTime = endTiming();
      
      setDetectedLanguage(detected);
      
      if (detected) {
        analytics.trackLanguageDetection(detected, 1.0); // Confidence score would be calculated in real implementation
      }
      
      const newSuggestions = generateSuggestions(detected, code);
      setSuggestions(newSuggestions);
      
      performanceMonitor.recordConversion({
        conversionTime: detectionTime,
        inputSize: code.length,
        outputSize: 0,
        language: detected || 'unknown',
        conversionType: 'language_detection'
      });
    }, 300),
    []
  );

  // Detect language and generate suggestions when source code changes
  useEffect(() => {
    if (!sourceCode.trim()) {
      setDetectedLanguage(null);
      setSuggestions([]);
      setConvertedCode('');
      setStatus('idle');
      return;
    }

    debouncedDetectLanguage(sourceCode);
  }, [sourceCode]);

  const handleSourceCodeChange = useCallback((code: string) => {
    setSourceCode(code);
    setConvertedCode(''); // Clear previous conversion
    setErrorMessage('');
  }, []);

  const handleConversionRequest = useCallback(async (suggestion: ConversionSuggestion) => {
    if (!sourceCode.trim()) {
      setErrorMessage('Please enter some code to convert');
      return;
    }

    // Rate limiting
    if (!conversionRateLimiter.isAllowed()) {
      setErrorMessage('Too many conversion requests. Please wait a moment.');
      return;
    }

    // Input validation
    const validation = validateInput(sourceCode);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid input');
      return;
    }

    setStatus('converting');
    setErrorMessage('');
    
    const endTiming = performanceMonitor.startTiming('conversion');
    const startTime = Date.now();

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = performConversion(validation.sanitized || sourceCode, suggestion);
      const conversionTime = endTiming();
      
      setConvertedCode(result);
      setStatus('success');

      // Analytics tracking
      analytics.trackConversion(
        suggestion.fromLanguage,
        suggestion.toLanguage,
        sourceCode.length,
        conversionTime,
        true
      );

      // Performance monitoring
      performanceMonitor.recordConversion({
        conversionTime,
        inputSize: sourceCode.length,
        outputSize: result.length,
        language: suggestion.fromLanguage,
        conversionType: suggestion.name
      });

      // Add to history
      const historyItem: ConversionHistory = {
        id: Date.now().toString(),
        conversionType: suggestion.name,
        sourceCode,
        convertedCode: result,
        timestamp: new Date()
      };

      setConversionHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    } catch (error) {
      const conversionTime = endTiming();
      setStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Conversion failed';
      setErrorMessage(errorMessage);
      setConvertedCode('');

      // Analytics tracking for errors
      analytics.trackConversion(
        suggestion.fromLanguage,
        suggestion.toLanguage,
        sourceCode.length,
        conversionTime,
        false,
        errorMessage
      );

      // Error tracking
      if (error instanceof Error) {
        analytics.trackError(error, 'conversion_request');
      }
    }
  }, [sourceCode, debouncedDetectLanguage]);

  const restoreFromHistory = useCallback((item: ConversionHistory) => {
    setSourceCode(item.sourceCode);
    setConvertedCode(item.convertedCode);
    setStatus('success');
  }, []);

  const clearHistory = useCallback(() => {
    setConversionHistory([]);
    analytics.track('history_cleared');
  }, []);

  return {
    sourceCode,
    convertedCode,
    detectedLanguage,
    suggestions,
    conversionHistory,
    status,
    errorMessage,
    handleSourceCodeChange,
    handleConversionRequest,
    restoreFromHistory,
    clearHistory
  };
};