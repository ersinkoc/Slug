# @oxog/slug - Zero-Dependency NPM Package

## Package Identity

| Field | Value |
|-------|-------|
| **NPM Package** | `@oxog/slug` |
| **GitHub Repository** | `https://github.com/ersinkoc/slug` |
| **Documentation Site** | `https://slug.oxog.dev` |
| **License** | MIT |
| **Author** | Ersin Koç (ersinkoc) |

> **NO social media, Discord, email, or external links allowed.**

---

## Package Description

**One-line:** Zero-dependency URL slug generator with Unicode transliteration and language-aware transformations.

@oxog/slug converts any string into URL-safe slugs with comprehensive Unicode support. It handles transliteration from any language to ASCII, applies locale-specific rules (German ü→ue, Turkish ı→i, Russian transliteration), manages duplicates, protects reserved words, and respects word boundaries when truncating. The micro-kernel architecture allows extending with custom locale rules and transformation plugins.

---

## NON-NEGOTIABLE RULES

These rules are **ABSOLUTE** and must be followed without exception.

### 1. ZERO RUNTIME DEPENDENCIES

```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```

- Implement EVERYTHING from scratch
- No lodash, no slugify, no transliteration libraries - nothing
- Write your own Unicode normalization, transliteration maps, character handling
- If you think you need a dependency, you don't

**Allowed devDependencies only:**
```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "tsup": "^8.0.0",
    "@types/node": "^20.0.0",
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  }
}
```

### 2. 100% TEST COVERAGE

- Every line of code must be tested
- Every branch must be tested
- Every function must be tested
- **All tests must pass** (100% success rate)
- Use Vitest for testing
- Coverage thresholds enforced in config

### 3. MICRO-KERNEL ARCHITECTURE

All packages MUST use plugin-based architecture:

```
┌─────────────────────────────────────────────┐
│                 User Code                    │
├─────────────────────────────────────────────┤
│           Plugin Registry API                │
│  use() · register() · unregister() · list() │
├──────────┬──────────┬──────────┬────────────┤
│  Core    │  Core    │ Optional │ Community  │
│ Plugin 1 │ Plugin 2 │ Plugin   │  Plugin    │
├──────────┴──────────┴──────────┴────────────┤
│              Micro Kernel                    │
│   Event Bus · Lifecycle · Error Boundary    │
└─────────────────────────────────────────────┘
```

**Kernel responsibilities (minimal):**
- Plugin registration and lifecycle
- Event bus for inter-plugin communication
- Error boundary and recovery
- Configuration management

### 4. DEVELOPMENT WORKFLOW

Create these documents **FIRST**, before any code:

1. **SPECIFICATION.md** - Complete package specification
2. **IMPLEMENTATION.md** - Architecture and design decisions  
3. **TASKS.md** - Ordered task list with dependencies

Only after all three documents are complete, implement code following TASKS.md sequentially.

### 5. TYPESCRIPT STRICT MODE

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "module": "ESNext"
  }
}
```

### 6. LLM-NATIVE DESIGN

Package must be designed for both humans AND AI assistants:

- **llms.txt** file in root (< 2000 tokens)
- **Predictable API** naming (`create`, `get`, `set`, `use`, `remove`)
- **Rich JSDoc** with @example on every public API
- **15+ examples** organized by category
- **README** optimized for LLM consumption

### 7. NO EXTERNAL LINKS

- ✅ GitHub repository URL
- ✅ Custom domain (slug.oxog.dev)
- ✅ npm package URL
- ❌ Social media (Twitter, LinkedIn, etc.)
- ❌ Discord/Slack links
- ❌ Email addresses
- ❌ Donation/sponsor links

---

## CORE FEATURES

### 1. Unicode to ASCII Transliteration

Convert any Unicode character to its ASCII equivalent using comprehensive character maps.

**API Example:**
```typescript
import { slug } from '@oxog/slug';

slug('Héllo Wörld!');        // 'hello-world'
slug('北京欢迎你');           // 'bei-jing-huan-ying-ni'
slug('Привет мир');          // 'privet-mir'
slug('مرحبا بالعالم');        // 'mrhba-balalm'
slug('こんにちは');           // 'konnichiha'
slug('Ελληνικά');            // 'ellinika'
```

### 2. Language-Specific Locale Rules

Apply locale-aware transformations that follow native language conventions.

**API Example:**
```typescript
// German: ä→ae, ö→oe, ü→ue, ß→ss
slug('Größe', { locale: 'de' });     // 'groesse'

