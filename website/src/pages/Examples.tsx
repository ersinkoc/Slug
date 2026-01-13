import { CodeBlock } from '@/components/code/CodeBlock';

const examples = {
  basic: `import { slug } from '@oxog/slug';

// Basic usage
slug('Hello World!');
// 'hello-world'

// Preserve case
slug('Hello World!', { lowercase: false });
// 'Hello-World'

// Custom separator
slug('Hello World', { separator: '_' });
// 'hello_world'`,

  unicode: `import { slug } from '@oxog/slug';

// German locale
slug('Größe Übermaß', { locale: 'de' });
// 'groesse-uebermass'

// Turkish locale
slug('İstanbul güzel', { locale: 'tr' });
// 'istanbul-guzel'

// Russian locale
slug('Привет мир', { locale: 'ru' });
// 'privet-mir'

// Greek locale
slug('Γειά σου Κόσμε', { locale: 'el' });
// 'geia-sou-kosme'`,

  advanced: `import { slug, createSlugger, createKernel } from '@oxog/slug';
import { customPlugin } from './plugins';

// With maxLength
slug('This is a very long title', { maxLength: 15 });
// 'this-is-a-very'

// With reserved words
slug('admin user', { reserved: ['admin'] });
// 'admin-1-user'

// Stateful slugger
const slugger = createSlugger();
slugger.slug('post');    // 'post'
slugger.slug('post');    // 'post-1'
slugger.slug('post');    // 'post-2'

// Custom kernel with plugins
const kernel = createKernel();
kernel.use(customPlugin);
const result = kernel.slug('Custom input');`,
};

export function Examples() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Examples</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
        <CodeBlock code={examples.basic} language="typescript" filename="basic.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Unicode Support</h2>
        <CodeBlock code={examples.unicode} language="typescript" filename="unicode.ts" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Advanced Usage</h2>
        <CodeBlock code={examples.advanced} language="typescript" filename="advanced.ts" />
      </section>
    </div>
  );
}
