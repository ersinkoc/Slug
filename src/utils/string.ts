/**
 * String utility functions.
 *
 * @module utils/string
 */

/**
 * Collapse repeated characters in a string.
 *
 * @param input - String to process
 * @param char - Character to collapse (must be single character)
 * @returns String with repeated chars collapsed to single occurrence
 *
 * @example
 * ```typescript
 * collapseRepeated('hello---world', '-'); // 'hello-world'
 * collapseRepeated('a    b', ' ');        // 'a b'
 * collapseRepeated('***test***', '*');   // '*test*'
 * collapseRepeated('no-repeats', '-');   // 'no-repeats'
 * ```
 */
export function collapseRepeated(input: string, char: string): string {
  if (char.length !== 1) {
    throw new Error(`char must be a single character, got: "${char}"`);
  }

  const regex = new RegExp(`${escapeRegex(char)}{2,}`, 'g');
  return input.replace(regex, char);
}

/**
 * Trim specific characters from the start and end of a string.
 *
 * @param input - String to trim
 * @param chars - Characters to trim (any of these chars will be removed)
 * @returns String with specified chars trimmed from ends
 *
 * @example
 * ```typescript
 * trimChars('---hello-world---', '-'); // 'hello-world'
 * trimChars('...test...', '.');        // 'test'
 * trimChars('___value___', '_');       // 'value'
 * trimChars('  spaces  ', ' ');        // 'spaces'
 * trimChars('-.-hello-.-', '-.');      // 'hello'
 * ```
 */
export function trimChars(input: string, chars: string): string {
  if (chars.length === 0) return input;

  const charSet = new Set(chars);
  let start = 0;
  let end = input.length;

  // Find start (trim from left)
  while (start < end && charSet.has(input[start]!)) {
    start++;
  }

  // Find end (trim from right)
  while (end > start && charSet.has(input[end - 1]!)) {
    end--;
  }

  return input.slice(start, end);
}

/**
 * Truncate a string to a maximum length, respecting word boundaries.
 *
 * When strict is false, truncation occurs at word boundaries.
 * When strict is true, truncation occurs exactly at maxLength.
 *
 * @param input - String to truncate
 * @param maxLength - Maximum length
 * @param strict - If true, cut exactly at maxLength; otherwise respect word boundaries
 * @returns Truncated string
 *
 * @example
 * ```typescript
 * // Word boundary mode (default)
 * truncateAtWordBoundary('This is a long title', 10);      // 'This is a'
 * truncateAtWordBoundary('Hello World', 5);               // 'Hello'
 * truncateAtWordBoundary('One-Two-Three', 8);             // 'One-Two'
 *
 * // Strict mode
 * truncateAtWordBoundary('This is a long title', 10, true); // 'This is a '
 * truncateAtWordBoundary('Hello World', 5, true);           // 'Hello'
 * ```
 */
export function truncateAtWordBoundary(input: string, maxLength: number, strict = false): string {
  if (input.length <= maxLength) {
    return input;
  }

  if (strict) {
    return input.slice(0, maxLength);
  }

  // Find the best word boundary within maxLength
  let end = maxLength;

  // Look backward for a separator
  while (end > 0 && !isSeparator(input[end - 1]!)) {
    end--;
  }

  // If no separator found, cut at maxLength
  if (end === 0) {
    return input.slice(0, maxLength);
  }

  // Try to extend to include more content within maxLength
  let currentPos = end;
  while (currentPos < input.length) {
    // Find the next separator (or end of string)
    let nextSep = currentPos + 1;
    while (nextSep < input.length && !isSeparator(input[nextSep]!)) {
      nextSep++;
    }

    // Calculate length if we include up to the next separator
    const newLength = nextSep;

    if (newLength <= maxLength) {
      // The next word fits completely, include it
      currentPos = nextSep;
      end = nextSep;

      // If we're at the end, return everything up to last separator
      if (currentPos >= input.length) {
        return input.slice(0, end);
      }
    } else {
      // Next word doesn't fit completely
      // Include as much as we can up to maxLength
      if (currentPos < maxLength) {
        end = maxLength;
      }
      break;
    }
  }

  // Return with proper separator handling
  let result = input.slice(0, end);
  // Trim trailing separator
  while (result.length > 0 && isSeparator(result[result.length - 1]!)) {
    result = result.slice(0, -1);
  }
  return result;
}

