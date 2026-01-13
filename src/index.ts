/**
 * @oxog/slug - Zero-dependency URL slug generator
 *
 * A zero-dependency URL slug generator with Unicode transliteration
 * and language-aware transformations.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { slug, createSlugger, createKernel } from '@oxog/slug';
 *
 * // Simple usage
 * slug('Hello World!'); // 'hello-world'
 *
 * // With options
 * slug('Größe', { locale: 'de' }); // 'groesse'
 *
 * // Stateful slugger for duplicates
 * const slugger = createSlugger();
 * slugger.slug('title'); // 'title'
 * slugger.slug('title'); // 'title-1'
 *
 * // Advanced: kernel access
 * const kernel = createKernel();
 * kernel.use(myCustomPlugin);
 * ```
 */

// Main API
export { slug } from './slug';
export { createSlugger } from './slugger';
export { createKernel } from './kernel';

// Types
export type {
  SlugOptions,
  Slugger,
  SlugKernel,
  SlugPlugin,
  SlugContext,
  TransformContext,
  TransformStage,
  EventHandler,
  DefaultSlugOptions,
} from './types';
export { SlugError, SlugException } from './types';

// Core plugins
export {
  normalizerPlugin,
  transliteratorPlugin,
  sanitizerPlugin,
  corePlugins,
} from './plugins/core/index';

// Optional plugins
export {
  // Locale plugins
  localeDePlugin,
  localeTrPlugin,
  localeRuPlugin,
  localeArPlugin,
  localeZhPlugin,
  localeJaPlugin,
  localeElPlugin,
  // Utility plugins
  counterPlugin,
  reservedPlugin,
  truncatorPlugin,
  // All optional plugins
  optionalPlugins,
} from './plugins/optional/index';

// Maps
export {
  latinMap,
  germanMap,
  turkishMap,
  cyrillicMap,
  greekMap,
  arabicMap,
  chineseMap,
  japaneseMap,
  koreanMap,
  getMapForLocale,
  getAvailableLocales,
  baseMap,
} from './maps/index';

// Utilities
export {
  stripDiacritics,
  isCombiningMark,
  getCharCategory,
  isASCII,
  normalizeNFC,
  normalizeNFD,
} from './utils/unicode';
export {
  collapseRepeated,
  trimChars,
  truncateAtWordBoundary,
  splitIntoWords,
  isAlphaNumeric,
  isSeparator,
  escapeRegex,
  toLowerCase,
  toUpperCase,
  replaceAll,
  joinWithSeparator,
} from './utils/string';

/**
 * Version of the package.
 */
export const VERSION = '1.0.0';

/**
 * Default options for slug generation.
 *
 * @example
 * ```typescript
 * import { DEFAULT_OPTIONS } from '@oxog/slug';
 *
 * console.log(DEFAULT_OPTIONS.separator); // '-'
 * console.log(DEFAULT_OPTIONS.lowercase); // true
 * ```
 */
export const DEFAULT_OPTIONS = {
  separator: '-',
  lowercase: true,
  locale: undefined as string | undefined,
  maxLength: undefined as number | undefined,
  strict: false,
  replacements: {},
  reserved: [],
  reservedSuffix: '-1',
  trim: true,
} as const;
