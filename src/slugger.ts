/**
 * Stateful slugger for duplicate handling.
 *
 * @module slugger
 */

import type { SlugOptions, Slugger as SluggerInterface } from './types';
import { createKernel } from './kernel';
import { corePlugins } from './plugins/core/index';
import { reservedPlugin } from './plugins/optional/index';

/**
 * Slugger implementation class.
 *
 * Maintains a history of generated slugs and automatically
 * appends counters to duplicates.
 *
 * @internal
 */
class SluggerImpl implements SluggerInterface {
  #kernel = createKernel();
  #history: Map<string, number> = new Map();
  #slugs: Set<string> = new Set();

  constructor() {
    this.#kernel.use(...corePlugins, reservedPlugin);
  }

  /**
   * Generate a slug, handling duplicates.
   */
  slug(input: string, options?: SlugOptions): string {
    // Generate base slug
    const base = this.#kernel.slug(input, options);

    // Check if it exists
    if (!this.#slugs.has(base)) {
      this.#slugs.add(base);
      this.#history.set(base, 1);
      return base;
    }

    // Get separator from options, default to '-'
    const separator = options?.separator ?? '-';

    // Find the next available number
    let count = this.#history.get(base) ?? 1;
    let candidate = `${base}${separator}${count}`;

    while (this.#slugs.has(candidate)) {
      count++;
      candidate = `${base}${separator}${count}`;
    }

    // Add to history
    this.#slugs.add(candidate);
    this.#history.set(base, count + 1);

    return candidate;
  }

  /**
   * Check if a slug exists in the history.
   */
  has(slug: string): boolean {
    return this.#slugs.has(slug);
  }

  /**
   * List all generated slugs.
   */
  list(): string[] {
    return Array.from(this.#slugs);
  }

  /**
   * Reset slug history.
   */
  reset(): void {
    this.#history.clear();
    this.#slugs.clear();
  }

  /**
   * Get count for a base slug.
   */
  count(baseSlug: string): number {
    return this.#history.get(baseSlug) ?? 0;
  }
}

/**
 * Create a stateful slugger instance.
 *
 * A slugger maintains a history of generated slugs and automatically
 * appends incrementing counters to duplicates.
 *
 * @returns A new slugger instance
 *
 * @example
 * ```typescript
 * import { createSlugger } from '@oxog/slug';
 *
 * const slugger = createSlugger();
 *
 * // Generate unique slugs
 * slugger.slug('Hello World');  // 'hello-world'
 * slugger.slug('Hello World');  // 'hello-world-1'
 * slugger.slug('Hello World');  // 'hello-world-2'
 *
 * // Check existence
 * slugger.has('hello-world');   // true
 * slugger.has('goodbye-world'); // false
 *
 * // List all slugs
 * slugger.list();  // ['hello-world', 'hello-world-1', 'hello-world-2']
 *
 * // Get count for base slug
 * slugger.count('hello-world'); // 3
 *
 * // Reset history
 * slugger.reset();
 * slugger.slug('Hello World');  // 'hello-world' (starts over)
 * ```
 */
export function createSlugger(): SluggerInterface {
  return new SluggerImpl();
}
