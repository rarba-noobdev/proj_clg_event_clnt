/**
 * Login Server Actions Module
 * ------------------------
 * Handles server-side authentication logic for user login with Supabase.
 *
 * Features:
 * - Basic form validation
 * - Supabase authentication
 * - Error handling
 * - Session management
 *
 * Actions:
 * 1. Login
 *    - Checks RRN and password presence
 *    - Authenticates with Supabase
 *    - Redirects on success
 *
 */

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		// Get Supabase client
		const { supabase } = locals;
		if (!supabase) {
			return fail(500, { error: 'Server configuration error' });
		}

		// Parse form data
		const formData = await request.formData();
		const rrn = formData.get('rrn')?.toString();
		const password = formData.get('password')?.toString();

		// Check for required fields
		if (!rrn || !password) {
			return fail(400, { rrn: rrn || '', error: 'Please enter registration number and password' });
		}

		// Construct email for Supabase
		const email = `${rrn}@crescent.education`;

		// Attempt login
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return fail(400, { rrn, error: 'Invalid registration number or password' });
		}

		// Verify session
		if (!data.session) {
			return fail(500, { rrn, error: 'Unable to create session' });
		}

		// Redirect to dashboard
		throw redirect(302, '/');
	}
};
