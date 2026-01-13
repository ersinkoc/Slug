# @oxog/slug - Implementation Architecture

## Overview

This document describes the architecture and design decisions for the `@oxog/slug` package.

## Architecture Principles

1. **Zero Dependencies**: All functionality implemented from scratch
2. **Micro-Kernel**: Minimal core with plugin extensibility
3. **Type Safety**: Full TypeScript strict mode
4. **Test Coverage**: 100% coverage requirement
5. **LLM-Native**: Optimized for AI assistants

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Code                           │
├─────────────────────────────────────────────────────────────┤
│                     Public API Layer                        │
│  slug() · createSlugger() · createKernel()                  │
├─────────────────────────────────────────────────────────────┤
│                   Micro-Kernel Core                          │
│  Plugin Manager · Event Bus · Config Manager · Error Handler│
├──────────────┬──────────────┬──────────────┬────────────────┤
│   Core       │   Core       │   Optional   │    Custom      │
│  Plugin 1    │  Plugin 2    │   Plugins    │    Plugins     │
├──────────────┴──────────────┴──────────────┴────────────────┤
│                   Transformation Pipeline                    │
│  Input → Normalize → Transliterate → Sanitize → Truncate    │
└─────────────────────────────────────────────────────────────┘
```

## Module Breakdown

### 1. Core Types (`src/types.ts`)

**Purpose**: Central type definitions for the entire package.

**Key Types**:
- `SlugOptions` - Configuration options for slug generation
- `Slugger` - Stateful slugger instance interface
- `SlugKernel` - Kernel for plugin management
- `SlugPlugin` - Plugin interface
- `SlugContext` - Shared context between plugins
- `TransformContext` - Context passed through pipeline
- `TransformStage` - Pipeline stage definition

**Design Decisions**:
- Generic types for extensibility (`TContext`)
- Strict null checks enabled
- Required vs optional fields clearly marked
- JSDoc on all types for IDE support

### 2. Micro-Kernel (`src/kernel.ts`)

**Purpose**: Minimal core that manages plugins and orchestration.

**Responsibilities**:
1. Plugin registration/unregistration
2. Dependency resolution
3. Lifecycle management (install, init, destroy)
4. Event bus for inter-plugin communication
5. Error boundary and recovery
6. Configuration management

**Key Methods**:
```typescript
class SlugKernel<TContext> {
  // Plugin management
  use(plugin: SlugPlugin<TContext>): this;
  unregister(name: string): boolean;
  list(): string[];
  has(name: string): boolean;
  get(name: string): SlugPlugin<TContext> | undefined;

  // Slug generation
  slug(input: string, options?: SlugOptions): string;

  // Event system
  on(event: string, handler: EventHandler): () => void;
  emit(event: string, data?: unknown): void;
}
```

**Implementation Details**:
- Plugin dependency graph with topological sort
- Event system using Map<string, EventHandler[]>
- Error isolation per plugin
- Lazy initialization on first use

### 3. Main Slug Function (`src/slug.ts`)

**Purpose**: Simple functional API for common use cases.

**Implementation**:
```typescript
export function slug(input: string, options?: SlugOptions): string {
  // Create default kernel
  // Load core plugins
  // Process input through pipeline
  // Return result
}
```

**Design Decision**:
- Stateless function for simple cases
- Uses default kernel internally
- Options passed to each plugin

### 4. Stateful Slugger (`src/slugger.ts`)

**Purpose**: Stateful instance for duplicate handling.

**Implementation**:
```typescript
class SluggerImpl implements Slugger {
  private kernel: SlugKernel;
  private history: Map<string, number>;
  private counterPlugin: SlugPlugin;

  slug(input: string, options?: SlugOptions): string {
    // Generate base slug
    // Check history
    // Append counter if duplicate
    // Update history
  }

