/**
 * Cyrillic character transliteration map.
 *
 * Includes Russian, Ukrainian, Belarusian, Bulgarian, Serbian,
 * and Macedonian alphabets.
 *
 * @module maps/cyrillic
 */

/**
 * Russian Cyrillic to ASCII transliteration map.
 *
 * Based on the BGN/PCGN standard for Russian transliteration.
 * The hard sign (ъ) and soft sign (ь) are removed as they
 * don't have direct equivalents.
 */
export const cyrillicMap: Readonly<Record<string, string>> = {
  // Russian lowercase
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'y',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'kh',
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'shch',
  'ъ': '',
  'ы': 'y',
  'ь': '',
  'э': 'e',
  'ю': 'yu',
  'я': 'ya',

  // Russian uppercase
  'А': 'A',
  'Б': 'B',
  'В': 'V',
  'Г': 'G',
  'Д': 'D',
  'Е': 'E',
  'Ё': 'Yo',
  'Ж': 'Zh',
  'З': 'Z',
  'И': 'I',
  'Й': 'Y',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'О': 'O',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'У': 'U',
  'Ф': 'F',
  'Х': 'Kh',
  'Ц': 'Ts',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Shch',
  'Ъ': '',
  'Ы': 'Y',
  'Ь': '',
  'Э': 'E',
  'Ю': 'Yu',
  'Я': 'Ya',

  // Ukrainian-specific letters
  'ґ': 'g',
  'є': 'ye',
  'і': 'i',
  'ї': 'yi',
  'Ґ': 'G',
  'Є': 'Ye',
  'І': 'I',
  'Ї': 'Yi',

  // Belarusian-specific letters
  'ў': 'u',
  'Ў': 'U',

  // Serbian-specific letters
  'ђ': 'dj',
  'ј': 'j',
  'љ': 'lj',
  'њ': 'nj',
  'ћ': 'c',
  'џ': 'dz',
  'Ђ': 'Dj',
  'Ј': 'J',
  'Љ': 'Lj',
  'Њ': 'Nj',
  'Ћ': 'C',
  'Џ': 'Dz',

  // Macedonian-specific letters
  'ѓ': 'g',
  'Ѓ': 'G',
  'ќ': 'k',
  'Ќ': 'K',

  // Bulgarian-specific variants
  // (mostly same as Russian with some pronunciation differences)
} as const;

/**
 * Ukrainian locale-specific map.
 *
 * Ukrainian has some differences from Russian:
 * - г → h (not g)
 * - ґ → g
 * - и → y (not i)
 * - і → i
 * - ї → yi
 * - є → ye
 */
export const ukrainianMap: Readonly<Record<string, string>> = {
  ...cyrillicMap,
  // Override for Ukrainian pronunciation
  'г': 'h',
  'Г': 'H',
} as const;

/**
 * Belarusian locale-specific map.
 *
 * Belarusian has:
 * - ў → u (short u)
 */
export const belarusianMap: Readonly<Record<string, string>> = {
  ...cyrillicMap,
  'ў': 'u',
  'Ў': 'U',
} as const;

/**
 * Bulgarian locale-specific map.
 *
 * Bulgarian is similar to Russian but with some pronunciation differences.
 */
export const bulgarianMap: Readonly<Record<string, string>> = {
  ...cyrillicMap,
} as const;

/**
 * Serbian locale-specific map.
 *
 * Serbian uses both Cyrillic and Latin scripts, and has some unique letters.
 */
export const serbianMap: Readonly<Record<string, string>> = {
  ...cyrillicMap,
} as const;

/**
 * Macedonian locale-specific map.
 *
 * Macedonian has some unique letters not found in Russian.
 */
export const macedonianMap: Readonly<Record<string, string>> = {
  ...cyrillicMap,
} as const;
