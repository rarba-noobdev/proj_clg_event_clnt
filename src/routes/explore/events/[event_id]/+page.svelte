<script lang="ts">
	import type { PageProps } from './$types.js';
	import type { EventTable } from '$lib/userstate.svelte.js';

	// Props
	let { data }: PageProps = $props();

	// Reactive state
	let eventData: EventTable | null = $state(null);
	let error: string | null = $state(null);
	let loading: boolean = $state(true);
	let isRetrying: boolean = $state(false);

	// Handle async event data
	$effect(() => {
		data.event
			.then((resolvedEvent) => {
				eventData = resolvedEvent;
				loading = false;
				isRetrying = false;
			})
			.catch((err: unknown) => {
				console.error('Error loading event:', err);
				error = err instanceof Error ? err.message : 'Failed to load event';
				loading = false;
				isRetrying = false;
			});
	});

	// Format date safely (no date-fns)
	function formatDate(date: string | null | undefined): string {
		return date || 'N/A';
	}

	// Placeholder for registration
	function handleRegister() {
		// TODO: Implement registration flow (e.g., modal, form, API)
		alert('Registration not yet implemented');
	}

	// Placeholder for contact
	function handleContact() {
		// TODO: Implement contact flow (e.g., modal, email)
		alert('Contact organizer not yet implemented');
	}

	// Retry loading event
	async function handleRetry() {
		isRetrying = true;
		error = null;
		loading = true;
		try {
			eventData = await data.event;
			loading = false;
			isRetrying = false;
		} catch (err: unknown) {
			console.error('Retry failed:', err);
			error = err instanceof Error ? err.message : 'Failed to reload event';
			loading = false;
			isRetrying = false;
		}
	}
</script>

<svelte:head>
	<title>{eventData?.name} - Your App Name</title>
	<meta
		name="description"
		content={eventData?.description ? eventData.description.slice(0, 160) : 'View Details.'}
	/>
