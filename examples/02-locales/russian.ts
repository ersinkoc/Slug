/**
 * Russian locale example.
 *
 * Run with: npx tsx examples/02-locales/russian.ts
 */

import { slug } from '../../src/index.ts';

// Russian locale handles Cyrillic
console.log(slug('Привет мир', { locale: 'ru' })); // privet-mir
console.log(slug('Москва', { locale: 'ru' })); // moskva
console.log(slug('Санкт-Петербург', { locale: 'ru' })); // sankt-peterburg
console.log(slug('Спасибо', { locale: 'ru' })); // spasibo
