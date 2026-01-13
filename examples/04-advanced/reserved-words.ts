/**
 * Reserved words example.
 *
 * Run with: npx tsx examples/04-advanced/reserved-words.ts
 */

import { slug } from '../../src/index.ts';

// Default reserved suffix
console.log(slug('admin', { reserved: ['admin', 'api', 'login'] })); // admin-1
console.log(slug('api', { reserved: ['admin', 'api'] })); // api-1

// Custom reserved suffix
console.log(slug('admin', { reserved: ['admin'], reservedSuffix: '-page' })); // admin-page
console.log(slug('admin', { reserved: ['admin'], reservedSuffix: '-duplicate' })); // admin-duplicate

// Not in reserved list
console.log(slug('user', { reserved: ['admin', 'api'] })); // user

// With reserved and locale
console.log(slug('admin Größe', { reserved: ['admin'], locale: 'de' })); // admin-groesse
