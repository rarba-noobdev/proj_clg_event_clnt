import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
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
      console.log();
      
redirect(error.status || 520, `/auth/error/${error.message}`);

}

    // Success: redirect to dashboard
    redirect(303, '/');
  }
};