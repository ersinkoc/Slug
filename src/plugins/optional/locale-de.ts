/**
 * German locale plugin.
 *
 * Adds German-specific transliteration rules:
 * - ä → ae
 * - ö → oe
 * - ü → ue
 * - ß → ss
 *
 * @module plugins/optional/locale-de
 */

import type { SlugPlugin } from '../../types';
import { germanMap } from '../../maps/latin';

/**
 * German locale plugin.
 *
 * @example
 * ```typescript
 * import { localeDePlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeDePlugin);
 * kernel.slug('Größe'); // 'groesse'
 * kernel.slug('Über'); // 'ueber'
 * ```
 */
export const localeDePlugin: SlugPlugin = {
  name: 'locale-de',
  version: '1.0.0',

  install(kernel) {
    // Override transliteration with German map
    kernel.registerTransform({
      name: 'german-locale',
      priority: 120, // Run BEFORE base transliterator

      transform(input: string): string {
        let result = input;

        // Apply German-specific mappings
        for (const [search, replacement] of Object.entries(germanMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
