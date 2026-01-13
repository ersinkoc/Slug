/**
 * Greek character transliteration map.
 *
 * Includes Modern Greek alphabet.
 *
 * @module maps/greek
 */

/**
 * Greek to ASCII transliteration map.
 *
 * Based on ELOT 743 standard for Greek transliteration.
 */
export const greekMap: Readonly<Record<string, string>> = {
  // Vowels - lowercase
  'α': 'a',
  'ά': 'a',
  'β': 'v',
  'γ': 'g',
  'δ': 'd',
  'ε': 'e',
  'έ': 'e',
  'ζ': 'z',
  'η': 'i',
  'ή': 'i',
  'θ': 'th',
  'ι': 'i',
  'ί': 'i',
  'ϊ': 'i',
  'ΐ': 'i',
  'κ': 'k',
  'λ': 'l',
  'μ': 'm',
  'ν': 'n',
  'ξ': 'x',
  'ο': 'o',
  'ό': 'o',
  'π': 'p',
  'ρ': 'r',
  'σ': 's',
  'ς': 's',
  'τ': 't',
  'υ': 'y',
  'ύ': 'y',
  'ϋ': 'y',
  'ΰ': 'y',
  'φ': 'f',
  'χ': 'ch',
  'ψ': 'ps',
  'ω': 'o',
  'ώ': 'o',

  // Vowels - uppercase
  'Α': 'A',
  'Ά': 'A',
  'Β': 'V',
  'Γ': 'G',
  'Δ': 'D',
  'Ε': 'E',
  'Έ': 'E',
  'Ζ': 'Z',
  'Η': 'I',
  'Ή': 'I',
  'Θ': 'Th',
  'Ι': 'I',
  'Ί': 'I',
  'Ϊ': 'I',
  'Κ': 'K',
  'Λ': 'L',
  'Μ': 'M',
  'Ν': 'N',
  'Ξ': 'X',
  'Ο': 'O',
  'Ό': 'O',
  'Π': 'P',
  'Ρ': 'R',
  'Σ': 'S',
  'Τ': 'T',
  'Υ': 'Y',
  'Ύ': 'Y',
  'Ϋ': 'Y',
  'Φ': 'F',
  'Χ': 'Ch',
  'Ψ': 'Ps',
  'Ω': 'O',
  'Ώ': 'O',

  // Digraphs - lowercase
  'αι': 'ai',
  'ει': 'ei',
  'οι': 'oi',
  'υι': 'yi',
  'αυ': 'au',
  'ευ': 'eu',
  'ηυ': 'iu',
  'άι': 'ai',
  'έι': 'ei',
  'όι': 'oi',
  'ύι': 'yi',
  'άυ': 'au',
  'έυ': 'eu',
  'ήυ': 'iu',

  // Digraphs - uppercase
  'Αι': 'Ai',
  'Ει': 'Ei',
  'Οι': 'Oi',
  'Υι': 'Yi',
  'Αυ': 'Au',
  'Ευ': 'Eu',
  'Ηυ': 'Iu',
  'ΑΊ': 'Ai',
  'ΕΊ': 'Ei',
  'ΟΊ': 'Oi',
  'ΥΊ': 'Yi',
  'ΑΎ': 'Au',
  'ΕΎ': 'Eu',
  'ΗΎ': 'Iu',
} as const;

/**
 * Ancient Greek variants.
 *
 * Ancient Greek has some additional characters and different pronunciation.
 */
export const ancientGreekMap: Readonly<Record<string, string>> = {
  ...greekMap,
  // Additional Ancient Greek characters
  'ϙ': 'q',
  'ϛ': 'st',
  'ϱ': 'r',
} as const;
