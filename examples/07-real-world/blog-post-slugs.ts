/**
 * Blog post slugs example.
 *
 * Run with: npx tsx examples/07-real-world/blog-post-slugs.ts
 */

import { slug } from '../../src/index.ts';

// Real-world blog post titles
const blogPosts = [
  'Getting Started with TypeScript in 2024',
  '10 Tips for Writing Better Code',
  'Understanding React: A Complete Guide',
  'The Future of Web Development',
  'How I Built My First Startup',
  "A Developer's Guide to Machine Learning",
  'CI/CD Best Practices for Modern Applications',
];

for (const post of blogPosts) {
  const slug = slug(post);
  console.log(`${post}`);
  console.log(`  → https://myblog.com/posts/${slug}\n`);
}

// Typical output:
// Getting Started with TypeScript in 2024
//   → https://myblog.com/posts/getting-started-with-typescript-in-2024
// etc.