  has(slug: string): boolean;
  list(): string[];
  reset(): void;
  count(baseSlug: string): number;
}
```

**Design Decision**:
- Uses counter plugin internally
- Maintains history Map for O(1) lookups
- Thread-safe pattern for future use

### 5. Core Plugins

#### 5.1 Normalizer Plugin (`src/plugins/core/normalizer.ts`)

**Purpose**: Unicode normalization and diacritic removal.

**Implementation**:
```typescript
const normalizerPlugin: SlugPlugin = {
  name: 'normalizer',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'normalize',
      priority: 100, // Run first
      transform(input, context) {
        // NFD normalization
        // Remove diacritics
        // NFC recomposition
        return normalized;
      }
    });
  }
};
```

**Design Decisions**:
- Uses `String.normalize()` (native API, zero dependency)
- Removes combining diacritical marks (U+0300–U+036F)
- Priority 100 ensures it runs first

#### 5.2 Transliterator Plugin (`src/plugins/core/transliterator.ts`)

**Purpose**: Unicode to ASCII character mapping.

**Implementation**:
```typescript
const transliteratorPlugin: SlugPlugin = {
  name: 'transliterator',
  version: '1.0.0',

  install(kernel) {
    // Load character maps
    const maps = loadMaps();

    kernel.registerTransform({
      name: 'transliterate',
      priority: 90,
      transform(input, context) {
        // Apply locale-specific map
        // Fallback to base Latin map
        return transliterated;
      }
    });
  }
};
```

**Design Decisions**:
- Character maps as const objects
- Locale-specific overrides
- Chained fallback: locale → base → original

#### 5.3 Sanitizer Plugin (`src/plugins/core/sanitizer.ts`)

**Purpose**: Remove invalid characters and normalize whitespace.

**Implementation**:
```typescript
const sanitizerPlugin: SlugPlugin = {
  name: 'sanitizer',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'sanitize',
      priority: 50,
      transform(input, context) {
        // Allow only: a-z, 0-9, separator
        // Collapse multiple separators
        // Trim leading/trailing separators
        return sanitized;
      }
    });
  }
};
```

**Design Decisions**:
- Regex-based filtering: `/[^a-z0-9-]+/g`
- Whitespace normalization
- Configurable separator

### 6. Optional Plugins

#### 6.1 Locale Plugins

**Pattern**: Each locale plugin extends transliteration with language-specific rules.

**German (`locale-de.ts`)**:
```typescript
export const localeDePlugin: SlugPlugin = {
  name: 'locale-de',
  version: '1.0.0',

  install(kernel) {
    // Override transliterator with German map
    // ä→ae, ö→oe, ü→ue, ß→ss
  }
};
```

**Turkish (`locale-tr.ts`)**:
```typescript
export const localeTrPlugin: SlugPlugin = {
  name: 'locale-tr',
  version: '1.0.0',

  install(kernel) {
    // Override: ı→i, İ→i, ğ→g, ş→s
  }
};
```

#### 6.2 Counter Plugin (`counter.ts`)

**Purpose**: Handle duplicate slugs with auto-increment.

**Implementation**:
```typescript
export const counterPlugin: SlugPlugin = {
  name: 'counter',
  version: '1.0.0',

  install(kernel) {
    const counts = new Map<string, number>();

    kernel.provide('counter', {
      increment(slug: string): number {
        const current = counts.get(slug) || 0;
        counts.set(slug, current + 1);
        return current;
      }
    });
  }
};
```

#### 6.3 Reserved Plugin (`reserved.ts`)

**Purpose**: Avoid generating slugs that conflict with reserved words.

#### 6.4 Truncator Plugin (`truncator.ts`)

**Purpose**: Smart truncation respecting word boundaries.

### 7. Character Maps (`src/maps/`)

**Structure**:
- `latin.ts` - Latin extended characters
- `cyrillic.ts` - Cyrillic alphabet
- `greek.ts` - Greek alphabet
- `arabic.ts` - Arabic alphabet
- `cjk.ts` - Chinese/Japanese/Korean

**Design**:
- Const Record<string, string> objects
- Tree-shakeable for minimal bundle
- Organized by character block

**Example (`latin.ts`)**:
```typescript
export const latinMap: Readonly<Record<string, string>> = {
  // Accented vowels
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  // ... complete map
} as const;
```

### 8. Utilities (`src/utils/`)

#### 8.1 Unicode Utils (`unicode.ts`)

```typescript
/**
 * Remove combining diacritical marks.
 */
export function stripDiacritics(input: string): string;

/**
 * Check if character is combining mark.
 */
export function isCombiningMark(char: string): boolean;

/**
 * Get character category.
 */
export function getCharCategory(char: string): CharCategory;
```

#### 8.2 String Utils (`string.ts`)

```typescript
/**
 * Collapse repeated characters.
 */
