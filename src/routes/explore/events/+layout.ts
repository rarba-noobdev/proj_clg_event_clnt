import type { LayoutLoad } from './$types.js';
import type { EventTable } from '$lib/userstate.svelte.js';

export const load: LayoutLoad = async ({ parent }) => {
    const { supabase } = await parent();
    
     const eventsPromise = supabase
        .from('events')
        .select('*')
        .then(({ data, error }) => {
            if (error) {
                console.error('Error fetching events:', error);
                throw error;
            }
            return data as EventTable[];
        });
    
    return {
        eventsPromise
    };
}