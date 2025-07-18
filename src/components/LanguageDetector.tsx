import React from 'react';
import { Eye, Code } from 'lucide-react';

interface LanguageDetectorProps {
  detectedLanguage: string | null;
  theme?: 'light' | 'dark';
}

export const LanguageDetector: React.FC<LanguageDetectorProps> = ({
  detectedLanguage,
  theme = 'light'
}) => {
  const themeClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 border-gray-600' 
    : 'bg-white text-gray-900 border-gray-300';

  const getLanguageIcon = (language: string | null) => {
    if (!language) return '❓';
    
    const icons: { [key: string]: string } = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      java: '☕',
      csharp: '💙',
      cpp: '⚡',
      c: '🔧',
      rust: '🦀',
      go: '🐹',
      php: '🐘',
      ruby: '💎',
      swift: '🍎',
      kotlin: '🎯',
      scala: '🔴',
      dart: '🎯',
      json: '📋',
      yaml: '📄',
      xml: '📰',
      toml: '⚙️',
      ini: '📝',
      css: '🎨',
      scss: '💅',
      less: '🎨',
      stylus: '🖌️',
      html: '🌐',
      jsx: '⚛️',
      vue: '💚',
      svelte: '🧡',
      sql: '🗃️',
      bash: '🐚',
      powershell: '💙',
      dockerfile: '🐳',
      makefile: '🔨',
      cmake: '⚙️',
      gradle: '🐘',
      maven: '📦',
      terraform: '🏗️',
      ansible: '🔴',
      kubernetes: '☸️',
      markdown: '📝',
      latex: '📄',
      r: '📈',
      matlab: '📊',
      lua: '🌙',
      perl: '🐪',
      haskell: '🎓',
      elixir: '💧',
      clojure: '🔵',
      erlang: '📡',
      fsharp: '🔷',
      ocaml: '🐫',
      assembly: '⚙️',
      vhdl: '🔌',
      verilog: '⚡'
    };
    
    return icons[language.toLowerCase()] || '📄';
  };

  const getLanguageDisplayName = (language: string | null) => {
    if (!language) return 'None';
    
    const displayNames: { [key: string]: string } = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      csharp: 'C#',
      cpp: 'C++',
      c: 'C',
      rust: 'Rust',
      go: 'Go',
      php: 'PHP',
      ruby: 'Ruby',
      swift: 'Swift',
      kotlin: 'Kotlin',
      scala: 'Scala',
      dart: 'Dart',
      json: 'JSON',
      yaml: 'YAML',
      xml: 'XML',
      toml: 'TOML',
      ini: 'INI',
      css: 'CSS',
      scss: 'SCSS',
      less: 'Less',
      stylus: 'Stylus',
      html: 'HTML',
      jsx: 'JSX',
      vue: 'Vue',
      svelte: 'Svelte',
      sql: 'SQL',
      bash: 'Bash',
      powershell: 'PowerShell',
      dockerfile: 'Dockerfile',
      makefile: 'Makefile',
      cmake: 'CMake',
      gradle: 'Gradle',
      maven: 'Maven',
      terraform: 'Terraform',
      ansible: 'Ansible',
      kubernetes: 'Kubernetes',
      markdown: 'Markdown',
      latex: 'LaTeX',
      r: 'R',
      matlab: 'MATLAB',
      lua: 'Lua',
      perl: 'Perl',
      haskell: 'Haskell',
      elixir: 'Elixir',
      clojure: 'Clojure',
      erlang: 'Erlang',
      fsharp: 'F#',
      ocaml: 'OCaml',
      assembly: 'Assembly',
      vhdl: 'VHDL',
      verilog: 'Verilog'
    };
    
    return displayNames[language.toLowerCase()] || language.toUpperCase();
  };

  return (
    <div className={`p-4 border rounded-lg ${themeClasses}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Eye size={18} />
        <h3 className="font-semibold">Language Detection</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Detected:</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getLanguageIcon(detectedLanguage)}</span>
            <span className={`text-sm font-medium ${
              detectedLanguage 
                ? 'text-green-600' 
                : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {getLanguageDisplayName(detectedLanguage)}
            </span>
          </div>
        </div>

        {detectedLanguage && (
          <div className={`p-2 rounded-md ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2">
              <Code size={14} />
              <span className="text-xs font-medium">Auto-detected from syntax patterns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};