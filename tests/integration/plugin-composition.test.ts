/**
 * Integration tests for plugin composition.
 */

import { describe, it, expect, vi } from 'vitest';
import { createKernel } from '../../src/kernel.ts';
import { corePlugins } from '../../src/plugins/core/index.ts';
import { localeDePlugin, localeTrPlugin, truncatorPlugin, reservedPlugin } from '../../src/plugins/optional/index.ts';
import type { SlugPlugin } from '../../src/types.ts';

describe('integration: plugin composition', () => {
  it('should work with core plugins only', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins);

    expect(kernel.slug('Hello World')).toBe('hello-world');
  });

  it('should compose core plugins with locale plugins', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, localeDePlugin);

    expect(kernel.slug('Größe Welt')).toBe('groesse-welt');
  });

  it('should compose core plugins with multiple locale plugins', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, localeDePlugin, localeTrPlugin);

    // German should work
    expect(kernel.slug('Größe', { locale: 'de' })).toBe('groesse');

    // Turkish should work
    expect(kernel.slug('İstanbul', { locale: 'tr' })).toBe('istanbul');
  });

  it('should compose with truncator plugin', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, truncatorPlugin);

    expect(kernel.slug('This is a very long title', { maxLength: 15 })).toBe('this-is-a-very');
  });

  it('should compose with reserved plugin', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, reservedPlugin);

    expect(kernel.slug('admin', { reserved: ['admin'] })).toBe('admin-1');
  });

  it('should compose all plugins together', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, localeDePlugin, truncatorPlugin, reservedPlugin);

    const result = kernel.slug('Größe Admin', {
      locale: 'de',
      maxLength: 15,
      reserved: ['admin'],
    });

    expect(result).toBe('groesse-admin-1');
  });

  it('should handle plugin registration order', () => {
    const kernel = createKernel();

    // Register in specific order
    kernel.use(corePlugins[0], corePlugins[1], corePlugins[2]);

    const list = kernel.list();
    expect(list).toContain('normalizer');
    expect(list).toContain('transliterator');
    expect(list).toContain('sanitizer');
  });

  it('should allow plugin chaining', () => {
    const kernel = createKernel();

    const result = kernel
      .use(corePlugins[0])
      .use(corePlugins[1])
      .use(corePlugins[2])
      .slug('Hello World');

    expect(result).toBe('hello-world');
  });

  it('should list all registered plugins', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins, localeDePlugin);

    const list = kernel.list();
    expect(list.length).toBe(4);
    expect(list).toContain('normalizer');
    expect(list).toContain('transliterator');
    expect(list).toContain('sanitizer');
    expect(list).toContain('locale-de');
  });

  it('should check plugin existence', () => {
    const kernel = createKernel();
    kernel.use(corePlugins[0]);

    expect(kernel.has('normalizer')).toBe(true);
    expect(kernel.has('transliterator')).toBe(false);
  });

  it('should get plugin by name', () => {
    const kernel = createKernel();
    kernel.use(corePlugins[0]);

    const plugin = kernel.get('normalizer');
    expect(plugin).toBeDefined();
    expect(plugin?.name).toBe('normalizer');
  });

  it('should unregister plugins', () => {
    const kernel = createKernel();
    kernel.use(...corePlugins);

    expect(kernel.unregister('normalizer')).toBe(true);
    expect(kernel.has('normalizer')).toBe(false);
  });

  it('should handle plugin errors gracefully', () => {
    const kernel = createKernel();
    const onError = vi.fn();
    const errorPlugin: SlugPlugin = {
      name: 'error-plugin',
      version: '1.0.0',
      install: () => {
        throw new Error('Install error');
      },
      onError,
    };

    kernel.use(errorPlugin);
    kernel.slug('test'); // Should not throw

    // onError should have been called
    expect(onError).toHaveBeenCalled();
  });
});
