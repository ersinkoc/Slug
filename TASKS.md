# @oxog/slug - Implementation Tasks

This document contains the ordered, numbered task list for implementing `@oxog/slug`.

## Phase 1: Project Setup

- [ ] **Task 1.1**: Create project directory structure
  - Create all folders per project structure
  - Create empty `src/`, `tests/`, `examples/` directories
  - Create subdirectories for plugins, maps, utils

- [ ] **Task 1.2**: Create package.json
  - Set name to `@oxog/slug`
  - Ensure `dependencies: {}` is empty
  - Add all devDependencies
  - Configure exports field
  - Add npm keywords

- [ ] **Task 1.3**: Create TypeScript config (tsconfig.json)
  - Enable strict mode
  - Enable noUncheckedIndexedAccess
  - Enable noImplicitOverride
  - Set target to ES2022
  - Set module to ESNext
  - Enable declaration and declarationMap

- [ ] **Task 1.4**: Create Vitest config (vitest.config.ts)
  - Configure coverage provider
  - Set 100% coverage thresholds
  - Configure test patterns

- [ ] **Task 1.5**: Create tsup config (tsup.config.ts)
  - Configure entry points
  - Enable CJS and ESM output
  - Enable dts generation
  - Enable sourcemaps

- [ ] **Task 1.6**: Create ESLint config (eslint.config.js)
  - Configure TypeScript rules
  - Set strict linting

- [ ] **Task 1.7**: Create .gitignore
  - Ignore node_modules, dist, coverage
  - Ignore .DS_Store, *.log

## Phase 2: Core Types

- [ ] **Task 2.1**: Create `src/types.ts` - Base types
  - Create `SlugOptions` interface
  - Create `SlugContext` interface
  - Create `TransformContext` interface
  - Create `TransformStage` interface
  - Add JSDoc with @example for each type

- [ ] **Task 2.2**: Create `src/types.ts` - Plugin types
  - Create `SlugPlugin<TContext>` interface
  - Create `EventHandler` type
  - Create `PluginRegistry` interface
  - Add JSDoc with @example for each type

- [ ] **Task 2.3**: Create `src/types.ts` - API types
  - Create `Slugger` interface
  - Create `SlugKernel<TContext>` interface
  - Add JSDoc with @example for each type

- [ ] **Task 2.4**: Create `src/types.ts` - Error types
  - Create `SlugError` enum
  - Create `SlugException` class
  - Add JSDoc with @example

## Phase 3: Utilities

- [ ] **Task 3.1**: Create `src/utils/unicode.ts`
  - Implement `stripDiacritics()`
  - Implement `isCombiningMark()`
  - Implement `getCharCategory()`
  - Add JSDoc with @example for each function

- [ ] **Task 3.2**: Create `src/utils/string.ts`
  - Implement `collapseRepeated()`
  - Implement `trimChars()`
  - Implement `truncateAtWordBoundary()`
  - Add JSDoc with @example for each function

- [ ] **Task 3.3**: Create tests for utils
  - `tests/unit/utils/unicode.test.ts`
  - `tests/unit/utils/string.test.ts`
  - Achieve 100% coverage

## Phase 4: Character Maps

- [ ] **Task 4.1**: Create `src/maps/latin.ts`
  - Add all Latin extended characters
  - Include Western European accented chars
  - Include Germanic, Nordic, Eastern European
  - Include Turkish special chars
  - Export as const for tree-shaking

- [ ] **Task 4.2**: Create `src/maps/cyrillic.ts`
  - Add Russian alphabet
  - Add Ukrainian, Belarusian letters
  - Export as const for tree-shaking

- [ ] **Task 4.3**: Create `src/maps/greek.ts`
  - Add Modern Greek alphabet
  - Export as const for tree-shaking

- [ ] **Task 4.4**: Create `src/maps/arabic.ts`
  - Add basic Arabic alphabet
  - Export as const for tree-shaking

- [ ] **Task 4.5**: Create `src/maps/cjk.ts`
  - Add common Chinese characters (Pinyin)
  - Add Japanese hiragana/katakana (Romaji)
  - Export as const for tree-shaking

- [ ] **Task 4.6**: Create `src/maps/index.ts`
  - Export all maps
  - Create combined map getter