// Turkish: ı→i, İ→i, ğ→g, ş→s, ç→c
slug('Türkçe İçerik', { locale: 'tr' }); // 'turkce-icerik'

// Russian: full transliteration
slug('Москва', { locale: 'ru' });    // 'moskva'

// Spanish: ñ→n
slug('España', { locale: 'es' });    // 'espana'

// French: œ→oe, æ→ae
slug('Cœur', { locale: 'fr' });      // 'coeur'
```

### 3. Custom Replacement Maps

Define custom character or word replacements for domain-specific needs.

**API Example:**
```typescript
slug('C++ & C# Code', {
  replacements: {
    '++': 'pp',
    '#': 'sharp',
    '&': 'and'
  }
}); // 'cpp-and-csharp-code'

slug('@user mentioned #topic', {
  replacements: {
    '@': 'at-',
    '#': 'tag-'
  }
}); // 'at-user-mentioned-tag-topic'
```

### 4. Separator Options

Configure the separator character between words.

**API Example:**
```typescript
slug('Hello World');                      // 'hello-world' (default)
slug('Hello World', { separator: '_' });  // 'hello_world'
slug('Hello World', { separator: '.' });  // 'hello.world'
slug('Hello World', { separator: '' });   // 'helloworld'
```

### 5. Max Length with Word Boundary

Truncate slugs to maximum length while respecting word boundaries.

**API Example:**
```typescript
slug('This is a very long title that needs truncation', {
  maxLength: 20
}); // 'this-is-a-very-long'

slug('This is a very long title', {
  maxLength: 20,
  strict: true  // Cut exactly at maxLength
}); // 'this-is-a-very-long'
```

### 6. Case Preservation Option

Keep original case when needed.

**API Example:**
```typescript
slug('API v2.0');                         // 'api-v2-0' (default lowercase)
slug('API v2.0', { lowercase: false });   // 'API-v2-0'
slug('iPhone Pro', { lowercase: false }); // 'iPhone-Pro'
```

### 7. Duplicate Handling

Generate unique slugs by appending counters.

**API Example:**
```typescript
import { createSlugger } from '@oxog/slug';

const slugger = createSlugger();

slugger.slug('Hello World');  // 'hello-world'
slugger.slug('Hello World');  // 'hello-world-1'
slugger.slug('Hello World');  // 'hello-world-2'

slugger.reset();  // Clear history
slugger.slug('Hello World');  // 'hello-world'

// Check existence
slugger.has('hello-world');   // true
slugger.list();               // ['hello-world', 'hello-world-1', ...]
```

### 8. Reserved Word Protection

Avoid generating slugs that conflict with reserved words.

**API Example:**
```typescript
slug('admin', {
  reserved: ['admin', 'api', 'login', 'register']
}); // 'admin-1'

slug('API', {
  reserved: ['api', 'admin'],
  lowercase: true
}); // 'api-1'

// With custom suffix
slug('admin', {
  reserved: ['admin'],
  reservedSuffix: '-page'
}); // 'admin-page'
```

---

## PLUGIN SYSTEM

### Plugin Interface

```typescript
/**
 * Plugin interface for extending slug functionality.
 * 
 * @typeParam TContext - Shared context type between plugins
 */
export interface SlugPlugin<TContext = SlugContext> {
  /** Unique plugin identifier (kebab-case) */
  name: string;
  
  /** Semantic version (e.g., "1.0.0") */
  version: string;
  
  /** Other plugins this plugin depends on */
  dependencies?: string[];
  
  /**
   * Called when plugin is registered.
   * @param kernel - The kernel instance
   */
  install: (kernel: SlugKernel<TContext>) => void;
  
  /**
   * Called after all plugins are installed.
   * @param context - Shared context object
   */
  onInit?: (context: TContext) => void | Promise<void>;
  
  /**
   * Called when plugin is unregistered.
   */
  onDestroy?: () => void | Promise<void>;
  
