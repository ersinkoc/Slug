/**
 * Chinese locale plugin.
 *
 * Adds Chinese Pinyin transliteration.
 *
 * @module plugins/optional/locale-zh
 */

import type { SlugPlugin } from '../../types';
import { chineseMap } from '../../maps/cjk';

/**
 * Chinese locale plugin.
 *
 * @example
 * ```typescript
 * import { localeZhPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeZhPlugin);
 * kernel.slug('北京'); // 'bei-jing'
 * ```
 */
export const localeZhPlugin: SlugPlugin = {
  name: 'locale-zh',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'chinese-locale',
      priority: 85,

      transform(input: string): string {
        let result = input;

        // Apply Chinese mappings
        for (const [search, replacement] of Object.entries(chineseMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
