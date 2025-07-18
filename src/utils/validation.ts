/**
 * Input validation utilities for secure code processing
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Maximum allowed input size (1MB)
 */
const MAX_INPUT_SIZE = 1024 * 1024;

/**
 * Dangerous patterns that should be blocked
 */
const DANGEROUS_PATTERNS = [
  // Script injection attempts
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  // Eval and similar dangerous functions
  /\beval\s*\(/gi,
  /\bFunction\s*\(/gi,
  // File system access attempts
  /require\s*\(\s*['"]fs['"]\s*\)/gi,
  /import\s+.*\bfs\b/gi,
  // Network access attempts
  /fetch\s*\(/gi,
  /XMLHttpRequest/gi,
  // Process execution
  /exec\s*\(/gi,
  /spawn\s*\(/gi,
];

/**
 * Validates and sanitizes user input
 */
export function validateInput(input: string): ValidationResult {
  // Check input size
  if (input.length > MAX_INPUT_SIZE) {
    return {
      isValid: false,
      error: `Input too large. Maximum size is ${MAX_INPUT_SIZE / 1024}KB`
    };
  }

  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      return {
        isValid: false,
        error: 'Input contains potentially dangerous code patterns'
      };
    }
  }

  // Basic sanitization
  const sanitized = input
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\r/g, '\n')
    .trim();

  return {
    isValid: true,
    sanitized
  };
}

/**
 * Validates conversion parameters
 */
export function validateConversionParams(
  sourceCode: string,
  fromLanguage: string,
  toLanguage: string
): ValidationResult {
  // Validate source code
  const inputValidation = validateInput(sourceCode);
  if (!inputValidation.isValid) {
    return inputValidation;
  }

  // Validate language parameters
  if (!fromLanguage || !toLanguage) {
    return {
      isValid: false,
      error: 'Source and target languages must be specified'
    };
  }

  // Check for valid language identifiers
  const validLanguagePattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  if (!validLanguagePattern.test(fromLanguage) || !validLanguagePattern.test(toLanguage)) {
    return {
      isValid: false,
      error: 'Invalid language identifier format'
    };
  }

  return {
    isValid: true,
    sanitized: inputValidation.sanitized
  };
}

/**
 * Sanitizes HTML content to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates file upload (for future file upload feature)
 */
export function validateFile(file: File): ValidationResult {
  const allowedTypes = [
    'text/plain',
    'text/javascript',
    'text/typescript',
    'text/python',
    'application/json',
    'text/yaml',
    'text/xml',
    'text/css',
    'text/html'
  ];

  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(js|ts|py|json|yaml|yml|xml|css|html|jsx|tsx)$/i)) {
    return {
      isValid: false,
      error: 'Unsupported file type'
    };
  }

  if (file.size > MAX_INPUT_SIZE) {
    return {
      isValid: false,
      error: `File too large. Maximum size is ${MAX_INPUT_SIZE / 1024}KB`
    };
  }

  return { isValid: true };
}

/**
 * Rate limiting for conversion requests
 */
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(): boolean {
    const now = Date.now();
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    // Check if we're under the limit
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    this.requests.push(now);
    return true;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxRequests - this.requests.length);
  }
}

export const conversionRateLimiter = new RateLimiter();

/**
 * Validates regex patterns to prevent ReDoS attacks
 */
export function validateRegexPattern(pattern: string): ValidationResult {
  try {
    // Check for potentially dangerous regex patterns
    const dangerousPatterns = [
      /\(\?\!/,  // Negative lookahead
      /\(\?\=/,  // Positive lookahead
      /\(\?\<\!/,  // Negative lookbehind
      /\(\?\<\=/,  // Positive lookbehind
      /\*\+/,    // Nested quantifiers
      /\+\*/,    // Nested quantifiers
      /\{\d+,\}/,  // Large quantifiers without upper bound
    ];

    for (const dangerous of dangerousPatterns) {
      if (dangerous.test(pattern)) {
        return {
          isValid: false,
          error: 'Regex pattern contains potentially dangerous constructs'
        };
      }
    }

    // Test if the regex compiles
    new RegExp(pattern);
    
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: `Invalid regex pattern: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}