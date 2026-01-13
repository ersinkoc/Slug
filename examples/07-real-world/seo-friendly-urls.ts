/**
 * SEO-friendly URLs example.
 *
 * Run with: npx tsx examples/07-real-world\seo-friendly-urls.ts
 */

import { slug } from '../../src/index.ts';

// Generate SEO-friendly URLs
const pages = [
  { title: 'About Us', template: 'page' },
  { title: 'Contact Information', template: 'page' },
  { title: 'Terms of Service', template: 'legal' },
  { title: 'Privacy Policy', template: 'legal' },
];

for (const page of pages) {
  const url = slug(page.title, { maxLength: 50 });
  console.log(`Title: ${page.title}`);
  console.log(`Template: ${page.template}.html`);
  console.log(`URL: https://example.com/${url}\n`);
}

// With custom structure
const articles = [
  'Breaking News: Major Event Happens Today',
  'Technology: New Framework Released',
  'Sports: Team Wins Championship',
];

for (const article of articles) {
  const [category, title] = article.split(': ');
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const url = slug(`${date}-${title}`);
  console.log(`${article}`);
  console.log(`  → https://news.example.com/${category.toLowerCase()}/${url}\n`);
}
