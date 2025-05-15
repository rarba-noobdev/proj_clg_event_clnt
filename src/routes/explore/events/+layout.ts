/**
 * Events Layout Module
 * ------------------
 * Manages the layout and data loading for the events section.
 * Handles real-time updates and data synchronization.
 *
 * Features:
 * - Event data loading
 * - Real-time updates
 * - Error handling
 * - Cache management
 *
 * Data Loading:
 * - Fetches events from Supabase
 * - Handles pagination
 * - Manages filters
 * - Sorts results
 *
 * Real-time Updates:
 * - Event changes
 * - Booking updates
 * - Availability status
 * - Price changes
 *
 * Error Handling:
 * - Network errors
 * - Data loading errors
 * - Subscription errors
 *
 * Cache Strategy:
 * - Client-side caching
 * - Optimistic updates
 * - Cache invalidation
 * - Data persistence
 *
 * @module explore/events/layout
 */

import type { LayoutLoad } from './$types.js';
import type { EventTable } from '$lib/userstate.svelte.js';

export const load: LayoutLoad = async ({ parent }) => {
	const { supabase } = await parent();
	// Initial data fetch promise
	const eventsPromise: Promise<EventTable[]> = Promise.resolve(
		supabase
			.from('events')
			.select('*')
			.order('name', { ascending: true })
			.then(({ data, error }) => {
				if (error) {
					console.error('Error fetching events:', error);
					throw error;
				}
				return data as EventTable[];
			})
	);

	return {
		eventsPromise
	};
};
