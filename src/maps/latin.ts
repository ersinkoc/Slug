/**
 * Latin character transliteration map.
 *
 * Includes Western European, Germanic, Nordic, Eastern European,
 * and Turkish character mappings.
 *
 * @module maps/latin
 */

/**
 * Latin extended character to ASCII transliteration map.
 *
 * This map covers:
 * - Western European accented characters (á, é, í, ó, ú, etc.)
 * - Germanic special characters (ä, ö, ü, ß)
 * - Nordic characters (ð, þ, å, ø)
 * - Eastern European (ą, ć, ę, ł, ń, ś, ź, ż)
 * - Turkish special characters (ı, ğ, ş)
 * - Various other Latin extended characters
 */
export const latinMap: Readonly<Record<string, string>> = {
  // Vowels with acute accent
  'à': 'a',
  'á': 'a',
  'â': 'a',
  'ã': 'a',
  'ä': 'a',
  'å': 'a',
  'ā': 'a',
  'ă': 'a',
  'ą': 'a',

  // Vowels with grave accent
  'È': 'E',
  'É': 'E',
  'Ê': 'E',
  'Ë': 'E',
  'è': 'e',
  'é': 'e',
  'ê': 'e',
  'ë': 'e',
  'ē': 'e',
  'ĕ': 'e',
  'ė': 'e',
  'ę': 'e',
  'ě': 'e',

  // I variants
  'Ì': 'I',
  'Í': 'I',
  'Î': 'I',
  'Ï': 'I',
  'ì': 'i',
  'í': 'i',
  'î': 'i',
  'ï': 'i',
  'ī': 'i',
  'ĭ': 'i',
  'į': 'i',
  'ı': 'i',

  // O variants
  'Ò': 'O',
  'Ó': 'O',
  'Ô': 'O',
  'Õ': 'O',
  'Ö': 'O',
  'Ø': 'O',
  'ò': 'o',
  'ó': 'o',
  'ô': 'o',
  'õ': 'o',
  'ö': 'o',
  'ø': 'o',
  'ō': 'o',
  'ŏ': 'o',
  'ő': 'o',

  // U variants
  'Ù': 'U',
  'Ú': 'U',
  'Û': 'U',
  'Ü': 'U',
  'ù': 'u',
  'ú': 'u',
  'û': 'u',
  'ü': 'u',
  'ū': 'u',
  'ŭ': 'u',
  'ű': 'u',
  'ů': 'u',

  // Y variants
  'Ý': 'Y',
  'ý': 'y',
  'ÿ': 'y',

  // C variants
  'Ç': 'C',
  'č': 'c',
  'ć': 'c',
  'ç': 'c',
  'ĉ': 'c',
  'ċ': 'c',

  // D variants
  'ď': 'd',
  'đ': 'd',
  'ð': 'd',

  // G variants
  'ğ': 'g',
  'ĝ': 'g',
  'ġ': 'g',
  'ģ': 'g',

  // H variants
  'ĥ': 'h',
  'ħ': 'h',

  // J variants
  'ĵ': 'j',

  // L variants
  'ĺ': 'l',
  'ļ': 'l',
  'ľ': 'l',
  'ł': 'l',
  'ŀ': 'l',

  // N variants
  'ñ': 'n',
  'ń': 'n',
  'ň': 'n',
  'ņ': 'n',
  'ŋ': 'n',

  // R variants
  'ŕ': 'r',
  'ř': 'r',
  'ŗ': 'r',

  // S variants
  'š': 's',
  'ş': 's',
  'ś': 's',
  'ŝ': 's',
  'ș': 's',

  // T variants
  'ť': 't',
  'ţ': 't',
  'ț': 't',
  'ŧ': 't',
  'þ': 'th',

  // W variants
  'ŵ': 'w',

  // Z variants
  'ź': 'z',
  'ż': 'z',
  'ž': 'z',

  // Ligatures
  'Æ': 'AE',
  'æ': 'ae',
  'Œ': 'OE',
  'œ': 'oe',

  // German special
  'ß': 'ss',

  // Uppercase variants
  'À': 'A',
  'Á': 'A',
  'Â': 'A',
  'Ã': 'A',
  'Ä': 'A',
  'Å': 'A',
  'Ā': 'A',
  'Ă': 'A',
  'Ą': 'A',

  'Ć': 'C',
  'Č': 'C',
  'Đ': 'D',
  'Ď': 'D',

  'Ğ': 'G',
  'Ĝ': 'G',
  'Ġ': 'G',
  'Ģ': 'G',

  'Ĥ': 'H',
  'Ħ': 'H',

  'Ĵ': 'J',

  'Ĺ': 'L',
  'Ļ': 'L',
  'Ľ': 'L',
  'Ł': 'L',
  'Ŀ': 'L',

  'Ñ': 'N',
  'Ń': 'N',
  'Ň': 'N',
  'Ņ': 'N',
  'Ŋ': 'N',

  'Ŕ': 'R',
  'Ř': 'R',
  'Ŗ': 'R',

  'Ś': 'S',
  'Ş': 'S',
  'Š': 'S',
  'Ŝ': 'S',
  'Ș': 'S',

  'Ţ': 'T',
  'Ț': 'T',
  'Ť': 'T',
  'Ŧ': 'T',
  'Þ': 'TH',

  'Ŵ': 'W',

  'Ź': 'Z',
  'Ż': 'Z',
  'Ž': 'Z',

  'İ': 'I',

  // Other special characters
  '°': 'deg',
  'ª': 'a',
  'º': 'o',
  '±': 'plus-minus',
  '²': '2',
  '³': '3',
  '¹': '1',
  'µ': 'u',
  '¶': 'P',
  '·': '-',
  '¸': ',',
  '»': '>>',
  '¼': '1-4',
  '½': '1-2',
  '¾': '3-4',
  '¿': '?',
} as const;

