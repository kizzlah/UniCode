import { ConversionSuggestion } from '../types';

// Enhanced language detection patterns with more comprehensive coverage
const languagePatterns: { [key: string]: RegExp[] } = {
  javascript: [
    /function\s+\w+\s*\(/,
    /const\s+\w+\s*=/,
    /let\s+\w+\s*=/,
    /var\s+\w+\s*=/,
    /=>\s*{/,
    /console\.log\(/,
    /require\s*\(/,
    /import\s+.*from/,
    /export\s+(default\s+)?/,
    /\.prototype\./,
    /new\s+\w+\(/,
    /typeof\s+\w+/,
    /instanceof\s+\w+/
  ],
  typescript: [
    /interface\s+\w+/,
    /type\s+\w+\s*=/,
    /:\s*string\b/,
    /:\s*number\b/,
    /:\s*boolean\b/,
    /function\s+\w+\s*\([^)]*:\s*\w+/,
    /import\s+type\s+/,
    /export\s+type\s+/,
    /<[A-Z]\w*>/,
    /as\s+\w+/,
    /enum\s+\w+/,
    /namespace\s+\w+/
  ],
  python: [
    /def\s+\w+\s*\(/,
    /class\s+\w+/,
    /import\s+\w+/,
    /from\s+\w+\s+import/,
    /if\s+__name__\s*==\s*['"']__main__['"']/,
    /print\s*\(/,
    /:\s*$/m,
    /elif\s+/,
    /^\s*#/m,
    /lambda\s+/,
    /with\s+\w+/,
    /try:\s*$/m,
    /except\s+/
  ],
  java: [
    /public\s+class\s+\w+/,
    /public\s+static\s+void\s+main/,
    /System\.out\.println/,
    /import\s+java\./,
    /package\s+[\w.]+;/,
    /public\s+\w+\s+\w+\s*\(/,
    /private\s+\w+\s+\w+/,
    /extends\s+\w+/,
    /implements\s+\w+/,
    /@Override/,
    /new\s+\w+\(/,
    /throws\s+\w+/
  ],
  csharp: [
    /using\s+System/,
    /namespace\s+\w+/,
    /public\s+class\s+\w+/,
    /Console\.WriteLine/,
    /public\s+static\s+void\s+Main/,
    /\[.*\]/,
    /get;\s*set;/,
    /var\s+\w+\s*=/,
    /string\s+\w+/,
    /int\s+\w+/,
    /bool\s+\w+/,
    /foreach\s*\(/
  ],
  cpp: [
    /#include\s*<.*>/,
    /using\s+namespace\s+std/,
    /int\s+main\s*\(/,
    /cout\s*<</, 
    /cin\s*>>/,
    /std::/,
    /class\s+\w+/,
    /template\s*</,
    /nullptr/,
    /vector<\w+>/,
    /string\s+\w+/,
    /auto\s+\w+/
  ],
  c: [
    /#include\s*<.*\.h>/,
    /int\s+main\s*\(/,
    /printf\s*\(/,
    /scanf\s*\(/,
    /malloc\s*\(/,
    /free\s*\(/,
    /struct\s+\w+/,
    /typedef\s+/,
    /void\s+\w+\s*\(/,
    /char\s+\w+/,
    /FILE\s*\*/
  ],
  rust: [
    /fn\s+\w+\s*\(/,
    /let\s+mut\s+\w+/,
    /let\s+\w+\s*=/,
    /use\s+std::/,
    /impl\s+\w+/,
    /struct\s+\w+/,
    /enum\s+\w+/,
    /match\s+\w+/,
    /println!\s*\(/,
    /Vec<\w+>/,
    /Option<\w+>/,
    /Result<\w+,\s*\w+>/
  ],
  go: [
    /package\s+\w+/,
    /import\s+\(/,
    /func\s+\w+\s*\(/,
    /func\s+main\s*\(/,
    /fmt\.Print/,
    /var\s+\w+\s+\w+/,
    /:=\s*/,
    /go\s+\w+\(/,
    /chan\s+\w+/,
    /defer\s+/,
    /interface\s*{/,
    /make\s*\(/
  ],
  php: [
    /<\?php/,
    /\$\w+\s*=/,
    /function\s+\w+\s*\(/,
    /echo\s+/,
    /print\s+/,
    /class\s+\w+/,
    /namespace\s+\w+/,
    /use\s+\w+/,
    /->\w+/,
    /array\s*\(/,
    /foreach\s*\(/,
    /isset\s*\(/
  ],
  ruby: [
    /def\s+\w+/,
    /class\s+\w+/,
    /module\s+\w+/,
    /puts\s+/,
    /print\s+/,
    /require\s+/,
    /end\s*$/m,
    /@\w+/,
    /\|\w+\|/,
    /unless\s+/,
    /elsif\s+/,
    /attr_accessor/
  ],
  swift: [
    /import\s+\w+/,
    /func\s+\w+\s*\(/,
    /var\s+\w+\s*:/,
    /let\s+\w+\s*=/,
    /class\s+\w+/,
    /struct\s+\w+/,
    /enum\s+\w+/,
    /print\s*\(/,
    /override\s+func/,
    /extension\s+\w+/,
    /protocol\s+\w+/,
    /guard\s+/
  ],
  kotlin: [
    /fun\s+\w+\s*\(/,
    /val\s+\w+\s*=/,
    /var\s+\w+\s*:/,
    /class\s+\w+/,
    /object\s+\w+/,
    /data\s+class/,
    /println\s*\(/,
    /import\s+\w+/,
    /package\s+[\w.]+/,
    /when\s*\(/,
    /companion\s+object/,
    /sealed\s+class/
  ],
  json: [
    /^\s*{/,
    /^\s*\[/,
    /"\w+"\s*:/,
    /:\s*"/,
    /:\s*\d+/,
    /:\s*true|false/,
    /:\s*null/,
    /,\s*$/m,
    /^\s*}\s*$/m,
    /^\s*]\s*$/m
  ],
  yaml: [
    /^\w+:/m,
    /^\s+-\s+/m,
    /:\s*$/m,
    /---/,
    /\.\.\./,
    /^\s*#/m,
    /\|\s*$/m,
    />\s*$/m,
    /^\s*\w+:\s*\w+/m,
    /^\s*-\s*\w+:/m
  ],
  xml: [
    /<\?xml/,
    /<\/\w+>/,
    /<\w+[^>]*>/,
    /<\w+\s+\w+=/,
    /xmlns:/,
    /<!--.*-->/,
    /<!\[CDATA\[/,
    /<!DOCTYPE/,
    /<\w+\/>/,
    /&\w+;/
  ],
  css: [
    /\w+\s*{/,
    /[\w-]+:\s*[\w#.-]+;/,
    /@media\s+/,
    /@import\s+/,
    /@keyframes\s+/,
    /:\s*hover/,
    /:\s*active/,
    /:\s*focus/,
    /!important/,
    /rgba?\s*\(/,
    /hsla?\s*\(/,
    /#[0-9a-fA-F]{3,6}/
  ],
  scss: [
    /\$\w+\s*:/,
    /@mixin\s+\w+/,
    /@include\s+\w+/,
    /@extend\s+/,
    /@import\s+/,
    /&:\w+/,
    /#{.*}/,
    /@function\s+\w+/,
    /@if\s+/,
    /@for\s+/,
    /@each\s+/,
    /@while\s+/
  ],
  html: [
    /<!DOCTYPE\s+html>/i,
    /<html[^>]*>/,
    /<head>/,
    /<body>/,
    /<div[^>]*>/,
    /<p[^>]*>/,
    /<a\s+href=/,
    /<img\s+src=/,
    /<script[^>]*>/,
    /<style[^>]*>/,
    /<meta[^>]*>/,
    /<link[^>]*>/
  ],
  jsx: [
    /import\s+React/,
    /from\s+['"]react['"]/,
    /export\s+default\s+function/,
    /return\s*\(/,
    /<\w+[^>]*>/,
    /className=/,
    /{.*}/,
    /onClick=/,
    /useState\(/,
    /useEffect\(/,
    /props\.\w+/,
    /\w+\.map\s*\(/
  ],
  sql: [
    /SELECT\s+/i,
    /FROM\s+\w+/i,
    /WHERE\s+/i,
    /INSERT\s+INTO/i,
    /UPDATE\s+\w+/i,
    /DELETE\s+FROM/i,
    /CREATE\s+TABLE/i,
    /ALTER\s+TABLE/i,
    /DROP\s+TABLE/i,
    /JOIN\s+\w+/i,
    /GROUP\s+BY/i,
    /ORDER\s+BY/i
  ],
  bash: [
    /^#!/,
    /echo\s+/,
    /if\s*\[\s*/,
    /for\s+\w+\s+in/,
    /while\s*\[\s*/,
    /function\s+\w+/,
    /\$\w+/,
    /\$\{.*\}/,
    /chmod\s+/,
    /grep\s+/,
    /sed\s+/,
    /awk\s+/
  ],
  dockerfile: [
    /^FROM\s+/m,
    /^RUN\s+/m,
    /^COPY\s+/m,
    /^ADD\s+/m,
    /^WORKDIR\s+/m,
    /^EXPOSE\s+/m,
    /^CMD\s+/m,
    /^ENTRYPOINT\s+/m,
    /^ENV\s+/m,
    /^LABEL\s+/m,
    /^USER\s+/m,
    /^VOLUME\s+/m
  ]
};

export function detectLanguage(code: string): string | null {
  if (!code.trim()) return null;

  const scores: { [key: string]: number } = {};

  // Calculate scores for each language
  for (const [language, patterns] of Object.entries(languagePatterns)) {
    let score = 0;
    for (const pattern of patterns) {
      const matches = code.match(pattern);
      if (matches) {
        score += matches.length;
      }
    }
    if (score > 0) {
      scores[language] = score;
    }
  }

  // Return the language with the highest score
  const sortedLanguages = Object.entries(scores).sort(([,a], [,b]) => b - a);
  return sortedLanguages.length > 0 ? sortedLanguages[0][0] : null;
}

export function generateSuggestions(detectedLanguage: string | null, code: string): ConversionSuggestion[] {
  if (!detectedLanguage || !code.trim()) return [];

  const suggestions: ConversionSuggestion[] = [];

  // Programming language conversions
  const programmingLanguages = ['javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'rust', 'go', 'php', 'ruby', 'swift', 'kotlin'];
  
  if (programmingLanguages.includes(detectedLanguage)) {
    // Add suggestions for other programming languages
    const targetLanguages = programmingLanguages.filter(lang => lang !== detectedLanguage);
    
    // Prioritize common conversions
    const priorityTargets = {
      javascript: ['typescript', 'python', 'java'],
      typescript: ['javascript', 'python', 'java'],
      python: ['javascript', 'java', 'go'],
      java: ['kotlin', 'scala', 'csharp'],
      csharp: ['java', 'typescript', 'go'],
      cpp: ['rust', 'go', 'c'],
      rust: ['go', 'cpp', 'c'],
      go: ['rust', 'java', 'python'],
      php: ['javascript', 'python', 'ruby'],
      ruby: ['python', 'javascript', 'go'],
      swift: ['kotlin', 'java', 'csharp'],
      kotlin: ['java', 'swift', 'scala']
    };

    const targets = priorityTargets[detectedLanguage as keyof typeof priorityTargets] || targetLanguages.slice(0, 3);
    
    targets.forEach(targetLang => {
      suggestions.push({
        id: `${detectedLanguage}-${targetLang}`,
        name: `Convert to ${getLanguageDisplayName(targetLang)}`,
        description: `Transform ${getLanguageDisplayName(detectedLanguage)} code to ${getLanguageDisplayName(targetLang)}`,
        icon: getLanguageIcon(targetLang),
        fromLanguage: detectedLanguage,
        toLanguage: targetLang
      });
    });
  }

  // Data format conversions
  const dataFormats = ['json', 'yaml', 'xml'];
  if (dataFormats.includes(detectedLanguage)) {
    const targetFormats = dataFormats.filter(format => format !== detectedLanguage);
    
    targetFormats.forEach(targetFormat => {
      suggestions.push({
        id: `${detectedLanguage}-${targetFormat}`,
        name: `Convert to ${targetFormat.toUpperCase()}`,
        description: `Transform ${detectedLanguage.toUpperCase()} to ${targetFormat.toUpperCase()} format`,
        icon: getLanguageIcon(targetFormat),
        fromLanguage: detectedLanguage,
        toLanguage: targetFormat
      });
    });
  }

  // Style conversions
  const styleLanguages = ['css', 'scss'];
  if (styleLanguages.includes(detectedLanguage)) {
    const targetStyles = styleLanguages.filter(style => style !== detectedLanguage);
    
    targetStyles.forEach(targetStyle => {
      suggestions.push({
        id: `${detectedLanguage}-${targetStyle}`,
        name: `Convert to ${targetStyle.toUpperCase()}`,
        description: `Transform ${detectedLanguage.toUpperCase()} to ${targetStyle.toUpperCase()}`,
        icon: getLanguageIcon(targetStyle),
        fromLanguage: detectedLanguage,
        toLanguage: targetStyle
      });
    });
  }

  // Web framework conversions
  if (detectedLanguage === 'html') {
    suggestions.push({
      id: 'html-jsx',
      name: 'Convert to JSX',
      description: 'Transform HTML to React JSX',
      icon: getLanguageIcon('jsx'),
      fromLanguage: detectedLanguage,
      toLanguage: 'jsx'
    });
  }

  if (detectedLanguage === 'jsx') {
    suggestions.push({
      id: 'jsx-html',
      name: 'Convert to HTML',
      description: 'Transform JSX to standard HTML',
      icon: getLanguageIcon('html'),
      fromLanguage: detectedLanguage,
      toLanguage: 'html'
    });
  }

  // SQL conversions
  if (detectedLanguage === 'sql') {
    suggestions.push({
      id: 'sql-json',
      name: 'Convert to JSON Schema',
      description: 'Transform SQL CREATE statements to JSON schema',
      icon: getLanguageIcon('json'),
      fromLanguage: detectedLanguage,
      toLanguage: 'json'
    });
  }

  // Dockerfile conversions
  if (detectedLanguage === 'dockerfile') {
    suggestions.push({
      id: 'dockerfile-bash',
      name: 'Convert to Bash Script',
      description: 'Transform Dockerfile commands to bash script',
      icon: getLanguageIcon('bash'),
      fromLanguage: detectedLanguage,
      toLanguage: 'bash'
    });
  }

  return suggestions.slice(0, 6); // Limit to 6 suggestions
}

export function performConversion(code: string, suggestion: ConversionSuggestion): string {
  const { fromLanguage, toLanguage } = suggestion;

  try {
    // Programming language conversions
    if (fromLanguage === 'javascript' && toLanguage === 'typescript') {
      return convertJavaScriptToTypeScript(code);
    }
    
    if (fromLanguage === 'typescript' && toLanguage === 'javascript') {
      return convertTypeScriptToJavaScript(code);
    }
    
    if (fromLanguage === 'python' && toLanguage === 'javascript') {
      return convertPythonToJavaScript(code);
    }

    if (fromLanguage === 'javascript' && toLanguage === 'python') {
      return convertJavaScriptToPython(code);
    }

    if (fromLanguage === 'java' && toLanguage === 'kotlin') {
      return convertJavaToKotlin(code);
    }

    if (fromLanguage === 'java' && toLanguage === 'csharp') {
      return convertJavaToCSharp(code);
    }

    // Data format conversions
    if (fromLanguage === 'json' && toLanguage === 'yaml') {
      return convertJsonToYaml(code);
    }
    
    if (fromLanguage === 'yaml' && toLanguage === 'json') {
      return convertYamlToJson(code);
    }
    
    if (fromLanguage === 'json' && toLanguage === 'xml') {
      return convertJsonToXml(code);
    }
    
    if (fromLanguage === 'xml' && toLanguage === 'json') {
      return convertXmlToJson(code);
    }

    if (fromLanguage === 'xml' && toLanguage === 'yaml') {
      return convertXmlToYaml(code);
    }

    if (fromLanguage === 'yaml' && toLanguage === 'xml') {
      return convertYamlToXml(code);
    }

    // Style conversions
    if (fromLanguage === 'css' && toLanguage === 'scss') {
      return convertCssToScss(code);
    }
    
    if (fromLanguage === 'scss' && toLanguage === 'css') {
      return convertScssToCSS(code);
    }

    // Web framework conversions
    if (fromLanguage === 'html' && toLanguage === 'jsx') {
      return convertHtmlToJsx(code);
    }
    
    if (fromLanguage === 'jsx' && toLanguage === 'html') {
      return convertJsxToHtml(code);
    }

    // SQL conversions
    if (fromLanguage === 'sql' && toLanguage === 'json') {
      return convertSqlToJson(code);
    }

    // Dockerfile conversions
    if (fromLanguage === 'dockerfile' && toLanguage === 'bash') {
      return convertDockerfileToBash(code);
    }

    // Generic conversion for unsupported pairs
    return generateGenericConversion(code, fromLanguage, toLanguage);
  } catch (error) {
    throw new Error(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Helper functions
function getLanguageDisplayName(language: string): string {
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
  
  return displayNames[language] || language.toUpperCase();
}

function getLanguageIcon(language: string): string {
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
  
  return icons[language] || '📄';
}

// Enhanced conversion functions
function convertJavaScriptToTypeScript(code: string): string {
  let converted = code;
  
  // Add type annotations to function parameters
  converted = converted.replace(
    /function\s+(\w+)\s*\(([^)]*)\)/g,
    (match, funcName, params) => {
      if (!params.trim()) return `function ${funcName}(): any`;
      const typedParams = params
        .split(',')
        .map((param: string) => param.trim())
        .filter((param: string) => param.length > 0)
        .map((param: string) => {
          if (param.includes(':')) return param; // Already typed
          return `${param}: any`;
        })
        .join(', ');
      return `function ${funcName}(${typedParams}): any`;
    }
  );
  
  // Add type annotations to arrow functions
  converted = converted.replace(
    /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/g,
    (match, funcName, params) => {
      if (!params.trim()) return `const ${funcName} = (): any =>`;
      const typedParams = params
        .split(',')
        .map((param: string) => param.trim())
        .filter((param: string) => param.length > 0)
        .map((param: string) => {
          if (param.includes(':')) return param; // Already typed
          return `${param}: any`;
        })
        .join(', ');
      return `const ${funcName} = (${typedParams}): any =>`;
    }
  );
  
  // Add type annotations to variables
  converted = converted.replace(
    /let\s+(\w+)\s*=\s*([^;]+);/g,
    (match, varName, value) => {
      if (match.includes(':')) return match; // Already typed
      return `let ${varName}: any = ${value};`;
    }
  );
  
  converted = converted.replace(
    /const\s+(\w+)\s*=\s*([^;]+);/g,
    (match, varName, value) => {
      if (match.includes(':')) return match; // Already typed
      return `const ${varName}: any = ${value};`;
    }
  );
  
  return converted;
}

function convertTypeScriptToJavaScript(code: string): string {
  let converted = code;
  
  // Remove type annotations from function parameters and return types
  converted = converted.replace(/:\s*[^,)=\s{]+/g, '');
  
  // Remove interface declarations
  converted = converted.replace(/interface\s+\w+\s*{[^}]*}/g, '');
  
  // Remove type declarations
  converted = converted.replace(/type\s+\w+\s*=\s*[^;]+;/g, '');
  
  // Remove type imports
  converted = converted.replace(/import\s+type\s+{[^}]*}\s+from\s+[^;]+;/g, '');
  
  // Remove as type assertions
  converted = converted.replace(/\s+as\s+\w+/g, '');
  
  // Remove generic type parameters
  converted = converted.replace(/<[^>]+>/g, '');
  
  // Remove enum declarations
  converted = converted.replace(/enum\s+\w+\s*{[^}]*}/g, '');
  
  return converted;
}

function convertPythonToJavaScript(code: string): string {
  let converted = code;
  
  // Convert def to function
  converted = converted.replace(/def\s+(\w+)\s*\(([^)]*)\):/g, 'function $1($2) {');
  
  // Convert Python print to console.log
  converted = converted.replace(/print\s*\(([^)]*)\)/g, 'console.log($1)');
  
  // Convert Python if statements
  converted = converted.replace(/if\s+([^:]+):/g, 'if ($1) {');
  
  // Convert elif to else if
  converted = converted.replace(/elif\s+([^:]+):/g, 'else if ($1) {');
  
  // Convert else
  converted = converted.replace(/else:/g, 'else {');
  
  // Convert for loops
  converted = converted.replace(/for\s+(\w+)\s+in\s+([^:]+):/g, 'for (let $1 of $2) {');
  
  // Convert while loops
  converted = converted.replace(/while\s+([^:]+):/g, 'while ($1) {');
  
  // Convert try/except
  converted = converted.replace(/try:/g, 'try {');
  converted = converted.replace(/except\s*([^:]*)?:/g, 'catch ($1) {');
  
  // Convert class definitions
  converted = converted.replace(/class\s+(\w+)(\([^)]*\))?:/g, 'class $1$2 {');
  
  // Add closing braces for indented blocks
  const lines = converted.split('\n');
  const result = [];
  let braceStack = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed.endsWith('{')) {
      braceStack++;
    }
    
    result.push(line);
    
    // Check if next line has less indentation
    if (i < lines.length - 1) {
      const currentIndent = line.length - line.trimStart().length;
      const nextIndent = lines[i + 1].length - lines[i + 1].trimStart().length;
      
      if (nextIndent < currentIndent && braceStack > 0) {
        const bracesToClose = Math.floor((currentIndent - nextIndent) / 4);
        for (let j = 0; j < bracesToClose; j++) {
          result.push('  '.repeat(nextIndent / 4) + '}');
          braceStack--;
        }
      }
    }
  }
  
  // Close remaining braces
  while (braceStack > 0) {
    result.push('}');
    braceStack--;
  }
  
  return result.join('\n');
}

function convertJavaScriptToPython(code: string): string {
  let converted = code;
  
  // Convert function declarations
  converted = converted.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'def $1($2):');
  
  // Convert arrow functions
  converted = converted.replace(/const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{/g, 'def $1($2):');
  
  // Convert console.log to print
  converted = converted.replace(/console\.log\s*\(([^)]*)\)/g, 'print($1)');
  
  // Convert if statements
  converted = converted.replace(/if\s*\(([^)]+)\)\s*{/g, 'if $1:');
  
  // Convert else if to elif
  converted = converted.replace(/else\s+if\s*\(([^)]+)\)\s*{/g, 'elif $1:');
  
  // Convert else
  converted = converted.replace(/else\s*{/g, 'else:');
  
  // Convert for loops
  converted = converted.replace(/for\s*\(let\s+(\w+)\s+of\s+([^)]+)\)\s*{/g, 'for $1 in $2:');
  
  // Convert while loops
  converted = converted.replace(/while\s*\(([^)]+)\)\s*{/g, 'while $1:');
  
  // Convert try/catch
  converted = converted.replace(/try\s*{/g, 'try:');
  converted = converted.replace(/catch\s*\(([^)]*)\)\s*{/g, 'except $1:');
  
  // Remove braces and add proper indentation
  const lines = converted.split('\n');
  const result = [];
  let indentLevel = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '}') {
      indentLevel = Math.max(0, indentLevel - 1);
      continue;
    }
    
    if (trimmed) {
      result.push('    '.repeat(indentLevel) + trimmed);
      
      if (trimmed.endsWith(':')) {
        indentLevel++;
      }
    } else {
      result.push('');
    }
  }
  
  return result.join('\n');
}

function convertJavaToKotlin(code: string): string {
  let converted = code;
  
  // Convert class declarations
  converted = converted.replace(/public\s+class\s+(\w+)/g, 'class $1');
  
  // Convert method declarations
  converted = converted.replace(/public\s+(\w+)\s+(\w+)\s*\(([^)]*)\)/g, 'fun $2($3): $1');
  converted = converted.replace(/private\s+(\w+)\s+(\w+)\s*\(([^)]*)\)/g, 'private fun $2($3): $1');
  
  // Convert void methods
  converted = converted.replace(/fun\s+(\w+)\s*\([^)]*\):\s*void/g, 'fun $1($2)');
  
  // Convert variable declarations
  converted = converted.replace(/(\w+)\s+(\w+)\s*=\s*([^;]+);/g, 'val $2: $1 = $3');
  
  // Convert System.out.println to println
  converted = converted.replace(/System\.out\.println\s*\(([^)]*)\)/g, 'println($1)');
  
  // Convert new keyword
  converted = converted.replace(/new\s+(\w+)\s*\(/g, '$1(');
  
  return converted;
}

function convertJavaToCSharp(code: string): string {
  let converted = code;
  
  // Convert package to namespace
  converted = converted.replace(/package\s+([\w.]+);/g, 'namespace $1 {');
  
  // Convert import to using
  converted = converted.replace(/import\s+([\w.]+);/g, 'using $1;');
  
  // Convert System.out.println to Console.WriteLine
  converted = converted.replace(/System\.out\.println\s*\(([^)]*)\)/g, 'Console.WriteLine($1)');
  
  // Convert String to string
  converted = converted.replace(/\bString\b/g, 'string');
  
  // Convert boolean to bool
  converted = converted.replace(/\bboolean\b/g, 'bool');
  
  // Add closing brace for namespace if package was converted
  if (code.includes('package ')) {
    converted += '\n}';
  }
  
  return converted;
}

function convertJsonToYaml(code: string): string {
  try {
    const jsonObj = JSON.parse(code);
    return jsonToYaml(jsonObj, 0);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

function convertYamlToJson(code: string): string {
  try {
    const jsonObj = yamlToJson(code);
    return JSON.stringify(jsonObj, null, 2);
  } catch (error) {
    throw new Error('Invalid YAML format');
  }
}

function convertJsonToXml(code: string): string {
  try {
    const jsonObj = JSON.parse(code);
    return jsonToXml(jsonObj, 'root');
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

function convertXmlToJson(code: string): string {
  try {
    const result = xmlToJson(code);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error('Invalid XML format');
  }
}

function convertXmlToYaml(code: string): string {
  try {
    const jsonObj = xmlToJson(code);
    return jsonToYaml(jsonObj, 0);
  } catch (error) {
    throw new Error('Invalid XML format');
  }
}

function convertYamlToXml(code: string): string {
  try {
    const jsonObj = yamlToJson(code);
    return jsonToXml(jsonObj, 'root');
  } catch (error) {
    throw new Error('Invalid YAML format');
  }
}

function convertCssToScss(code: string): string {
  let converted = code;
  
  // Convert hex colors to variables
  const colors = new Set<string>();
  converted = converted.replace(/#[0-9a-fA-F]{3,6}/g, (match) => {
    colors.add(match);
    return `$color-${match.substring(1)}`;
  });
  
  // Add color variables at the top
  if (colors.size > 0) {
    const colorVars = Array.from(colors)
      .map(color => `$color-${color.substring(1)}: ${color};`)
      .join('\n');
    converted = colorVars + '\n\n' + converted;
  }
  
  // Convert nested selectors (basic implementation)
  converted = converted.replace(
    /([^{]+)\s*{\s*([^}]+)\s*}/g,
    (match, selector, rules) => {
      const nestedRules = rules
        .split(';')
        .filter(rule => rule.trim())
        .map(rule => `  ${rule.trim()};`)
        .join('\n');
      return `${selector.trim()} {\n${nestedRules}\n}`;
    }
  );
  
  return converted;
}

function convertScssToCSS(code: string): string {
  let converted = code;
  
  // Remove SCSS variables and replace with their values
  const variables: { [key: string]: string } = {};
  
  // Extract variables
  converted = converted.replace(/\$([^:]+):\s*([^;]+);/g, (match, name, value) => {
    variables[name.trim()] = value.trim();
    return '';
  });
  
  // Replace variable usage
  for (const [name, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\$${name}\\b`, 'g');
    converted = converted.replace(regex, value);
  }
  
  // Remove @mixin and @include
  converted = converted.replace(/@mixin\s+[\w-]+[^}]*}/g, '');
  converted = converted.replace(/@include\s+[\w-]+[^;]*;/g, '');
  
  // Remove @extend
  converted = converted.replace(/@extend\s+[^;]+;/g, '');
  
  // Remove nesting (basic implementation)
  converted = converted.replace(/&:/g, ':');
  
  return converted.trim();
}

function convertHtmlToJsx(code: string): string {
  let converted = code;
  
  // Convert class to className
  converted = converted.replace(/\bclass=/g, 'className=');
  
  // Convert for to htmlFor
  converted = converted.replace(/\bfor=/g, 'htmlFor=');
  
  // Convert self-closing tags
  converted = converted.replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)>/g, '<$1$2 />');
  
  // Convert style attribute to object
  converted = converted.replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = styles
      .split(';')
      .filter(style => style.trim())
      .map(style => {
        const [prop, value] = style.split(':').map(s => s.trim());
        const camelProp = prop.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        return `${camelProp}: '${value}'`;
      })
      .join(', ');
    return `style={{${styleObj}}}`;
  });
  
  // Convert boolean attributes
  converted = converted.replace(/\b(checked|disabled|hidden|readonly|required|selected)\b/g, '$1={true}');
  
  return converted;
}

function convertJsxToHtml(code: string): string {
  let converted = code;
  
  // Convert className to class
  converted = converted.replace(/\bclassName=/g, 'class=');
  
  // Convert htmlFor to for
  converted = converted.replace(/\bhtmlFor=/g, 'for=');
  
  // Remove JSX expressions (basic)
  converted = converted.replace(/{[^}]*}/g, '');
  
  // Convert self-closing tags back
  converted = converted.replace(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)([^>]*)\s*\/>/g, '<$1$2>');
  
  return converted;
}

function convertSqlToJson(code: string): string {
  const tables: any = {};
  
  // Extract CREATE TABLE statements
  const createTableRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([^)]+)\)/gi;
  let match;
  
  while ((match = createTableRegex.exec(code)) !== null) {
    const tableName = match[1];
    const columnsStr = match[2];
    
    const columns = columnsStr
      .split(',')
      .map(col => col.trim())
      .map(col => {
        const parts = col.split(/\s+/);
        const name = parts[0];
        const type = parts[1] || 'VARCHAR';
        const constraints = parts.slice(2).join(' ');
        
        return {
          name,
          type: type.toUpperCase(),
          constraints: constraints || null
        };
      });
    
    tables[tableName] = {
      columns,
      type: 'table'
    };
  }
  
  return JSON.stringify({ database: { tables } }, null, 2);
}

function convertDockerfileToBash(code: string): string {
  let converted = '#!/bin/bash\n\n';
  
  const lines = code.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('FROM ')) {
      converted += `# Base image: ${trimmed.substring(5)}\n`;
    } else if (trimmed.startsWith('RUN ')) {
      converted += `${trimmed.substring(4)}\n`;
    } else if (trimmed.startsWith('COPY ')) {
      const parts = trimmed.substring(5).split(' ');
      converted += `cp ${parts.join(' ')}\n`;
    } else if (trimmed.startsWith('ADD ')) {
      const parts = trimmed.substring(4).split(' ');
      converted += `cp ${parts.join(' ')}\n`;
    } else if (trimmed.startsWith('WORKDIR ')) {
      converted += `cd ${trimmed.substring(8)}\n`;
    } else if (trimmed.startsWith('ENV ')) {
      const envVar = trimmed.substring(4);
      converted += `export ${envVar}\n`;
    } else if (trimmed.startsWith('EXPOSE ')) {
      converted += `# Expose port: ${trimmed.substring(7)}\n`;
    } else if (trimmed.startsWith('CMD ')) {
      converted += `# Default command: ${trimmed.substring(4)}\n`;
    } else if (trimmed.startsWith('ENTRYPOINT ')) {
      converted += `# Entry point: ${trimmed.substring(11)}\n`;
    }
  }
  
  return converted;
}

function generateGenericConversion(code: string, fromLanguage: string, toLanguage: string): string {
  return `// Converted from ${getLanguageDisplayName(fromLanguage)} to ${getLanguageDisplayName(toLanguage)}
// Note: This is a basic conversion. Manual adjustments may be required.

${code}

// TODO: Review and adjust the converted code as needed
// - Check syntax compatibility
// - Update language-specific constructs
// - Verify functionality`;
}

// Helper functions for data format conversions
function jsonToYaml(obj: any, indent: number): string {
  const spaces = '  '.repeat(indent);
  
  if (typeof obj === 'string') {
    return obj.includes('\n') ? `|\n${spaces}  ${obj.replace(/\n/g, `\n${spaces}  `)}` : obj;
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }
  
  if (obj === null) {
    return 'null';
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 1)}`).join('\n');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    
    return entries
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`;
        }
        return `${spaces}${key}: ${jsonToYaml(value, indent + 1)}`;
      })
      .join('\n');
  }
  
  return String(obj);
}

function yamlToJson(yaml: string): any {
  const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  const result: any = {};
  const stack: any[] = [result];
  let currentIndent = 0;
  
  for (const line of lines) {
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    
    // Handle array items
    if (trimmed.startsWith('- ')) {
      const value = trimmed.substring(2);
      const parent = stack[stack.length - 1];
      
      if (!Array.isArray(parent)) {
        // Convert to array if not already
        const keys = Object.keys(parent);
        if (keys.length > 0) {
          const lastKey = keys[keys.length - 1];
          parent[lastKey] = [parent[lastKey]];
          parent[lastKey].push(parseValue(value));
        }
      } else {
        parent.push(parseValue(value));
      }
      continue;
    }
    
    // Handle key-value pairs
    if (trimmed.includes(':')) {
      const colonIndex = trimmed.indexOf(':');
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      
      // Adjust stack based on indentation
      while (stack.length > 1 && indent <= currentIndent) {
        stack.pop();
        currentIndent -= 2;
      }
      
      const parent = stack[stack.length - 1];
      
      if (value) {
        parent[key] = parseValue(value);
      } else {
        parent[key] = {};
        stack.push(parent[key]);
        currentIndent = indent;
      }
    }
  }
  
  return result;
}

function parseValue(value: string): any {
  if (value === 'null') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value)) && value.trim() !== '') return Number(value);
  return value;
}

function jsonToXml(obj: any, rootName: string): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>`;
  
  function objectToXml(obj: any, indent: string = ''): string {
    let result = '';
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            result += `\n${indent}  <${key}>${objectToXml(item, indent + '  ')}\n${indent}  </${key}>`;
          } else {
            result += `\n${indent}  <${key}>${escapeXml(String(item))}</${key}>`;
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `\n${indent}  <${key}>${objectToXml(value, indent + '  ')}\n${indent}  </${key}>`;
      } else {
        result += `\n${indent}  <${key}>${escapeXml(String(value))}</${key}>`;
      }
    }
    
    return result;
  }
  
  xml += objectToXml(obj);
  xml += `\n</${rootName}>`;
  
  return xml;
}

function xmlToJson(xml: string): any {
  // Remove XML declaration and comments
  let cleaned = xml.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  
  // Simple XML parser
  const result: any = {};
  
  function parseElement(xmlStr: string): any {
    const tagRegex = /<(\w+)([^>]*)>([\s\S]*?)<\/\1>/g;
    const selfClosingRegex = /<(\w+)([^>]*?)\/>/g;
    const obj: any = {};
    
    let match;
    
    // Handle self-closing tags
    while ((match = selfClosingRegex.exec(xmlStr)) !== null) {
      const tagName = match[1];
      const attributes = match[2];
      obj[tagName] = parseAttributes(attributes);
    }
    
    // Handle regular tags
    while ((match = tagRegex.exec(xmlStr)) !== null) {
      const tagName = match[1];
      const attributes = match[2];
      const content = match[3].trim();
      
      let value;
      if (content.includes('<')) {
        // Nested elements
        value = parseElement(content);
      } else {
        // Text content
        value = content || null;
      }
      
      // Handle attributes
      const attrs = parseAttributes(attributes);
      if (Object.keys(attrs).length > 0) {
        value = { _text: value, ...attrs };
      }
      
      if (obj[tagName]) {
        // Multiple elements with same name - convert to array
        if (!Array.isArray(obj[tagName])) {
          obj[tagName] = [obj[tagName]];
        }
        obj[tagName].push(value);
      } else {
        obj[tagName] = value;
      }
    }
    
    return obj;
  }
  
  function parseAttributes(attrStr: string): any {
    const attrs: any = {};
    const attrRegex = /(\w+)="([^"]*)"/g;
    let match;
    
    while ((match = attrRegex.exec(attrStr)) !== null) {
      attrs[match[1]] = match[2];
    }
    
    return attrs;
  }
  
  return parseElement(cleaned);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}