/**
 * Truncation example.
 *
 * Run with: npx tsx examples/04-advanced/truncation.ts
 */

import { slug } from '../../src/index.ts';

// Word boundary mode (default)
console.log(slug('This is a very long title that needs truncation', { maxLength: 20 })); // this-is-a-very-long

// Strict mode
console.log(slug('This is a very long title', { maxLength: 15, strict: true })); // this-is-a-very

// No truncation needed
console.log(slug('Short', { maxLength: 20 })); // short

// Very short limit
console.log(slug('Hello World Test', { maxLength: 10 })); // hello-world
