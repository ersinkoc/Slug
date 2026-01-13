/**
 * Arabic locale plugin.
 *
 * Adds Arabic transliteration.
 *
 * @module plugins/optional/locale-ar
 */

import type { SlugPlugin } from '../../types';
import { arabicMap } from '../../maps/arabic';

/**
 * Arabic locale plugin.
 *
 * @example
 * ```typescript
 * import { localeArPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeArPlugin);
 * kernel.slug('مرحبا'); // 'mrhba'
 * ```
 */
export const localeArPlugin: SlugPlugin = {
  name: 'locale-ar',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'arabic-locale',
      priority: 85,

      transform(input: string): string {
        let result = input;

        // Apply Arabic mappings
        for (const [search, replacement] of Object.entries(arabicMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
