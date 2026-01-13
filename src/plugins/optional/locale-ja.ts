/**
 * Japanese locale plugin.
 *
 * Adds Japanese Romaji transliteration.
 *
 * @module plugins/optional/locale-ja
 */

import type { SlugPlugin } from '../../types';
import { japaneseMap } from '../../maps/cjk';

/**
 * Japanese locale plugin.
 *
 * @example
 * ```typescript
 * import { localeJaPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(localeJaPlugin);
 * kernel.slug('こんにちは'); // 'konnichiha'
 * ```
 */
export const localeJaPlugin: SlugPlugin = {
  name: 'locale-ja',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'japanese-locale',
      priority: 85,

      transform(input: string): string {
        let result = input;

        // Apply Japanese mappings
        for (const [search, replacement] of Object.entries(japaneseMap)) {
          result = result.split(search).join(replacement);
        }

        return result;
      },
    });
  },
};
