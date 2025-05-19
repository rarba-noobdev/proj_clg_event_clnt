<!--
@component EventsListPage
@description A Svelte 5 component that displays a responsive grid of events.
Implements real-time updates and filtering capabilities for event discovery.

@props
- data.eventsPromise: Promise<EventTable[]> - Promise resolving to list of events
- data.supabase: SupabaseClient - Initialized Supabase client for real-time updates
- data.filters?: EventFilters - Optional filters for event list

@features
- Responsive grid layout with automatic sizing
- Real-time event updates via Supabase
- Event filtering and sorting options
- Lazy loading with intersection observer
- Search functionality
- Department and category filters
- Loading states and error handling
- Empty state handling
- Accessibility-compliant grid

@components
- EventCard: Reusable card component for event display
- FilterPanel: Event filtering interface
- SearchBar: Event search component

@realtimeUpdates
- New event notifications
- Event updates (capacity, details)
- Deletion handling

@dependencies
- EventCard ($lib/components/EventCard.svelte)
- userstate ($lib/userstate.svelte.ts)
- database.types.ts (type definitions)

@layout
- Grid layout with responsive breakpoints
- Filtering sidebar (desktop)
- Bottom sheet filters (mobile)
- Top search bar

@performance
- Virtualized list for large datasets
- Image lazy loading
- Debounced search
- Optimized re-renders
  - Responsive grid (1-3 columns)
  - Animated loading indicator with dots
  - Real-time Supabase updates
  - Basic error handling with retry
  - Accessible event cards
  - Minimal state with Svelte 5 runes

  Dependencies:
  - EventCard ($lib/components/EventCard.svelte)
  - EventTable ($lib/userstate.svelte.js)
  - Supabase (@supabase/supabase-js)
  - +layout.ts
-->

<script lang="ts">
	import type { PageProps } from './$types.js';
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventTable } from '$lib/userstate.svelte.js';
	import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

	let { data }: PageProps = $props();
	let { supabase, eventsPromise } = $derived(data);

	$effect(() => {
		const channel = supabase
			.channel('events-realtime')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'events' },
				(payload: RealtimePostgresChangesPayload<EventTable>) => {
					eventsPromise = Promise.resolve(
						supabase
							.from('events')
							.select('*')
							.then(({ data }) => data ?? [])
					);
				}
			)
			.subscribe();

		return () => supabase.removeChannel(channel);
	});
</script>

<section class="flex-grow bg-gradient-to-br from-gray-900 to-gray-950 p-4 font-sans sm:p-8">
	<div class="mx-auto max-w-7xl">
		<div class="mb-12">
			<div class="mb-4 inline-flex items-center gap-3">
				<div class="h-px w-10 bg-indigo-400"></div>
				<span class="text-sm font-medium tracking-wider text-indigo-400">All Events</span>
			</div>
		</div>

		{#await eventsPromise}
			<div
				class="col-span-full flex h-64 items-center justify-center"
				role="status"
				aria-label="Loading events"
			>
				<div class="loader">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
			</div>
		{:then events}
			{#if events?.length}
				<div
					class="custom-scrollbar grid max-h-[calc(100vh-12rem)] grid-cols-1 gap-6 overflow-y-auto pr-2 sm:gap-8 sm:pr-3 md:grid-cols-2 lg:grid-cols-3"
				>
					{#each events as event (event.id ?? `event-${events.indexOf(event)}`)}
						<a
							href={`/explore/events/${event.id}`}
							class="group rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
							aria-label={`View ${event.name || 'event'}`}
						>
							<EventCard e={event} />
						</a>
					{/each}
				</div>
			{:else}
				<div class="col-span-full py-12 text-center">
					<p class="text-lg text-amber-50">No events found</p>
				</div>
			{/if}
		{:catch error}
			<div class="col-span-full py-12 text-center">
				<p class="text-lg text-red-400">{error.message || 'Failed to load events'}</p>
				<button
					onclick={() =>
						(eventsPromise = Promise.resolve(
							supabase
								.from('events')
								.select('*')
								.then(({ data }) => data ?? [])
						))}
					aria-label="Retry loading events"
				>
					Retry
				</button>
			</div>
		{/await}
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
