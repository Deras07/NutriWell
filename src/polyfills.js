// Minimal polyfills for Privy compatibility

// Global polyfills
if (typeof global === 'undefined') {
  globalThis.global = globalThis;
}

// Buffer polyfill
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

export default {};