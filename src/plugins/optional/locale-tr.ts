/**
 * Turkish locale plugin.
 *
 * Adds Turkish-specific transliteration rules:
 * - ı → i (dotless i)
 * - İ → i (dotted I)
 * - ğ → g
 * - ş → s
 * - ç → c
 *
 * @module plugins/optional/locale-tr
 */

import type { SlugPlugin } from '../../types';
import { turkishMap } from '../../maps/latin';

/**
 * Turkish locale plugin.
 *
 * @example
 * ```typescript
 * import { localeTrPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeTrPlugin);
 * kernel.slug('İstanbul'); // 'istanbul'
 * kernel.slug('Türkçe'); // 'turkce'
 * ```
 */
export const localeTrPlugin: SlugPlugin = {
  name: 'locale-tr',
  version: '1.0.0',

  install(kernel) {
    // Override transliteration with Turkish map
    kernel.registerTransform({
      name: 'turkish-locale',
      priority: 85, // Run after base transliterator

      transform(input: string): string {
        let result = input;

        // Apply Turkish-specific mappings
        for (const [search, replacement] of Object.entries(turkishMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
