/**
 * Database slug example.
 *
 * Run with: npx tsx examples/06-integrations/database-slugs.ts
 */

import { createSlugger } from '../../src/index.ts';

// Simulated database records
const records = [
  { id: 1, title: 'My First Post' },
  { id: 2, title: 'My First Post' }, // Duplicate title
  { id: 3, title: 'My First Post' }, // Duplicate title
];

// Use slugger to ensure unique slugs in database
const slugger = createSlugger();

for (const record of records) {
  const slug = slugger.slug(record.title);
  console.log(`INSERT INTO posts (id, title, slug) VALUES (${record.id}, '${record.title}', '${slug}')`);
}

// Output:
// INSERT INTO posts (id, title, slug) VALUES (1, 'My First Post', 'my-first-post')
// INSERT INTO posts (id, title, slug) VALUES (2, 'My First Post', 'my-first-post-1')
// INSERT INTO posts (id, title, slug) VALUES (3, 'My First Post', 'my-first-post-2')
