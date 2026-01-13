/**
 * Micro-kernel for plugin management and slug generation.
 *
 * @module kernel
 */

import type {
  DefaultSlugOptions,
  EventHandler,
  SlugContext,
  SlugKernel,
  SlugOptions,
  SlugPlugin,
  TransformContext,
  TransformStage,
} from './types';

/**
 * Default options for slug generation.
 *
 * @internal
 */
const DEFAULT_OPTIONS: DefaultSlugOptions = {
  separator: '-',
  lowercase: true,
  locale: undefined,
  maxLength: undefined,
  strict: false,
  replacements: {},
  reserved: [],
  reservedSuffix: '-1',
  trim: true,
} as const;

/**
 * Merge user options with defaults.
 *
 * @param options - User-provided options
 * @returns Merged options
 *
 * @internal
 */
function mergeOptions(options?: SlugOptions): DefaultSlugOptions {
  if (!options) {
    return { ...DEFAULT_OPTIONS };
  }

  return {
    separator: options.separator ?? DEFAULT_OPTIONS.separator,
    lowercase: options.lowercase ?? DEFAULT_OPTIONS.lowercase,
    locale: options.locale,
    maxLength: options.maxLength,
    strict: options.strict ?? DEFAULT_OPTIONS.strict,
    replacements: options.replacements ?? {},
    reserved: options.reserved ?? [],
    reservedSuffix: options.reservedSuffix ?? DEFAULT_OPTIONS.reservedSuffix,
    trim: options.trim ?? DEFAULT_OPTIONS.trim,
  };
}

/**
 * Kernel implementation class.
 *
 * Manages plugin lifecycle, dependency resolution,
 * event system, and transform pipeline.
 *
 * @internal
 */
class SlugKernelImpl<TContext extends SlugContext = SlugContext> implements SlugKernel<TContext> {
  /** Registered plugins */
  #plugins: Map<string, SlugPlugin<TContext>> = new Map();

  /** Transform stages ordered by priority */
  #stages: TransformStage[] = [];

  /** Event handlers */
  #events: Map<string, EventHandler[]> = new Map();

  /** Shared context */
  #context: TContext;

  /** Whether plugins have been initialized */
  #initialized = false;

  /** Plugin dependencies */
  #dependencies: Map<string, string[]> = new Map();

