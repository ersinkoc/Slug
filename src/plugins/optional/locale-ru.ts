/**
 * Russian locale plugin.
 *
 * Adds Russian Cyrillic transliteration.
 *
 * @module plugins/optional/locale-ru
 */

import type { SlugPlugin } from '../../types';
import { cyrillicMap } from '../../maps/cyrillic';

/**
 * Russian locale plugin.
 *
 * @example
 * ```typescript
 * import { localeRuPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeRuPlugin);
 * kernel.slug('Москва'); // 'moskva'
 * kernel.slug('Привет'); // 'privet'
 * ```
 */
export const localeRuPlugin: SlugPlugin = {
  name: 'locale-ru',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'russian-locale',
      priority: 85,

      transform(input: string): string {
        let result = input;

        // Apply Russian Cyrillic mappings
        for (const [search, replacement] of Object.entries(cyrillicMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
