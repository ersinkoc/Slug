/**
 * Express route example.
 *
 * Run with: npx tsx examples/06-integrations/express-route.ts
 */

import { slug } from '../../src/index.ts';

// Generate slugs for Express routes
const routes = [
  'User Profile',
  'Settings Page',
  'API Documentation',
  'Contact Us',
];

for (const route of routes) {
  const path = slug(route);
  console.log(`Route: /${path}`);
}

// Output:
// Route: /user-profile
// Route: /settings-page
// Route: /api-documentation
// Route: /contact-us

// With custom separator
const apiRoutes = [
  'users.list',
  'users.get',
  'users.create',
];

for (const route of apiRoutes) {
  const path = slug(route, { separator: '_' });
  console.log(`API Route: /api/${path}`);
}

// Output:
// API Route: /api/users_list
// API Route: /api/users_get
// API Route: /api/users_create
