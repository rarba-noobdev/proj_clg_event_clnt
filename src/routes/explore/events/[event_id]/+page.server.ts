
import type { PageServerLoad } from './$types.js';
import type { EventTable } from '$lib/userstate.svelte.js';

export const load:PageServerLoad  = async ({params : {event_id} , locals : {supabase}}) => {
    let {data , error} = await supabase.s

}