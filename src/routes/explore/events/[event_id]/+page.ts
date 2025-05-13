import type { PageLoad } from './$types.js';
export const load: PageLoad = async ({ params , parent}) => {
    let data = await parent();
    let {eventsPromise} = data;
    let event = eventsPromise.then((events) => {
        return events.find((event) => event.id === params.event_id);
    });
    console.log(event);
    
    return {
        event
    };
    
    
};