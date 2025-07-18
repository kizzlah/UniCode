# Contributing to UniCode

Thank you for your interest in contributing to UniCode! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/unicode-converter.git
   cd unicode-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 🛠️ Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add new language support for Rust`
- `fix: resolve regex parsing issue in Python converter`
- `docs: update README with new examples`
- `test: add unit tests for validation utils`
- `refactor: optimize language detection performance`

### Code Style

- **ESLint**: We use ESLint for code linting
- **Prettier**: Code formatting is handled by Prettier
- **TypeScript**: All code should be properly typed
- **Pre-commit hooks**: Automatically run linting and formatting

Run code quality checks:
```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix auto-fixable linting errors
npm run format        # Format code with Prettier
npm run type-check    # TypeScript type checking
```

## 🧪 Testing

### Running Tests

```bash
npm test                    # Run unit tests
npm run test:coverage       # Run tests with coverage report
npm run test:ui            # Run tests with UI
npm run test:integration   # Run E2E tests
```

### Writing Tests

- **Unit tests**: Place in `src/test/` directory
- **Component tests**: Use React Testing Library
- **E2E tests**: Use Playwright in `src/test/e2e/`
- **Test utilities**: Shared test utilities in `src/test/utils/`

Example unit test:
```typescript
import { describe, it, expect } from 'vitest';
import { detectLanguage } from '../utils/universalConverter';

describe('detectLanguage', () => {
  it('should detect JavaScript correctly', () => {
    const code = 'function hello() { console.log("Hi"); }';
    expect(detectLanguage(code)).toBe('javascript');
  });
});
```

## 🔧 Adding New Features

### Adding a New Language

1. **Update language patterns** in `src/utils/universalConverter.ts`:
   ```typescript
   const languagePatterns = {
     // ... existing patterns
     newlang: [
       /pattern1/,
       /pattern2/,
     ]
   };
   ```

2. **Add display name and icon**:
   ```typescript
   function getLanguageDisplayName(language: string): string {
     const displayNames = {
       // ... existing names
       newlang: 'New Language'
     };
   }
   ```

3. **Implement conversion logic** in appropriate converter file

4. **Add tests** for the new language detection and conversion

5. **Update documentation**

### Adding a New Conversion

1. **Create conversion function**:
   ```typescript
   export function convertFromTo(code: string): string {
     // Conversion logic here
     return convertedCode;
   }
   ```

2. **Add to performConversion** in `universalConverter.ts`

3. **Add comprehensive tests**

4. **Update suggestions generation**

## 📝 Documentation

- **README.md**: Keep the main README up to date
- **Code comments**: Document complex logic and algorithms
- **Type definitions**: Ensure all types are properly documented
- **Examples**: Provide usage examples for new features

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: Detailed steps to reproduce the bug
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Code sample**: Minimal code that reproduces the issue

## 💡 Feature Requests

For feature requests, please provide:

- **Use case**: Why is this feature needed?
- **Description**: Detailed description of the feature
- **Examples**: How would it work?
- **Alternatives**: Any alternative solutions considered

## 🔍 Code Review Process

1. **All changes** must go through pull requests
2. **At least one approval** required from maintainers
3. **All tests** must pass
4. **Code coverage** should not decrease significantly
5. **Documentation** must be updated for new features

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated for changes
- [ ] Documentation updated
- [ ] All tests pass
- [ ] No linting errors
- [ ] TypeScript types are correct
- [ ] Performance impact considered
- [ ] Security implications reviewed

## 🏗️ Architecture Guidelines

### File Organization

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── test/               # Test files
└── App.tsx            # Main application
```

### Code Principles

- **Single Responsibility**: Each function/class should have one responsibility
- **Type Safety**: Use TypeScript effectively
- **Performance**: Consider performance implications
- **Security**: Validate all inputs, sanitize outputs
- **Accessibility**: Ensure components are accessible
- **Error Handling**: Handle errors gracefully

### Performance Guidelines

- **Debounce** expensive operations (language detection)
- **Memoize** pure functions where beneficial
- **Lazy load** components when possible
- **Optimize** regex patterns for speed
- **Monitor** performance metrics

## 🔒 Security Guidelines

- **Input validation**: Always validate and sanitize user input
- **XSS prevention**: Escape HTML content
- **ReDoS protection**: Validate regex patterns
- **Rate limiting**: Implement rate limiting for API calls
- **Error handling**: Don't expose sensitive information in errors

## 📊 Performance Monitoring

We track:
- Conversion times
- Language detection accuracy
- Memory usage
- Error rates
- User interactions

## 🤝 Community

- **Be respectful**: Treat everyone with respect
- **Be constructive**: Provide helpful feedback
- **Be patient**: Remember that everyone is learning
- **Ask questions**: Don't hesitate to ask for help

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Code Review**: For feedback on your contributions

## 🎉 Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes for significant contributions
- Invited to join the maintainer team for consistent contributors

Thank you for contributing to UniCode! 🚀