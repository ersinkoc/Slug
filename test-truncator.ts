import { truncateAtWordBoundary } from './src/utils/string.ts';

// Test the truncator
const input = 'Groesse-Uebermass';
console.log('Input:', input, 'length:', input.length);
console.log('maxLength 15:', truncateAtWordBoundary(input, 15));
console.log('maxLength 14:', truncateAtWordBoundary(input, 14));
console.log('Expected for maxLength 15: Groesse-Ueber (14 chars)');
