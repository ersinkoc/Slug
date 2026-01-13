/**
 * Tests for the kernel.
 */

import { describe, it, expect, vi } from 'vitest';
import { createKernel } from '../../src/kernel.ts';
import type { SlugPlugin, SlugOptions } from '../../src/types.ts';
import { corePlugins } from '../../src/plugins/core/index.ts';

describe('createKernel', () => {
  describe('plugin management', () => {
    it('should register a plugin', () => {
      const kernel = createKernel();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: () => {},
      };

      const result = kernel.use(plugin);
      expect(result).toBe(kernel); // chaining
      expect(kernel.list()).toContain('test');
      expect(kernel.has('test')).toBe(true);
    });

    it('should unregister a plugin', () => {
      const kernel = createKernel();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: () => {},
        onDestroy: vi.fn(),
      };

      kernel.use(plugin);
      expect(kernel.unregister('test')).toBe(true);
      expect(kernel.has('test')).toBe(false);
      expect(plugin.onDestroy).toHaveBeenCalled();
    });

    it('should return false when unregistering non-existent plugin', () => {
      const kernel = createKernel();
      expect(kernel.unregister('not-found')).toBe(false);
    });

    it('should throw on duplicate plugin name', () => {
      const kernel = createKernel();
      const plugin1: SlugPlugin = { name: 'test', version: '1.0.0', install: () => {} };
      const plugin2: SlugPlugin = { name: 'test', version: '1.0.0', install: () => {} };

      kernel.use(plugin1);
      expect(() => kernel.use(plugin2)).toThrow();
    });

    it('should throw when unregistering plugin with dependents', () => {
      const kernel = createKernel();
      const plugin1: SlugPlugin = {
        name: 'base',
        version: '1.0.0',
        install: () => {},
      };
      const plugin2: SlugPlugin = {
        name: 'dependent',
        version: '1.0.0',
        dependencies: ['base'],
        install: () => {},
      };

      kernel.use(plugin1).use(plugin2);
      expect(() => kernel.unregister('base')).toThrow();
    });

    it('should throw on circular dependencies', () => {
      const kernel = createKernel();
      const plugin1: SlugPlugin = {
        name: 'plugin1',
        version: '1.0.0',
        dependencies: ['plugin2'],
        install: () => {},
      };
      const plugin2: SlugPlugin = {
        name: 'plugin2',
        version: '1.0.0',
        dependencies: ['plugin1'],
        install: () => {},
      };

      kernel.use(plugin1).use(plugin2);
      expect(() => kernel.slug('test')).toThrow();
    });

    it('should throw on missing dependencies', () => {
      const kernel = createKernel();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        dependencies: ['missing'],
        install: () => {},
      };

      kernel.use(plugin);
      expect(() => kernel.slug('test')).toThrow();
    });

    it('should get plugin by name', () => {
      const kernel = createKernel();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: () => {},
      };

      kernel.use(plugin);
      expect(kernel.get('test')).toBe(plugin);
      expect(kernel.get('not-found')).toBeUndefined();
    });

    it('should list all plugins', () => {
      const kernel = createKernel();
      const plugin1: SlugPlugin = { name: 'test1', version: '1.0.0', install: () => {} };
      const plugin2: SlugPlugin = { name: 'test2', version: '1.0.0', install: () => {} };

      kernel.use(plugin1).use(plugin2);
      const list = kernel.list();
      expect(list).toContain('test1');
      expect(list).toContain('test2');
    });
  });

  describe('slug generation', () => {
    it('should generate slugs with core plugins', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);

      expect(kernel.slug('Hello World')).toBe('hello-world');
    });

    it('should throw on non-string input', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);

      expect(() => kernel.slug(123 as unknown as string)).toThrow(TypeError);
    });

    it('should apply custom replacements', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);

      const result = kernel.slug('C++ Code', {
        replacements: { '++': 'pp' },
      });
      expect(result).toBe('cpp-code');
    });

    it('should respect separator option', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);

      expect(kernel.slug('Hello World', { separator: '_' })).toBe('hello_world');
    });

    it('should respect lowercase option', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);

      expect(kernel.slug('HELLO WORLD', { lowercase: false })).toBe('HELLO-WORLD');
    });
  });

  describe('event system', () => {
    it('should subscribe and emit events', () => {
      const kernel = createKernel();
      const handler = vi.fn();

      kernel.on('test-event', handler);
      kernel.emit('test-event', { data: 'test' });

      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should unsubscribe from events', () => {
      const kernel = createKernel();
      const handler = vi.fn();

      const unsubscribe = kernel.on('test-event', handler);
      unsubscribe();
      kernel.emit('test-event');

      expect(handler).not.toHaveBeenCalled();
    });

    it('should emit slug:before event', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);
      const handler = vi.fn();

      kernel.on('slug:before', handler);
      kernel.slug('Hello World');

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          input: 'Hello World',
        })
      );
    });

    it('should emit slug:after event', () => {
      const kernel = createKernel();
      kernel.use(...corePlugins);
      const handler = vi.fn();

      kernel.on('slug:after', handler);
      kernel.slug('Hello World');

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          result: 'hello-world',
        })
      );
    });

    it('should handle errors in event handlers', () => {
      const kernel = createKernel();
      const errorHandler = vi.fn(() => {
        throw new Error('Handler error');
      });
      const normalHandler = vi.fn();

      kernel.on('test-event', errorHandler);
      kernel.on('test-event', normalHandler);
      kernel.emit('test-event');

      expect(errorHandler).toHaveBeenCalled();
      expect(normalHandler).toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('should call plugin install methods', () => {
      const kernel = createKernel();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: vi.fn(),
      };

      kernel.use(plugin);
      expect(plugin.install).toHaveBeenCalledWith(kernel);
    });

    it('should call onInit after all plugins installed', () => {
      const kernel = createKernel();
      const plugin1: SlugPlugin = {
        name: 'test1',
        version: '1.0.0',
        install: () => {},
        onInit: vi.fn(),
      };
      const plugin2: SlugPlugin = {
        name: 'test2',
        version: '1.0.0',
        install: () => {},
        onInit: vi.fn(),
      };

      kernel.use(plugin1).use(plugin2);
      kernel.slug('test'); // Trigger initialization

      expect(plugin1.onInit).toHaveBeenCalled();
      expect(plugin2.onInit).toHaveBeenCalled();
    });

    it('should call onDestroy when plugin unregistered', () => {
      const kernel = createKernel();
      const onDestroy = vi.fn();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: () => {},
        onDestroy,
      };

      kernel.use(plugin);
      kernel.unregister('test');

      expect(onDestroy).toHaveBeenCalled();
    });

    it('should call onError on plugin errors', () => {
      const kernel = createKernel();
      const onError = vi.fn();
      const plugin: SlugPlugin = {
        name: 'test',
        version: '1.0.0',
        install: () => {
          throw new Error('Install error');
        },
        onError,
      };

      kernel.use(plugin);
      kernel.slug('test');

      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('transform stages', () => {
    it('should execute transforms in priority order', () => {
      const kernel = createKernel();
      const order: string[] = [];

      const plugin1: SlugPlugin = {
        name: 'test1',
        version: '1.0.0',
        install: (k) => {
          k.registerTransform({
            name: 'first',
            priority: 100,
            transform: (input) => {
              order.push('first');
              return input;
            },
          });
        },
      };

      const plugin2: SlugPlugin = {
        name: 'test2',
        version: '1.0.0',
        install: (k) => {
          k.registerTransform({
            name: 'second',
            priority: 50,
            transform: (input) => {
              order.push('second');
              return input;
            },
          });
        },
      };

      kernel.use(plugin1, plugin2);
      kernel.slug('test');

      expect(order).toEqual(['first', 'second']);
    });
  });
});
