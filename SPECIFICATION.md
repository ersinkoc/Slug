# @oxog/slug - Package Specification

## Package Identity

| Field | Value |
|-------|-------|
| **NPM Package** | `@oxog/slug` |
| **GitHub Repository** | `https://github.com/ersinkoc/slug` |
| **Documentation Site** | `https://slug.oxog.dev` |
| **License** | MIT |
| **Author** | Ersin Koç (ersinkoc) |

## Package Description

**One-line:** Zero-dependency URL slug generator with Unicode transliteration and language-aware transformations.

@oxog/slug converts any string into URL-safe slugs with comprehensive Unicode support. It handles transliteration from any language to ASCII, applies locale-specific rules (German ü→ue, Turkish ı→i, Russian transliteration), manages duplicates, protects reserved words, and respects word boundaries when truncating. The micro-kernel architecture allows extending with custom locale rules and transformation plugins.

## Version

- **Current Version:** 1.0.0
- **Stability:** Stable
- **Node.js:** >= 18

## Non-Negotiable Constraints

### 1. Zero Runtime Dependencies

This package MUST have absolutely NO runtime dependencies:

```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```

All functionality must be implemented from scratch:
- Unicode normalization
- Transliteration maps
- Character handling
- String utilities

### 2. 100% Test Coverage

Every line of code must be tested:
- All tests must pass
- Coverage thresholds enforced
- Vitest for testing

### 3. Micro-Kernel Architecture

Plugin-based architecture with minimal kernel responsibilities:
- Plugin registration and lifecycle
- Event bus for inter-plugin communication
- Error boundary and recovery
- Configuration management

### 4. LLM-Native Design

Optimized for both humans AND AI assistants:
- `llms.txt` file in root (< 2000 tokens)
- Predictable API naming
- Rich JSDoc with @example
- 15+ organized examples

### 5. No External Links

Only allowed external references:
- ✅ GitHub repository URL
- ✅ Custom domain (slug.oxog.dev)
- ✅ npm package URL
- ❌ Social media, Discord, email, donation links

## Core Features

### 1. Unicode to ASCII Transliteration

Convert any Unicode character to its ASCII equivalent.

**Input Examples:**
- `Héllo Wörld!` → `hello-world`
- `北京欢迎你` → `bei-jing-huan-ying-ni`
- `Привет мир` → `privet-mir`
- `مرحبا بالعالم` → `mrhba-balalm`
- `こんにちは` → `konnichiha`

### 2. Language-Specific Locale Rules

Apply locale-aware transformations.

| Locale | Rules |
|--------|-------|
| `de` | ä→ae, ö→oe, ü→ue, ß→ss |
| `tr` | ı→i, İ→i, ğ→g, ş→s, ç→c |
| `ru` | Full Cyrillic transliteration |
| `es` | ñ→n |
| `fr` | œ→oe, æ→ae |

### 3. Custom Replacement Maps

Define custom character or word replacements.

### 4. Separator Options

Configure the separator character (default: `-`).

### 5. Max Length with Word Boundary

Truncate to maximum length while respecting word boundaries.

### 6. Case Preservation Option

Keep original case when needed (default: lowercase).

### 7. Duplicate Handling

Generate unique slugs by appending counters via `createSlugger()`.

### 8. Reserved Word Protection

Avoid generating slugs that conflict with reserved words.

## API Design

### Main Export

```typescript
import { slug, createSlugger, createKernel } from '@oxog/slug';

// Simple usage
slug('Hello World!'); // 'hello-world'

// With options
slug('Merhaba Dünya', { locale: 'tr', separator: '_' });

// Stateful slugger
const slugger = createSlugger();
slugger.slug('title'); // 'title'
slugger.slug('title'); // 'title-1'

// Advanced kernel
const kernel = createKernel();
kernel.use(myCustomPlugin);
```

### Type Definitions

```typescript
export interface SlugOptions {
  separator?: string;      // default: '-'
  lowercase?: boolean;     // default: true
  locale?: string;         // default: undefined
  maxLength?: number;      // default: undefined
  strict?: boolean;        // default: false
  replacements?: Record<string, string>;
  reserved?: string[];
  reservedSuffix?: string; // default: '-1'
  trim?: boolean;          // default: true
}

export interface Slugger {
  slug(input: string, options?: SlugOptions): string;
  has(slug: string): boolean;
  list(): string[];
  reset(): void;
  count(baseSlug: string): number;
}

export interface SlugKernel<TContext = SlugContext> {
  use(plugin: SlugPlugin<TContext>): this;
  unregister(name: string): boolean;
  list(): string[];
  has(name: string): boolean;
  get(name: string): SlugPlugin<TContext> | undefined;
  slug(input: string, options?: SlugOptions): string;
  on(event: string, handler: EventHandler): () => void;
  emit(event: string, data?: unknown): void;
}

export interface SlugPlugin<TContext = SlugContext> {
  name: string;
  version: string;
  dependencies?: string[];
  install: (kernel: SlugKernel<TContext>) => void;
  onInit?: (context: TContext) => void | Promise<void>;
  onDestroy?: () => void | Promise<void>;
  onError?: (error: Error) => void;
}
```

## Plugin System

### Core Plugins (Always Loaded)

