/**
 * userstate.svelte.ts
 * ------------------
 * Global state management for user authentication and session handling.
 * Provides a centralized way to manage user state across the application
 * using Svelte's context API and Supabase authentication.
 *
 * Features:
 * - Reactive state management for user session
 * - Supabase client integration
 * - Authentication state persistence
 * - Type-safe database interactions
 *
 * @module userstate
 */

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';
import type { Database } from '$lib/types/database.types.js';
export type EventTable = Database['public']['Tables']['events']['Row'];

/**
 * Interface representing the user state data structure
 * @interface userStateObject
 */
interface userStateObject {
	/** Current user session or null if not authenticated */
	session: Session | null;
	/** Current user data or null if not authenticated */
	user: User | null;
	/** Initialized Supabase client instance */
	supabase: SupabaseClient | null;
}

/**
 * Class managing global user state and authentication
 * @class UserState
 */
export class UserState {
	/** @private Current user session state */
	private _session = $state<Session | null>(null);
	/** @private Current user data state */
	private _user = $state<User | null>(null);
	/** @private Supabase client instance */
	private _supabase = $state<SupabaseClient | null>(null);
	/** @private Cached events data */
	private _events = $state<EventTable[] | []>([]);

	/**
	 * Creates a new UserState instance
	 * @param userState Initial user state object
	 */
	constructor(userState: userStateObject) {
		this.updateState(userState);
	}

	/**
	 * Updates the current user state
	 * @param userState New user state object
	 */
	updateState(userState: userStateObject) {
		this._session = userState.session;
		this._user = userState.user;
		this._supabase = userState.supabase;
	}

	get session(): Session | null {
		return this._session;
	}

	get user(): User | null {
		return this._user;
	}

	get supabase(): SupabaseClient | null {
		return this._supabase;
	}



	async logOut() {
		await this._supabase?.auth.signOut();
		
	}

}

const UUIK = Symbol('userStateKey');

export const setUserState = (userState: userStateObject) => {
	return setContext(UUIK, new UserState(userState));
};

export const getUserState = (): UserState => {
	const userState = getContext(UUIK);
	if (!(userState instanceof UserState)) {
		throw new Error('UserState context not found or invalid.');
	}
	return userState;
};
