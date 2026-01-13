/**
 * Custom replacements example.
 *
 * Run with: npx tsx examples/04-advanced/custom-replacements.ts
 */

import { slug } from '../../src/index.ts';

// Programming language replacements
console.log(
  slug('C++ and C# Code', {
    replacements: {
      '++': 'pp',
      '#': 'sharp',
      '&': 'and',
    },
  })
); // cpp-and-csharp-code

// Social media replacements
console.log(
  slug('@user mentioned #topic', {
    replacements: {
      '@': 'at-',
      '#': 'tag-',
    },
  })
); // at-user-mentioned-tag-topic

// Company name replacements
console.log(
  slug('AT&T Inc.', {
    replacements: {
      '&': 'and',
      '.': '',
      'Inc': 'incorporated',
    },
  })
); // at-and-incorporated
