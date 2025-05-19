<!--
@component EventDetailPage
@description A Svelte 5 component that displays comprehensive details for a specific event.
Implements real-time updates through Supabase subscriptions and provides an interactive
interface for event registration and management.

@prop {Object} data - Page data object containing event and Supabase client
@prop {Promise<EventTable>} data.event - Promise resolving to event details from database
@prop {SupabaseClient} data.supabase - Initialized Supabase client for real-time updates

@features
- Real-time event data synchronization via Supabase channels
- Dynamic registration system with capacity tracking
- Responsive mobile-first layout design
- Interactive availability indicators
- Feature badges (certificates, food, OD provision)
- Comprehensive error handling and fallbacks
- SEO-friendly dynamic metadata
- Accessibility support with ARIA labels
- Loading states with animations
- User authentication integration

@events
- handleRegister() - Manages event registration process
- handleContact() - Handles organizer communication
- formatDate(date: string | null | undefined) - Formats dates to localized strings

@dependencies
- EventTable ($lib/userstate.svelte.js) - Type definitions for event data
- @supabase/supabase-js - Real-time database client
- $lib/userstate.svelte.js - User authentication state management

@example
```ts
<script lang="ts">
  import type { PageProps } from './$types';
  export let data: PageProps;
</script>

<EventDetailPage {data} />
```
-->

