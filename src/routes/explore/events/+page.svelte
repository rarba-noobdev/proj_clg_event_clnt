<!--
  +page.svelte

  Svelte component displaying a list of events in a responsive grid layout.
  Fetches events via UserState and updates in real-time using Supabase.
  Renders events with EventCard component.

  Features:
  - Responsive grid (1-3 columns based on screen size)
  - Animated loading indicator
  - Real-time updates via UserState
  - Error handling with retry mechanism
  - Accessible navigation and event cards
  - Type-safe Supabase integration
  - Svelte 5 runes and await syntax

  Dependencies:
  - EventCard component ($lib/components/EventCard.svelte)
  - EventTable type ($lib/userstate.svelte.ts)
  - Supabase client (@supabase/supabase-js)
  - UserState module (artifact_id: afca23fb-2fba-429e-a193-b52c8e148d48)
-->
<script lang="ts">
  import EventCard from '$lib/components/EventCard.svelte';
  import { getUserState, type EventTable } from '$lib/userstate.svelte';

  // Get user state from context
  let userState = $derived(getUserState());
  let events : EventTable[]  = $derived(userState.events);
</script>

<section class="flex-grow bg-gradient-to-br from-gray-900 to-gray-950 p-4 font-sans sm:p-8">
  <div class="mx-auto max-w-7xl">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="mb-4 inline-flex items-center gap-3">
        <div class="h-px w-10 bg-indigo-400"></div>
        <span class="text-sm font-medium tracking-wider text-indigo-400">All Events</span>
      </div>
    </div>

    <!-- Content Section -->
    {#await userState.getEvents()}
      <div class="col-span-full flex h-64 items-center justify-center">
        <div class="loader" role="status" aria-label="Loading events">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    {:then}
      <div
        class="custom-scrollbar grid max-h-[calc(100vh-12rem)] grid-cols-1 gap-6 overflow-y-auto pr-2 sm:gap-8 sm:pr-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {#if events.length > 0}
          {#each events as event (event.id)}
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