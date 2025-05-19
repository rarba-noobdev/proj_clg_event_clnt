<!--
  Header Component
  --------------
  Main navigation header component with user authentication state,
  navigation links, and responsive design.
  
  Features:
  - User authentication status
  - Dynamic navigation menu
  - Mobile responsiveness
  - Smooth transitions
  - Profile management
  
  Usage:
  ```svelte
  <script>
    import Header from '$lib/components/Header.svelte';
  </script>
  
  <Header />
  ```
  
  Props: None
  
  Events:
  - logOut: Triggered when user logs out
  
  State:
  - userState: Global user state
  - user: Current user information
  
  Styling:
  - Uses Tailwind for responsive design
  - Custom animations for transitions
  - Glassmorphism effects
-->
<script lang="ts">
	import { getUserState } from '$lib/userstate.svelte.js';
	let userState = $derived(getUserState());
	let user = $derived(userState.user);

	const logOut = async () => {
		await userState.logOut();
	};
</script>

<header
	class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-950/90 px-4 py-3 text-gray-100 shadow-md backdrop-blur-sm md:px-6 md:py-4"
>
	<div
		class="absolute top-1/2 left-4 h-8 w-8 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-md"
	></div>

	<h1 class="relative text-xl font-bold tracking-tight md:text-2xl">
		<a
			href="/"
 		>
			<span class="relative text-2xl text-indigo-400 md:text-3xl">📚</span>
			<span
				class="hidden bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text font-extrabold text-transparent md:inline"
				>Cresbee</span
			>
		</a>
	</h1>

	<div class="flex items-center gap-3 md:gap-6">
		<nav class="hidden items-center gap-3 md:flex md:gap-4">
			{#if user}
				<a
					href="/upcoming"
					class="group flex items-center rounded-lg border border-indigo-500/30 bg-indigo-900/30 px-4 py-1.5 text-sm font-medium text-indigo-400 shadow-sm transition-all duration-200 hover:bg-indigo-900/50 hover:text-indigo-300 hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.75"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
						/>
					</svg>
					<span class="whitespace-nowrap">Upcoming Events</span>
				</a>
				<a
					href="/courses"
					class="group flex items-center rounded-lg border border-emerald-500/30 bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-400 shadow-sm transition-all duration-200 hover:bg-emerald-900/50 hover:text-emerald-300 hover:shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.75"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
					<span class="whitespace-nowrap">My Department</span>
				</a>
			{/if}
		</nav>

		<div class="flex items-center gap-2 md:gap-3">
			{#if !user}
				<a
					href="/auth/login"
					class="flex items-center rounded-lg border border-indigo-500/30 bg-indigo-900/30 px-4 py-1.5 text-sm font-medium text-indigo-400 shadow-sm transition-all duration-200 hover:bg-indigo-900/50 hover:text-indigo-300 hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1.5 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.75"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>
					<span class="hidden whitespace-nowrap sm:inline">Sign In</span>
				</a>
			{:else}
				<div
					class="hidden items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-900/20 px-3 py-1.5 sm:flex"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-indigo-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.75"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
					<span class="max-w-[120px] truncate text-sm font-medium text-indigo-400"
						>{user.email}</span
					>
				</div>
				<button
					onclick={logOut}
					class="flex items-center rounded-lg border border-indigo-500/30 bg-indigo-900/30 px-3 py-1.5 text-sm font-medium text-indigo-400 shadow-sm transition-all duration-200 hover:bg-indigo-900/50 hover:text-indigo-300 hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.75"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>
					<span class="hidden sm:inline">Logout</span>
				</button>
			{/if}
		</div>
	</div>
</header>

<style>
	/* Smooth transitions for all interactive elements */
	a,
	button {
		transition-property: color, background-color, border-color, transform, box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	/* Better focus states */
	:focus-visible {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5); /* Indigo-500 */
	}
</style>