- [ ] **Task 4.7**: Create tests for maps
  - `tests/unit/maps/latin.test.ts`
  - `tests/unit/maps/cyrillic.test.ts`
  - `tests/unit/maps/greek.test.ts`
  - `tests/unit/maps/arabic.test.ts`
  - `tests/unit/maps/cjk.test.ts`
  - Achieve 100% coverage

## Phase 5: Micro-Kernel

- [ ] **Task 5.1**: Create `src/kernel.ts` - Basic structure
  - Create `SlugKernelImpl` class
  - Implement constructor
  - Add plugin storage (Map)
  - Add event storage (Map)

- [ ] **Task 5.2**: Create `src/kernel.ts` - Plugin management
  - Implement `use()` method
  - Implement `unregister()` method
  - Implement `list()` method
  - Implement `has()` method
  - Implement `get()` method

- [ ] **Task 5.3**: Create `src/kernel.ts` - Dependency resolution
  - Implement topological sort
  - Implement circular dependency detection
  - Implement version compatibility check

- [ ] **Task 5.4**: Create `src/kernel.ts` - Lifecycle management
  - Implement `install()` lifecycle
  - Implement `onInit()` lifecycle
  - Implement `onDestroy()` lifecycle

- [ ] **Task 5.5**: Create `src/kernel.ts` - Event system
  - Implement `on()` method
  - Implement `emit()` method
  - Add error boundary for events

- [ ] **Task 5.6**: Create `src/kernel.ts` - Transform pipeline
  - Implement transform stage registration
  - Implement transform pipeline execution
  - Implement priority ordering

- [ ] **Task 5.7**: Create `src/kernel.ts` - Slug generation
  - Implement `slug()` method
  - Add input validation
  - Orchestrate pipeline execution

- [ ] **Task 5.8**: Create tests for kernel
  - `tests/unit/kernel.test.ts`
  - Test plugin management
  - Test dependency resolution
  - Test lifecycle
  - Test event system
  - Test pipeline
  - Achieve 100% coverage

## Phase 6: Core Plugins

- [ ] **Task 6.1**: Create `src/plugins/core/normalizer.ts`
  - Implement normalizer plugin
  - Add Unicode normalization (NFD/NFC)
  - Add diacritic removal
  - Add JSDoc with @example

- [ ] **Task 6.2**: Create `src/plugins/core/transliterator.ts`
  - Implement transliterator plugin
  - Load character maps
  - Apply locale-specific maps
  - Add JSDoc with @example

- [ ] **Task 6.3**: Create `src/plugins/core/sanitizer.ts`
  - Implement sanitizer plugin
  - Remove invalid characters
  - Normalize whitespace
  - Add separator handling
  - Add JSDoc with @example

- [ ] **Task 6.4**: Create `src/plugins/core/index.ts`
  - Export all core plugins

- [ ] **Task 6.5**: Create tests for core plugins
  - `tests/unit/plugins/normalizer.test.ts`
  - `tests/unit/plugins/transliterator.test.ts`
  - `tests/unit/plugins/sanitizer.test.ts`
  - Achieve 100% coverage

## Phase 7: Optional Plugins

- [ ] **Task 7.1**: Create `src/plugins/optional/locale-de.ts`
  - Implement German locale plugin
  - Add ä→ae, ö→oe, ü→ue, ß→ss
  - Add JSDoc with @example

- [ ] **Task 7.2**: Create `src/plugins/optional/locale-tr.ts`
  - Implement Turkish locale plugin
  - Add ı→i, İ→i, ğ→g, ş→s
  - Add JSDoc with @example

- [ ] **Task 7.3**: Create `src/plugins/optional/locale-ru.ts`
  - Implement Russian locale plugin
  - Add full Cyrillic transliteration
  - Add JSDoc with @example

- [ ] **Task 7.4**: Create `src/plugins/optional/locale-ar.ts`
  - Implement Arabic locale plugin
  - Add Arabic transliteration
  - Add JSDoc with @example

- [ ] **Task 7.5**: Create `src/plugins/optional/locale-zh.ts`
  - Implement Chinese locale plugin
  - Add Pinyin transliteration
  - Add JSDoc with @example

