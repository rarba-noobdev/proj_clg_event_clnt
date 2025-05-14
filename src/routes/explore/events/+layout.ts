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
