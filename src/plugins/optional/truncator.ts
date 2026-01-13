/**
 * Truncator plugin.
 *
 * Smart truncation with word boundary respect.
 *
 * @module plugins/optional/truncator
 */

import type { SlugPlugin, TransformContext } from '../../types';
import { truncateAtWordBoundary, isSeparator } from '../../utils/string';

/**
 * Create the truncator plugin.
 *
 * This plugin truncates slugs to a maximum length while respecting
 * word boundaries (unless strict mode is enabled).
 *
 * @example
 * ```typescript
 * import { truncatorPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(truncatorPlugin);
 *
 * // Word boundary mode (default)
 * kernel.slug('This is a very long title', { maxLength: 15 });
 * // 'this-is-a-very'
 *
 * // Strict mode (exact cut)
 * kernel.slug('This is a very long title', {
 *   maxLength: 15,
 *   strict: true
 * });
 * // 'this-is-a-very'
 * ```
 */
export const truncatorPlugin: SlugPlugin = {
  name: 'truncator',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'truncate',
      priority: 30, // Run after most transforms

      transform(input: string, context: TransformContext): string {
        const { maxLength, strict } = context.options;

        // Skip if no maxLength set
        if (!maxLength || maxLength >= input.length) {
          return input;
        }

        let result = truncateAtWordBoundary(input, maxLength, strict);

        // Trim trailing separators for clean slugs
        while (result.length > 0 && isSeparator(result[result.length - 1]!)) {
          result = result.slice(0, -1);
        }

        return result;
      },
    });
  },
};
