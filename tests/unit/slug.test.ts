/**
 * Tests for the main slug function.
 */

import { describe, it, expect } from 'vitest';
import { slug } from '../../src/slug.ts';

describe('slug', () => {
  describe('basic functionality', () => {
    it('should convert basic strings to slugs', () => {
      expect(slug('Hello World!')).toBe('hello-world');
      expect(slug('Hello World')).toBe('hello-world');
      expect(slug('hello-world')).toBe('hello-world');
    });

    it('should handle empty string', () => {
      expect(slug('')).toBe('');
    });

    it('should handle strings with special characters', () => {
      expect(slug('Hello @ World!')).toBe('hello-world');
      expect(slug('Hello!!!World???')).toBe('hello-world');
      expect(slug('Hello   World')).toBe('hello-world');
    });

    it('should throw on non-string input', () => {
      expect(() => slug(123 as unknown as string)).toThrow(TypeError);
      expect(() => slug(null as unknown as string)).toThrow(TypeError);
      expect(() => slug(undefined as unknown as string)).toThrow(TypeError);
    });
  });

  describe('Unicode transliteration', () => {
    it('should transliterate Latin extended characters', () => {
      expect(slug('Héllo Wörld')).toBe('hello-world');
      expect(slug('café')).toBe('cafe');
      expect(slug('naïve')).toBe('naive');
      expect(slug('résumé')).toBe('resume');
    });

    it('should transliterate Cyrillic', () => {
      expect(slug('Привет мир')).toBe('privet-mir');
      expect(slug('Москва')).toBe('moskva');
    });

    it('should transliterate Greek', () => {
      expect(slug('Ελλάδα')).toBe('ellada');
      expect(slug('Γειά')).toBe('geia');
    });

    it('should transliterate Arabic', () => {
      expect(slug('مرحبا')).toBe('mrhba');
    });

    it('should transliterate Chinese', () => {
      expect(slug('北京')).toBe('bei-jing');
    });

    it('should transliterate Japanese', () => {
      expect(slug('こんにちは')).toBe('konnichiha');
    });
  });

  describe('separator option', () => {
    it('should use custom separator', () => {
      expect(slug('Hello World', { separator: '_' })).toBe('hello_world');
      expect(slug('Hello World', { separator: '.' })).toBe('hello.world');
      expect(slug('Hello World', { separator: '' })).toBe('helloworld');
    });
  });

  describe('lowercase option', () => {
    it('should lowercase by default', () => {
      expect(slug('HELLO WORLD')).toBe('hello-world');
    });

    it('should preserve case when lowercase is false', () => {
      expect(slug('API v2.0', { lowercase: false })).toBe('API-v2-0');
      expect(slug('iPhone Pro', { lowercase: false })).toBe('iPhone-Pro');
    });
  });

  describe('locale option', () => {
    it('should apply German locale rules', () => {
      expect(slug('Größe', { locale: 'de' })).toBe('groesse');
      expect(slug('Über', { locale: 'de' })).toBe('ueber');
      expect(slug('Straße', { locale: 'de' })).toBe('strasse');
    });

    it('should apply Turkish locale rules', () => {
      expect(slug('İstanbul', { locale: 'tr' })).toBe('istanbul');
      expect(slug('Türkçe', { locale: 'tr' })).toBe('turkce');
    });

    it('should apply Russian locale rules', () => {
      expect(slug('Москва', { locale: 'ru' })).toBe('moskva');
      expect(slug('Привет', { locale: 'ru' })).toBe('privet');
    });
  });

  describe('maxLength option', () => {
    it('should truncate to maxLength respecting word boundaries', () => {
      expect(slug('This is a very long title', { maxLength: 20 })).toBe('this-is-a-very-long');
      expect(slug('This is a very long title', { maxLength: 15 })).toBe('this-is-a-very');
    });

    it('should truncate exactly when strict is true', () => {
      expect(slug('This is a very long title', { maxLength: 15, strict: true })).toBe('this-is-a-very');
    });

    it('should not truncate if shorter than maxLength', () => {
      expect(slug('Hello', { maxLength: 20 })).toBe('hello');
    });
  });

  describe('replacements option', () => {
    it('should apply custom replacements', () => {
      expect(slug('C++ & C# Code', { replacements: { '++': 'pp', '#': 'sharp', '&': 'and' } })).toBe(
        'cpp-and-csharp-code'
      );
    });

    it('should handle multiple replacements', () => {
      expect(slug('@user mentioned #topic', { replacements: { '@': 'at-', '#': 'tag-' } })).toBe(
        'at-user-mentioned-tag-topic'
      );
    });
  });

  describe('reserved option', () => {
    it('should handle reserved words', () => {
      expect(slug('admin', { reserved: ['admin'] })).toBe('admin-1');
      expect(slug('API', { reserved: ['api'], lowercase: true })).toBe('api-1');
    });

    it('should use custom reserved suffix', () => {
      expect(slug('admin', { reserved: ['admin'], reservedSuffix: '-page' })).toBe('admin-page');
    });
  });

  describe('trim option', () => {
    it('should trim separators by default', () => {
      expect(slug('---Hello World---')).toBe('hello-world');
    });

    it('should preserve separators when trim is false', () => {
      expect(slug('---Hello World---', { trim: false })).toBe('-hello-world-');
    });
  });
});
