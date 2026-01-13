/**
 * @oxog/slug - Type Definitions
 *
 * Zero-dependency URL slug generator with Unicode transliteration
 * and language-aware transformations.
 */

/**
 * Options for slug generation.
 *
 * @example
 * ```typescript
 * // Default options
 * const result = slug('Hello World!');
 * // result: 'hello-world'
 *
 * // With custom separator
 * slug('Hello World', { separator: '_' });
 * // result: 'hello_world'
 *
 * // With locale
 * slug('Größe', { locale: 'de' });
 * // result: 'groesse'
 *
 * // With max length
 * slug('This is a very long title', { maxLength: 20 });
 * // result: 'this-is-a-very-long'
 *
 * // With custom replacements
 * slug('C++ Code', { replacements: { '++': 'pp' } });
 * // result: 'cpp-code'
 *
 * // With reserved words
 * slug('admin', { reserved: ['admin'] });
 * // result: 'admin-1'
 * ```
 */
export interface SlugOptions {
  /**
   * Separator between words.
   *
   * @defaultValue '-'
   *
   * @example
   * ```typescript
   * slug('Hello World', { separator: '-' });  // 'hello-world'
   * slug('Hello World', { separator: '_' });  // 'hello_world'
   * slug('Hello World', { separator: '.' });  // 'hello.world'
   * slug('Hello World', { separator: '' });   // 'helloworld'
   * ```
   */
  separator?: string;

  /**
   * Convert to lowercase.
   *
   * @defaultValue true
   *
   * @example
   * ```typescript
   * slug('API v2.0');                         // 'api-v2-0'
   * slug('API v2.0', { lowercase: false });   // 'API-v2-0'
   * slug('iPhone Pro', { lowercase: false }); // 'iPhone-Pro'
   * ```
   */
  lowercase?: boolean;

  /**
   * Locale for language-specific rules.
   *
   * Supported locales: 'de', 'tr', 'ru', 'ar', 'zh', 'ja', 'el', 'es', 'fr'
   *
   * @defaultValue undefined (auto-detect or generic)
   *
   * @example
   * ```typescript
   * // German: ä→ae, ö→oe, ü→ue, ß→ss
   * slug('Größe', { locale: 'de' });     // 'groesse'
   *
   * // Turkish: ı→i, İ→i, ğ→g, ş→s, ç→c
   * slug('Türkçe İçerik', { locale: 'tr' }); // 'turkce-icerik'
   *
   * // Russian: full transliteration
   * slug('Москва', { locale: 'ru' });    // 'moskva'
   *
   * // Spanish: ñ→n
   * slug('España', { locale: 'es' });    // 'espana'
   *
   * // French: œ→oe, æ→ae
   * slug('Cœur', { locale: 'fr' });      // 'coeur'
   * ```
   */
  locale?: 'de' | 'tr' | 'ru' | 'ar' | 'zh' | 'ja' | 'el' | 'es' | 'fr' | string;

  /**
   * Maximum slug length.
   *
   * When set, the slug will be truncated to this length.
   * By default, respects word boundaries (cuts at whole words).
   *
   * @defaultValue undefined (no limit)
   *
   * @example
   * ```typescript
   * slug('This is a very long title that needs truncation', {
   *   maxLength: 20
   * }); // 'this-is-a-very-long'
   *
   * // With strict mode (exact cut)
   * slug('This is a very long title', {
   *   maxLength: 20,
   *   strict: true
   * }); // 'this-is-a-very-long'
   * ```
   */
  maxLength?: number;

  /**
   * Cut exactly at maxLength vs word boundary.
   *
   * - false: Truncate at word boundary (default)
   * - true: Cut exactly at maxLength
   *
   * @defaultValue false
   *
   * @example
   * ```typescript
   * slug('This is a very long title', {
   *   maxLength: 15,
   *   strict: false
   * }); // 'this-is-a-very'
   *
   * slug('This is a very long title', {
   *   maxLength: 15,
   *   strict: true
   * }); // 'this-is-a-very'
   * ```
   */
  strict?: boolean;

  /**
   * Custom replacement map.
   *
   * Keys are strings to replace, values are replacements.
   * Replacements are applied before transliteration.
   *
   * @defaultValue {}
   *
   * @example
   * ```typescript
   * slug('C++ & C# Code', {
   *   replacements: {
   *     '++': 'pp',
   *     '#': 'sharp',
   *     '&': 'and'
   *   }
   * }); // 'cpp-and-csharp-code'
   *
   * slug('@user mentioned #topic', {
   *   replacements: {
   *     '@': 'at-',
   *     '#': 'tag-'
   *   }
   * }); // 'at-user-mentioned-tag-topic'
   * ```
   */
  replacements?: Record<string, string>;