  /**
   * Called on error in this plugin.
   * @param error - The error that occurred
   */
  onError?: (error: Error) => void;
}
```

### Core Plugins (Always Loaded)

| Plugin | Description |
|--------|-------------|
| `transliterator` | Unicode to ASCII transliteration with comprehensive character maps |
| `normalizer` | Unicode normalization (NFD/NFC) and diacritic removal |
| `sanitizer` | Remove invalid characters and normalize whitespace |

### Optional Plugins (Opt-in)

| Plugin | Description | Enable |
|--------|-------------|--------|
| `locale-de` | German transliteration rules (ä→ae, ö→oe, ü→ue, ß→ss) | `kernel.use(localeDePlugin)` |
| `locale-tr` | Turkish transliteration rules (ı→i, ğ→g, ş→s, ç→c, ö→o, ü→u) | `kernel.use(localeTrPlugin)` |
| `locale-ru` | Russian Cyrillic transliteration | `kernel.use(localeRuPlugin)` |
| `locale-ar` | Arabic transliteration | `kernel.use(localeArPlugin)` |
| `locale-zh` | Chinese Pinyin transliteration | `kernel.use(localeZhPlugin)` |
| `locale-ja` | Japanese Romaji transliteration | `kernel.use(localeJaPlugin)` |
| `locale-el` | Greek transliteration | `kernel.use(localeElPlugin)` |
| `counter` | Duplicate slug handling with auto-increment | `kernel.use(counterPlugin)` |
| `reserved` | Reserved word protection | `kernel.use(reservedPlugin)` |
| `truncator` | Smart truncation with word boundary respect | `kernel.use(truncatorPlugin)` |

---

## API DESIGN

### Main Export

```typescript
import { slug, createSlugger, createKernel } from '@oxog/slug';

// Simple usage - functional API
const result = slug('Hello World!'); // 'hello-world'

// With options
const result2 = slug('Merhaba Dünya', {
  locale: 'tr',
  separator: '_',
  maxLength: 50
});

// Stateful slugger for duplicate handling
const slugger = createSlugger();
slugger.slug('title'); // 'title'
slugger.slug('title'); // 'title-1'

// Advanced - kernel access
const kernel = createKernel();
kernel.use(myCustomPlugin);
const customSlug = kernel.slug('input');
```

### Type Definitions

```typescript
/**
 * Options for slug generation.
 */
export interface SlugOptions {
  /** 
   * Separator between words.
   * @default '-'
   */
  separator?: string;
  
  /**
   * Convert to lowercase.
   * @default true
   */
  lowercase?: boolean;
  
  /**
   * Locale for language-specific rules.
   * @default undefined (auto-detect or generic)
   */
  locale?: 'de' | 'tr' | 'ru' | 'ar' | 'zh' | 'ja' | 'el' | 'es' | 'fr' | string;
  
  /**
   * Maximum slug length.
   * @default undefined (no limit)
   */
  maxLength?: number;
  
  /**
   * Cut exactly at maxLength vs word boundary.
   * @default false
   */
  strict?: boolean;
  
  /**
   * Custom replacement map.
   * @default {}
   */
  replacements?: Record<string, string>;
  
  /**
   * Reserved words to avoid.
   * @default []
   */
  reserved?: string[];
  
  /**
   * Suffix for reserved word conflicts.
   * @default '-1'
   */
  reservedSuffix?: string;
  
  /**
   * Remove leading/trailing separators.
   * @default true
   */
  trim?: boolean;
}

/**
 * Slugger instance for stateful slug generation.
 */
export interface Slugger {
  /** Generate a slug, handling duplicates */
  slug(input: string, options?: SlugOptions): string;
  
  /** Check if a slug exists */
  has(slug: string): boolean;
  
  /** List all generated slugs */
  list(): string[];
  
  /** Reset slug history */
  reset(): void;
  
  /** Get count for a base slug */
  count(baseSlug: string): number;
}

/**
 * Kernel for plugin management.
 */
export interface SlugKernel<TContext = SlugContext> {
  /** Register a plugin */
  use(plugin: SlugPlugin<TContext>): this;
  
  /** Unregister a plugin */
  unregister(name: string): boolean;
  
  /** List registered plugins */
  list(): string[];
  
  /** Check if plugin exists */
  has(name: string): boolean;
  
  /** Get plugin by name */
  get(name: string): SlugPlugin<TContext> | undefined;
  
  /** Generate slug with registered plugins */
  slug(input: string, options?: SlugOptions): string;
  
  /** Subscribe to events */
  on(event: string, handler: EventHandler): () => void;
  
