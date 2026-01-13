/**
 * Next.js dynamic routes example.
 *
 * Run with: npx tsx examples/06-integrations/next-dynamic-routes.ts
 */

import { slug } from '../../src/index.ts';

// Generate slugs for Next.js dynamic routes
const blogPosts = [
  'Getting Started with TypeScript',
  '10 Tips for Better Code',
  'Understanding React Hooks',
];

for (const post of blogPosts) {
  const slug = slug(post);
  console.log(`/blog/posts/${slug}`);
}

// Output:
// /blog/posts/getting-started-with-typescript
// /blog/posts/10-tips-for-better-code
// /blog/posts/understanding-react-hooks

// With maxLength for URL constraints
const productPages = [
  'This is a Very Long Product Name That Should Be Shortened',
  'Another Extremely Long Title For Product Page',
];

for (const product of productPages) {
  const slug = slug(product, { maxLength: 50 });
  console.log(`/products/${slug}`);
}
