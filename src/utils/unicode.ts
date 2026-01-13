/**
 * Unicode utility functions.
 *
 * @module utils/unicode
 */

/**
 * Character category for Unicode classification.
 *
 * @example
 * ```typescript
 * getCharCategory('é'); // CharCategory.LETTER
 * getCharCategory('1'); // CharCategory.DIGIT
 * getCharCategory(' '); // CharCategory.SPACE
 * getCharCategory('́'); // CharCategory.COMBINING_MARK
 * ```
 */
export enum CharCategory {
  /** Regular letter (a-z, A-Z) */
  LETTER = 'letter',
  /** Digit (0-9) */
  DIGIT = 'digit',
  /** Whitespace character */
  SPACE = 'space',
  /** Combining diacritical mark */
  COMBINING_MARK = 'combining_mark',
  /** Other character */
  OTHER = 'other',
}

/**
 * Unicode range for combining diacritical marks.
 *
 * Combining marks are in the range U+0300 to U+036F.
 *
 * @internal
 */
const COMBINING_MARK_START = 0x0300;
const COMBINING_MARK_END = 0x036f;

/**
 * Check if a character is a combining diacritical mark.
 *
 * @param char - Single character to check
 * @returns true if the character is a combining mark
 *
 * @example
 * ```typescript
 * isCombiningMark('́'); // true (combining acute accent)
 * isCombiningMark('a'); // false
 * isCombiningMark('é'); // false (composite character)
 * ```
 */
export function isCombiningMark(char: string): boolean {
  if (char.length === 0) return false;
  const code = char.codePointAt(0) ?? 0;
  return code >= COMBINING_MARK_START && code <= COMBINING_MARK_END;
}

/**
 * Remove combining diacritical marks from a string.
 *
 * This function uses Unicode NFD normalization to decompose
 * characters into base characters and combining marks, then
 * removes the combining marks.
 *
 * @param input - String to process
 * @returns String without diacritical marks
 *
 * @example
 * ```typescript
 * stripDiacritics('Héllo Wörld'); // 'Hello World'
 * stripDiacritics('café');       // 'cafe'
 * stripDiacritics('naïve');      // 'naive'
 * stripDiacritics('Москва');     // 'Москва' (Cyrillic preserved)
 * ```
 */
export function stripDiacritics(input: string): string {
  // Normalize to NFD (decomposes composite characters)
  const normalized = input.normalize('NFD');

  // Remove combining marks
  let result = '';
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]!;
    if (!isCombiningMark(char)) {
      result += char;
    }
  }

  return result;
}

/**
 * Get the character category for a character.
 *
 * @param char - Single character to categorize
 * @returns The character category
 *
 * @example
 * ```typescript
 * getCharCategory('a'); // CharCategory.LETTER
 * getCharCategory('Z'); // CharCategory.LETTER
 * getCharCategory('0'); // CharCategory.DIGIT
 * getCharCategory(' '); // CharCategory.SPACE
 * getCharCategory('́'); // CharCategory.COMBINING_MARK
 * getCharCategory('@'); // CharCategory.OTHER
 * ```
 */
export function getCharCategory(char: string): CharCategory {
  if (char.length === 0) return CharCategory.OTHER;

  const code = char.charCodeAt(0);

  // Check for combining marks first
  if (isCombiningMark(char)) {
    return CharCategory.COMBINING_MARK;
  }

  // Check for letters (a-z, A-Z)
  if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90)) {
    return CharCategory.LETTER;
  }

  // Check for digits (0-9)
  if (code >= 48 && code <= 57) {
    return CharCategory.DIGIT;
  }

  // Check for whitespace
  if (code === 32 || code === 9 || code === 10 || code === 13) {
    return CharCategory.SPACE;
  }

  return CharCategory.OTHER;
}

/**
 * Check if a string contains only ASCII characters.
 *
 * @param input - String to check
 * @returns true if the string contains only ASCII (code points 0-127)
 *
 * @example
 * ```typescript
 * isASCII('hello');  // true
 * isASCII('héllo');  // false
 * isASCII('123');    // true
 * isASCII('');       // true
 * ```
 */
export function isASCII(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code > 127) {
      return false;
    }
  }
  return true;
}

/**
 * Convert a string to NFC normalized form.
 *
 * @param input - String to normalize
 * @returns NFC-normalized string
 *
 * @example
 * ```typescript
 * // 'é' can be represented as single char or e + combining acute
 * normalizeNFC('e\u0301'); // 'é' (composed)
 * normalizeNFC('é');       // 'é' (already composed)
 * ```
 */
export function normalizeNFC(input: string): string {
  return input.normalize('NFC');
}

/**
 * Convert a string to NFD normalized form.
 *
 * @param input - String to normalize
 * @returns NFD-normalized string (decomposed)
 *
 * @example
 * ```typescript
 * normalizeNFD('é'); // 'e' + combining acute accent
 * normalizeNFD('ñ'); // 'n' + combining tilde
 * ```
 */
export function normalizeNFD(input: string): string {
  return input.normalize('NFD');
}