  /** Emit an event */
  emit(event: string, data?: unknown): void;
}

/**
 * Transformation pipeline stage.
 */
export interface TransformStage {
  /** Stage name for debugging */
  name: string;
  
  /** Priority (lower runs first) */
  priority: number;
  
  /** Transform function */
  transform: (input: string, context: TransformContext) => string;
}

/**
 * Context passed through transformation pipeline.
 */
export interface TransformContext {
  /** Original input string */
  original: string;
  
  /** Current options */
  options: Required<SlugOptions>;
  
  /** Plugin-specific data */
  data: Map<string, unknown>;
}
```

---

## TECHNICAL REQUIREMENTS

| Requirement | Value |
|-------------|-------|
| Runtime | Universal (Node.js + Browser) |
| Module Format | ESM + CJS |
| Node.js Version | >= 18 |
| TypeScript Version | >= 5.0 |
| Bundle Size (core) | < 5KB gzipped |
| Bundle Size (all plugins) | < 15KB gzipped |

---

## LLM-NATIVE REQUIREMENTS

### 1. llms.txt File

Create `/llms.txt` in project root (< 2000 tokens):

```markdown
# @oxog/slug

> Zero-dependency URL slug generator with Unicode transliteration and language-aware transformations.

## Install

```bash
npm install @oxog/slug
```

## Basic Usage

```typescript
import { slug } from '@oxog/slug';

slug('Hello World!');           // 'hello-world'
slug('Merhaba Dünya', { locale: 'tr' }); // 'merhaba-dunya'
```

## API Summary

### Main Functions
- `slug(input, options?)` - Generate URL slug
- `createSlugger()` - Create stateful instance
- `createKernel()` - Create kernel for plugins

### Options
- `separator` - Word separator (default: '-')
- `lowercase` - Convert to lowercase (default: true)
- `locale` - Language rules ('de', 'tr', 'ru', etc.)
- `maxLength` - Max length with word boundary
- `replacements` - Custom replacement map
- `reserved` - Reserved words to avoid

### Core Plugins
- `transliterator` - Unicode to ASCII
- `normalizer` - Unicode normalization
- `sanitizer` - Invalid character removal

### Optional Plugins
- `locale-de` - German rules (ä→ae)
- `locale-tr` - Turkish rules (ı→i)
- `locale-ru` - Russian Cyrillic
- `counter` - Duplicate handling
- `reserved` - Reserved word protection
- `truncator` - Smart truncation

## Common Patterns

### Basic Slug
```typescript
slug('Hello World!'); // 'hello-world'
```

### Locale-Specific
```typescript
slug('Größe', { locale: 'de' }); // 'groesse'
slug('İstanbul', { locale: 'tr' }); // 'istanbul'
```

### Custom Replacements
```typescript
slug('C++ Code', { replacements: { '++': 'pp' } }); // 'cpp-code'
```

### Duplicate Handling
```typescript
const slugger = createSlugger();
slugger.slug('title'); // 'title'
slugger.slug('title'); // 'title-1'
```

### Truncation
```typescript
slug('Long Title Here', { maxLength: 10 }); // 'long-title'
```

## Errors

| Code | Meaning | Solution |
|------|---------|----------|
| `INVALID_INPUT` | Input not a string | Pass string to slug() |
| `INVALID_SEPARATOR` | Invalid separator | Use single char separator |
| `PLUGIN_NOT_FOUND` | Plugin not registered | Register plugin first |

## Links

- Docs: https://slug.oxog.dev
- GitHub: https://github.com/ersinkoc/slug
```

### 2. API Naming Standards

Use predictable patterns LLMs can infer:

```typescript
// ✅ GOOD - Predictable
slug()            // Main function
createSlugger()   // Factory for stateful instance
createKernel()    // Factory for kernel
use()             // Register plugin
unregister()      // Remove plugin
list()            // Get all items
has()             // Check existence
get()             // Get single item
reset()           // Clear state