export function collapseRepeated(input: string, char: string): string;

/**
 * Trim characters from start/end.
 */
export function trimChars(input: string, chars: string): string;

/**
 * Truncate at word boundary.
 */
export function truncateAtWordBoundary(input: string, maxLength: number): string;
```

## Data Flow

### Slug Generation Pipeline

```
Input String
    │
    ▼
┌─────────────────┐
│  Normalizer     │  (NFD/NFC, remove diacritics)
│  Priority: 100  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Transliterator  │  (Unicode → ASCII)
│  Priority: 90   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Locale Plugin   │  (if enabled, priority: 85)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanitizer      │  (remove invalid chars)
│  Priority: 50   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Truncator      │  (if maxLength set)
│  Priority: 30   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Counter       │  (if using slugger)
│  Priority: 10   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Reserved      │  (if reserved words set)
│  Priority: 5    │
└────────┬────────┘
         │
         ▼
    Output Slug
```

## Error Handling Strategy

### Error Boundary

Each plugin wrapped in error boundary:

```typescript
try {
  result = plugin.transform(input, context);
} catch (error) {
  plugin.onError?.(error);
  kernel.emit('plugin-error', { plugin, error });
  // Continue pipeline with fallback value
}
```

### Error Types

```typescript
export enum SlugError {
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_SEPARATOR = 'INVALID_SEPARATOR',
  PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',
  CIRCULAR_DEPENDENCY = 'CIRCULAR_DEPENDENCY',
  VERSION_MISMATCH = 'VERSION_MISMATCH',
}

export class SlugException extends Error {
  constructor(
    public code: SlugError,
    message: string,
    public context?: unknown
  ) {
    super(message);
  }
}
```

## Performance Considerations

### 1. Lazy Loading

- Character maps loaded on-demand
- Optional plugins not included by default
- Kernel initialized only when needed

### 2. Caching

- Normalization results cached (LRU)
- Transliteration results cached for common chars
- Plugin instances reused

### 3. Optimization

- Minimal string allocations
- Regex compiled once per plugin
- Map lookups O(1) for character maps

## Bundle Size Strategy

### Tree-Shaking

- ES modules only
- Side effects marked in package.json
- Per-plugin imports supported

### Code Splitting

```typescript
// Core only
import { slug } from '@oxog/slug';

// With locale
import { slug } from '@oxog/slug';
import { localeTrPlugin } from '@oxog/slug/plugins';
```

### Minification Targets

- Core: < 5KB gzipped
- All plugins: < 15KB gzipped

## Testing Strategy

### Unit Tests

- Every function tested independently
- Mock dependencies
- Edge cases covered

### Integration Tests

- Full pipeline tests
- Multi-plugin composition
- Real-world scenarios

### Coverage Requirements

```
lines: 100%
functions: 100%
branches: 100%
statements: 100%
```

## Type Safety

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true
  }
}
```

### Type Guards

```typescript
export function isString(input: unknown): input is string {
  return typeof input === 'string';
}

export function isValidPlugin(input: unknown): input is SlugPlugin {
  // Type guard implementation
}
```

## LLM-Native Design

### API Naming Conventions

| Action | Method |
|--------|--------|
| Create | `create*()` |
| Get | `get()` |
| Set | `set()` |
| Use | `use()` |
| Remove | `unregister()`, `remove()` |
| List | `list()` |
| Check | `has()` |
| Reset | `reset()` |

### JSDoc Standards

Every public API has:
- Description
- @param for each parameter
- @returns with description
- @example for common usage

### Documentation Structure

1. **llms.txt** - Quick reference (< 2000 tokens)
2. **README** - Detailed guide
3. **JSDoc** - In-code reference
4. **Examples** - 15+ organized examples

## Security Considerations

### Input Validation

- Type checking on all public APIs
- Separator validation (single char, safe)
- Length limits to prevent DoS

### Output Safety

- Always URL-safe output
- No HTML/JS injection possible
- Reserved word protection

## Future Extensibility

### Plugin Extension Points

1. **Transform Stages** - Add new pipeline stages
2. **Locale Plugins** - Add new language support
3. **Custom Maps** - Override transliteration
4. **Event Handlers** - React to lifecycle events

### Versioning Strategy

- Semver for package
- Plugin version compatibility
- Deprecation warnings for breaking changes