  /**
   * Reserved words to avoid.
   *
   * If the generated slug matches a reserved word,
   * a suffix will be appended (default: '-1').
   *
   * @defaultValue []
   *
   * @example
   * ```typescript
   * slug('admin', {
   *   reserved: ['admin', 'api', 'login', 'register']
   * }); // 'admin-1'
   *
   * slug('API', {
   *   reserved: ['api', 'admin'],
   *   lowercase: true
   * }); // 'api-1'
   *
   * // With custom suffix
   * slug('admin', {
   *   reserved: ['admin'],
   *   reservedSuffix: '-page'
   * }); // 'admin-page'
   * ```
   */
  reserved?: string[];

  /**
   * Suffix for reserved word conflicts.
   *
   * @defaultValue '-1'
   *
   * @example
   * ```typescript
   * slug('admin', {
   *   reserved: ['admin'],
   *   reservedSuffix: '-page'
   * }); // 'admin-page'
   *
   * slug('admin', {
   *   reserved: ['admin'],
   *   reservedSuffix: '-duplicate'
   * }); // 'admin-duplicate'
   * ```
   */
  reservedSuffix?: string;

  /**
   * Remove leading/trailing separators.
   *
   * @defaultValue true
   *
   * @example
   * ```typescript
   * slug('---Hello World---', { trim: true });  // 'hello-world'
   * slug('---Hello World---', { trim: false }); // '-hello-world-'
   * ```
   */
  trim?: boolean;
}

/**
 * Default options for slug generation.
 *
 * @internal
 */
export interface DefaultSlugOptions {
  separator: string;
  lowercase: boolean;
  locale?: string;
  maxLength?: number;
  strict: boolean;
  replacements: Record<string, string>;
  reserved: string[];
  reservedSuffix: string;
  trim: boolean;
}

/**
 * Shared context between plugins.
 *
 * Contains the original input, current options,
 * and a data map for plugin-specific data.
 *
 * @example
 * ```typescript
 * interface MyPluginContext extends SlugContext {
 *   customData: Map<string, unknown>;
 * }
 * ```
 */
export interface SlugContext {
  /** Original input string */
  original: string;

  /** Plugin-specific data storage */
  data: Map<string, unknown>;
}

/**
 * Context passed through transformation pipeline.
 *
 * @example
 * ```typescript
 * const stage: TransformStage = {
 *   name: 'my-transform',
 *   priority: 50,
 *   transform: (input, context) => {
 *     // Access options via context.options
 *     // Store data via context.data.set()
 *     return input.toUpperCase();
 *   }
 * };
 * ```
 */
export interface TransformContext {
  /** Original input string */
  original: string;

  /** Current options (with defaults applied) */
  options: DefaultSlugOptions;

  /** Plugin-specific data */
  data: Map<string, unknown>;
}

/**
 * Transformation pipeline stage.
 *
 * @example
 * ```typescript
 * const stage: TransformStage = {
 *   name: 'reverse',
 *   priority: 50,
 *   transform: (input) => input.split('').reverse().join('')
 * };
 * ```
 */
export interface TransformStage {
  /** Stage name for debugging */
  name: string;

  /** Priority (lower runs first) */
  priority: number;

  /** Transform function */
  transform: (input: string, context: TransformContext) => string;
}

/**
 * Event handler function type.
 *
 * @example
 * ```typescript
 * const handler: EventHandler = (data) => {
 *   console.log('Event received:', data);
 * };
 * ```
 */
export type EventHandler = (data?: unknown) => void;

/**
 * Plugin interface for extending slug functionality.
 *
 * @typeParam TContext - Shared context type between plugins
 *
 * @example
 * ```typescript
 * const myPlugin: SlugPlugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *
 *   install(kernel) {
 *     // Register transform stages
 *     kernel.registerTransform({
 *       name: 'my-transform',
 *       priority: 50,
 *       transform: (input) => input.toUpperCase()
 *     });
 *
 *     // Subscribe to events
 *     kernel.on('slug:after', (result) => {
 *       console.log('Slug generated:', result);
 *     });
 *   },
 *
 *   onInit(context) {
 *     // Called after all plugins installed
 *   },
 *
 *   onDestroy() {
 *     // Cleanup when plugin unregistered
 *   },
 *
 *   onError(error) {
 *     // Handle errors in this plugin
 *   }
 * };
 *
 * // Use the plugin
 * const kernel = createKernel();
 * kernel.use(myPlugin);
 * ```
 */
export interface SlugPlugin<TContext = SlugContext> {
  /** Unique plugin identifier (kebab-case) */
  name: string;

