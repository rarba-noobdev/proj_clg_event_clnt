import type { Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';

interface FormDataFields {
	email: string;
	password: string;
	passwordConfirm: string;
	rrn: string;
	first_name: string;
	last_name: string;
	phone: string;
	course_code: string;
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
