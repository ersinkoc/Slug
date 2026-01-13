/**
 * Product URLs example.
 *
 * Run with: npx tsx examples/07-real-world/product-urls.ts
 */

import { slug } from '../../src/index.ts';

// E-commerce product names
const products = [
  'Apple iPhone 15 Pro Max 256GB',
  'Sony WH-1000XM5 Wireless Headphones',
  'Samsung 4K Smart TV 65 Inch',
  'Dell XPS 15 Laptop Intel Core i7',
  'Logitech MX Master 3S Mouse',
];

for (const product of products) {
  const url = slug(product, { maxLength: 60 });
  console.log(`${product}`);
  console.log(`  → https://store.example.com/product/${url}\n`);
}
