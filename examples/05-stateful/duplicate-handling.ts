/**
 * Duplicate handling example.
 *
 * Run with: npx tsx examples/05-stateful/duplicate-handling.ts
 */

import { createSlugger } from '../../src/index.ts';

// Create a slugger instance
const slugger = createSlugger();

// Generate unique slugs
console.log(slugger.slug('Hello World')); // hello-world
console.log(slugger.slug('Hello World')); // hello-world-1
console.log(slugger.slug('Hello World')); // hello-world-2

// Different inputs are tracked separately
console.log(slugger.slug('Goodbye World')); // goodbye-world
console.log(slugger.slug('Hello World')); // hello-world-3
