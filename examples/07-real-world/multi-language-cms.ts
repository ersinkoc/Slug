/**
 * Multi-language CMS example.
 *
 * Run with: npx tsx examples/07-real-world/multi-language-cms.ts
 */

import { slug } from '../../src/index.ts';

// CMS content in multiple languages
const content = [
  { lang: 'en', title: 'Welcome to Our Website' },
  { lang: 'de', title: 'Willkommen auf unserer Webseite' },
  { lang: 'tr', title: 'Web Sitemize Hoş Geldiniz' },
  { lang: 'ru', title: 'Добро пожаловать на наш сайт' },
  { lang: 'zh', title: '欢迎访问我们的网站' },
];

for (const item of content) {
  const url = slug(item.title, { locale: item.lang });
  console.log(`[${item.lang.toUpperCase()}] ${item.title}`);
  console.log(`      → https://example.com/${item.lang}/${url}\n`);
}
