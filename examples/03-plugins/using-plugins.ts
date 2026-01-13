/**
 * Using plugins example.
 *
 * Run with: npx tsx examples/03-plugins/using-plugins.ts
 */

import { createKernel } from '../../src/index.ts';
import { corePlugins } from '../../src/index.ts';
import { localeDePlugin } from '../../src/index.ts';

// Create kernel and register plugins
const kernel = createKernel();
kernel.use(...corePlugins);
kernel.use(localeDePlugin);

// Generate slug with plugins
console.log(kernel.slug('Größe Welt')); // groesse-welt
console.log(kernel.slug('Über Alles')); // ueber-alles
