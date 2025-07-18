import { describe, it, expect } from 'vitest';
import { detectLanguage, generateSuggestions, performConversion } from '../../utils/universalConverter';

describe('universalConverter', () => {
  describe('detectLanguage', () => {
    it('should detect JavaScript correctly', () => {
      const jsCode = `
        function hello() {
          console.log("Hello, world!");
        }
      `;
      expect(detectLanguage(jsCode)).toBe('javascript');
    });

    it('should detect TypeScript correctly', () => {
      const tsCode = `
        interface User {
          name: string;
          age: number;
        }
        
        function greet(user: User): string {
          return \`Hello, \${user.name}!\`;
        }
      `;
      expect(detectLanguage(tsCode)).toBe('typescript');
    });

    it('should detect Python correctly', () => {
      const pythonCode = `
        def hello():
            print("Hello, world!")
            
        if __name__ == "__main__":
            hello()
      `;
      expect(detectLanguage(pythonCode)).toBe('python');
    });

    it('should detect JSON correctly', () => {
      const jsonCode = `
        {
          "name": "John",
          "age": 30,
          "city": "New York"
        }
      `;
      expect(detectLanguage(jsonCode)).toBe('json');
    });

    it('should detect YAML correctly', () => {
      const yamlCode = `
        name: John
        age: 30
        city: New York
        hobbies:
          - reading
          - swimming
      `;
      expect(detectLanguage(yamlCode)).toBe('yaml');
    });

    it('should return null for empty input', () => {
      expect(detectLanguage('')).toBeNull();
      expect(detectLanguage('   ')).toBeNull();
    });
  });

  describe('generateSuggestions', () => {
    it('should generate suggestions for JavaScript', () => {
      const suggestions = generateSuggestions('javascript', 'console.log("test")');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(s => s.toLanguage === 'typescript')).toBe(true);
    });

    it('should generate suggestions for JSON', () => {
      const suggestions = generateSuggestions('json', '{"test": true}');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions.some(s => s.toLanguage === 'yaml')).toBe(true);
    });

    it('should return empty array for null language', () => {
      const suggestions = generateSuggestions(null, 'some code');
      expect(suggestions).toEqual([]);
    });

    it('should return empty array for empty code', () => {
      const suggestions = generateSuggestions('javascript', '');
      expect(suggestions).toEqual([]);
    });
  });

  describe('performConversion', () => {
    it('should convert JavaScript to TypeScript', () => {
      const jsCode = 'function add(a, b) { return a + b; }';
      const suggestion = {
        id: 'js-ts',
        name: 'Convert to TypeScript',
        description: 'Transform JavaScript to TypeScript',
        icon: '🔷',
        fromLanguage: 'javascript',
        toLanguage: 'typescript'
      };
      
      const result = performConversion(jsCode, suggestion);
      expect(result).toContain('function add(a: any, b: any): any');
    });

    it('should convert JSON to YAML', () => {
      const jsonCode = '{"name": "John", "age": 30}';
      const suggestion = {
        id: 'json-yaml',
        name: 'Convert to YAML',
        description: 'Transform JSON to YAML',
        icon: '📄',
        fromLanguage: 'json',
        toLanguage: 'yaml'
      };
      
      const result = performConversion(jsonCode, suggestion);
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
    });

    it('should throw error for invalid JSON', () => {
      const invalidJson = '{"name": "John", "age":}';
      const suggestion = {
        id: 'json-yaml',
        name: 'Convert to YAML',
        description: 'Transform JSON to YAML',
        icon: '📄',
        fromLanguage: 'json',
        toLanguage: 'yaml'
      };
      
      expect(() => performConversion(invalidJson, suggestion)).toThrow();
    });
  });
});