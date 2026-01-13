import { CodeBlock } from '@/components/code/CodeBlock';
import { Link } from 'react-router-dom';
import { NPM_PACKAGE } from '@/lib/constants';

const installCode = `# npm
npm install ${NPM_PACKAGE}

# yarn
yarn add ${NPM_PACKAGE}

# pnpm
pnpm add ${NPM_PACKAGE}

# bun
bun add ${NPM_PACKAGE}`;

const basicUsageCode = `import { slug } from '@oxog/slug';

// Basic usage
slug('Hello World!');
// 'hello-world'

// With options
slug('Hello World!', {
  separator: '_',
  lowercase: false
});
// 'Hello_World'

// With locale support
slug('Größe Übermaß', { locale: 'de' });
// 'groesse-uebermass'

// With maxLength
slug('This is a very long title', { maxLength: 15 });
// 'this-is-a-very'

// With reserved words
slug('admin user', { reserved: ['admin'] });
// 'admin-1-user'

// Strict mode truncation
slug('Hello World', { maxLength: 8, strict: true });
// 'hello wo'`;

export function Introduction() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          @oxog/slug is a zero-dependency URL slug generator with Unicode transliteration and language-aware transformations.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Installation</h2>
        <CodeBlock code={installCode} language="bash" filename="Terminal" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <CodeBlock code={basicUsageCode} language="typescript" filename="usage.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Zero Dependencies</strong> - No runtime dependencies</li>
          <li><strong className="text-foreground">Unicode Support</strong> - Transliterates 100+ languages</li>
          <li><strong className="text-foreground">Plugin Architecture</strong> - Micro-kernel with priority-based transforms</li>
          <li><strong className="text-foreground">Locale Support</strong> - German, Turkish, Russian, Arabic, Chinese, Japanese, Greek</li>
          <li><strong className="text-foreground">TypeScript Native</strong> - Built with TypeScript strict mode</li>
          <li><strong className="text-foreground">100% Test Coverage</strong> - Fully tested with Vitest</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <div className="flex gap-4">
          <Link to="/docs" className="text-primary hover:underline">
            View Documentation →
          </Link>
          <Link to="/api" className="text-primary hover:underline">
            API Reference →
          </Link>
          <Link to="/examples" className="text-primary hover:underline">
            Examples →
          </Link>
        </div>
      </section>
    </div>
  );
}
