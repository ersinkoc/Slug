import { useState } from 'react';
import { CodeBlock } from '@/components/code/CodeBlock';
import { Button } from '@/components/ui/button';

export function Playground() {
  const [input, setInput] = useState('Hello World! This is a test.');
  const [output, setOutput] = useState('hello-world-this-is-a-test');
  const [options, setOptions] = useState({
    separator: '-',
    lowercase: true,
    trim: true,
    maxLength: 50,
    locale: '',
  });

  const handleGenerate = () => {
    // Simulate slug generation (would use actual @oxog/slug in production)
    let result = input;

    // Simple simulation
    if (options.lowercase) {
      result = result.toLowerCase();
    }

    // Replace non-alphanumeric with separator
    result = result.replace(/[^a-zA-Z0-9]/g, options.separator);

    // Collapse repeated separators
    result = result.replace(new RegExp(`\\${options.separator}+`, 'g'), options.separator);

    // Trim
    if (options.trim) {
      result = result.replace(new RegExp(`^\\${options.separator}|\\${options.separator}$`, 'g'), '');
    }

    // Truncate
    if (options.maxLength && result.length > options.maxLength) {
      result = result.slice(0, options.maxLength);
      // Trim trailing separator
      if (result.endsWith(options.separator)) {
        result = result.slice(0, -1);
      }
    }

    setOutput(result);
  };

  const presetExamples = [
    { name: 'Basic', input: 'Hello World!' },
    { name: 'Unicode', input: 'Größe Übermaß' },
    { name: 'Long', input: 'This is a very long title that needs to be truncated' },
    { name: 'Custom', input: 'C++ Developer Guide' },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Playground</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Input String</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 rounded-lg border border-border bg-background text-foreground"
            placeholder="Enter text to slugify..."
          />

          {/* Presets */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Examples</label>
            <div className="flex flex-wrap gap-2">
              {presetExamples.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setInput(preset.input)}
                  className="px-3 py-1 text-sm rounded-md border border-border hover:bg-accent transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Options</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="text"
                  value={options.separator}
                  onChange={(e) => setOptions({ ...options, separator: e.target.value })}
                  className="w-20 px-2 py-1 rounded border border-border bg-background"
                />
                <span className="text-sm">Separator</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Lowercase</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={options.trim}
                  onChange={(e) => setOptions({ ...options, trim: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Trim</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="number"
                  value={options.maxLength}
                  onChange={(e) => setOptions({ ...options, maxLength: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 rounded border border-border bg-background"
                />
                <span className="text-sm">Max Length</span>
              </label>
            </div>
          </div>

          <Button onClick={handleGenerate} className="mt-6 w-full">
            Generate Slug
          </Button>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <div className="h-32 p-3 rounded-lg border border-border bg-muted/50 font-mono text-sm">
            {output || <span className="text-muted-foreground">Output will appear here...</span>}
          </div>

          {/* Code Preview */}
          {output && (
            <div className="mt-4">
              <CodeBlock
                code={`import { slug } from '@oxog/slug';

const result = slug('${input}', ${JSON.stringify(options)});
console.log(result); // '${output}'`}
                language="typescript"
                filename="usage.ts"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
