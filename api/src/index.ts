// Entry point — registers all Azure Functions
// Polyfill globalThis.crypto for older Node runtimes (SWA managed functions)
if (typeof globalThis.crypto === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { webcrypto } = require('crypto');
  (globalThis as unknown as Record<string, unknown>).crypto = webcrypto;
}

import './functions/planner';
import './functions/rsvp';