  /** Semantic version (e.g., "1.0.0") */
  version: string;

  /** Other plugins this plugin depends on */
  dependencies?: string[];

  /**
   * Called when plugin is registered.
   *
   * @param kernel - The kernel instance
   */
  install: (kernel: SlugKernel<TContext>) => void;

  /**
   * Called after all plugins are installed.
   *
   * @param context - Shared context object
   */
  onInit?: (context: TContext) => void | Promise<void>;

  /**
   * Called when plugin is unregistered.
   */
  onDestroy?: () => void | Promise<void>;

  /**
   * Called on error in this plugin.
   *
   * @param error - The error that occurred
   */
  onError?: (error: Error) => void;
}

/**
 * Slugger instance for stateful slug generation.
 *
 * Use `createSlugger()` to create an instance.
 *
 * @example
 * ```typescript
 * const slugger = createSlugger();
 *
 * // Generate unique slugs
 * slugger.slug('Hello World');  // 'hello-world'
 * slugger.slug('Hello World');  // 'hello-world-1'
 * slugger.slug('Hello World');  // 'hello-world-2'
 *
 * // Check existence
 * slugger.has('hello-world');   // true
 *
 * // List all slugs
 * slugger.list();               // ['hello-world', 'hello-world-1', ...]
 *
 * // Get count for base slug
 * slugger.count('hello-world'); // 3
 *
 * // Reset history
 * slugger.reset();
 * ```
 */
export interface Slugger {
  /**
   * Generate a slug, handling duplicates.
   *
   * @param input - The input string to slugify
   * @param options - Optional slug generation options
   * @returns The generated slug
   *
   * @example
   * ```typescript
   * const slugger = createSlugger();
   * slugger.slug('Hello World');  // 'hello-world'
   * slugger.slug('Hello World');  // 'hello-world-1'
   * ```
   */
  slug(input: string, options?: SlugOptions): string;

  /**
   * Check if a slug exists in the history.
   *
   * @param slug - The slug to check
   * @returns true if the slug exists
   *
   * @example
   * ```typescript
   * const slugger = createSlugger();
   * slugger.slug('Hello World');
   * slugger.has('hello-world');   // true
   * slugger.has('goodbye-world'); // false
   * ```
   */
  has(slug: string): boolean;

  /**
   * List all generated slugs.
   *
   * @returns Array of all slugs
   *
   * @example
   * ```typescript
   * const slugger = createSlugger();
   * slugger.slug('Hello World');
   * slugger.slug('Hello World');
   * slugger.list();  // ['hello-world', 'hello-world-1']
   * ```
   */
  list(): string[];

  /**
   * Reset slug history.
   *
   * @example
   * ```typescript
   * const slugger = createSlugger();
   * slugger.slug('Hello World');
   * slugger.slug('Hello World');
   * slugger.reset();
   * slugger.slug('Hello World');  // 'hello-world' (starts over)
   * ```
   */
  reset(): void;

  /**
   * Get count for a base slug.
   *
   * @param baseSlug - The base slug to count
   * @returns The number of times this slug was generated
   *
   * @example
   * ```typescript
   * const slugger = createSlugger();
   * slugger.slug('Hello World');
   * slugger.slug('Hello World');
   * slugger.slug('Hello World');
   * slugger.count('hello-world'); // 3
   * ```
   */
  count(baseSlug: string): number;
}

/**
 * Kernel for plugin management.
 *
 * Use `createKernel()` to create a kernel instance.
 *
 * @typeParam TContext - Shared context type between plugins
 *
 * @example
 * ```typescript
 * const kernel = createKernel();
 *
 * // Register plugins
 * kernel.use(localeDePlugin);
 * kernel.use(counterPlugin);
 *
 * // Generate slug
 * kernel.slug('Größe', { locale: 'de' }); // 'groesse'
 *
 * // List plugins
 * kernel.list(); // ['locale-de', 'counter']
 *
 * // Check plugin exists
 * kernel.has('locale-de'); // true
 *
 * // Get plugin
 * const plugin = kernel.get('locale-de');
 *
 * // Unregister plugin
 * kernel.unregister('locale-de');
 *
 * // Event handling
 * kernel.on('slug:after', (result) => {
 *   console.log('Generated:', result);
 * });
 * ```
 */
export interface SlugKernel<TContext = SlugContext> {
  /**
   * Register a plugin or multiple plugins.
   *
   * @param plugins - The plugin(s) to register
   * @returns This kernel instance for chaining
   *
   * @example
   * ```typescript
   * const kernel = createKernel();
   * kernel.use(localeDePlugin, counterPlugin);
   * // Or with spread operator
   * kernel.use(...corePlugins);
   * ```
   */
  use(...plugins: [SlugPlugin<TContext>] | SlugPlugin<TContext>[]): this;

