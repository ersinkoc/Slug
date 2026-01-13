/**
 * Slugger instance example.
 *
 * Run with: npx tsx examples/05-stateful/slugger-instance.ts
 */

import { createSlugger } from '../../src/index.ts';

// Create a slugger instance
const slugger = createSlugger();

// Check existence
slugger.slug('Hello World');
console.log('Has hello-world:', slugger.has('hello-world')); // true
console.log('Has goodbye-world:', slugger.has('goodbye-world')); // false

// List all slugs
slugger.slug('Test');
slugger.slug('Test');
console.log('All slugs:', slugger.list()); // ['hello-world', 'test', 'test-1']

// Get count
console.log('Count for hello-world:', slugger.count('hello-world')); // 1
console.log('Count for test:', slugger.count('test')); // 2
