/**
 * Different separator types.
 *
 * Run with: npx tsx examples/01-basic/separator-types.ts
 */

import { slug } from '../../src/index.ts';

const text = 'Hello World Test';

console.log('Dash:', slug(text, { separator: '-' })); // hello-world-test
console.log('Underscore:', slug(text, { separator: '_' })); // hello_world_test
console.log('Dot:', slug(text, { separator: '.' })); // hello.world.test
console.log('Empty:', slug(text, { separator: '' })); // helloworldtest
console.log('Space (becomes separator):', slug(text, { separator: ' ' })); // hello world test
