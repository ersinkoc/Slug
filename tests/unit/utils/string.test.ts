/**
 * Tests for string utility functions.
 */

import { describe, it, expect } from 'vitest';
import {
  collapseRepeated,
  trimChars,
  truncateAtWordBoundary,
  splitIntoWords,
  isAlphaNumeric,
  isSeparator,
  escapeRegex,
  toLowerCase,
  toUpperCase,
  replaceAll,
  joinWithSeparator,
} from '../../../src/utils/string.ts';

describe('utils/string', () => {
  describe('collapseRepeated', () => {
    it('should collapse repeated characters', () => {
      expect(collapseRepeated('hello---world', '-')).toBe('hello-world');
      expect(collapseRepeated('a    b', ' ')).toBe('a b');
      expect(collapseRepeated('***test***', '*')).toBe('*test*');
    });

    it('should handle no repeats', () => {
      expect(collapseRepeated('hello-world', '-')).toBe('hello-world');
    });

    it('should throw for multi-character separator', () => {
      expect(() => collapseRepeated('test', 'ab')).toThrow();
    });

    it('should handle empty string', () => {
      expect(collapseRepeated('', '-')).toBe('');
    });
  });

  describe('trimChars', () => {
    it('should trim characters from both ends', () => {
      expect(trimChars('---hello-world---', '-')).toBe('hello-world');
      expect(trimChars('...test...', '.')).toBe('test');
      expect(trimChars('___value___', '_')).toBe('value');
    });

    it('should trim multiple characters', () => {
      expect(trimChars('-.-hello-.-', '-.')).toBe('hello');
      expect(trimChars('  spaces  ', ' ')).toBe('spaces');
    });

    it('should handle empty chars', () => {
      expect(trimChars('hello', '')).toBe('hello');
    });

    it('should handle empty string', () => {
      expect(trimChars('', '-')).toBe('');
    });

    it('should handle all characters being trimmed', () => {
      expect(trimChars('---', '-')).toBe('');
      expect(trimChars('___-___', '_-')).toBe('');
    });
  });

  describe('truncateAtWordBoundary', () => {
    it('should truncate at word boundary when strict is false', () => {
      expect(truncateAtWordBoundary('This is a long title', 10)).toBe('This is a');
      expect(truncateAtWordBoundary('Hello World', 5)).toBe('Hello');
      expect(truncateAtWordBoundary('One-Two-Three', 8)).toBe('One-Two');
    });

    it('should truncate exactly at maxLength when strict is true', () => {
      expect(truncateAtWordBoundary('This is a long title', 10, true)).toBe('This is a ');
      expect(truncateAtWordBoundary('Hello World', 5, true)).toBe('Hello');
    });

    it('should return original if shorter than maxLength', () => {
      expect(truncateAtWordBoundary('Hello', 10)).toBe('Hello');
      expect(truncateAtWordBoundary('Hi', 5)).toBe('Hi');
    });

    it('should return exact match if equal to maxLength', () => {
      expect(truncateAtWordBoundary('Hello', 5)).toBe('Hello');
    });

    it('should handle edge cases', () => {
      expect(truncateAtWordBoundary('Hello', 0)).toBe('');
      expect(truncateAtWordBoundary('', 5)).toBe('');
    });
  });

  describe('splitIntoWords', () => {
    it('should split on non-alphanumeric characters', () => {
      expect(splitIntoWords('hello world')).toEqual(['hello', 'world']);
      expect(splitIntoWords('hello-world_test')).toEqual(['hello', 'world', 'test']);
    });

    it('should handle empty string', () => {
      expect(splitIntoWords('')).toEqual([]);
    });

    it('should handle strings without separators', () => {
      expect(splitIntoWords('HelloWorld')).toEqual(['HelloWorld']);
    });

    it('should handle multiple spaces', () => {
      expect(splitIntoWords('  multiple   spaces  ')).toEqual(['multiple', 'spaces']);
    });

    it('should handle special characters', () => {
      expect(splitIntoWords('hello!!!world???test')).toEqual(['hello', 'world', 'test']);
    });
  });

  describe('isAlphaNumeric', () => {
    it('should return true for alphanumeric characters', () => {
      expect(isAlphaNumeric('a')).toBe(true);
      expect(isAlphaNumeric('Z')).toBe(true);
      expect(isAlphaNumeric('0')).toBe(true);
      expect(isAlphaNumeric('9')).toBe(true);
    });

    it('should return false for non-alphanumeric characters', () => {
      expect(isAlphaNumeric('-')).toBe(false);
      expect(isAlphaNumeric(' ')).toBe(false);
      expect(isAlphaNumeric('@')).toBe(false);
    });

    it('should handle empty string', () => {
      expect(isAlphaNumeric('')).toBe(false);
    });
  });

  describe('isSeparator', () => {
    it('should return true for separator characters', () => {
      expect(isSeparator('-')).toBe(true);
      expect(isSeparator('_')).toBe(true);
      expect(isSeparator(' ')).toBe(true);
      expect(isSeparator('@')).toBe(true);
    });

    it('should return false for alphanumeric characters', () => {
      expect(isSeparator('a')).toBe(false);
      expect(isSeparator('Z')).toBe(false);
      expect(isSeparator('0')).toBe(false);
    });
  });

  describe('escapeRegex', () => {
    it('should escape special regex characters', () => {
      expect(escapeRegex('a+b')).toBe('a\\+b');
      expect(escapeRegex('a.b')).toBe('a\\.b');
      expect(escapeRegex('a*b')).toBe('a\\*b');
      expect(escapeRegex('a?b')).toBe('a\\?b');
    });

    it('should handle multiple special characters', () => {
      expect(escapeRegex('a+b.c*d')).toBe('a\\+b\\.c\\*d');
    });

    it('should leave normal characters unchanged', () => {
      expect(escapeRegex('abc123')).toBe('abc123');
    });
  });

  describe('toLowerCase', () => {
    it('should convert to lowercase', () => {
      expect(toLowerCase('HELLO WORLD')).toBe('hello world');
      expect(toLowerCase('JavaScript')).toBe('javascript');
    });

    it('should handle empty string', () => {
      expect(toLowerCase('')).toBe('');
    });
  });

  describe('toUpperCase', () => {
    it('should convert to uppercase', () => {
      expect(toUpperCase('hello world')).toBe('HELLO WORLD');
      expect(toUpperCase('javascript')).toBe('JAVASCRIPT');
    });

    it('should handle empty string', () => {
      expect(toUpperCase('')).toBe('');
    });
  });

  describe('replaceAll', () => {
    it('should replace all occurrences', () => {
      expect(replaceAll('hello world', 'o', '0')).toBe('hell0 w0rld');
      expect(replaceAll('aaa', 'a', 'b')).toBe('bbb');
    });

    it('should handle no matches', () => {
      expect(replaceAll('test', 'x', 'y')).toBe('test');
    });

    it('should handle empty search', () => {
      expect(replaceAll('test', '', 'x')).toBe('test');
    });
  });

  describe('joinWithSeparator', () => {
    it('should join parts with separator', () => {
      expect(joinWithSeparator(['hello', 'world'], '-')).toBe('hello-world');
      expect(joinWithSeparator(['a', 'b', 'c'], '.')).toBe('a.b.c');
    });

    it('should filter out empty parts', () => {
      expect(joinWithSeparator(['hello', '', 'world'], '-')).toBe('hello-world');
      expect(joinWithSeparator(['', 'test', ''], '-')).toBe('test');
    });

    it('should handle empty array', () => {
      expect(joinWithSeparator([], '-')).toBe('');
    });

    it('should handle single element', () => {
      expect(joinWithSeparator(['single'], '-')).toBe('single');
    });
  });
});
