/**
 * Multiple locales in one application.
 *
 * Run with: npx tsx examples/02-locales/multi-locale.ts
 */

import { slug } from '../../src/index.ts';

// Different locales for different languages
const germanTitle = 'Die Größe des Universums';
const turkishTitle = 'Türkçe Öğreniyorum';
const russianTitle = 'Привет мир';

console.log('German:', slug(germanTitle, { locale: 'de' })); // die-groesse-des-universums
console.log('Turkish:', slug(turkishTitle, { locale: 'tr' })); // turkce-ogreniyorum
console.log('Russian:', slug(russianTitle, { locale: 'ru' })); // privet-mir