- [ ] **Task 7.6**: Create `src/plugins/optional/locale-ja.ts`
  - Implement Japanese locale plugin
  - Add Romaji transliteration
  - Add JSDoc with @example

- [ ] **Task 7.7**: Create `src/plugins/optional/locale-el.ts`
  - Implement Greek locale plugin
  - Add Greek transliteration
  - Add JSDoc with @example

- [ ] **Task 7.8**: Create `src/plugins/optional/counter.ts`
  - Implement counter plugin
  - Add increment logic
  - Add JSDoc with @example

- [ ] **Task 7.9**: Create `src/plugins/optional/reserved.ts`
  - Implement reserved word plugin
  - Add conflict detection
  - Add suffix handling
  - Add JSDoc with @example

- [ ] **Task 7.10**: Create `src/plugins/optional/truncator.ts`
  - Implement truncator plugin
  - Add word boundary detection
  - Add strict mode support
  - Add JSDoc with @example

- [ ] **Task 7.11**: Create `src/plugins/optional/index.ts`
  - Export all optional plugins

- [ ] **Task 7.12**: Create tests for optional plugins
  - `tests/unit/plugins/locale-de.test.ts`
  - `tests/unit/plugins/locale-tr.test.ts`
  - `tests/unit/plugins/locale-ru.test.ts`
  - `tests/unit/plugins/locale-ar.test.ts`
  - `tests/unit/plugins/locale-zh.test.ts`
  - `tests/unit/plugins/locale-ja.test.ts`
  - `tests/unit/plugins/locale-el.test.ts`
  - `tests/unit/plugins/counter.test.ts`
  - `tests/unit/plugins/reserved.test.ts`
  - `tests/unit/plugins/truncator.test.ts`
  - Achieve 100% coverage

## Phase 8: Main API

- [ ] **Task 8.1**: Create `src/slug.ts`
  - Implement default kernel creation
  - Implement `slug()` function
  - Add input validation
  - Add JSDoc with @example

- [ ] **Task 8.2**: Create `src/slugger.ts`
  - Create `SluggerImpl` class
  - Implement `slug()` method
  - Implement `has()` method
  - Implement `list()` method
  - Implement `reset()` method
  - Implement `count()` method
  - Implement `createSlugger()` factory
  - Add JSDoc with @example for each

- [ ] **Task 8.3**: Create `src/index.ts`
  - Export main API
  - Export types
  - Export plugins
  - Add re-exports for convenience

- [ ] **Task 8.4**: Create tests for main API
  - `tests/unit/slug.test.ts`
  - `tests/unit/slugger.test.ts`
  - Test all options
  - Test error cases
  - Achieve 100% coverage

## Phase 9: Integration Tests

- [ ] **Task 9.1**: Create `tests/integration/full-pipeline.test.ts`
  - Test complete pipeline
  - Test all options combinations
  - Test real-world inputs

- [ ] **Task 9.2**: Create `tests/integration/plugin-composition.test.ts`
  - Test multiple plugins together
  - Test plugin dependencies
  - Test plugin ordering

- [ ] **Task 9.3**: Create `tests/fixtures/unicode-samples.ts`
  - Add samples from various languages
  - Organize by language family

- [ ] **Task 9.4**: Create `tests/fixtures/locale-samples.ts`
  - Add locale-specific test cases
  - Include edge cases

- [ ] **Task 9.5**: Run full test suite
  - Ensure all tests pass
  - Verify 100% coverage
  - Fix any failing tests

## Phase 10: Examples

- [ ] **Task 10.1**: Create `examples/01-basic/`
  - `simple-slug.ts` - Basic usage
  - `with-options.ts` - All options
  - `separator-types.ts` - Different separators

- [ ] **Task 10.2**: Create `examples/02-locales/`
  - `german.ts` - German locale
  - `turkish.ts` - Turkish locale
  - `russian.ts` - Russian locale
  - `chinese.ts` - Chinese locale
  - `multi-locale.ts` - Multiple locales

- [ ] **Task 10.3**: Create `examples/03-plugins/`
  - `using-plugins.ts` - Plugin usage
  - `custom-plugin.ts` - Custom plugin
  - `plugin-composition.ts` - Multiple plugins

- [ ] **Task 10.4**: Create `examples/04-advanced/`
  - `custom-replacements.ts` - Custom maps
  - `truncation.ts` - Length limits
  - `reserved-words.ts` - Reserved words

