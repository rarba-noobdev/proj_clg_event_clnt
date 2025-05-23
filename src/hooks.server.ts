/**
 * npx supabase gen types typescript --project-id "lkjmoypfaoeciiicxsbw" --schema public > database.types.ts
 * Server Hooks Module
 * -----------------
 * Server-side hooks for handling authentication, session management,
 * and request/response modifications.
 *
 * Features:
 * - Supabase authentication integration
 * - Session validation and management
 * - Protected route handling
 * - Response header management
 *
 * Hooks:
 * 1. Supabase Integration
 *    - Creates Supabase client
 *    - Handles authentication
 *    - Manages cookies
 *
 * 2. Auth Guard
 *    - Protects routes
 *    - Validates sessions
 *    - Handles redirects
 *
 * Usage:
 * This module is automatically used by SvelteKit for server-side
 * request handling and authentication.
 *
 * Protected Routes:
 * - /explore/*
 * - /private/*
 * - /settings/*
 *
 * Public Routes:
 * - /auth/*
 * - /
 * - /about
 *
 * @module hooks.server
 */

import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Database } from '$lib/types/database.types.js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase: Handle = async ({ event, resolve }) => {
	/**
	 * Creates a Supabase client specific to this server request.
	 *
	 * The Supabase client gets the Auth token from the request cookies.
	 */
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll: () => event.cookies.getAll(),
				/**
				 * SvelteKit's cookies API requires `path` to be explicitly set in
				 * the cookie options. Setting `path` to `/` replicates previous/
				 * standard behavior.
				 */
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, { ...options, path: '/' });
					});
				}
			}
		}
	);

	/**
	 * Unlike `supabase.auth.getSession()`, which returns the session _without_
	 * validating the JWT, this function also calls `getUser()` to validate the
	 * JWT before returning the session.
	 */
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return { session: null, user: null };
		}

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			// JWT validation has failed
			return { session: null, user: null };
		}

		return { session, user };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