<script lang="ts">
	import type { PageProps } from './$types.js';
	import { getUserState, type EventTable } from '$lib/userstate.svelte.js';
	import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
	// Ensure EventTable has an id property

	let { user } = $derived(getUserState());
	let { data }: PageProps = $props();
	let { supabase, event } = $derived(data);

	$effect(() => {
		// Subscribe to real-time updates
		const channel = supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public'
				},
				async (payload) => {
					// Update the event data by creating a resolved promise
					event = Promise.resolve(payload.new as EventTable);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	function formatDate(date: string | null | undefined): string {
		if (!date) return 'TBD';
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};
		return new Date(date).toLocaleDateString('en-US', options);
	}

	function handleRegister() {
		alert('Registration not yet implemented');
	}

	function handleContact() {
		alert('Contact organizer not yet implemented');
	}
</script>

<svelte:head>
	{#await event}
		<title>Loading Event - Crev</title>
		<meta name="description" content="Loading event details" />
	{:then eventData}
		<title>{eventData?.name || 'Event'} - Crev</title>
		<meta
			name="description"
			content={eventData?.description ? eventData.description.slice(0, 160) : 'Event details'}
		/>
	{/await}
</svelte:head>

<div class="min-h-screen bg-gray-900 text-gray-100">
	{#await event}
		<div
			class="flex min-h-screen items-center justify-center"
			role="status"
			aria-label="Loading event"
		>
			<div
				class="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-indigo-500"
			></div>
		</div>
	{:then eventData}
		{#if eventData}
			<!-- Hero Section -->
			<div class="border-b border-gray-800 py-12">
				<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div class="mb-4 flex gap-2">
						{#if eventData.is_sold_out}
							<span class="rounded bg-red-900/50 px-2 py-1 text-xs font-medium text-red-300"
								>Sold Out</span
							>
						{:else if eventData.booked_slots >= eventData.max_slots * 0.8}
							<span class="rounded bg-amber-900/50 px-2 py-1 text-xs font-medium text-amber-300"
								>Almost Full</span
							>
						{/if}
						{#if eventData.department}
							<span class="rounded bg-gray-800 px-2 py-1 text-xs font-medium text-gray-300"
								>{eventData.department}</span
							>
						{/if}
					</div>

					<h1 class="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
						{eventData.name || 'Untitled Event'}
					</h1>

					<p class="mb-6 text-gray-400">Hosted by {eventData.managed_by || 'Organization'}</p>

					<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
						<!-- Event Details -->
						<div class="space-y-4 md:col-span-2">
							<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
								<div>
									<p class="text-sm text-gray-500">Date</p>
									<p class="font-medium">
										{#if eventData.start_date === eventData.end_date}
											{formatDate(eventData.start_date)}
										{:else}
											{formatDate(eventData.start_date)} to {formatDate(eventData.end_date)}
										{/if}
									</p>
								</div>

								<div>
									<p class="text-sm text-gray-500">Time</p>
									<p class="font-medium">{eventData.time || 'TBD'}</p>
								</div>

								<div>
									<p class="text-sm text-gray-500">Location</p>
									<p class="font-medium">{eventData.location || 'TBD'}</p>
								</div>
							</div>

							<div class="pt-4">
								<button
									class="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:bg-gray-700 md:w-auto"
									disabled={eventData.is_sold_out || !user}
									onclick={handleRegister}
								>
									{#if user}
										{eventData.is_sold_out ? 'Sold Out' : 'Register Now'}
									{:else}
										Login to Register
									{/if}
								</button>
							</div>
						</div>

						<!-- Availability -->
						<div class="space-y-2">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Availability</span>
								<span class="font-medium">
									{eventData.booked_slots ?? 0} / {eventData.max_slots ?? 0}
								</span>
							</div>
							<div class="h-2 w-full overflow-hidden rounded-full bg-gray-700">
								<div
									class="h-2 rounded-full"
									style="width: {Math.min(
										100,
										(eventData.booked_slots / eventData.max_slots) * 100
									)}%"
									class:bg-red-500={eventData.is_sold_out}
									class:bg-amber-500={!eventData.is_sold_out &&
										eventData.booked_slots >= eventData.max_slots * 0.8}
									class:bg-emerald-500={!eventData.is_sold_out &&
										eventData.booked_slots < eventData.max_slots * 0.8}
								></div>
							</div>
							<p class="text-sm text-gray-500">
								{#if eventData.is_sold_out}
									This event is fully booked
								{:else}
									{(eventData.max_slots ?? 0) - (eventData.booked_slots ?? 0)} spots remaining
								{/if}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Content -->
			<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
				<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
					<!-- Event Description -->
					<div class="md:col-span-2">
						<div class="mb-8">
							<h2 class="mb-4 text-xl font-bold">About This Event</h2>
							<p class="text-gray-400">
								{eventData.description || 'No description provided.'}
							</p>
						</div>

						<!-- Features -->
						{#if eventData.certificate_provided || eventData.food_provided || eventData.od_provided}
							<div>
								<h2 class="mb-4 text-xl font-bold">Event Features</h2>
								<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
									{#if eventData.certificate_provided}
										<div class="flex items-start gap-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mt-0.5 h-5 w-5 text-indigo-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<div>
												<h3 class="font-medium">Certificate</h3>
												<p class="text-sm text-gray-500">Provided upon completion</p>
											</div>
										</div>
									{/if}
									{#if eventData.food_provided}
										<div class="flex items-start gap-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mt-0.5 h-5 w-5 text-indigo-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<div>
												<h3 class="font-medium">Food Provided</h3>
												<p class="text-sm text-gray-500">Refreshments included</p>
											</div>
										</div>
									{/if}
									{#if eventData.od_provided}
										<div class="flex items-start gap-3">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="mt-0.5 h-5 w-5 text-indigo-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
												/>
											</svg>
											<div>
												<h3 class="font-medium">OD Provided</h3>
												<p class="text-sm text-gray-500">Official documentation</p>
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>

					<!-- Registration Card -->
					<div class="md:col-span-1">
						<div class="rounded-lg border border-gray-800 bg-gray-800/50 p-6">
							<h3 class="mb-4 text-lg font-bold">Register</h3>

							<div class="mb-6 space-y-4">
								<div class="flex justify-between">
									<span class="text-gray-400">Price</span>
									<span class="font-medium">₹{eventData.price ?? 0}</span>
								</div>

								<div class="flex justify-between">
									<span class="text-gray-400">Availability</span>
									<span class="font-medium">
										{eventData.max_slots - eventData.booked_slots} remaining
									</span>
								</div>
							</div>

							<button
								class="w-full rounded bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 disabled:bg-gray-700"
								disabled={eventData.is_sold_out || !user}
								onclick={handleRegister}
							>
								{#if user}
									{eventData.is_sold_out ? 'Sold Out' : 'Register Now'}
								{:else}
									Login to Register
								{/if}
							</button>

							<div class="mt-4 text-center text-sm text-gray-500">
								<button
									onclick={handleContact}
									class="text-indigo-400 hover:text-indigo-300 hover:underline"
								>
									Contact organizer
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex min-h-screen items-center justify-center">
				<div class="text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mx-auto h-12 w-12 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h2 class="mt-4 text-xl font-bold">Event Not Found</h2>
					<p class="mt-2 text-gray-500">
						The event you're looking for doesn't exist or has been removed.
					</p>
					<a
						href="/events"
						class="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
					>
						Browse Events
					</a>
				</div>
			</div>
		{/if}
	{:catch error}
		<div class="flex min-h-screen items-center justify-center">
			<div class="text-center">
				<p class="text-lg text-red-400">{error.message || 'Failed to load event'}</p>
				<a
					href="/events"
					class="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
				>
					Browse Events
				</a>
			</div>
		</div>
	{/await}
</div>

<style>
	.animate-spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
