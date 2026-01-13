import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">@oxog/slug</h1>
          <nav className="flex gap-6 text-sm">
            <a href="/" className="hover:text-slate-300">Home</a>
            <a href="/api" className="hover:text-slate-300">API</a>
            <a href="/examples" className="hover:text-slate-300">Examples</a>
            <a href="https://github.com/ersinkoc/slug" className="hover:text-slate-300">GitHub</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Zero-dependency URL Slug Generator</h2>
          <p className="text-xl text-slate-300 mb-8">
            Unicode transliteration and language-aware transformations for modern web applications.
          </p>

          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <code className="text-sm text-green-400">
              $ npm install @oxog/slug
            </code>
          </div>

          <div className="bg-slate-800 rounded-lg p-6">
            <pre className="text-sm overflow-x-auto"><code className="text-blue-300">{`import { slug } from '@oxog/slug';

slug('Hello World!');           // 'hello-world'
slug('Größe', { locale: 'de' }); // 'groesse'
slug('İstanbul', { locale: 'tr' }); // 'istanbul'
slug('Москва', { locale: 'ru' }); // 'moskva'`}</code></pre>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="bg-slate-800 rounded-lg p-4">✓ Zero runtime dependencies</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ Unicode to ASCII transliteration</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ Language-specific locale rules</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ Smart duplicate handling</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ Word boundary truncation</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ Plugin-based architecture</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ 100% TypeScript</li>
            <li className="bg-slate-800 rounded-lg p-4">✓ ESM + CJS support</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Supported Locales</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">de (German)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">tr (Turkish)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">ru (Russian)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">ar (Arabic)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">zh (Chinese)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">ja (Japanese)</span>
            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">el (Greek)</span>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-slate-400 text-sm">
          <p>MIT License © 2025 Ersin Koç</p>
          <p className="mt-2">
            <a href="https://github.com/ersinkoc/slug" className="hover:text-white">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
