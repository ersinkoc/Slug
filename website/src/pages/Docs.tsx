import { Link } from 'react-router-dom';
import { Introduction } from './Introduction';

export function Docs() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border min-h-screen p-4">
        <nav className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/docs" className="block text-foreground hover:text-primary">
                  Introduction
                </Link>
              </li>
              <li>
                <Link to="/docs/installation" className="block text-muted-foreground hover:text-foreground">
                  Installation
                </Link>
              </li>
              <li>
                <Link to="/docs/quick-start" className="block text-muted-foreground hover:text-foreground">
                  Quick Start
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Introduction />
      </main>
    </div>
  );
}
