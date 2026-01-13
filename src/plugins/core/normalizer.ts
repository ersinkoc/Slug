/**
 * Normalizer plugin.
 *
 * Handles Unicode normalization (NFD/NFC) and diacritic removal.
 *
 * @module plugins/core/normalizer
 */

import type { SlugContext, SlugPlugin, TransformStage } from '../../types';
import { stripDiacritics, normalizeNFD, normalizeNFC } from '../../utils/unicode';

/**
 * Create the normalizer plugin.
 *
 * This plugin:
 * 1. Normalizes Unicode to NFD (decomposed form)
 * 2. Removes combining diacritical marks
 * 3. Normalizes back to NFC (composed form)
 *
 * @example
 * ```typescript
 * import { normalizerPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(normalizerPlugin);
 *
 * // Or use the core plugins bundle
 * import { corePlugins } from '@oxog/slug/plugins';
 * kernel.use(...corePlugins);
 * ```
 */
export const normalizerPlugin: SlugPlugin = {
  name: 'normalizer',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'normalize',
      priority: 100, // Run first

      transform(input: string): string {
        // First, decompose characters into base + combining marks
        const decomposed = normalizeNFD(input);

        // Remove combining diacritical marks
        const withoutMarks = stripDiacritics(decomposed);

        // Recompose for canonical form
        return normalizeNFC(withoutMarks);
      },
    } as TransformStage);
  },
};
