import { ConversionError } from '../types';

export const convertJavaScriptToTypeScript = (code: string): string => {
  // Basic JS to TS conversion
  let converted = code;
  
  // Add type annotations to function parameters
  converted = converted.replace(
    /function\s+(\w+)\s*\(([^)]*)\)/g,
    (match, funcName, params) => {
      const typedParams = params
        .split(',')
        .map((param: string) => param.trim())
        .filter((param: string) => param.length > 0)
        .map((param: string) => `${param}: any`)
        .join(', ');
      return `function ${funcName}(${typedParams}): any`;
    }
  );
  
  // Add type annotations to arrow functions
  converted = converted.replace(
    /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/g,
    (match, funcName, params) => {
      const typedParams = params
        .split(',')
        .map((param: string) => param.trim())
        .filter((param: string) => param.length > 0)
        .map((param: string) => `${param}: any`)
        .join(', ');
      return `const ${funcName} = (${typedParams}): any =>`;
    }
  );
  
  // Add type annotations to variables
  converted = converted.replace(
    /let\s+(\w+)\s*=\s*([^;]+);/g,
    'let $1: any = $2;'
  );
  
  converted = converted.replace(
    /const\s+(\w+)\s*=\s*([^;]+);/g,
    'const $1: any = $2;'
  );
  
  return converted;
};

export const convertTypeScriptToJavaScript = (code: string): string => {
  // Basic TS to JS conversion
  let converted = code;
  
  // Remove type annotations from function parameters
  converted = converted.replace(/:\s*[^,)]+/g, '');
  
  // Remove interface declarations
  converted = converted.replace(/interface\s+\w+\s*{[^}]*}/g, '');
  
  // Remove type imports
  converted = converted.replace(/import\s+type\s+{[^}]*}\s+from\s+[^;]+;/g, '');
  
  // Remove as type assertions
  converted = converted.replace(/\s+as\s+\w+/g, '');
  
  // Remove generic type parameters
  converted = converted.replace(/<[^>]+>/g, '');
  
  return converted;
};

export const convertJsonToYaml = (code: string): string => {
  try {
    const jsonObj = JSON.parse(code);
    return jsonToYaml(jsonObj, 0);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const convertYamlToJson = (code: string): string => {
  try {
    const jsonObj = yamlToJson(code);
    return JSON.stringify(jsonObj, null, 2);
  } catch (error) {
    throw new Error('Invalid YAML format');
  }
};

export const convertCssToScss = (code: string): string => {
  // Basic CSS to SCSS conversion
  let converted = code;
  
  // Convert nested selectors
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
};

export const convertPythonToJavaScript = (code: string): string => {
  let converted = code;
  
  // Convert def to function
  converted = converted.replace(/def\s+(\w+)\s*\(([^)]*)\):/g, 'function $1($2) {');
  
  // Convert Python print to console.log
  converted = converted.replace(/print\s*\(([^)]*)\)/g, 'console.log($1)');
  
  // Convert Python if statements
  converted = converted.replace(/if\s+([^:]+):/g, 'if ($1) {');
  
  // Convert Python for loops
  converted = converted.replace(/for\s+(\w+)\s+in\s+([^:]+):/g, 'for (let $1 of $2) {');
  
  // Add closing braces (basic implementation)
  const lines = converted.split('\n');
  let indentLevel = 0;
  const result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const currentIndent = line.length - line.trimStart().length;
    
    if (currentIndent < indentLevel) {
      const diff = indentLevel - currentIndent;
      for (let j = 0; j < diff / 4; j++) {
        result.push('  '.repeat(indentLevel / 4 - j - 1) + '}');
      }
    }
    
    result.push(line);
    
    if (line.trim().endsWith('{')) {
      indentLevel = currentIndent + 4;
    }
  }
  
  return result.join('\n');
};

// Helper functions
function jsonToYaml(obj: any, indent: number): string {
  const spaces = '  '.repeat(indent);
  
  if (typeof obj === 'string') {
    return `${obj}`;
  }
  
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return `${obj}`;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 1)}`).join('\n');
  }
  
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${spaces}${key}:\n${jsonToYaml(value, indent + 1)}`;
        }
        return `${spaces}${key}: ${jsonToYaml(value, indent + 1)}`;
      })
      .join('\n');
  }
  
  return '';
}

function yamlToJson(yaml: string): any {
  // Basic YAML to JSON parser (simplified)
  const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  const result: any = {};
  const stack: any[] = [result];
  
  for (const line of lines) {
    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();
    
    if (trimmed.includes(':')) {
      const [key, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').trim();
      
      if (value) {
        // Try to parse as number or boolean
        if (!isNaN(Number(value))) {
          stack[stack.length - 1][key.trim()] = Number(value);
        } else if (value === 'true' || value === 'false') {
          stack[stack.length - 1][key.trim()] = value === 'true';
        } else {
          stack[stack.length - 1][key.trim()] = value;
        }
      } else {
        stack[stack.length - 1][key.trim()] = {};
      }
    }
  }
  
  return result;
}