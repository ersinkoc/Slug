/**
 * Greek locale plugin.
 *
 * Adds Greek transliteration.
 *
 * @module plugins/optional/locale-el
 */

import type { SlugPlugin } from '../../types';
import { greekMap } from '../../maps/greek';

/**
 * Greek locale plugin.
 *
 * @example
 * ```typescript
 * import { localeElPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeElPlugin);
 * kernel.slug('Ελλάδα'); // 'ellada'
 * ```
 */
export const localeElPlugin: SlugPlugin = {
  name: 'locale-el',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'greek-locale',
      priority: 85,

      transform(input: string): string {
        let result = input;

        // Apply Greek mappings
        for (const [search, replacement] of Object.entries(greekMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
