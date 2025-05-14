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

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
  {#if loading}
    <div class="flex flex-col items-center justify-center min-h-screen" role="status" aria-label="Loading event">
      <div class="w-12 h-12 border-4 border-t-indigo-400 border-gray-700 rounded-full animate-spin"></div>
      <p class="mt-4 text-lg text-gray-400">Loading event...</p>
    </div>
  {:else if error}
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-white mb-2">Error Loading Event</h2>
        <p class="text-gray-400 mb-6">{error}</p>
        <button
          class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex gap-3 mb-4">
          {#if eventData.is_sold_out}
            <span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">Sold Out</span>
          {:else if eventData.booked_slots >= eventData.max_slots * 0.8}
            <span class="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">Almost Full</span>
          {:else}
            <span class="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">Spots Available</span>
          {/if}
          {#if eventData.department}
            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">{eventData.department}</span>
          {/if}
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">{eventData.name || 'Untitled Event'}</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Left Column - Event Info -->
          <div class="lg:col-span-2 space-y-8">
            <div class="flex items-center gap-3 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Hosted by {eventData.managed_by || 'Organization'}</span>
            </div>
            
            <!-- Key Details Cards Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Date -->
              <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Date</p>
                    <p class="text-white font-medium">
                      {formatDate(eventData.start_date)} {eventData.end_date ? ` - ${formatDate(eventData.end_date)}` : ''}
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Time -->
              <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Time</p>
                    <p class="text-white font-medium">{eventData.time || 'TBD'}</p>
                  </div>
                </div>
              </div>
              
              <!-- Location -->
              <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Location</p>
                    <p class="text-white font-medium">{eventData.location || 'TBD'}</p>
                  </div>
                </div>
              </div>
              
              <!-- Availability -->
              <div class="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p class="text-gray-400 text-sm">Availability</p>
                    <div class="flex items-center gap-3">
                      <p class="text-white font-medium">{eventData.booked_slots ?? 0} / {eventData.max_slots ?? 0}</p>
                      <div
                        class="w-20 bg-gray-700 rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={eventData.booked_slots ?? 0}
                        aria-valuemin={0}
                        aria-valuemax={eventData.max_slots ?? 0}
                        aria-label="Event availability"
                      >
                        <div
                          class="h-2 rounded-full transition-all duration-500"
                          style="width: {Math.min(100, (eventData.booked_slots / eventData.max_slots) * 100)}%"
                          class:bg-red-500={eventData.is_sold_out}
                          class:bg-amber-500={!eventData.is_sold_out && eventData.booked_slots >= eventData.max_slots * 0.8}
                          class:bg-emerald-500={!eventData.is_sold_out && eventData.booked_slots < eventData.max_slots * 0.8}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-6">
              <button
                class="px-8 py-3 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:bg-gray-600 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700"
                disabled={eventData.is_sold_out}
                onclick={handleRegister}
                aria-label={eventData.is_sold_out ? 'Event sold out' : 'Register for event'}
              >
                {eventData.is_sold_out ? 'Sold Out' : `Register Now — ₹${eventData.price ?? 0}`}
              </button>
            </div>
          </div>
          
          <!-- Right Column - Quick Information -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6 h-fit">
            <h3 class="text-lg font-semibold text-white mb-4">At a Glance</h3>
            
            <!-- Event Features Icons -->
            <div class="flex flex-wrap gap-4 mb-4">
              {#if eventData.certificate_provided}
                <div class="flex items-center gap-2 bg-indigo-600/20 px-3 py-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-xs font-medium text-indigo-300">Certificate</span>
                </div>
              {/if}
              {#if eventData.food_provided}
                <div class="flex items-center gap-2 bg-indigo-600/20 px-3 py-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span class="text-xs font-medium text-indigo-300">Food Provided</span>
                </div>
              {/if}
              {#if eventData.od_provided}
                <div class="flex items-center gap-2 bg-indigo-600/20 px-3 py-1.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
                <span class="font-semibold text-white">{(eventData.max_slots ?? 0) - (eventData.booked_slots ?? 0)} seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Description -->
        <div class="lg:col-span-2">
          <div class="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
            <h2 class="text-2xl font-bold text-white mb-4">About This Event</h2>
            <div class="prose prose-invert max-w-none">
              <p class="text-gray-300 leading-relaxed">{eventData.description || 'No description provided.'}</p>
            </div>
          </div>

          <!-- Features -->
          <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 class="text-2xl font-bold text-white mb-4">Event Features</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {#if eventData.certificate_provided}
                <div class="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div class="bg-indigo-600/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-white">Certification</h3>
                    <p class="text-sm text-gray-400 mt-1">Certificate provided upon completion</p>
                  </div>
                </div>
              {/if}
              {#if eventData.food_provided}
                <div class="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div class="bg-emerald-600/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-white">Food Provided</h3>
                    <p class="text-sm text-gray-400 mt-1">Refreshments will be served</p>
                  </div>
                </div>
              {/if}
              {#if eventData.od_provided}
                <div class="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div class="bg-purple-600/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-white">OD Provided</h3>
                    <p class="text-sm text-gray-400 mt-1">Official documentation for attendance</p>
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
            <div class="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 class="text-xl font-bold text-white mb-4">Register Now</h3>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Price</span>
                  <span class="text-xl font-bold text-white">₹{eventData.price ?? 0}</span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Availability</span>
                  <span
                    class="font-medium"
                    class:text-red-400={eventData.is_sold_out}
                    class:text-amber-400={!eventData.is_sold_out && eventData.booked_slots >= eventData.max_slots * 0.8}
                    class:text-emerald-400={!eventData.is_sold_out && eventData.booked_slots < eventData.max_slots * 0.8}
                  >
                    {#if eventData.is_sold_out}
                      Sold Out
                    {:else}
                      {eventData.max_slots - eventData.booked_slots} spots left
                    {/if}
                  </span>
                </div>

                <div class="pt-4 border-t border-gray-700">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Total</span>
                    <span class="text-xl font-bold text-white">₹{eventData.price ?? 0}</span>
                  </div>
                </div>
              </div>

              <button
                class="w-full px-6 py-3 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:bg-gray-600 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700"
                disabled={eventData.is_sold_out}
                onclick={handleRegister}
                aria-label={eventData.is_sold_out ? 'Event sold out' : 'Register for event'}
              >
                {eventData.is_sold_out ? 'Sold Out' : 'Register Now'}
              </button>

              {#if eventData.updated_at}
                <p class="text-xs text-gray-500 mt-4 text-center">
                  Last updated: {formatDate(eventData.updated_at)}
                </p>
              {/if}
            </div>

            <div class="mt-4 bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h4 class="font-medium text-white mb-2">Have questions?</h4>
              <p class="text-sm text-gray-400 mb-3">Contact the event organizer for more information.</p>
              <button
                class="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-white mb-2">Event Not Found</h2>
        <p class="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <a
          href="/events"
          class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
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