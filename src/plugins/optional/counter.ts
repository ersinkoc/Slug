/**
 * Counter plugin.
 *
 * Example plugin for handling duplicate slugs with auto-increment.
 *
 * @module plugins/optional/counter
 */

import type { SlugPlugin, TransformContext } from '../../types';

/**
 * Counter state for tracking duplicates.
 *
 * @internal
 */
const counterState = {
  counts: new Map<string, number>(),
};

/**
 * Create the counter plugin.
 *
 * This plugin demonstrates how to handle duplicate slugs by appending
 * an incrementing counter. Note: For actual duplicate handling in
 * your application, use the `createSlugger()` function instead.
 *
 * @example
 * ```typescript
 * import { counterPlugin } from '@oxog/slug/plugins';
 *
 * kernel.use(counterPlugin);
 * ```
 */
export const counterPlugin: SlugPlugin = {
  name: 'counter',
  version: '1.0.0',

  install(kernel) {
    kernel.registerTransform({
      name: 'append-counter',
      priority: 10, // Run near the end

      transform(input: string, context: TransformContext): string {
        const base = input;

        // Check if we've seen this slug before
        const count = counterState.counts.get(base) ?? 0;

        if (count === 0) {
          // First time seeing this slug
          counterState.counts.set(base, 1);
          return base;
        }

        // Append counter
        const result = `${base}-${count}`;
        counterState.counts.set(base, count + 1);

        return result;
      },
    });
  },

  onDestroy() {
    // Clear counts when plugin is unregistered
    counterState.counts.clear();
  },
};