/**
 * German locale-specific overrides.
 *
 * German uses digraphs for umlauts:
 * - ä → ae
 * - ö → oe
 * - ü → ue
 * - ß → ss
 */
export const germanMap: Readonly<Record<string, string>> = {
  'ä': 'ae',
  'Ä': 'Ae',
  'ö': 'oe',
  'Ö': 'Oe',
  'ü': 'ue',
  'Ü': 'Ue',
  'ß': 'ss',
} as const;

/**
 * Turkish locale-specific overrides.
 *
 * Turkish has special rules for:
 * - ı → i (dotless i)
 * - İ → i (dotted I)
 * - ğ → g
 * - ş → s
 * - ç → c
 */
export const turkishMap: Readonly<Record<string, string>> = {
  'ı': 'i',
  'İ': 'i',
  'ğ': 'g',
  'Ğ': 'g',
  'ş': 's',
  'Ş': 's',
  'ç': 'c',
  'Ç': 'c',
  'ö': 'o',
  'Ö': 'o',
  'ü': 'u',
  'Ü': 'u',
} as const;

/**
 * Spanish locale-specific overrides.
 *
 * Spanish has:
 * - ñ → n
 */
export const spanishMap: Readonly<Record<string, string>> = {
  'ñ': 'n',
  'Ñ': 'N',
} as const;

/**
 * French locale-specific overrides.
 *
 * French uses ligatures:
 * - œ → oe
 * - æ → ae
 */
export const frenchMap: Readonly<Record<string, string>> = {
  'œ': 'oe',
  'Œ': 'OE',
  'æ': 'ae',
  'Æ': 'AE',
} as const;

/**
 * Polish locale-specific overrides.
 *
 * Polish has specific mappings for its special characters.
 */
export const polishMap: Readonly<Record<string, string>> = {
  'ą': 'a',
  'ć': 'c',
  'ę': 'e',
  'ł': 'l',
  'ń': 'n',
  'ó': 'o',
  'ś': 's',
  'ź': 'z',
  'ż': 'z',
  'Ą': 'A',
  'Ć': 'C',
  'Ę': 'E',
  'Ł': 'L',
  'Ń': 'N',
  'Ó': 'O',
  'Ś': 'S',
  'Ź': 'Z',
  'Ż': 'Z',
} as const;

/**
 * Czech locale-specific overrides.
 *
 * Czech has specific mappings for its special characters.
 */
export const czechMap: Readonly<Record<string, string>> = {
  'á': 'a',
  'č': 'c',
  'ď': 'd',
  'é': 'e',
  'ě': 'e',
  'í': 'i',
  'ň': 'n',
  'ó': 'o',
  'ř': 'r',
  'š': 's',
  'ť': 't',
  'ú': 'u',
  'ů': 'u',
  'ý': 'y',
  'ž': 'z',
  'Á': 'A',
  'Č': 'C',
  'Ď': 'D',
  'É': 'E',
  'Ě': 'E',
  'Í': 'I',
  'Ň': 'N',
  'Ó': 'O',
  'Ř': 'R',
  'Š': 'S',
  'Ť': 'T',
  'Ú': 'U',
  'Ů': 'U',
  'Ý': 'Y',
  'Ž': 'Z',
} as const;

/**
 * Hungarian locale-specific overrides.
 */
export const hungarianMap: Readonly<Record<string, string>> = {
  'á': 'a',
  'é': 'e',
  'í': 'i',
  'ó': 'o',
  'ö': 'o',
  'ő': 'o',
  'ú': 'u',
  'ü': 'u',
  'ű': 'u',
  'Á': 'A',
  'É': 'E',
  'Í': 'I',
  'Ó': 'O',
  'Ö': 'O',
  'Ő': 'O',
  'Ú': 'U',
  'Ü': 'U',
  'Ű': 'U',
} as const;

/**
 * Romanian locale-specific overrides.
 */
export const romanianMap: Readonly<Record<string, string>> = {
  'ă': 'a',
  'â': 'a',
  'î': 'i',
  'ș': 's',
  'ț': 't',
  'Ă': 'A',
  'Â': 'A',
  'Î': 'I',
  'Ș': 'S',
  'Ț': 'T',
} as const;

/**
 * Portuguese locale-specific overrides.
 */
export const portugueseMap: Readonly<Record<string, string>> = {
  'ã': 'a',
  'â': 'a',
  'á': 'a',
  'à': 'a',
  'é': 'e',
  'ê': 'e',
  'í': 'i',
  'ó': 'o',
  'ô': 'o',
  'õ': 'o',
  'ú': 'u',
  'ç': 'c',
  'Ã': 'A',
  'Â': 'A',
  'Á': 'A',
  'À': 'A',
  'É': 'E',
  'Ê': 'E',
  'Í': 'I',
  'Ó': 'O',
  'Ô': 'O',
  'Õ': 'O',
  'Ú': 'U',
  'Ç': 'C',
} as const;
