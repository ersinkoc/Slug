/**
 * Simple slug example.
 *
 * Run with: npx tsx examples/01-basic/simple-slug.ts
 */

import { slug } from '../../src/index.ts';

// Basic slug generation
console.log(slug('Hello World!')); // hello-world
console.log(slug('Hello World')); // hello-world
console.log(slug('hello-world')); // hello-world
