//   +page.ts

//   SvelteKit page load function for individual event pages, fetching a specific event
//   by ID from the eventsPromise provided by the parent layout. Designed for routes like
//   /explore/events/[event_id].

//   Parameters:
//   - params: { event_id: string } - Dynamic URL parameter for the event ID
//   - parent: () => Promise<{ eventsPromise: Promise<EventTable[]>; supabase: SupabaseClient }>
//     - Expects eventsPromise and supabase client from parent layout

//   Returns:
//   - { event: Promise<EventTable | null> } - A promise resolving to the event or null if not found or on error

//   Dependencies:
//   - EventTable type (from $lib/userstate.svelte.js)
//   - eventsPromise (from +layout.ts, artifact_id: e53cc036-e3e9-4d06-90a0-7281a52f97ef)

//   Features:
//   - Fetches a single event by ID from the resolved events array
//   - Validates event_id parameter
//   - Handles promise rejections and missing events
//   - Provides detailed debug logging
//   - Returns null for invalid or missing events to simplify downstream handling

import type { PageLoad } from './$types.js';
import type { EventTable } from '$lib/userstate.svelte.js';

export const load: PageLoad = async ({ params, parent }) => {
	// Validate event_id
	if (!params.event_id) {
		console.error('Missing or invalid event_id parameter');
		return { event: Promise.resolve(null) };
	}

	// Fetch parent data
	const { eventsPromise } = await parent();

	// Resolve events and find the matching event
	const event: Promise<EventTable | null> = eventsPromise
		.then((events) => {
			if (!events || events.length === 0) {
				console.warn('No events available in eventsPromise');
				return null;
			}
			const foundEvent = events.find((event) => event.id === params.event_id);
			if (!foundEvent) {
				console.warn(`No event found for ID: ${params.event_id}`);
				return null;
			}
			// console.log('Resolved event:', foundEvent);
			return foundEvent;
		})
		.catch((err: unknown) => {
			console.error('Error resolving eventsPromise:', err);
			return null;
		});

	return { event };
};
