/**
 * Arabic character transliteration map.
 *
 * Includes basic Arabic alphabet transliteration.
 *
 * @module maps/arabic
 */

/**
 * Arabic to ASCII transliteration map.
 *
 * Based on common Arabic-to-Latin transliteration standards.
 * Note that short vowels (fatḥa, ḍamma, kasra) are omitted as they
 * are typically not written in standard Arabic text.
 */
export const arabicMap: Readonly<Record<string, string>> = {
  // Consonants
  'ا': 'a',
  'أ': 'a',
  'إ': 'i',
  'آ': 'aa',
  'ب': 'b',
  'ة': 't',
  'ت': 't',
  'ث': 'th',
  'ج': 'j',
  'ح': 'h',
  'خ': 'kh',
  'د': 'd',
  'ذ': 'dh',
  'ر': 'r',
  'ز': 'z',
  'س': 's',
  'ش': 'sh',
  'ص': 's',
  'ض': 'd',
  'ط': 't',
  'ظ': 'z',
  'ع': 'a',
  'غ': 'gh',
  'ف': 'f',
  'ق': 'q',
  'ك': 'k',
  'ل': 'l',
  'م': 'm',
  'ن': 'n',
  'ه': 'h',
  'و': 'w',
  'ؤ': 'u',
  'ي': 'y',
  'ئ': 'i',
  'ى': 'a',

  // Ligatures
  'لا': 'la',

  // Persian/Urdu variants
  'پ': 'p',
  'چ': 'ch',
  'ژ': 'zh',
  'گ': 'g',

  // Other variants
  'ڨ': 'g',
  'ڤ': 'v',
} as const;

/**
 * Persian (Farsi) locale-specific map.
 *
 * Persian uses the Arabic script with some additional letters.
 */
export const persianMap: Readonly<Record<string, string>> = {
  ...arabicMap,
  // Persian has some pronunciation differences
  'ك': 'k',
  'ی': 'y',
} as const;

/**
 * Urdu locale-specific map.
 *
 * Urdu uses the Arabic script with additional letters for
 * sounds not present in Arabic.
 */
export const urduMap: Readonly<Record<string, string>> = {
  ...arabicMap,
  // Urdu-specific letters
  'ٹ': 't',
  'ڈ': 'd',
  'ڑ': 'r',
  'ں': 'n',
  'ھ': 'h',
} as const;
