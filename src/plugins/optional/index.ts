/**
 * Optional plugins bundle.
 *
 * Exports all optional (opt-in) plugins.
 *
 * @module plugins/optional
 */

// Import all plugins first
import { localeDePlugin } from './locale-de';
import { localeTrPlugin } from './locale-tr';
import { localeRuPlugin } from './locale-ru';
import { localeArPlugin } from './locale-ar';
import { localeZhPlugin } from './locale-zh';
import { localeJaPlugin } from './locale-ja';
import { localeElPlugin } from './locale-el';
import { counterPlugin } from './counter';
import { reservedPlugin } from './reserved';
import { truncatorPlugin } from './truncator';

// Re-export for convenience
export {
  // Locale plugins
  localeDePlugin,
  localeTrPlugin,
  localeRuPlugin,
  localeArPlugin,
  localeZhPlugin,
  localeJaPlugin,
  localeElPlugin,
  // Utility plugins
  counterPlugin,
  reservedPlugin,
  truncatorPlugin,
};

/**
 * All optional plugins as an array.
 *
 * @example
 * ```typescript
 * import { optionalPlugins } from '@oxog/slug/plugins';
 *
 * // Register all optional plugins
 * kernel.use(...optionalPlugins);
 * ```
 */
export const optionalPlugins = [
  localeDePlugin,
  localeTrPlugin,
  localeRuPlugin,
  localeArPlugin,
  localeZhPlugin,
  localeJaPlugin,
  localeElPlugin,
  counterPlugin,
  reservedPlugin,
  truncatorPlugin,
] as const;
