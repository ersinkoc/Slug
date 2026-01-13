/**
 * Slug generation with options.
 *
 * Run with: npx tsx examples/01-basic/with-options.ts
 */

import { slug } from '../../src/index.ts';

// With lowercase: false
console.log(slug('API v2.0', { lowercase: false })); // API-v2-0
console.log(slug('iPhone Pro', { lowercase: false })); // iPhone-Pro

// With trim: false
console.log(slug('---Hello World---', { trim: false })); // -hello-world-

// With custom separator
console.log(slug('Hello World', { separator: '_' })); // hello_world
console.log(slug('Hello World', { separator: '.' })); // hello.world
console.log(slug('Hello World', { separator: '' })); // helloworld

// With maxLength
console.log(slug('This is a very long title', { maxLength: 20 })); // this-is-a-very-long

// With strict mode
console.log(slug('This is a very long title', { maxLength: 15, strict: true })); // this-is-a-very
