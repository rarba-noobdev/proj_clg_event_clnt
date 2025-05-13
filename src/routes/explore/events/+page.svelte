<!--
	+page.svelte

	This Svelte component displays a list of events in a responsive grid layout.
	It fetches events asynchronously via a promise provided in the `data` prop, 
	and renders each event using the `EventCard` component. While loading, a custom 
	animated loader is shown. If no events are found, a message is displayed.

	Props:
	- data: An object containing an `eventsPromise` property, which resolves to an array of event objects.

	Features:
	- Responsive grid layout for event cards.
	- Custom scrollbar styling for overflow content.
	- Animated loading indicator while fetching events.
	- Graceful handling of empty event lists.
	- Uses Svelte's `{#await ...}` block for async data handling.
-->
<script lang="ts">
	import type { PageProps } from './$types.js';
	import EventCard from '$lib/components/EventCard.svelte';
	let {data }:PageProps = $props()
	let events = $derived(async () => await data.eventsPromise);
	
	
	
	
	
</script>

<section class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-8 font-sans">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="mb-12">
			<div class="mb-4 inline-flex items-center gap-3">
				<div class="h-0.5 w-10 bg-indigo-400"></div>
				<span class="text-sm font-medium tracking-wider text-indigo-400">YOUR EVENTS</span>
			</div>
		</div>

		{#await events()}
			<div class="col-span-full flex h-64 items-center justify-center">
				<div class="loader">
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
					<span class="dot"></span>
				</div>
			</div>
		{:then events}
			<div
				class="custom-scrollbar grid max-h-[calc(100vh-220px)] grid-cols-1 gap-8 overflow-y-auto pr-3 md:grid-cols-2 lg:grid-cols-3"
			>
				{#if events.length > 0}
					{#each events as e (e.id) }
						<a href={`/explore/events/${e.id}`} class="group">
 							<EventCard {e} />
						</a>
					{/each}
				{:else}
					<div class="col-span-full py-12 text-center">
						<p class="text-lg text-amber-50">No events found</p>
					</div>
				{/if}
			</div>
		{/await}
	</div>
</section>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
		height: 6px;
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