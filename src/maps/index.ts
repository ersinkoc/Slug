/**
 * Character maps index.
 *
 * Exports all transliteration maps for easy importing.
 *
 * @module maps/index
 */

// Import maps for use in baseMap
import { latinMap } from './latin';
import { cyrillicMap } from './cyrillic';
import { greekMap } from './greek';
import { arabicMap } from './arabic';
import { chineseMap } from './cjk';
import { japaneseMap } from './cjk';
import { koreanMap } from './cjk';

// Import locale-specific maps for getMapForLocale
import {
  germanMap,
  turkishMap,
  spanishMap,
  frenchMap,
  polishMap,
  czechMap,
  hungarianMap,
  romanianMap,
  portugueseMap,
} from './latin';

import {
  ukrainianMap,
  belarusianMap,
  bulgarianMap,
  serbianMap,
  macedonianMap,
} from './cyrillic';

import { ancientGreekMap } from './greek';
import { persianMap, urduMap } from './arabic';

// Latin maps
export {
  latinMap,
  germanMap,
  turkishMap,
  spanishMap,
  frenchMap,
  polishMap,
  czechMap,
  hungarianMap,
  romanianMap,
  portugueseMap,
} from './latin';

// Cyrillic maps
export {
  cyrillicMap,
  ukrainianMap,
  belarusianMap,
  bulgarianMap,
  serbianMap,
  macedonianMap,
} from './cyrillic';

// Greek maps
export { greekMap, ancientGreekMap } from './greek';

// Arabic maps
export { arabicMap, persianMap, urduMap } from './arabic';

// CJK maps
export { chineseMap, japaneseMap, koreanMap } from './cjk';

/**
 * Get the appropriate map for a given locale.
 *
 * @param locale - Locale code (e.g., 'de', 'tr', 'ru')
 * @returns The transliteration map for the locale, or undefined
 *
 * @example
 * ```typescript
 * import { getMapForLocale } from './maps';
 *
 * const germanMap = getMapForLocale('de');
 * const turkishMap = getMapForLocale('tr');
 * const russianMap = getMapForLocale('ru');
 * ```
 */
export function getMapForLocale(locale: string): Readonly<Record<string, string>> | undefined {
  const maps: Record<string, Readonly<Record<string, string>>> = {
    // Latin locales
    de: germanMap,
    tr: turkishMap,
    es: spanishMap,
    fr: frenchMap,
    pl: polishMap,
    cs: czechMap,
    hu: hungarianMap,
    ro: romanianMap,
    pt: portugueseMap,

    // Cyrillic locales
    ru: cyrillicMap,
    uk: ukrainianMap,
    be: belarusianMap,
    bg: bulgarianMap,
    sr: serbianMap,
    mk: macedonianMap,

    // Greek locales
    el: greekMap,

    // Arabic locales
    ar: arabicMap,
    fa: persianMap,
    ur: urduMap,

    // CJK locales
    zh: chineseMap,
    ja: japaneseMap,
    ko: koreanMap,
  };

  return maps[locale];
}

/**
 * Get all available locale codes.
 *
 * @returns Array of supported locale codes
 *
 * @example
 * ```typescript
 * import { getAvailableLocales } from './maps';
 *
 * const locales = getAvailableLocales();
 * // ['de', 'tr', 'es', 'fr', 'pl', 'cs', 'hu', 'ro', 'pt', 'ru', 'uk', ...]
 * ```
 */
export function getAvailableLocales(): string[] {
  return [
    'de',
    'tr',
    'es',
    'fr',
    'pl',
    'cs',
    'hu',
    'ro',
    'pt',
    'ru',
    'uk',
    'be',
    'bg',
    'sr',
    'mk',
    'el',
    'ar',
    'fa',
    'ur',
    'zh',
    'ja',
    'ko',
  ];
}

/**
 * Combined base transliteration map.
 *
 * Includes all the common transliterations from Latin extended,
 * Cyrillic, Greek, Arabic, and basic CJK characters.
 *
 * This is the default map used when no locale is specified.
 */
export const baseMap: Readonly<Record<string, string>> = {
  // Latin (most common)
  ...latinMap,

  // Common Cyrillic (Russian alphabet)
  ...cyrillicMap,

  // Common Greek
  ...greekMap,

  // Common Arabic
  ...arabicMap,

  // Common Chinese (basic characters)
  ...chineseMap,

  // Common Japanese (basic hiragana/katakana)
  ...japaneseMap,

  // Common Korean (basic)
  ...koreanMap,
} as const;