  /**
   * Unregister a plugin.
   *
   * @param name - The plugin name
   * @returns true if the plugin was unregistered
   *
   * @example
   * ```typescript
   * kernel.unregister('locale-de'); // true
   * kernel.unregister('not-found'); // false
   * ```
   */
  unregister(name: string): boolean;

  /**
   * List registered plugins.
   *
   * @returns Array of plugin names
   *
   * @example
   * ```typescript
   * kernel.list(); // ['transliterator', 'normalizer', 'sanitizer']
   * ```
   */
  list(): string[];

  /**
   * Check if plugin exists.
   *
   * @param name - The plugin name
   * @returns true if the plugin is registered
   *
   * @example
   * ```typescript
   * kernel.has('transliterator'); // true
   * kernel.has('not-found');      // false
   * ```
   */
  has(name: string): boolean;

  /**
   * Get plugin by name.
   *
   * @param name - The plugin name
   * @returns The plugin or undefined
   *
   * @example
   * ```typescript
   * const plugin = kernel.get('transliterator');
   * if (plugin) {
   *   console.log(plugin.name, plugin.version);
   * }
   * ```
   */
  get(name: string): SlugPlugin<TContext> | undefined;

  /**
   * Generate slug with registered plugins.
   *
   * @param input - The input string to slugify
   * @param options - Optional slug generation options
   * @returns The generated slug
   *
   * @example
   * ```typescript
   * const kernel = createKernel();
   * kernel.use(localeTrPlugin);
   * kernel.slug('İstanbul', { locale: 'tr' }); // 'istanbul'
   * ```
   */
  slug(input: string, options?: SlugOptions): string;

  /**
   * Subscribe to an event.
   *
   * @param event - The event name
   * @param handler - The event handler
   * @returns Unsubscribe function
   *
   * @example
   * ```typescript
   * const unsubscribe = kernel.on('slug:after', (result) => {
   *   console.log('Slug generated:', result);
   * });
   *
   * // Later: unsubscribe()
   * ```
   */
  on(event: string, handler: EventHandler): () => void;

  /**
   * Emit an event.
   *
   * @param event - The event name
   * @param data - Optional event data
   *
   * @example
   * ```typescript
   * kernel.emit('custom-event', { data: 'value' });
   * ```
   */
  emit(event: string, data?: unknown): void;

  /**
   * Register a transform stage.
   *
   * Called by plugins during installation to add transformation stages
   * to the pipeline.
   *
   * @param stage - The transform stage to register
   *
   * @example
   * ```typescript
   * const plugin: SlugPlugin = {
   *   name: 'my-plugin',
   *   version: '1.0.0',
   *   install(kernel) {
   *     kernel.registerTransform({
   *       name: 'my-transform',
   *       priority: 50,
   *       transform(input) {
   *         return input.toUpperCase();
   *       }
   *     });
   *   }
   * };
   * ```
   */
  registerTransform(stage: TransformStage): void;
}

/**
 * Error codes for slug-related errors.
 *
 * @example
 * ```typescript
 * try {
 *   slug(123 as unknown as string);
 * } catch (error) {
 *   if (error instanceof SlugException) {
 *     if (error.code === SlugError.INVALID_INPUT) {
 *       console.error('Invalid input type');
 *     }
 *   }
 * }
 * ```
 */
export enum SlugError {
  /** Input is not a string */
  INVALID_INPUT = 'INVALID_INPUT',

  /** Invalid separator character */
  INVALID_SEPARATOR = 'INVALID_SEPARATOR',

  /** Plugin not registered */
  PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',

  /** Circular dependency detected */
  CIRCULAR_DEPENDENCY = 'CIRCULAR_DEPENDENCY',

  /** Plugin version mismatch */
  VERSION_MISMATCH = 'VERSION_MISMATCH',
}

/**
 * Custom error class for slug-related errors.
 *
 * @example
 * ```typescript
 * throw new SlugException(
 *   SlugError.INVALID_INPUT,
 *   'Input must be a string',
 *   { received: typeof input }
 * );
 * ```
 */
export class SlugException extends Error {
  /** Error code */
  code: SlugError;

  /** Additional context about the error */
  context?: unknown;

  /**
   * Create a new SlugException.
   *
   * @param code - The error code
   * @param message - Error message
   * @param context - Optional additional context
   */
  constructor(code: SlugError, message: string, context?: unknown) {
    super(message);
    this.name = 'SlugException';
    this.code = code;
    this.context = context;
  }
}
