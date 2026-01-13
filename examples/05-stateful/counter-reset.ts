/**
 * Counter reset example.
 *
 * Run with: npx tsx examples/05-stateful/counter-reset.ts
 */

import { createSlugger } from '../../src/index.ts';

// Create a slugger instance
const slugger = createSlugger();

// Generate some slugs
slugger.slug('Hello World');
slugger.slug('Hello World');
slugger.slug('Hello World');

console.log('Count:', slugger.count('hello-world')); // 3

// Reset the counter
slugger.reset();

console.log('After reset:');
console.log('Count:', slugger.count('hello-world')); // 0
console.log('Has hello-world:', slugger.has('hello-world')); // false

// Start fresh
console.log(slugger.slug('Hello World')); // hello-world
