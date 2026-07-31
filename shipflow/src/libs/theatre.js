// src/lib/theatre.js
import * as studioModule from '@theatre/studio';

// Safely extract the default export regardless of how Vite/Rolldown bundles it
const studio = studioModule.default || studioModule;

export default studio;