</svelte:head>
<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
	{#if loading}
		<div
			class="flex min-h-screen flex-col items-center justify-center"
			role="status"
			aria-label="Loading event"
		>
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-indigo-400"
			></div>
			<p class="mt-4 text-lg text-gray-400">Loading event...</p>
		</div>
	{:else if error}
		<div class="flex min-h-screen flex-col items-center justify-center">
			<div class="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-auto mb-4 h-16 w-16 text-red-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h2 class="mb-2 text-2xl font-bold text-white">Error Loading Event</h2>
				<p class="mb-6 text-gray-400">{error}</p>
				<button
					class="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-50"
					onclick={handleRetry}
					disabled={isRetrying}
					aria-label="Retry loading event"
				>
					{isRetrying ? 'Retrying...' : 'Try Again'}
				</button>
			</div>
		</div>
	{:else if eventData}
		<!-- Redesigned Hero Section - No absolute positioning -->
		<div class="bg-gradient-to-br from-indigo-900 to-purple-900 py-16 lg:py-24">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="mb-4 flex gap-3">
					{#if eventData.is_sold_out}
						<span
							class="rounded-full bg-red-600 px-3 py-1 text-xs font-medium tracking-wide text-white"
							>Sold Out</span
						>
					{:else if eventData.booked_slots >= eventData.max_slots * 0.8}
						<span
							class="rounded-full bg-amber-600 px-3 py-1 text-xs font-medium tracking-wide text-white"
							>Almost Full</span
						>
					{:else}
						<span
							class="rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium tracking-wide text-white"
							>Spots Available</span
						>
					{/if}
					{#if eventData.department}
						<span
							class="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium tracking-wide text-white"
							>{eventData.department}</span
						>
					{/if}
				</div>

				<h1 class="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
					{eventData.name || 'Untitled Event'}
				</h1>

				<div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
					<!-- Left Column - Event Info -->
					<div class="space-y-8 lg:col-span-2">
						<div class="flex items-center gap-3 text-gray-300">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							<span>Hosted by {eventData.managed_by || 'Organization'}</span>
						</div>

						<!-- Key Details Cards Row -->
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							<!-- Date -->
							<div class="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
								<div class="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mt-0.5 h-5 w-5 text-indigo-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<div>
										<p class="text-sm text-gray-400">Date</p>
										<p class="font-medium text-white">
											{formatDate(eventData.start_date)}
											{eventData.end_date ? ` - ${formatDate(eventData.end_date)}` : ''}
										</p>
									</div>
								</div>
							</div>

							<!-- Time -->
							<div class="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
								<div class="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mt-0.5 h-5 w-5 text-indigo-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<div>
										<p class="text-sm text-gray-400">Time</p>
										<p class="font-medium text-white">{eventData.time || 'TBD'}</p>
									</div>
								</div>
							</div>

							<!-- Location -->
							<div class="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
								<div class="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mt-0.5 h-5 w-5 text-indigo-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<div>
										<p class="text-sm text-gray-400">Location</p>
										<p class="font-medium text-white">{eventData.location || 'TBD'}</p>
									</div>
								</div>
							</div>

							<!-- Availability -->
							<div class="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
								<div class="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mt-0.5 h-5 w-5 text-indigo-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<div>
										<p class="text-sm text-gray-400">Availability</p>
										<div class="flex items-center gap-3">
											<p class="font-medium text-white">
												{eventData.booked_slots ?? 0} / {eventData.max_slots ?? 0}
											</p>
											<div
												class="h-2 w-20 overflow-hidden rounded-full bg-gray-700"
												role="progressbar"
												aria-valuenow={eventData.booked_slots ?? 0}
												aria-valuemin={0}
												aria-valuemax={eventData.max_slots ?? 0}
												aria-label="Event availability"
											>
												<div
													class="h-2 rounded-full transition-all duration-500"
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
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-6">
							<button
								class="rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600"
								disabled={eventData.is_sold_out}
								onclick={handleRegister}
								aria-label={eventData.is_sold_out ? 'Event sold out' : 'Register for event'}
							>
								{eventData.is_sold_out ? 'Sold Out' : `Register Now — ₹${eventData.price ?? 0}`}
							</button>
						</div>
					</div>

					<!-- Right Column - Quick Information -->
					<div class="h-fit rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
						<h3 class="mb-4 text-lg font-semibold text-white">At a Glance</h3>

						<!-- Event Features Icons -->
						<div class="mb-4 flex flex-wrap gap-4">
							{#if eventData.certificate_provided}
								<div class="flex items-center gap-2 rounded-full bg-indigo-600/20 px-3 py-1.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-indigo-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span class="text-xs font-medium text-indigo-300">Certificate</span>
								</div>
							{/if}
							{#if eventData.food_provided}
								<div class="flex items-center gap-2 rounded-full bg-indigo-600/20 px-3 py-1.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-indigo-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									<span class="text-xs font-medium text-indigo-300">Food Provided</span>
								</div>
							{/if}
							{#if eventData.od_provided}
								<div class="flex items-center gap-2 rounded-full bg-indigo-600/20 px-3 py-1.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-indigo-300"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
										/>
									</svg>
									<span class="text-xs font-medium text-indigo-300">OD Provided</span>
								</div>
							{/if}
						</div>

						<div class="space-y-3 text-sm">
							<div class="flex justify-between">
								<span class="text-gray-400">Price</span>
								<span class="font-semibold text-white">₹{eventData.price ?? 0}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Total Capacity</span>
								<span class="font-semibold text-white">{eventData.max_slots ?? 0} seats</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Booked</span>
								<span class="font-semibold text-white">{eventData.booked_slots ?? 0} seats</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Remaining</span>
								<span class="font-semibold text-white"
									>{(eventData.max_slots ?? 0) - (eventData.booked_slots ?? 0)} seats</span
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<!-- Left Column - Description -->
				<div class="lg:col-span-2">
					<div class="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
						<h2 class="mb-4 text-2xl font-bold text-white">About This Event</h2>
						<div class="prose prose-invert max-w-none">
							<p class="leading-relaxed text-gray-300">
								{eventData.description || 'No description provided.'}
							</p>
						</div>
					</div>

					<!-- Features -->
					<div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
						<h2 class="mb-4 text-2xl font-bold text-white">Event Features</h2>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{#if eventData.certificate_provided}
								<div
									class="flex items-start gap-3 rounded-lg border border-gray-700/50 bg-gray-800/50 p-4"
								>
									<div class="rounded-lg bg-indigo-600/20 p-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-indigo-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
											/>
										</svg>
									</div>
									<div>
										<h3 class="font-medium text-white">Certification</h3>
										<p class="mt-1 text-sm text-gray-400">Certificate provided upon completion</p>
									</div>
								</div>
							{/if}
							{#if eventData.food_provided}
								<div
									class="flex items-start gap-3 rounded-lg border border-gray-700/50 bg-gray-800/50 p-4"
								>
									<div class="rounded-lg bg-emerald-600/20 p-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-emerald-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<h3 class="font-medium text-white">Food Provided</h3>
										<p class="mt-1 text-sm text-gray-400">Refreshments will be served</p>
									</div>
								</div>
							{/if}
							{#if eventData.od_provided}
								<div
									class="flex items-start gap-3 rounded-lg border border-gray-700/50 bg-gray-800/50 p-4"
								>
									<div class="rounded-lg bg-purple-600/20 p-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-purple-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
											/>
										</svg>
									</div>
									<div>
										<h3 class="font-medium text-white">OD Provided</h3>
										<p class="mt-1 text-sm text-gray-400">Official documentation for attendance</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Right Column - Registration Card -->
				<div class="lg:col-span-1">
					<!-- Using top-0 with lg:sticky for proper positioning -->
					<div class="lg:sticky lg:top-8">
						<div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
							<h3 class="mb-4 text-xl font-bold text-white">Register Now</h3>

							<div class="mb-6 space-y-4">
								<div class="flex items-center justify-between">
									<span class="text-gray-400">Price</span>
									<span class="text-xl font-bold text-white">₹{eventData.price ?? 0}</span>
								</div>

								<div class="flex items-center justify-between">
									<span class="text-gray-400">Availability</span>
									<span
										class="font-medium"
										class:text-red-400={eventData.is_sold_out}
										class:text-amber-400={!eventData.is_sold_out &&
											eventData.booked_slots >= eventData.max_slots * 0.8}
										class:text-emerald-400={!eventData.is_sold_out &&
											eventData.booked_slots < eventData.max_slots * 0.8}
									>
										{#if eventData.is_sold_out}
											Sold Out
										{:else}
											{eventData.max_slots - eventData.booked_slots} spots left
										{/if}
									</span>
								</div>

								<div class="border-t border-gray-700 pt-4">
									<div class="flex items-center justify-between">
										<span class="text-gray-400">Total</span>
										<span class="text-xl font-bold text-white">₹{eventData.price ?? 0}</span>
									</div>
								</div>
							</div>

							<button
								class="w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-600"
								disabled={eventData.is_sold_out}
								onclick={handleRegister}
								aria-label={eventData.is_sold_out ? 'Event sold out' : 'Register for event'}
							>
								{eventData.is_sold_out ? 'Sold Out' : 'Register Now'}
							</button>

							{#if eventData.updated_at}
								<p class="mt-4 text-center text-xs text-gray-500">
									Last updated: {formatDate(eventData.updated_at)}
								</p>
							{/if}
						</div>

						<div class="mt-4 rounded-xl border border-gray-800 bg-gray-900 p-4">
							<h4 class="mb-2 font-medium text-white">Have questions?</h4>
							<p class="mb-3 text-sm text-gray-400">
								Contact the event organizer for more information.
							</p>
							<button
								class="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
								onclick={handleContact}
								aria-label="Contact event organizer"
							>
								Contact Organizer
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex min-h-screen flex-col items-center justify-center">
			<div class="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-auto mb-4 h-16 w-16 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<h2 class="mb-2 text-2xl font-bold text-white">Event Not Found</h2>
				<p class="mb-6 text-gray-400">
					The event you're looking for doesn't exist or has been removed.
				</p>
				<a
					href="/events"
					class="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
					aria-label="Browse all events"
				>
					Browse Events
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.animate-spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