  constructor() {
    this.#context = {
      original: '',
      data: new Map(),
    } as TContext;
  }

  /**
   * Register a plugin or multiple plugins.
   */
  use(...plugins: [SlugPlugin<TContext>] | SlugPlugin<TContext>[]): this {
    for (const plugin of plugins) {
      // Validate plugin name
      if (!plugin.name || typeof plugin.name !== 'string') {
        throw new Error('Plugin must have a valid name');
      }

      // Check if already registered
      if (this.#plugins.has(plugin.name)) {
        throw new Error(`Plugin "${plugin.name}" is already registered`);
      }

      // Store dependencies
      if (plugin.dependencies) {
        this.#dependencies.set(plugin.name, [...plugin.dependencies]);
      }

      // Register plugin
      this.#plugins.set(plugin.name, plugin);

      // Call install method immediately
      if (plugin.install) {
        try {
          plugin.install(this);
        } catch (error) {
          // Call onError if present
          plugin.onError?.(error as Error);
          this.emit('plugin-error', { plugin: plugin.name, error });
        }
      }

      // Mark as needing re-initialization
      this.#initialized = false;
    }

    return this;
  }

  /**
   * Unregister a plugin.
   */
  unregister(name: string): boolean {
    const plugin = this.#plugins.get(name);
    if (!plugin) {
      return false;
    }

    // Check if other plugins depend on this one
    for (const [pluginName, deps] of this.#dependencies) {
      if (deps.includes(name)) {
        throw new Error(
          `Cannot unregister plugin "${name}" - plugin "${pluginName}" depends on it`
        );
      }
    }

    // Call onDestroy if present
    if (plugin.onDestroy) {
      try {
        plugin.onDestroy();
      } catch (error) {
        this.emit('plugin-error', { plugin: name, error });
      }
    }

    // Remove plugin
    this.#plugins.delete(name);
    this.#dependencies.delete(name);

    // Rebuild stages
    this.#rebuildStages();

    return true;
  }

  /**
   * List registered plugins.
   */
  list(): string[] {
    return Array.from(this.#plugins.keys());
  }

  /**
   * Check if plugin exists.
   */
  has(name: string): boolean {
    return this.#plugins.has(name);
  }

  /**
   * Get plugin by name.
   */
  get(name: string): SlugPlugin<TContext> | undefined {
    return this.#plugins.get(name);
  }

  /**
   * Subscribe to an event.
   */
  on(event: string, handler: EventHandler): () => void {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }

    this.#events.get(event)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.#events.get(event);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  /**
   * Emit an event.
   */
  emit(event: string, data?: unknown): void {
    const handlers = this.#events.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler(data);
        } catch (error) {
          // Error in event handler - log but don't throw
          console.error(`Error in event handler for "${event}":`, error);
        }
      }
    }
  }

  /**
   * Register a transform stage.
   *
   * Called by plugins during installation.
   *
   * @internal
   */
  registerTransform(stage: TransformStage): void {
    // Add stage and sort by priority (higher priority = runs first)
    this.#stages.push(stage);
    this.#stages.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Rebuild transform stages from all plugins.
   *
   * @internal
   */
  #rebuildStages(): void {
    // Don't clear stages - they're registered during install() which is called in use()
    // Just validate dependencies and sort existing stages by priority

    // Validate dependencies by running topological sort
    // (this will throw if dependencies are missing or circular)
    this.#topologicalSort();

    // Sort stages by priority (higher priority = runs first)
    this.#stages.sort((a, b) => b.priority - a.priority);

    // Mark as initialized
    this.#initialized = true;
  }

  /**
   * Topological sort of plugins based on dependencies.
   *
   * @returns Ordered list of plugin names
   *
   * @internal
   */
  #topologicalSort(): string[] {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const result: string[] = [];

    const visit = (pluginName: string): void => {
      if (temp.has(pluginName)) {
        throw new Error(`Circular dependency detected involving plugin "${pluginName}"`);
      }
      if (visited.has(pluginName)) {
        return;
      }

      temp.add(pluginName);

      const deps = this.#dependencies.get(pluginName) ?? [];
      for (const dep of deps) {
        // Check if dependency exists
        if (!this.#plugins.has(dep)) {
          throw new Error(
            `Plugin "${pluginName}" depends on "${dep}" which is not registered`
          );
        }
        visit(dep);
      }

      temp.delete(pluginName);
      visited.add(pluginName);
      result.push(pluginName);
    };

    // Visit all plugins
    for (const pluginName of this.#plugins.keys()) {
      visit(pluginName);
    }

    return result;
  }

  /**
   * Initialize all plugins.
   *
   * @internal
   */
  #initialize(): void {
    if (this.#initialized) {
      return;
    }

    // Rebuild stages if needed
    if (this.#stages.length === 0) {
      this.#rebuildStages();
    }

    // Call onInit for all plugins
    for (const plugin of this.#plugins.values()) {
      if (plugin.onInit) {
        try {
          plugin.onInit(this.#context);
        } catch (error) {
          plugin.onError?.(error as Error);
          this.emit('plugin-error', { plugin: plugin.name, error });
        }
      }
    }

    this.#initialized = true;
  }

  /**
   * Generate a slug with the registered plugins.
   */
  slug(input: string, options?: SlugOptions): string {
    // Validate input
    if (typeof input !== 'string') {
      throw new TypeError(`Input must be a string, received ${typeof input}`);
    }

    // Emit before event
    this.emit('slug:before', { input, options });

    // Initialize plugins
    this.#initialize();

    // Merge options
    const mergedOptions = mergeOptions(options);

    // Create transform context
    const context: TransformContext = {
      original: input,
      options: mergedOptions,
      data: new Map(),
    };

    // Apply custom replacements first
    let result = input;
    const { replacements } = mergedOptions;
    for (const [search, replacement] of Object.entries(replacements)) {
      result = result.split(search).join(replacement);
    }

    // Apply transform pipeline
    for (const stage of this.#stages) {
      try {
        result = stage.transform(result, context);
      } catch (error) {
        this.emit('transform-error', { stage: stage.name, error });
        throw error;
      }
    }

    // Apply lowercase if requested
    if (mergedOptions.lowercase) {
      result = result.toLowerCase();
    }

    // Emit after event
    this.emit('slug:after', { result, input, options });

    return result;
  }
}

/**
 * Create a new kernel instance.
 *
 * @example
 * ```typescript
 * import { createKernel } from '@oxog/slug';
 *
 * const kernel = createKernel();
 * kernel.use(myPlugin);
 * const result = kernel.slug('Hello World');
 * ```
 */
export function createKernel<TContext extends SlugContext = SlugContext>(): SlugKernel<TContext> {
  return new SlugKernelImpl<TContext>();
}
