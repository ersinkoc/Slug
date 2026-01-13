/**
 * Markdown headings example.
 *
 * Run with: npx tsx examples/06-integrations/markdown-headings.ts
 */

import { slug } from '../../src/index.ts';

// Generate anchor IDs for markdown headings
const markdownHeadings = [
  '# Introduction',
  '## Getting Started',
  '### Advanced Usage',
  '## API Reference',
];

for (const heading of markdownHeadings) {
  // Remove # and leading space, then slugify
  const text = heading.replace(/^#+\s*/, '');
  const anchor = slug(text);
  console.log(`${heading} -> #${anchor}`);
}

// Output:
// # Introduction -> #introduction
// ## Getting Started -> #getting-started
// ### Advanced Usage -> #advanced-usage
// ## API Reference -> #api-reference
