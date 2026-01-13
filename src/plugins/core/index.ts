/**
 * Core plugins bundle.
 *
 * Exports all core plugins that are always loaded.
 *
 * @module plugins/core
 */

import { normalizerPlugin } from './normalizer';
import { transliteratorPlugin } from './transliterator';
import { sanitizerPlugin } from './sanitizer';

// Re-export for convenience
export { normalizerPlugin, transliteratorPlugin, sanitizerPlugin };

/**
 * Array of all core plugins.
 *
 * Use this to easily register all core plugins at once.
 *
 * @example
 * ```typescript
 * import { corePlugins } from '@oxog/slug/plugins';
 *
 * const kernel = createKernel();
 * kernel.use(...corePlugins);
 * ```
 */
export const corePlugins = [normalizerPlugin, transliteratorPlugin, sanitizerPlugin] as const;
