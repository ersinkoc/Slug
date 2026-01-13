# @oxog/slug

> Zero-dependency URL slug generator with Unicode transliteration and language-aware transformations.

@oxog/slug converts any string into URL-safe slugs with comprehensive Unicode support. It handles transliteration from any language to ASCII, applies locale-specific rules (German ü→ue, Turkish ı→i, Russian transliteration), manages duplicates, protects reserved words, and respects word boundaries when truncating. The micro-kernel architecture allows extending with custom locale rules and transformation plugins.

## Features

- **Zero Dependencies** - No runtime dependencies, works everywhere
- **Unicode Support** - Transliteration from any language to ASCII
- **Locale-Specific Rules** - German, Turkish, Russian, Arabic, Chinese, Japanese, Greek, and more
- **Duplicate Handling** - Stateful slugger with auto-increment
- **Smart Truncation** - Respects word boundaries when limiting length
- **Reserved Words** - Avoid conflicts with reserved words
- **Plugin System** - Micro-kernel architecture for extensibility

## Installation

```bash
npm install @oxog/slug
```

## Quick Start

```typescript
import { slug } from '@oxog/slug';

// Basic usage
slug('Hello World!');           // 'hello-world'

// With locale
slug('Größe', { locale: 'de' }); // 'groesse'

// With custom separator
slug('Hello World', { separator: '_' });  // 'hello_world'
```

## API Reference

### `slug(input, options?)`

Generate a URL slug from any string.

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `separator` | `string` | `'-'` | Separator between words |
| `lowercase` | `boolean` | `true` | Convert to lowercase |
| `locale` | `string` | `undefined` | Locale for language-specific rules |
| `maxLength` | `number` | `undefined` | Maximum slug length |
| `strict` | `boolean` | `false` | Cut exactly at maxLength |
| `replacements` | `object` | `{}` | Custom replacement map |
| `reserved` | `string[]` | `[]` | Reserved words to avoid |
| `reservedSuffix` | `string` | `'-1'` | Suffix for reserved words |
| `trim` | `boolean` | `true` | Trim leading/trailing separators |

### `createSlugger()`

Create a stateful slugger instance for handling duplicates.

```typescript
const slugger = createSlugger();

slugger.slug('Hello World');  // 'hello-world'
slugger.slug('Hello World');  // 'hello-world-1'
slugger.slug('Hello World');  // 'hello-world-2'

slugger.has('hello-world');   // true
slugger.list();               // ['hello-world', 'hello-world-1', ...]
slugger.count('hello-world'); // 3
slugger.reset();              // Clear history
```

### `createKernel()`

Create a kernel for advanced plugin usage.

```typescript
const kernel = createKernel();
kernel.use(...corePlugins, localeDePlugin);
kernel.slug('Größe'); // 'groesse'
```

## Examples

### Unicode Transliteration

```typescript
slug('Héllo Wörld!');        // 'hello-world'
slug('北京欢迎你');           // 'bei-jing-huan-ying-ni'
slug('Привет мир');          // 'privet-mir'
slug('مرحبا بالعالم');        // 'mrhba-balalm'
slug('こんにちは');           // 'konnichiha'
```

### Locale-Specific Rules

```typescript
// German: ä→ae, ö→oe, ü→ue, ß→ss
slug('Größe', { locale: 'de' });     // 'groesse'

// Turkish: ı→i, İ→i, ğ→g, ş→s, ç→c
slug('Türkçe İçerik', { locale: 'tr' }); // 'turkce-icerik'

// Russian: full transliteration
slug('Москва', { locale: 'ru' });    // 'moskva'
```

### Custom Replacements

```typescript
slug('C++ & C# Code', {
  replacements: {
    '++': 'pp',
    '#': 'sharp',
    '&': 'and'
  }
}); // 'cpp-and-csharp-code'
```

### Duplicate Handling

```typescript
const slugger = createSlugger();

slugger.slug('Hello World');  // 'hello-world'
slugger.slug('Hello World');  // 'hello-world-1'
slugger.slug('Hello World');  // 'hello-world-2'

slugger.reset();
slugger.slug('Hello World');  // 'hello-world'
```

## Plugins

### Core Plugins (Always Loaded)

- **normalizer** - Unicode normalization (NFD/NFC)
- **transliterator** - Unicode to ASCII transliteration
- **sanitizer** - Invalid character removal

### Optional Plugins (Opt-in)

```typescript
import {
  localeDePlugin,
  localeTrPlugin,
  localeRuPlugin,
  counterPlugin,
  reservedPlugin,
  truncatorPlugin
} from '@oxog/slug/plugins';

const kernel = createKernel();
kernel.use(
  ...corePlugins,
  localeDePlugin,    // German rules
  truncatorPlugin    // Smart truncation
);
```

## License

MIT © Ersin Koç

## Links

- **Documentation**: https://slug.oxog.dev
- **GitHub**: https://github.com/ersinkoc/slug
- **NPM**: https://www.npmjs.com/package/@oxog/slug
