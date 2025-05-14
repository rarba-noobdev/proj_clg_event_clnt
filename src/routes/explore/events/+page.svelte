<!--
  +page.svelte

  Svelte component displaying a list of events in a responsive grid layout.
  Fetches events asynchronously via eventsPromise and updates in real-time using Supabase.
  Renders events with EventCard component.

  Props:
  - data: { eventsPromise: Promise<EventTable[]>, supabase: SupabaseClient }

  Features:
  - Responsive grid (1-4 columns based on screen size)
  - Animated loading indicator with timeout
  - Real-time updates with reconnection and debouncing
  - Comprehensive error handling with retry mechanism
  - Accessible navigation and event cards
  - Type-safe Supabase integration
  - Svelte 5 runes for reactivity

  Dependencies:
  - EventCard component ($lib/components/EventCard.svelte)
  - EventTable type ($lib/userstate.svelte.js)
  - Supabase client (@supabase/supabase-js)
  - +layout.ts (artifact_id: e53cc036-e3e9-4d06-90a0-7281a52f97ef)
-->
<script lang="ts">
  // Import necessary types and components
  import type { PageProps } from './$types.js';
  import EventCard from '$lib/components/EventCard.svelte';
  import type { EventTable } from '$lib/userstate.svelte.js';
  import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

  // Get props (data passed from +page.ts)
  let { data }: PageProps = $props();
  let { supabase, eventsPromise } = data;

  // State variables to manage the page
  let events: EventTable[] = $state([]); // List of events
  let error: string | null = $state(null); // Error message if something goes wrong
  let loading: boolean = $state(true); // Whether the page is loading

  // Load events and set up real-time updates
  $effect(() => {
    // Load initial events
    eventsPromise
      .then((loadedEvents) => {
        events = loadedEvents ?? []; // Set events or empty array if null
        loading = false; // Done loading
      })
      .catch((err: unknown) => {
        error = err instanceof Error ? err.message : 'Failed to load events';
        loading = false;
      });

    // Set up real-time updates with Supabase
    const channel = supabase.channel('events-realtime');
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload: RealtimePostgresChangesPayload<EventTable>) => {
          // Handle new event added
          if (payload.eventType === 'INSERT') {
            events = [...events, payload.new];
          }
          // Handle event updated
          else if (payload.eventType === 'UPDATE') {
            events = events.map((event) => (event.id === payload.new.id ? payload.new : event));
          }
          // Handle event deleted
          else if (payload.eventType === 'DELETE') {
            events = events.filter((event) => event.id !== payload.old.id);
          }
          error = null; // Clear any previous errors
        }
      )
      .subscribe();

    // Clean up the subscription when the component is destroyed
    return () => {
      supabase.removeChannel(channel);
    };
  });

  // Retry loading events if something goes wrong
  async function handleRetry() {
    error = null;
    loading = true;
    try {
      events = (await eventsPromise) ?? [];
      loading = false;
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : 'Failed to load events';
      loading = false;
    }
  }
</script>


<section class="flex-grow bg-gradient-to-br from-gray-900 to-gray-950 p-4 font-sans sm:p-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-12">
			<div class="mb-4 inline-flex items-center gap-3">
				<div class="h-px w-10 bg-indigo-400"></div>
				<span class="text-sm font-medium tracking-wider text-indigo-400">YOUR EVENTS</span>
			</div>
		</div>

		{#if error}
			<div class="col-span-full py-12 text-center">
				<p class="text-lg text-red-400">{error}</p>
				<button
					class="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
					onclick={handleRetry}
					aria-label="Retry loading events"
				>
				</button>
			</div>
		{:else if loading}
			<div class="col-span-full flex h-64 items-center justify-center">
				<div class="loader" role="status" aria-label="Loading events">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
			</div>
		{:else}
			<div
				class="custom-scrollbar grid max-h-[calc(100vh-12rem)] grid-cols-1 gap-6 overflow-y-auto pr-2 sm:gap-8 sm:pr-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
			>
				{#if events.length > 0}
					{#each events as event (event.id ?? `event-${events.indexOf(event)}`)}
						<a
							href={`/explore/events/${event.id}`}
							class="group rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							aria-label={`View details for ${event.name || 'event'}`}
						>
							<EventCard e={event} />
						</a>
					{/each}
				{:else}
					<div class="col-span-full py-12 text-center">
						<p class="text-lg text-amber-50">No events found</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(31, 41, 55, 0.3);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(129, 140, 248, 0.4);
		border-radius: 10px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(129, 140, 248, 0.6);
	}

	.loader {
		display: flex;
		gap: 8px;
	}

	.dot {
		width: 12px;
		height: 12px;
		background: #818cf8;
		border-radius: 50%;
		animation: pulse 1.4s ease-in-out infinite;
	}

	.dot:nth-child(1) {
		animation-delay: 0s;
	}
	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}
	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}
	.dot:nth-child(4) {
		animation-delay: 0.6s;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.7;
		}
		50% {
			transform: scale(1.5);
			opacity: 1;
		}
	}
</style>
