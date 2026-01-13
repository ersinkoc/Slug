import { CodeBlock } from '@/components/code/CodeBlock';

const apiCode = `import { slug, createSlugger, createKernel } from '@oxog/slug';

// Simple slug generation
const result = slug('Hello World!');
console.log(result); // 'hello-world'

// With options
const result2 = slug('Hello World!', {
  separator: '_',
  lowercase: true,
  trim: true
});

// Stateful slugger for duplicates
const slugger = createSlugger();
slugger.slug('title');    // 'title'
slugger.slug('title');    // 'title-1'
slugger.slug('title');    // 'title-2'

// Advanced kernel usage
const kernel = createKernel();
kernel.use(customPlugin);
const result3 = kernel.slug('Custom Input');`;

export function API() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">API Reference</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">slug(input, options?)</h2>
        <p className="text-muted-foreground mb-4">
          Generate a URL slug from any string.
        </p>

        <h3 className="text-lg font-semibold mb-2">Parameters</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
          <li><code className="text-foreground">input: string</code> - The string to convert</li>
          <li><code className="text-foreground">options?: SlugOptions</code> - Optional configuration</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Returns</h3>
        <p className="text-muted-foreground mb-4">
          <code className="text-foreground">string</code> - The generated slug
        </p>

        <CodeBlock code={apiCode} language="typescript" filename="api.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Options</h2>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">separator: string</code>
            <p className="text-sm text-muted-foreground mt-1">
              Default: '-'. Character to use as word separator.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">lowercase: boolean</code>
            <p className="text-sm text-muted-foreground mt-1">
              Default: true. Convert the result to lowercase.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">trim: boolean</code>
            <p className="text-sm text-muted-foreground mt-1">
              Default: true. Remove leading/trailing separators.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">maxLength: number</code>
            <p className="text-sm text-muted-foreground mt-1">
              Maximum length of the slug. Truncates at word boundaries.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">strict: boolean</code>
            <p className="text-sm text-muted-foreground mt-1">
              Default: false. Truncate exactly at maxLength without respecting word boundaries.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">locale: string</code>
            <p className="text-sm text-muted-foreground mt-1">
              Locale code for language-specific transliteration (e.g., 'de', 'tr', 'ru').
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <code className="text-foreground">reserved: string[]</code>
            <p className="text-sm text-muted-foreground mt-1">
              Words that should be suffixed to avoid conflicts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
