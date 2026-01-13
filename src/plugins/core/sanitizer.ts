/**
 * Sanitizer plugin.
 *
 * Removes invalid characters and normalizes whitespace/separators.
 *
 * @module plugins/core/sanitizer
 */

import type { SlugContext, SlugPlugin, TransformContext, TransformStage } from '../../types';
import { collapseRepeated, trimChars, joinWithSeparator, splitIntoWords } from '../../utils/string';
import { isAlphaNumeric } from '../../utils/string';

/**
 * Create the sanitizer plugin.
 *
 * This plugin:
 * 1. Removes all non-alphanumeric characters (except the configured separator)
 * 2. Normalizes whitespace to the separator
 * 3. Collapses repeated separators
 * 4. Trims leading/trailing separators
 *
 * @example
 * ```typescript
 * import { sanitizerPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(sanitizerPlugin);
 *
 * // With custom separator
 * kernel.slug('Hello___World', { separator: '_' }); // 'hello_world'
 * ```
 */
export const sanitizerPlugin: SlugPlugin = {
  name: 'sanitizer',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'sanitize',
      priority: 50, // Run after transliteration

      transform(input: string, context: TransformContext): string {
        const { separator, trim } = context.options;

        // Handle empty separator case (just remove non-alphanumeric)
        if (separator === '') {
          let result = '';
          for (let i = 0; i < input.length; i++) {
            const char = input[i]!;
            if (isAlphaNumeric(char)) {
              result += char;
            }
          }
          return result;
        }

        // Validate separator (must be single ASCII character)
        if (separator.length !== 1) {
          throw new Error(`Separator must be a single character, got: "${separator}"`);
        }

        // Replace all non-alphanumeric characters with separator
        let result = '';
        for (let i = 0; i < input.length; i++) {
          const char = input[i]!;
          if (isAlphaNumeric(char)) {
            result += char;
          } else {
            result += separator;
          }
        }

        // Collapse repeated separators
        result = collapseRepeated(result, separator);

        // Trim leading/trailing separators if requested
        if (trim) {
          result = trimChars(result, separator);
        }

        return result;
      },
    } as TransformStage);
  },
};
