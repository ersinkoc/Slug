/**
 * German locale example.
 *
 * Run with: npx tsx examples/02-locales/german.ts
 */

import { slug } from '../../src/index.ts';

// German locale handles umlauts and ß
console.log(slug('Größe', { locale: 'de' })); // groesse
console.log(slug('Über', { locale: 'de' })); // ueber
console.log(slug('Straße', { locale: 'de' })); // strasse
console.log(slug('Ärmel', { locale: 'de' })); // aermel
console.log(slug('Öl', { locale: 'de' })); // oel
console.log(slug('Müller', { locale: 'de' })); // mueller