| Plugin | Description |
|--------|-------------|
| `transliterator` | Unicode to ASCII transliteration |
| `normalizer` | Unicode normalization (NFD/NFC) |
| `sanitizer` | Remove invalid characters |

### Optional Plugins (Opt-in)

| Plugin | Description | Enable |
|--------|-------------|--------|
| `locale-de` | German rules (ä→ae) | `kernel.use(localeDePlugin)` |
| `locale-tr` | Turkish rules (ı→i) | `kernel.use(localeTrPlugin)` |
| `locale-ru` | Russian Cyrillic | `kernel.use(localeRuPlugin)` |
| `locale-ar` | Arabic transliteration | `kernel.use(localeArPlugin)` |
| `locale-zh` | Chinese Pinyin | `kernel.use(localeZhPlugin)` |
| `locale-ja` | Japanese Romaji | `kernel.use(localeJaPlugin)` |
| `locale-el` | Greek transliteration | `kernel.use(localeElPlugin)` |
| `counter` | Duplicate handling | `kernel.use(counterPlugin)` |
| `reserved` | Reserved word protection | `kernel.use(reservedPlugin)` |
| `truncator` | Smart truncation | `kernel.use(truncatorPlugin)` |

## Technical Requirements

| Requirement | Value |
|-------------|-------|
| Runtime | Universal (Node.js + Browser) |
| Module Format | ESM + CJS |
| Node.js Version | >= 18 |
| TypeScript Version | >= 5.0 |
| Bundle Size (core) | < 5KB gzipped |
| Bundle Size (all plugins) | < 15KB gzipped |

## Project Structure

```
slug/
├── src/
│   ├── index.ts                 # Main exports
│   ├── kernel.ts                # Micro kernel core
│   ├── types.ts                 # Type definitions
│   ├── slug.ts                  # Main slug function
│   ├── slugger.ts               # Stateful slugger
│   ├── plugins/
│   │   ├── index.ts
│   │   ├── core/
│   │   │   ├── transliterator.ts
│   │   │   ├── normalizer.ts
│   │   │   └── sanitizer.ts
│   │   └── optional/
│   │       ├── locale-de.ts
│   │       ├── locale-tr.ts
│   │       ├── locale-ru.ts
│   │       ├── locale-ar.ts
│   │       ├── locale-zh.ts
│   │       ├── locale-ja.ts
│   │       ├── locale-el.ts
│   │       ├── counter.ts
│   │       ├── reserved.ts
│   │       └── truncator.ts
│   ├── maps/
│   │   ├── latin.ts
│   │   ├── cyrillic.ts
│   │   ├── arabic.ts
│   │   ├── cjk.ts
│   │   └── greek.ts
│   └── utils/
│       ├── unicode.ts
│       └── string.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── examples/
│   ├── 01-basic/
│   ├── 02-locales/
│   ├── 03-plugins/
│   ├── 04-advanced/
│   ├── 05-stateful/
│   ├── 06-integrations/
│   └── 07-real-world/
├── website/
│   ├── public/
│   │   ├── CNAME
│   │   └── llms.txt
│   └── src/
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── llms.txt
└── package.json
```

## Transliteration Coverage

### Latin Extended
- Western European accented characters (á, é, í, ó, ú, etc.)
- Germanic special characters (ä, ö, ü, ß)
- Nordic characters (ð, þ, å, ø)
- Eastern European (ą, ć, ę, ł, ń, ś, ź, ż)
- Turkish special characters (ı, ğ, ş)

### Cyrillic
- Russian alphabet (33 letters)
- Ukrainian-specific letters
- Belarusian-specific letters

### Greek
- Modern Greek alphabet (24 letters)

### CJK
- Chinese (Pinyin transliteration for common characters)
- Japanese (Romaji for hiragana/katakana)
- Korean (basic transliteration)

### Arabic
- Basic Arabic alphabet transliteration

## Error Handling

| Error Code | Condition | Resolution |
|------------|-----------|------------|
| `INVALID_INPUT` | Input is not a string | Throw TypeError |
| `INVALID_SEPARATOR` | Invalid separator char | Use default separator |
| `PLUGIN_NOT_FOUND` | Plugin not registered | Throw Error |
| `CIRCULAR_DEPENDENCY` | Plugins depend on each other | Throw Error |
| `PLUGIN_VERSION_MISMATCH` | Incompatible plugin version | Throw Error |

## Testing Requirements

1. **Unit Tests**: Every function and method
2. **Integration Tests**: Full pipeline tests
3. **Coverage**: 100% lines, branches, functions, statements
4. **Fixtures**: Unicode samples from multiple languages
5. **Edge Cases**: Empty strings, special chars, null, undefined

## LLM-Native Requirements

1. **llms.txt** (< 2000 tokens) in root
2. **Predictable API** naming (create, get, set, use, remove)
3. **Rich JSDoc** with @example on every public API
4. **15+ examples** organized by category
5. **README** optimized for LLM consumption
6. **npm keywords** (8-12 relevant keywords)

## Website Requirements

### Technology
- React 18+ with TypeScript
- Vite
- Tailwind CSS
- Prism React Renderer
- Lucide React

### Pages
1. Home
2. Getting Started
3. API Reference
4. Examples
5. Plugins
6. Playground

### Features
- IDE-style code blocks with line numbers
- Copy buttons
- Dark/Light theme toggle
- Mobile responsive
- CNAME: slug.oxog.dev
