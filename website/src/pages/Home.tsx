import { Package, Zap, Shield, Globe, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/code/CodeBlock';
import { Button } from '@/components/ui/button';
import { NPM_PACKAGE } from '@/lib/constants';

const exampleCode = `import { slug } from '@oxog/slug';

// Basic usage
slug('Hello World!');
// 'hello-world'

// With Unicode support
slug('Größe Übermaß', { locale: 'de' });
// 'groesse-uebermass'

// With options
slug('This is a very long title', {
  maxLength: 15,
  separator: '_',
  lowercase: true
});
// 'this_is_a_very'`;

const features = [
  {
    icon: Zap,
    title: 'Zero Dependencies',
    description: 'Lightweight with no runtime dependencies. Built with TypeScript and native browser APIs.',
  },
  {
    icon: Globe,
    title: 'Unicode Support',
    description: 'Transliterates 100+ languages from Cyrillic to Chinese, Arabic to Greek, and more.',
  },
  {
    icon: Code2,
    title: 'Plugin Architecture',
    description: 'Micro-kernel design with priority-based transform pipeline for maximum flexibility.',
  },
  {
    icon: Shield,
    title: 'TypeScript Native',
    description: '100% TypeScript with strict mode. Full type safety and excellent DX.',
  },
];

export function Home() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Package className="h-4 w-4" />
          <span>@oxog/slug</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Zero-dependency URL Slug Generator
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A lightweight URL slug generator with Unicode transliteration, language-aware transformations, and micro-kernel plugin architecture.
        </p>

        {/* Install Command */}
        <div className="flex justify-center gap-4 mb-8">
          <Button asChild size="default">
            <Link to="/docs">Get Started</Link>
          </Button>
          <Button variant="outline" size="default" asChild>
            <a
              href="https://github.com/ersinkoc/slug"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Install Code */}
        <div className="max-w-2xl mx-auto">
          <CodeBlock
            code={`npm install ${NPM_PACKAGE}`}
            language="bash"
            filename="Terminal"
            showLineNumbers={false}
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Example Code */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Example</h2>
        <CodeBlock
          code={exampleCode}
          language="typescript"
          filename="example.ts"
        />
      </div>

      {/* Stats */}
      <div className="py-16 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">~43KB</div>
            <div className="text-sm text-muted-foreground">Bundle Size</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">0</div>
            <div className="text-sm text-muted-foreground">Dependencies</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Test Coverage</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">TS</div>
            <div className="text-sm text-muted-foreground">TypeScript Native</div>
          </div>
        </div>
      </div>
    </div>
  );
}
