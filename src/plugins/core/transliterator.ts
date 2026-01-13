/**
 * Transliterator plugin.
 *
 * Handles Unicode to ASCII character mapping using character maps.
 *
 * @module plugins/core/transliterator
 */

import type { SlugContext, SlugPlugin, TransformContext, TransformStage } from '../../types';
import { latinMap } from '../../maps/latin';
import { cyrillicMap } from '../../maps/cyrillic';
import { greekMap } from '../../maps/greek';
import { arabicMap } from '../../maps/arabic';
import { chineseMap, japaneseMap, koreanMap } from '../../maps/cjk';
import { getMapForLocale } from '../../maps/index';

/**
 * Combined base transliteration map.
 *
 * Includes Latin extended, Cyrillic, Greek, Arabic, and basic CJK.
 */
const baseTransliterationMap: Readonly<Record<string, string>> = {
  ...latinMap,
  ...cyrillicMap,
  ...greekMap,
  ...arabicMap,
  ...chineseMap,
  ...japaneseMap,
  ...koreanMap,
};

/**
 * Transliterate a string using the provided map.
 *
 * @param input - String to transliterate
 * @param map - Transliteration map
 * @returns Transliterated string
 *
 * @internal
 */
function transliterate(input: string, map: Record<string, string>): string {
  let result = '';

  // First pass: replace multi-character sequences
  let processed = input;
  const sortedEntries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);

  for (const [search, replacement] of sortedEntries) {
    processed = processed.split(search).join(replacement);
  }

  result = processed;

  return result;
}

/**
 * Create the transliterator plugin.
 *
 * This plugin transliterates Unicode characters to ASCII equivalents.
 * When a locale is specified, it first applies locale-specific rules,
 * then falls back to the base map.
 *
 * @example
 * ```typescript
 * import { transliteratorPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(transliteratorPlugin);
 *
 * // With locale
 * kernel.slug('Größe', { locale: 'de' }); // 'groesse'
 * ```
 */
export const transliteratorPlugin: SlugPlugin = {
  name: 'transliterator',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'transliterate',
      priority: 110, // Run before normalizer to handle locale-specific mappings

      transform(input: string, context: TransformContext): string {
        const { locale } = context.options;

        // Start with base map
        let map: Record<string, string> = { ...baseTransliterationMap };

        // Apply locale-specific overrides if locale is specified
        if (locale) {
          const localeMap = getMapForLocale(locale);
          if (localeMap) {
            // Locale map takes precedence (must come last in spread)
            map = { ...map, ...localeMap };
          }
        }

        return transliterate(input, map);
      },
    } as TransformStage);
  },
};
