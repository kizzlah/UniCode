import { describe, it, expect } from 'vitest';
import { validateInput, validateConversionParams, sanitizeHtml, validateRegexPattern } from '../../utils/validation';

describe('validation', () => {
  describe('validateInput', () => {
    it('should validate normal input', () => {
      const result = validateInput('console.log("Hello, world!");');
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('console.log("Hello, world!");');
    });

    it('should reject input that is too large', () => {
      const largeInput = 'a'.repeat(1024 * 1024 + 1);
      const result = validateInput(largeInput);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('too large');
    });

    it('should reject dangerous script tags', () => {
      const dangerousInput = '<script>alert("xss")</script>';
      const result = validateInput(dangerousInput);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('dangerous');
    });

    it('should reject eval usage', () => {
      const dangerousInput = 'eval("malicious code")';
      const result = validateInput(dangerousInput);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('dangerous');
    });

    it('should normalize line endings', () => {
      const input = 'line1\r\nline2\rline3\n';
      const result = validateInput(input);
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe('line1\nline2\nline3');
    });
  });

  describe('validateConversionParams', () => {
    it('should validate correct parameters', () => {
      const result = validateConversionParams('console.log("test")', 'javascript', 'typescript');
      expect(result.isValid).toBe(true);
    });

    it('should reject missing languages', () => {
      const result = validateConversionParams('code', '', 'typescript');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('must be specified');
    });

    it('should reject invalid language identifiers', () => {
      const result = validateConversionParams('code', 'java-script!', 'typescript');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid language identifier');
    });
  });

  describe('sanitizeHtml', () => {
    it('should escape HTML entities', () => {
      const html = '<div class="test">Hello & "world"</div>';
      const result = sanitizeHtml(html);
      expect(result).toBe('&lt;div class=&quot;test&quot;&gt;Hello &amp; &quot;world&quot;&lt;&#x2F;div&gt;');
    });

    it('should handle empty input', () => {
      expect(sanitizeHtml('')).toBe('');
    });
  });

  describe('validateRegexPattern', () => {
    it('should validate simple regex patterns', () => {
      const result = validateRegexPattern('\\d+');
      expect(result.isValid).toBe(true);
    });

    it('should reject dangerous regex patterns', () => {
      const result = validateRegexPattern('(?!dangerous)');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('dangerous');
    });

    it('should reject invalid regex syntax', () => {
      const result = validateRegexPattern('[invalid');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid regex pattern');
    });
  });
});