/**
 * Vite Configuration
 * -----------------
 * Configuration for the Vite build tool and development server.
 *
 * Features:
 * - SvelteKit integration
 * - TailwindCSS processing
 * - Development server setup
 * - Build optimization
 *
 * Plugins:
 * 1. TailwindCSS
 *    - CSS processing
 *    - JIT compilation
 *    - Purge unused styles
 *
 * 2. SvelteKit
 *    - SSR handling
 *    - Routing
 *    - Code splitting
 *
 * Build Options:
 * - Optimization level
 * - Output directory
 * - Asset handling
 * - Source maps
 *
 * Development Server:
 * - Hot module replacement
 * - HTTPS support
 * - Proxy configuration
 * - Port settings
 *
 * @module vite.config
 */

import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
