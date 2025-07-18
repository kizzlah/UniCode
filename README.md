# UniCode - Universal Code Converter

A powerful, AI-driven code conversion tool that automatically detects programming languages and provides intelligent conversion suggestions. Convert between 50+ programming languages, data formats, and markup languages with ease.

##  Features

- ** Smart Language Detection**: Automatically detects 50+ programming languages
- ** Instant Conversions**: Real-time code transformation with intelligent suggestions
- ** Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, Rust, Go, PHP, Ruby, Swift, Kotlin, and more
- ** Data Format Conversion**: JSON ↔ YAML ↔ XML ↔ TOML transformations
- ** Web Technologies**: HTML ↔ JSX ↔ Vue, CSS ↔ SCSS ↔ Less
- ** DevOps Tools**: Docker, Kubernetes, Terraform, Ansible configurations
- ** Responsive Design**: Works seamlessly on desktop and mobile
- ** Dark/Light Theme**: Toggle between themes for comfortable coding
- ** Conversion History**: Track and restore previous conversions

##  Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/unicode-converter.git
cd unicode-converter

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to start converting code!

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

##  Usage

1. **Paste Your Code**: Simply paste any code into the input editor
2. **Auto-Detection**: UniCode automatically detects the programming language
3. **Smart Suggestions**: Get intelligent conversion recommendations
4. **One-Click Convert**: Click any suggestion to instantly transform your code
5. **Copy & Use**: Copy the converted code and use it in your projects

### Supported Conversions

#### Programming Languages
- JavaScript ↔ TypeScript ↔ Python
- Java → Kotlin, C#, Scala
- C++ ↔ Rust ↔ Go
- PHP ↔ Ruby ↔ Python
- Swift ↔ Kotlin ↔ Dart

#### Data Formats
- JSON ↔ YAML ↔ XML ↔ TOML
- CSV transformations
- Configuration file conversions

#### Web Technologies
- HTML ↔ JSX ↔ Vue templates
- CSS ↔ SCSS ↔ Less ↔ Stylus
- Styling framework conversions

#### DevOps & Infrastructure
- Dockerfile → Bash scripts
- Kubernetes YAML configurations
- Terraform → Ansible playbooks
- CI/CD pipeline conversions

##  Development

### Project Structure

```
src/
├── components/          # React components
│   ├── CodeEditor.tsx
│   ├── ConversionHistory.tsx
│   ├── ConversionSuggestions.tsx
│   ├── LanguageDetector.tsx
│   └── StatusBar.tsx
├── hooks/              # Custom React hooks
│   └── useUniversalConverter.ts
├── utils/              # Utility functions
│   ├── converters.ts
│   ├── universalConverter.ts
│   └── validation.ts
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

### Adding New Languages

1. Add language patterns to `languagePatterns` in `universalConverter.ts`
2. Implement conversion logic in the appropriate converter file
3. Add language display name and icon mappings
4. Update tests and documentation

### Running Tests

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

##  Testing

The project includes comprehensive testing:

- **Unit Tests**: Individual function and component testing
- **Integration Tests**: Full user workflow testing
- **E2E Tests**: Browser automation testing
- **Performance Tests**: Conversion speed and memory usage

##  Performance

- **Fast Language Detection**: Optimized regex patterns for quick identification
- **Efficient Conversions**: Streaming processing for large code files
- **Memory Management**: Proper cleanup and garbage collection
- **Caching**: Intelligent caching of conversion results

##  Security

- **Input Sanitization**: All user input is properly validated and sanitized
- **XSS Protection**: React's built-in XSS protection
- **Content Security Policy**: Strict CSP headers in production
- **No Code Execution**: Conversions are purely syntactic, no code execution

##  Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Powered by [Vite](https://vitejs.dev/)

##  Support

- Issues: [GitHub Issues](https://github.com/yourusername/unicode-converter/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/unicode-converter/discussions)

## Roadmap

- [ ] AI-powered code optimization suggestions
- [ ] Plugin system for custom converters
- [ ] VS Code extension
- [ ] API for programmatic access
- [ ] Batch file processing
- [ ] Code quality metrics
- [ ] Collaborative editing features

---

Made by the UniCode team