/**
 * Split a string into words.
 *
 * Words are separated by whitespace, hyphens, underscores, or other non-alphanumeric characters.
 *
 * @param input - String to split
 * @returns Array of words
 *
 * @example
 * ```typescript
 * splitIntoWords('hello world');           // ['hello', 'world']
 * splitIntoWords('hello-world_test');     // ['hello', 'world', 'test']
 * splitIntoWords('HelloWorld');           // ['HelloWorld']
 * splitIntoWords('  multiple   spaces  '); // ['multiple', 'spaces']
 * ```
 */
export function splitIntoWords(input: string): string[] {
  // Split on non-alphanumeric characters
  const words: string[] = [];
  let currentWord = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i]!;
    const isAlphanumeric = isAlphaNumeric(char);

    if (isAlphanumeric) {
      currentWord += char;
    } else {
      if (currentWord.length > 0) {
        words.push(currentWord);
        currentWord = '';
      }
    }
  }

  // Add the last word
  if (currentWord.length > 0) {
    words.push(currentWord);
  }

  return words;
}

/**
 * Check if a character is alphanumeric (a-z, A-Z, 0-9).
 *
 * @param char - Single character to check
 * @returns true if the character is alphanumeric
 *
 * @example
 * ```typescript
 * isAlphaNumeric('a');  // true
 * isAlphaNumeric('Z');  // true
 * isAlphaNumeric('0');  // true
 * isAlphaNumeric('9');  // true
 * isAlphaNumeric('-');  // false
 * isAlphaNumeric(' ');  // false
 * ```
 */
export function isAlphaNumeric(char: string): boolean {
  if (char.length === 0) return false;
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) // a-z
  );
}

/**
 * Check if a character is a separator (non-alphanumeric).
 *
 * @param char - Single character to check
 * @returns true if the character is a separator
 *
 * @example
 * ```typescript
 * isSeparator('-');  // true
 * isSeparator('_');  // true
 * isSeparator(' ');  // true
 * isSeparator('a');  // false
 * isSeparator('1');  // false
 * ```
 */
export function isSeparator(char: string): boolean {
  return !isAlphaNumeric(char);
}

/**
 * Escape special regex characters in a string.
 *
 * @param str - String to escape
 * @returns Escaped string safe for use in regex
 *
 * @example
 * ```typescript
 * escapeRegex('a+b');   // 'a\\+b'
 * escapeRegex('a.b');   // 'a\\.b'
 * escapeRegex('a*b');   // 'a\\*b'
 * ```
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert a string to lowercase.
 *
 * Uses the native toLowerCase() method which handles
 * most Unicode characters correctly.
 *
 * @param input - String to convert
 * @returns Lowercased string
 *
 * @example
 * ```typescript
 * toLowerCase('HELLO WORLD'); // 'hello world'
 * toLowerCase('JavaScript');  // 'javascript'
 * toLowerCase('İstanbul');    // 'i̇stanbul' (Turkish dotless I)
 * ```
 */
export function toLowerCase(input: string): string {
  return input.toLowerCase();
}

/**
 * Convert a string to uppercase.
 *
 * Uses the native toUpperCase() method which handles
 * most Unicode characters correctly.
 *
 * @param input - String to convert
 * @returns Uppercased string
 *
 * @example
 * ```typescript
 * toUpperCase('hello world'); // 'HELLO WORLD'
 * toUpperCase('javascript');  // 'JAVASCRIPT'
 * ```
 */
export function toUpperCase(input: string): string {
  return input.toUpperCase();
}

/**
 * Replace all occurrences of a substring in a string.
 *
 * @param input - String to process
 * @param search - Substring to search for
 * @param replacement - Replacement string
 * @returns String with all occurrences replaced
 *
 * @example
 * ```typescript
 * replaceAll('hello world', 'o', '0'); // 'hell0 w0rld'
 * replaceAll('aaa', 'a', 'b');         // 'bbb'
 * replaceAll('test', 'x', 'y');       // 'test'
 * ```
 */
export function replaceAll(input: string, search: string, replacement: string): string {
  if (search === '') {
    return input;
  }
  return input.split(search).join(replacement);
}

/**
 * Join an array of strings with a separator.
 *
 * @param parts - Array of strings to join
 * @param separator - Separator string
 * @returns Joined string
 *
 * @example
 * ```typescript
 * joinWithSeparator(['hello', 'world'], '-'); // 'hello-world'
 * joinWithSeparator(['a', 'b', 'c'], '.');    // 'a.b.c'
 * joinWithSeparator(['single'], '-');         // 'single'
 * joinWithSeparator([], '-');                 // ''
 * ```
 */
export function joinWithSeparator(parts: string[], separator: string): string {
  return parts.filter((p) => p.length > 0).join(separator);
}