// ❌ BAD - Unpredictable (DO NOT USE)
s()               // Abbreviated
generate()        // Too generic
proc()            // Abbreviated
handle()          // Vague
```

### 3. Example Structure

Create organized examples:

```
examples/
├── 01-basic/
│   ├── simple-slug.ts
│   ├── with-options.ts
│   └── separator-types.ts
├── 02-locales/
│   ├── german.ts
│   ├── turkish.ts
│   ├── russian.ts
│   ├── chinese.ts
│   └── multi-locale.ts
├── 03-plugins/
│   ├── using-plugins.ts
│   ├── custom-plugin.ts
│   └── plugin-composition.ts
├── 04-advanced/
│   ├── custom-replacements.ts
│   ├── truncation.ts
│   └── reserved-words.ts
├── 05-stateful/
│   ├── duplicate-handling.ts
│   ├── slugger-instance.ts
│   └── counter-reset.ts
├── 06-integrations/
│   ├── express-route.ts
│   ├── next-dynamic-routes.ts
│   ├── markdown-headings.ts
│   └── database-slugs.ts
└── 07-real-world/
    ├── blog-post-slugs.ts
    ├── product-urls.ts
    ├── multi-language-cms.ts
    └── seo-friendly-urls.ts
```

### 4. npm Keywords

```json
{
  "keywords": [
    "slug",
    "slugify",
    "url",
    "transliteration",
    "unicode",
    "ascii",
    "permalink",
    "seo",
    "url-safe",
    "kebab-case",
    "zero-dependency"
  ]
}
```

---

## PROJECT STRUCTURE

```
slug/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── index.ts                 # Main exports
│   ├── kernel.ts                # Micro kernel core
│   ├── types.ts                 # Type definitions
│   ├── slug.ts                  # Main slug function
│   ├── slugger.ts               # Stateful slugger
│   ├── plugins/
│   │   ├── index.ts             # Plugin exports
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
│   │   ├── latin.ts             # Latin character maps
│   │   ├── cyrillic.ts          # Cyrillic maps
│   │   ├── arabic.ts            # Arabic maps
│   │   ├── cjk.ts               # Chinese/Japanese/Korean
│   │   └── greek.ts             # Greek maps
│   └── utils/
│       ├── unicode.ts           # Unicode utilities
│       └── string.ts            # String utilities
├── tests/
│   ├── unit/
│   │   ├── slug.test.ts
│   │   ├── kernel.test.ts
│   │   ├── slugger.test.ts
│   │   └── plugins/
│   │       ├── transliterator.test.ts
│   │       ├── normalizer.test.ts
│   │       ├── sanitizer.test.ts
│   │       └── locales.test.ts
│   ├── integration/
│   │   ├── full-pipeline.test.ts
│   │   └── plugin-composition.test.ts
│   └── fixtures/
│       ├── unicode-samples.ts
│       └── locale-samples.ts
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
│   │   ├── CNAME                # slug.oxog.dev
│   │   └── llms.txt
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── llms.txt
├── SPECIFICATION.md
├── IMPLEMENTATION.md
├── TASKS.md
├── README.md
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
└── .gitignore
```

---

## TRANSLITERATION MAPS

### Latin Extended Characters

```typescript
const latinMap: Record<string, string> = {
  // Accented vowels
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'œ': 'oe',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ý': 'y', 'ÿ': 'y',
  
  // Consonants
  'ç': 'c', 'ñ': 'n', 'ß': 'ss',
  
  // Nordic
  'ð': 'd', 'þ': 'th',
  
  // Eastern European
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ś': 's', 'ź': 'z', 'ż': 'z',
  'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u', 'ž': 'z',
  
  // Turkish specific
  'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ş': 's',
  
  // Uppercase variants
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  // ... (complete map)
};
```

### German Locale Overrides

```typescript
const germanMap: Record<string, string> = {
  'ä': 'ae', 'Ä': 'Ae',
  'ö': 'oe', 'Ö': 'Oe', 
  'ü': 'ue', 'Ü': 'Ue',
  'ß': 'ss'
};
```

### Turkish Locale Overrides

```typescript
const turkishMap: Record<string, string> = {
  'ı': 'i', 'İ': 'i',
  'ğ': 'g', 'Ğ': 'g',
  'ş': 's', 'Ş': 's',
  'ç': 'c', 'Ç': 'c',
  'ö': 'o', 'Ö': 'o',
  'ü': 'u', 'Ü': 'u'
};
```

### Russian Cyrillic Map

```typescript
const cyrillicMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
  'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
  'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
  'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
  'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
  'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
  // Uppercase
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
  // ... (complete map)
};
```

---

## GITHUB ACTIONS

Single workflow file: `.github/workflows/deploy.yml`

```yaml
name: Deploy Website

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build package
        run: npm run build
      
      - name: Build website
        working-directory: ./website
        run: |
          npm ci
          npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './website/dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## CONFIG FILES

