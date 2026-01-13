/**
 * Reserved word plugin.
 *
 * Avoids generating slugs that conflict with reserved words.
 *
 * @module plugins/optional/reserved
 */

import type { SlugPlugin, TransformContext } from '../../types';

/**
 * Create the reserved word plugin.
 *
 * This plugin checks if the generated slug matches a reserved word,
 * and if so, appends a suffix (default: '-1').
 *
 * @example
 * ```typescript
 * import { reservedPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(reservedPlugin);
 * kernel.slug('admin', { reserved: ['admin'] }); // 'admin-1'
 *
 * // With custom suffix
 * kernel.slug('admin', {
 *   reserved: ['admin'],
 *   reservedSuffix: '-page'
 * }); // 'admin-page'
 * ```
 */
export const reservedPlugin: SlugPlugin = {
  name: 'reserved',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'check-reserved',
      priority: 5, // Run last

      transform(input: string, context: TransformContext): string {
        const { reserved, reservedSuffix, lowercase, separator } = context.options;

        // Skip if no reserved words configured
        if (!reserved || reserved.length === 0) {
          return input;
        }

        // Split input into words and check each word
        const sep = separator || '-';
        const words = input.split(sep);

        // Check if any word matches a reserved word
        for (let i = 0; i < words.length; i++) {
          const word = words[i]!;
          // If lowercase is enabled, check against lowercased version
          const checkWord = lowercase ? word.toLowerCase() : word;
          if (reserved.includes(checkWord)) {
            // Replace the reserved word with the suffixed version
            words[i] = `${word}${reservedSuffix}`;
          }
        }

        return words.join(sep);
      },
    });
  },
};
