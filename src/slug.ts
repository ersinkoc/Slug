/**
 * Main slug function.
 *
 * Simple functional API for common use cases.
 *
 * @module slug
 */

import type { SlugOptions } from './types';
import { createKernel } from './kernel';
import { corePlugins } from './plugins/core/index';
import { reservedPlugin, truncatorPlugin } from './plugins/optional/index';

/**
 * Generate a URL slug from any string.
 *
 * This is the main entry point for slug generation. It creates a default
 * kernel with core plugins and processes the input string.
 *
 * @param input - The string to convert to a slug
 * @param options - Optional slug generation options
 * @returns The generated slug
 *
 * @example
 * ```typescript
 * import { slug } from '@oxog/slug';
 *
 * // Basic usage
 * slug('Hello World!'); // 'hello-world'
 *
 * // With custom separator
 * slug('Hello World', { separator: '_' }); // 'hello_world'
 *
 * // With locale
 * slug('Größe', { locale: 'de' }); // 'groesse'
 * slug('İstanbul', { locale: 'tr' }); // 'istanbul'
 *
 * // With max length
 * slug('This is a very long title', { maxLength: 20 });
 * // 'this-is-a-very-long'
 *
 * // With custom replacements
 * slug('C++ Code', { replacements: { '++': 'pp' } }); // 'cpp-code'
 *
 * // With reserved words
 * slug('admin', { reserved: ['admin'] }); // 'admin-1'
 *
 * // Preserve case
 * slug('API v2.0', { lowercase: false }); // 'API-v2-0'
 * ```
 */
export function slug(input: string, options?: SlugOptions): string {
  // Create a kernel with core and commonly-used optional plugins
  const kernel = createKernel();
  kernel.use(...corePlugins, reservedPlugin, truncatorPlugin);

  // Generate and return the slug
  return kernel.slug(input, options);
}
