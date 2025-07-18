import React, { useState } from 'react';
import { Moon, Sun, Code2, Zap, Sparkles } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CodeEditor } from './components/CodeEditor';
import { ConversionHistoryPanel } from './components/ConversionHistory';
import { StatusBar } from './components/StatusBar';
import { LanguageDetector } from './components/LanguageDetector';
import { ConversionSuggestions } from './components/ConversionSuggestions';
import { useUniversalConverter } from './hooks/useUniversalConverter';
import { analytics } from './utils/analytics';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const {
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
  } = useUniversalConverter();

  // Track page view on mount
  React.useEffect(() => {
    analytics.trackPageView('/');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    analytics.track('theme_changed', { theme: theme === 'light' ? 'dark' : 'light' });
  };

  const themeClasses = theme === 'dark' 
    ? 'bg-gray-900 text-gray-50' 
    : 'bg-gray-50 text-gray-900';

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors ${themeClasses}`}>
      {/* Header */}
      <header className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Code2 size={32} className="text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  UniCode
                </h1>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs font-medium">
                <Sparkles size={12} />
                <span>Auto-Detect</span>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            Paste Any Code, Get Instant Conversions
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Simply paste your code and our AI will automatically detect the language and suggest the best conversion options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Detection & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <LanguageDetector
              detectedLanguage={detectedLanguage}
              theme={theme}
            />

            <ConversionSuggestions
              suggestions={suggestions}
              onConvert={handleConversionRequest}
              theme={theme}
            />

            <StatusBar
              status={status}
              message={errorMessage}
              theme={theme}
            />

            <ConversionHistoryPanel
              history={conversionHistory}
              onRestore={restoreFromHistory}
              onClear={clearHistory}
              theme={theme}
            />
          </div>

          {/* Right Panel - Code Editors */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
              {/* Source Code Editor */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Input Code
                  </h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    detectedLanguage 
                      ? 'bg-green-100 text-green-800' 
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {detectedLanguage || 'Paste code to detect language'}
                  </span>
                </div>
                <CodeEditor
                  value={sourceCode}
                  onChange={handleSourceCodeChange}
                  language={detectedLanguage || 'text'}
                  placeholder="Paste any code here - JavaScript, Python, Java, C++, Rust, Go, PHP, Ruby, Swift, Kotlin, JSON, YAML, CSS, HTML, SQL, Bash, Docker, Terraform, and 40+ more languages..."
                  theme={theme}
                />
              </div>

              {/* Converted Code Editor */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Converted Code
                  </h3>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {convertedCode ? 'Ready to copy' : 'Select a conversion option'}
                  </span>
                </div>
                <CodeEditor
                  value={convertedCode}
                  onChange={() => {}} // Read-only
                  language="text"
                  placeholder="Converted code will appear here automatically..."
                  readOnly
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className={`text-2xl font-semibold mb-8 text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            Supported Languages & Conversions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-2xl mb-3">🔄</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Programming Languages</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                JavaScript, TypeScript, Python, Java, C++, Rust, Go, PHP, Ruby, Swift, Kotlin, and more
              </p>
            </div>
            
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-2xl mb-3">📊</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Data Formats</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                JSON ↔ YAML ↔ XML ↔ TOML, CSV transformations, configuration files
              </p>
            </div>
            
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-2xl mb-3">🎨</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Web Technologies</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                HTML ↔ JSX ↔ Vue, CSS ↔ SCSS ↔ Less, styling optimizations
              </p>
            </div>
            
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-2xl mb-3">🔧</div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>DevOps & Infrastructure</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Docker, Kubernetes, Terraform, Ansible, CI/CD configurations
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;