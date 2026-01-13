/**
 * Custom plugin example.
 *
 * Run with: npx tsx examples/03-plugins/custom-plugin.ts
 */

import { createKernel } from '../../src/index.ts';
import { corePlugins } from '../../src/index.ts';
import type { SlugPlugin } from '../../src/index.ts';

// Create a custom plugin that adds a prefix
const prefixPlugin: SlugPlugin = {
  name: 'prefix',
  version: '1.0.0',
  install(kernel) {
    kernel.registerTransform({
      name: 'add-prefix',
      priority: 1, // Run first
      transform(input: string) {
        return `prefix-${input}`;
      },
    });
  },
};

// Create kernel with custom plugin
const kernel = createKernel();
kernel.use(...corePlugins, prefixPlugin);

console.log(kernel.slug('Hello World')); // prefix-hello-world
console.log(kernel.slug('Test')); // prefix-test
