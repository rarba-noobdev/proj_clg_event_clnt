import type { Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';

interface FormDataFields {
	course_code: string;
	created_at?: string | null;
	email: string;
	first_name: string;
	id?: string;
	is_admin?: boolean | null;
	last_name: string;
	phone?: string | null;
	rrn: string;
	updated_at?: string | null;
	password: string;
	passwordConfirm: string;
}
interface Locals {
	supabase: SupabaseClient;
}

export const load = async ({ locals: { supabase } }) => {
	if (!supabase) {
		throw new Error('Supabase client is not available');
	}
	const { data, error } = await supabase.from('courses').select('*');
	if (error) {
		return {
			error: error.message
		};
	}

	return {
		courses: data
	};
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const { supabase } = locals;

		if (!supabase) {
			return fail(500, { error: 'Server configuration error' });
		}

		const formData = await request.formData();

		// Extract and type form data
		const {
			email,
			password,
			passwordConfirm,
			rrn,
			first_name,
			last_name,
			phone,
			course_code
		}: FormDataFields = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			passwordConfirm: formData.get('passwordConfirm') as string,
			rrn: formData.get('rrn') as string,
			first_name: formData.get('first_name') as string,
			last_name: formData.get('last_name') as string,
			phone: formData.get('phone') as string,
			course_code: formData.get('courses') as string
		};

		// Validate required fields
		if (
			!email ||
			!password ||
			!passwordConfirm ||
			!rrn ||
			!first_name ||
			!last_name ||
			!course_code
		) {
			return fail(400, { error: 'All fields except phone are required' });
		}

		if (password !== passwordConfirm) {
			return fail(400, { error: 'Passwords do not match' });
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'Invalid email format' });
		}

		// Register user with Supabase
		const { error: authError, data } = await supabase.auth.signUp({
			email,
			password
		});

		if (authError) {
			return fail(400, { error: authError.message });
		}

		if (!data.user) {
			return fail(500, { error: 'User creation failed' });
		}

		const { error: userError } = await supabase.from('users').insert({
			id: data.user.id,
			email,
			rrn,
			first_name,
			last_name,
			phone,
			course_code,
			is_admin: false
		});

		if (userError) {
			// Optionally rollback auth signup if user insertion fails
			await supabase.auth.admin.deleteUser(data.user.id);
			return fail(500, { error: userError.message });
		}

		// Redirect to login or dashboard after successful registration
		redirect(303, '/');
	}
};
