<!--
	Event Card Component
	------------------
	Displays event information in a card format with real-time updates
	and interactive elements.
	
	Features:
	- Dynamic content display
	- Real-time availability updates
	- Interactive registration
	- Responsive design
	- Accessibility support
	
	Props:
	```typescript
	export let event: EventTable;
	```
	
	Usage:
	```svelte
	<script>
	  import EventCard from '$lib/components/EventCard.svelte';
	</script>
	
	<EventCard {event} />
	```
	
	Display Elements:
	1. Event Information
	   - Name and description
	   - Date and time
	   - Location
	   - Price
	
	2. Status Indicators
	   - Availability
	   - Food provision
	   - OD status
	   - Registration progress
	
	3. Interactive Elements
	   - Register button
	   - Share options
	   - More info link
	
	States:
	- Loading
	- Error
	- Available
	- Almost Full
	- Sold Out
-->
<script lang="ts">
	import type { EventTable } from '$lib/userstate.svelte.js';
	let { e }: { e: EventTable } = $props();
</script>

<article
	class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-700/30 bg-gray-800/50 p-6 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/70 hover:shadow-xl"
>
	<!-- Accent Glow -->
	<div
		class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
		style="box-shadow: 0 0 0 1px {e.color}20, 0 0 30px 0 {e.color}10;"
	></div>

	<!-- Event Status Badge -->
	{#if e.is_sold_out}
		<div
			class="absolute -top-8 -right-8 flex h-32 w-32 rotate-45 items-end justify-center bg-red-500/10 pb-2 backdrop-blur-sm"
		>
			<span
				class="translate-y-6 rotate-[-45deg] text-[10px] font-bold tracking-wider text-red-300 uppercase"
				>Sold Out</span
			>
		</div>
	{/if}

	<div class="z-10 mb-5 flex items-start justify-between">
		<h3 class="pr-4 text-xl font-bold text-white">{e.name}</h3>
		<div
			class="flex h-8 w-8 items-center justify-center rounded-full"
			style="background-color: {e.color}20;"
		>
			<svg class="h-4 w-4" style="color: {e.color};" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
					clip-rule="evenodd"
				></path>
			</svg>
		</div>
	</div>

	<!-- Date & Time -->
	<div class="z-10 mb-6 flex flex-col gap-3">
		<div class="flex items-center text-sm text-gray-400">
			<svg class="mr-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.8"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				></path>
			</svg>
			<span>{e.start_date === e.end_date ? e.start_date : `${e.start_date} - ${e.end_date}`}</span>
		</div>

		<div class="flex items-center text-sm text-gray-400">
			<svg class="mr-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.8"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<span>{e.time}</span>
		</div>

		<div class="flex items-center text-sm text-gray-400">
			<svg class="mr-3 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.8"
					d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				></path>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.8"
					d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				></path>
			</svg>
			<span>{e.location}</span>
		</div>

		<!-- Food & OD Provided Badges -->
		<div class="flex gap-2 pt-1">
			{#if e.food_provided}
				<span
					class="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300"
				>
					<svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/>
					</svg>
					Food Provided
				</span>
			{/if}
			{#if e.od_provided}
				<span
					class="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300"
				>
					<svg class="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					OD Available
				</span>
			{/if}
		</div>
	</div>

	<!-- Description -->
	<div class="z-10 mb-6 line-clamp-3 text-sm leading-relaxed text-gray-300">
		{e.description}
	</div>
	<!-- Footer -->
	<div class="z-10 mt-auto border-t border-gray-700/40 pt-5">
		<div class="mb-4 flex items-center justify-between">
			<div class="text-lg font-bold" style="color: {e.color};">
				₹ {e.price}
			</div>
			<div class="text-xs font-medium text-gray-500">
				<span class="text-gray-300">{e.booked_slots}</span> / {e.max_slots} slots
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="relative mb-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-700/50">
			<div
				class="absolute top-0 left-0 h-full rounded-full transition-all duration-700"
				style="width: {(e.booked_slots || 0 / e.max_slots) *
					100}%; background: linear-gradient(90deg, {e.color}, {e.color}d9);"
			></div>
		</div>

		<div class="flex items-center justify-between">
			<span class="text-xs font-medium text-gray-500">Registration</span>
			<span class="text-xs font-medium" style="color: {e.color};"
				>{Math.round((e.booked_slots || 0 / e.max_slots) * 100)}% booked</span
			>
		</div>
	</div>
</article>
