/**
 * Turkish locale example.
 *
 * Run with: npx tsx examples/02-locales/turkish.ts
 */

import { slug } from '../../src/index.ts';

// Turkish locale handles special characters
console.log(slug('İstanbul', { locale: 'tr' })); // istanbul
console.log(slug('Türkçe', { locale: 'tr' })); // turkce
console.log(slug('Şişli', { locale: 'tr' })); // sisli
console.log(slug('Çay', { locale: 'tr' })); // cay
console.log(slug('Ğurur', { locale: 'tr' })); // gurur
