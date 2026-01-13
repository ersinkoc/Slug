/**
 * Plugin composition example.
 *
 * Run with: npx tsx examples/03-plugins/plugin-composition.ts
 */

import { createKernel } from '../../src/index.ts';
import { corePlugins, localeDePlugin, localeTrPlugin, truncatorPlugin } from '../../src/index.ts';

// Compose multiple plugins
const kernel = createKernel();
kernel.use(
  ...corePlugins, // Core functionality
  localeDePlugin, // German support
  localeTrPlugin, // Turkish support
  truncatorPlugin // Truncation
);

// Use with different locales
console.log('German:', kernel.slug('Größe', { locale: 'de' })); // groesse
console.log('Turkish:', kernel.slug('İstanbul', { locale: 'tr' })); // istanbul
console.log('Truncated:', kernel.slug('This is a very long title', { maxLength: 15 })); // this-is-a-very
