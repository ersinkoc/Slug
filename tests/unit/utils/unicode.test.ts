/**
 * Tests for unicode utility functions.
 */

import { describe, it, expect } from 'vitest';
import {
  stripDiacritics,
  isCombiningMark,
  getCharCategory,
  isASCII,
  normalizeNFC,
  normalizeNFD,
  CharCategory,
} from '../../../src/utils/unicode.ts';

describe('utils/unicode', () => {
  describe('isCombiningMark', () => {
    it('should return true for combining marks', () => {
      expect(isCombiningMark('́')).toBe(true); // U+0301 combining acute
      expect(isCombiningMark('̀')).toBe(true); // U+0300 combining grave
    });

    it('should return false for non-combining characters', () => {
      expect(isCombiningMark('a')).toBe(false);
      expect(isCombiningMark('é')).toBe(false); // composite character
      expect(isCombiningMark('1')).toBe(false);
      expect(isCombiningMark('')).toBe(false);
    });

    it('should handle empty string', () => {
      expect(isCombiningMark('')).toBe(false);
    });
  });

  describe('stripDiacritics', () => {
    it('should strip diacritics from characters', () => {
      expect(stripDiacritics('Héllo Wörld')).toBe('Hello World');
      expect(stripDiacritics('café')).toBe('cafe');
      expect(stripDiacritics('naïve')).toBe('naive');
      expect(stripDiacritics('résumé')).toBe('resume');
    });

    it('should preserve non-Latin scripts', () => {
      expect(stripDiacritics('Москва')).toBe('Москва'); // Cyrillic preserved
      expect(stripDiacritics('你好')).toBe('你好'); // Chinese preserved
    });

    it('should handle empty string', () => {
      expect(stripDiacritics('')).toBe('');
    });

    it('should handle strings without diacritics', () => {
      expect(stripDiacritics('Hello')).toBe('Hello');
      expect(stripDiacritics('123')).toBe('123');
    });
  });

  describe('getCharCategory', () => {
    it('should categorize letters', () => {
      expect(getCharCategory('a')).toBe(CharCategory.LETTER);
      expect(getCharCategory('Z')).toBe(CharCategory.LETTER);
      expect(getCharCategory('z')).toBe(CharCategory.LETTER);
    });

    it('should categorize digits', () => {
      expect(getCharCategory('0')).toBe(CharCategory.DIGIT);
      expect(getCharCategory('9')).toBe(CharCategory.DIGIT);
      expect(getCharCategory('5')).toBe(CharCategory.DIGIT);
    });

    it('should categorize whitespace', () => {
      expect(getCharCategory(' ')).toBe(CharCategory.SPACE);
      expect(getCharCategory('\t')).toBe(CharCategory.SPACE);
      expect(getCharCategory('\n')).toBe(CharCategory.SPACE);
      expect(getCharCategory('\r')).toBe(CharCategory.SPACE);
    });

    it('should categorize combining marks', () => {
      expect(getCharCategory('́')).toBe(CharCategory.COMBINING_MARK);
    });

    it('should categorize other characters', () => {
      expect(getCharCategory('@')).toBe(CharCategory.OTHER);
      expect(getCharCategory('-')).toBe(CharCategory.OTHER);
      expect(getCharCategory('_')).toBe(CharCategory.OTHER);
    });

    it('should handle empty string', () => {
      expect(getCharCategory('')).toBe(CharCategory.OTHER);
    });
  });

  describe('isASCII', () => {
    it('should return true for ASCII strings', () => {
      expect(isASCII('hello')).toBe(true);
      expect(isASCII('Hello World 123')).toBe(true);
      expect(isASCII('')).toBe(true);
      expect(isASCII('!@#$%')).toBe(true);
    });

    it('should return false for non-ASCII strings', () => {
      expect(isASCII('héllo')).toBe(false);
      expect(isASCII('こんにちは')).toBe(false);
      expect(isASCII('Москва')).toBe(false);
    });
  });

  describe('normalizeNFC', () => {
    it('should normalize to composed form', () => {
      const decomposed = 'e\u0301'; // e + combining acute
      expect(normalizeNFC(decomposed)).toBe('é');
    });

    it('should leave already composed strings unchanged', () => {
      expect(normalizeNFC('é')).toBe('é');
    });

    it('should handle empty string', () => {
      expect(normalizeNFC('')).toBe('');
    });
  });

  describe('normalizeNFD', () => {
    it('should normalize to decomposed form', () => {
      expect(normalizeNFD('é')).toBe('e\u0301'); // e + combining acute
    });

    it('should handle already decomposed strings', () => {
      const decomposed = 'e\u0301';
      expect(normalizeNFD(decomposed)).toBe(decomposed);
    });

    it('should handle empty string', () => {
      expect(normalizeNFD('')).toBe('');
    });
  });
});
