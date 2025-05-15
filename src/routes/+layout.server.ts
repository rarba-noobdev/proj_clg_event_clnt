/**
 * Root Layout Server Module
 * -----------------------
 * Server-side layout handling for the application. Manages session state
 * and provides data to client-side routes.
 *
 * Features:
 * - Session management
 * - Cookie handling
 * - Server-side authentication
 *
 * @module layout.server
 */

import type { LayoutServerLoad } from './$types.js';

/**
 * Layout server load function
 * Handles session management and provides data to client routes
 *
 * @returns {Promise<{ session: Session | null; cookies: any[] }>}
 */
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { session } = await safeGetSession();
	return {
		session,
		cookies: cookies.getAll()
	};
};
