import { CodeBlock } from '@/components/code/CodeBlock';
import { NPM_PACKAGE } from '@/lib/constants';

const introCode = `import { slug } from '${NPM_PACKAGE}';

// Basic usage
slug('Hello World!');
// 'hello-world'

// With options
slug('Hello World!', { separator: '_', lowercase: true });
// 'hello_world'`;

export function Introduction() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Introduction</h1>

      <p className="text-lg text-muted-foreground mb-8">
        <code className="px-2 py-1 rounded bg-muted font-mono text-sm">@oxog/slug</code> is a zero-dependency
        URL slug generator with Unicode transliteration, language-aware transformations, and a micro-kernel
        plugin architecture.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>

      <CodeBlock code={introCode} language="typescript" filename="example.ts" className="mb-8" />

      <h2 className="text-2xl font-semibold mb-4">Features</h2>

      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        <li>Zero runtime dependencies</li>
        <li>Unicode support for 100+ languages</li>
        <li>Micro-kernel plugin architecture</li>
        <li>100% TypeScript with strict mode</li>
        <li>Word boundary-aware truncation</li>
        <li>Custom separators and transformations</li>
        <li>Reserved word blacklisting</li>
        <li>Counter for duplicate prevention</li>
      </ul>
    </div>
  );
}
