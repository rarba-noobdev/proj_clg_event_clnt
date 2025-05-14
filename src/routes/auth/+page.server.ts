import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';

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
      const errorMessage =
        error.message.includes('Invalid login credentials')
          ? 'Invalid registration number or password'
          : 'An error occurred during login';
      return fail(401, { error: errorMessage });
    }

    // Success: redirect to dashboard
    redirect(303, '/private/dashboard');
  }
};