/**
 * Tests for the stateful slugger.
 */

import { describe, it, expect } from 'vitest';
import { createSlugger } from '../../src/slugger.ts';

describe('createSlugger', () => {
  describe('basic functionality', () => {
    it('should generate slugs', () => {
      const slugger = createSlugger();
      expect(slugger.slug('Hello World')).toBe('hello-world');
    });

    it('should handle duplicates', () => {
      const slugger = createSlugger();
      expect(slugger.slug('Hello World')).toBe('hello-world');
      expect(slugger.slug('Hello World')).toBe('hello-world-1');
      expect(slugger.slug('Hello World')).toBe('hello-world-2');
    });

    it('should handle different inputs', () => {
      const slugger = createSlugger();
      expect(slugger.slug('Hello World')).toBe('hello-world');
      expect(slugger.slug('Goodbye World')).toBe('goodbye-world');
      expect(slugger.slug('Hello World')).toBe('hello-world-1');
    });
  });

  describe('has method', () => {
    it('should return true for existing slugs', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      expect(slugger.has('hello-world')).toBe(true);
    });

    it('should return false for non-existing slugs', () => {
      const slugger = createSlugger();
      expect(slugger.has('hello-world')).toBe(false);
    });

    it('should work with duplicates', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      slugger.slug('Hello World');
      expect(slugger.has('hello-world')).toBe(true);
      expect(slugger.has('hello-world-1')).toBe(true);
      expect(slugger.has('hello-world-2')).toBe(false);
    });
  });

  describe('list method', () => {
    it('should return all generated slugs', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      slugger.slug('Goodbye World');
      slugger.slug('Hello World');

      const list = slugger.list();
      expect(list).toContain('hello-world');
      expect(list).toContain('goodbye-world');
      expect(list).toContain('hello-world-1');
      expect(list.length).toBe(3);
    });

    it('should return empty array initially', () => {
      const slugger = createSlugger();
      expect(slugger.list()).toEqual([]);
    });
  });

  describe('reset method', () => {
    it('should clear all history', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      slugger.slug('Hello World');
      slugger.reset();
      expect(slugger.slug('Hello World')).toBe('hello-world');
    });

    it('should clear all slugs', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      slugger.slug('Goodbye World');
      slugger.reset();
      expect(slugger.list()).toEqual([]);
      expect(slugger.has('hello-world')).toBe(false);
    });
  });

  describe('count method', () => {
    it('should return count for base slug', () => {
      const slugger = createSlugger();
      slugger.slug('Hello World');
      expect(slugger.count('hello-world')).toBe(1);
      slugger.slug('Hello World');
      expect(slugger.count('hello-world')).toBe(2);
      slugger.slug('Hello World');
      expect(slugger.count('hello-world')).toBe(3);
    });

    it('should return 0 for non-existing slugs', () => {
      const slugger = createSlugger();
      expect(slugger.count('hello-world')).toBe(0);
    });
  });

  describe('with options', () => {
    it('should work with custom separator', () => {
      const slugger = createSlugger();
      expect(slugger.slug('Hello World', { separator: '_' })).toBe('hello_world');
      expect(slugger.slug('Hello World', { separator: '_' })).toBe('hello_world_1');
    });

    it('should work with locale', () => {
      const slugger = createSlugger();
      expect(slugger.slug('Größe', { locale: 'de' })).toBe('groesse');
      expect(slugger.slug('Größe', { locale: 'de' })).toBe('groesse-1');
    });

    it('should work with reserved words', () => {
      const slugger = createSlugger();
      expect(slugger.slug('admin', { reserved: ['admin'] })).toBe('admin-1');
      expect(slugger.slug('admin', { reserved: ['admin'] })).toBe('admin-1-1');
    });
  });
});