### tsup.config.ts

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/plugins/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
});
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'website/',
        'examples/',
        '*.config.*',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

### package.json

```json
{
  "name": "@oxog/slug",
  "version": "1.0.0",
  "description": "Zero-dependency URL slug generator with Unicode transliteration and language-aware transformations",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./plugins": {
      "import": {
        "types": "./dist/plugins/index.d.ts",
        "default": "./dist/plugins/index.js"
      },
      "require": {
        "types": "./dist/plugins/index.d.cts",
        "default": "./dist/plugins/index.cjs"
      }
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm run test:coverage"
  },
  "keywords": [
    "slug",
    "slugify",
    "url",
    "transliteration",
    "unicode",
    "ascii",
    "permalink",
    "seo",
    "url-safe",
    "kebab-case",
    "zero-dependency"
  ],
  "author": "Ersin Koç",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ersinkoc/slug.git"
  },
  "bugs": {
    "url": "https://github.com/ersinkoc/slug/issues"
  },
  "homepage": "https://slug.oxog.dev",
  "engines": {
    "node": ">=18"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "vitest": "^2.0.0"
  }
}
```

---

## WEBSITE SPECIFICATION

### Technology Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Syntax Highlighting**: Prism React Renderer
- **Icons**: Lucide React
- **Domain**: slug.oxog.dev

### IDE-Style Code Blocks

All code blocks MUST have:
- Line numbers (muted, non-selectable)
- Syntax highlighting
- Header bar with filename/language
- Copy button with "Copied!" feedback
- Rounded corners, subtle border
- Dark/light theme support

### Theme System

- Dark mode (default)
- Light mode
- Toggle button in navbar
- Persist in localStorage
- Respect system preference on first visit

### Required Pages

1. **Home** - Hero, features, install, example
2. **Getting Started** - Installation, basic usage
3. **API Reference** - Complete documentation
4. **Examples** - Organized by category
5. **Plugins** - Core, optional, custom
6. **Playground** - Interactive slug generator

### Footer

- Package name
- MIT License
- © 2025 Ersin Koç
- GitHub link only

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Create SPECIFICATION.md with complete spec
- [ ] Create IMPLEMENTATION.md with architecture
- [ ] Create TASKS.md with ordered task list
- [ ] All three documents reviewed and complete

### During Implementation
- [ ] Follow TASKS.md sequentially
- [ ] Write tests before or with each feature
- [ ] Maintain 100% coverage throughout
- [ ] JSDoc on every public API with @example
- [ ] Create examples as features are built

### Package Completion
- [ ] All tests passing (100%)
- [ ] Coverage at 100% (lines, branches, functions)
- [ ] No TypeScript errors
- [ ] ESLint passes
- [ ] Package builds without errors

### LLM-Native Completion
- [ ] llms.txt created (< 2000 tokens)
- [ ] llms.txt copied to website/public/
- [ ] README first 500 tokens optimized
- [ ] All public APIs have JSDoc + @example
- [ ] 15+ examples in organized folders
- [ ] package.json has 8-12 keywords
- [ ] API uses standard naming patterns

### Website Completion
- [ ] All pages implemented
- [ ] IDE-style code blocks with line numbers
- [ ] Copy buttons working
- [ ] Dark/Light theme toggle
- [ ] CNAME file with slug.oxog.dev
- [ ] Mobile responsive
- [ ] Footer with Ersin Koç, MIT, GitHub only

### Final Verification
- [ ] `npm run build` succeeds
- [ ] `npm run test:coverage` shows 100%
- [ ] Website builds without errors
- [ ] All examples run successfully
- [ ] README is complete and accurate

---

## BEGIN IMPLEMENTATION

Start by creating **SPECIFICATION.md** with the complete package specification based on everything above.

Then create **IMPLEMENTATION.md** with architecture decisions.

Then create **TASKS.md** with ordered, numbered tasks.

Only after all three documents are complete, begin implementing code by following TASKS.md sequentially.

**Remember:**
- This package will be published to npm
- It must be production-ready
- Zero runtime dependencies
- 100% test coverage
- Professionally documented
- LLM-native design
- Beautiful documentation website
