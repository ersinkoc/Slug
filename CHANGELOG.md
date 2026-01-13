# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-13

### Added
- Initial release of @oxog/slug
- Zero-dependency URL slug generator
- Unicode to ASCII transliteration
- Language-specific locale rules (German, Turkish, Russian, Arabic, Chinese, Japanese, Greek)
- Custom replacement maps
- Separator options
- Max length with word boundary respect
- Case preservation option
- Duplicate handling with `createSlugger()`
- Reserved word protection
- Micro-kernel plugin architecture
- Core plugins: normalizer, transliterator, sanitizer
- Optional plugins: locale variants, counter, reserved, truncator
- 100% test coverage
- TypeScript strict mode
- ESM + CJS module support