- [ ] **Task 10.5**: Create `examples/05-stateful/`
  - `duplicate-handling.ts` - Duplicate slugs
  - `slugger-instance.ts` - Slugger usage
  - `counter-reset.ts` - Reset counter

- [ ] **Task 10.6**: Create `examples/06-integrations/`
  - `express-route.ts` - Express integration
  - `next-dynamic-routes.ts` - Next.js integration
  - `markdown-headings.ts` - Markdown processing
  - `database-slugs.ts` - Database usage

- [ ] **Task 10.7**: Create `examples/07-real-world/`
  - `blog-post-slugs.ts` - Blog posts
  - `product-urls.ts` - E-commerce
  - `multi-language-cms.ts` - CMS integration
  - `seo-friendly-urls.ts` - SEO optimization

- [ ] **Task 10.8**: Verify all examples run without errors

## Phase 11: LLM-Native Documentation

- [ ] **Task 11.1**: Create `llms.txt`
  - Write quick reference guide
  - Keep under 2000 tokens
  - Include all public APIs
  - Include common patterns
  - Include error codes

- [ ] **Task 11.2**: Create `README.md`
  - Optimize first 500 tokens for LLMs
  - Add installation section
  - Add quick start
  - Add API reference
  - Add examples
  - Add links to docs

- [ ] **Task 11.3**: Verify all JSDoc is complete
  - Check every public API has @example
  - Check all parameters documented
  - Check return values documented

## Phase 12: Website

- [ ] **Task 12.1**: Initialize website project
  - Create `website/` directory
  - Create `website/package.json`
  - Create `website/vite.config.ts`
  - Create `website/tsconfig.json`
  - Install dependencies

- [ ] **Task 12.2**: Create website structure
  - Create `website/src/` directories
  - Create `website/public/` directory
  - Create `website/public/CNAME` with `slug.oxog.dev`
  - Copy `llms.txt` to `website/public/`

- [ ] **Task 12.3**: Create website components
  - Create layout component
  - Create navigation component
  - Create footer component
  - Create code block component (IDE-style)
  - Create theme toggle component

- [ ] **Task 12.4**: Create website pages
  - Home page
  - Getting Started page
  - API Reference page
  - Examples page
  - Plugins page
  - Playground page

- [ ] **Task 12.5**: Style website
  - Configure Tailwind CSS
  - Create dark theme
  - Create light theme
  - Add responsive design

- [ ] **Task 12.6**: Create playground
  - Interactive slug generator
  - Real-time preview
  - Option controls

## Phase 13: GitHub Actions

- [ ] **Task 13.1**: Create `.github/workflows/deploy.yml`
  - Configure build job
  - Configure test job
  - Configure website deploy
  - Set up GitHub Pages

- [ ] **Task 13.2**: Test workflow locally
  - Verify build works
  - Verify tests pass
  - Verify website builds

## Phase 14: Final Verification

- [ ] **Task 14.1**: Run all tests
  - `npm run test:coverage`
  - Verify 100% coverage
  - All tests pass

- [ ] **Task 14.2**: Run type checking
  - `npm run typecheck`
  - No errors

- [ ] **Task 14.3**: Run linting
  - `npm run lint`
  - No errors

- [ ] **Task 14.4**: Build package
  - `npm run build`
  - Verify dist output
  - Check bundle sizes

- [ ] **Task 14.5**: Build website
  - `cd website && npm run build`
  - Verify output

- [ ] **Task 14.6**: Final review
  - Review all files
  - Check documentation
  - Verify examples
  - Test in browser and Node.js

---

## Execution Order

**Execute tasks sequentially from top to bottom.**

Each phase depends on the previous phase being complete. Do not skip ahead.

**Before starting Phase 2, ensure Phase 1 is 100% complete.**

**Before starting Phase 8, ensure all utility functions and maps are complete.**

**Before writing documentation, ensure all code is implemented and tested.**

---

## Notes

- All code must have 100% test coverage
- All public APIs must have JSDoc with @example
- Zero runtime dependencies - implement everything from scratch
- Follow TypeScript strict mode
- Use predictable API naming conventions
- LLM-native design throughout
