/**
 * Plugins export module.
 *
 * Exports all plugins for selective importing.
 *
 * @packageDocumentation
 */

// Core plugins
export {
  normalizerPlugin,
  transliteratorPlugin,
  sanitizerPlugin,
  corePlugins,
} from './core/index';

// Optional plugins
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
  // All optional plugins
  optionalPlugins,
} from './optional/index';
