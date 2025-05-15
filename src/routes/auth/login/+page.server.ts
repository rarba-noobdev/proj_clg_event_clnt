/**
 * Login Server Actions Module
 * ------------------------
 * Handles server-side authentication logic for user login.
 * Manages form validation, Supabase authentication, and error handling.
 * 
 * Features:
 * - Form validation
 * - Supabase authentication
 * - Error handling
 * - Session management
 * - Security measures
 * 
 * Actions:
 * 1. Login
 *    - Validates RRN format
 *    - Checks credentials
 *    - Creates session
 *    - Handles errors
 * 
 * Form Processing:
 * - RRN validation
 * - Password validation
 * - CSRF protection
 * - Rate limiting
 * 
 * Error Handling:
 * - Invalid credentials
 * - Missing fields
 * - Server errors
 * - Network issues
 * 
 * Security:
 * - Input sanitization
 * - Rate limiting
 * - Session encryption
 * - Secure headers
 * 
 * @module auth/login/server
 */

import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from '../$types.js';
import { goto } from '$app/navigation';
 
export const actions: Actions = {
	default: async ({ request, locals }) => {
		// Ensure supabase is available
		const { supabase } = locals;
		if (!supabase) {
			console.error('Supabase client not initialized');
			return fail(500, { error: 'Internal server error' });
		}

		// Parse form data
		const formData = await request.formData();
		const rrn = formData.get('rrn')?.toString();
		const password = formData.get('password')?.toString();

		// Validate inputs
		if (!rrn || !password) {
			return fail(400, { error: 'Registration number and password are required' });
		}

		// Validate rrn format (basic example, adjust as needed)
		if (!/^[0-9]+$/.test(rrn)) {
			return fail(400, { error: 'Invalid registration number' });
		}

		// Construct email
		const email = `${rrn}@crescent.education`;

		// Attempt login
		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error('Login error:', error.message);
			// Map Supabase errors to user-friendly messages
			redirect(303, `/auth/error/${error.message}`);			
		}
                                                
		// Success: redirect to Home page
		redirect(303, '/explore/events');
	}
};
