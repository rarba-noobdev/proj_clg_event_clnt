<script lang="ts">
	import { getUserState } from '$lib/userstate.svelte.js';
	let userState = $derived(getUserState());
	let user = $derived(userState.user);

	const logOut = async () => {
		await userState.logOut();
	};
</script>

<header
	class="sticky top-0 z-10 flex items-center justify-between border-b border-blue-500/30 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 px-4 py-3 text-white shadow-lg shadow-blue-950/50 backdrop-blur-sm md:px-6 md:py-4"
>
	<div
		class="absolute top-1/2 left-4 h-8 w-8 -translate-y-1/2 rounded-full bg-blue-500/20 blur-md"
	></div>

	<h1 class="relative text-xl font-bold tracking-tight md:text-2xl">
		<a
			href="/"
			class="flex items-center gap-2 transition-all duration-200 hover:text-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950 focus:outline-none"
		>
			<span class="relative text-2xl text-blue-300 md:text-3xl">📚</span>
			<span
				class="hidden bg-gradient-to-r from-blue-300 to-teal-200 bg-clip-text font-extrabold text-transparent md:inline"
				>Student Portal</span
			>
		</a>
	</h1>

	<div class="flex items-center gap-3 md:gap-6"> 
		<nav class="hidden items-center gap-3 md:flex md:gap-4">
			{#if user}
				<a
					href="/upcoming"
					class="group flex items-center rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5 text-sm font-medium text-blue-300 shadow-md transition-all duration-200 hover:bg-blue-600/20 hover:text-blue-100 hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
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
				<!-- <a
					href="/courses"
					class="group flex items-center rounded-full border border-teal-500/30 bg-teal-600/10 px-4 py-1.5 text-sm font-medium text-teal-300 shadow-md transition-all duration-200 hover:bg-teal-600/20 hover:text-teal-100 hover:shadow-teal-500/20 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
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
				</a> -->
				<!-- <a
					href="/private/speevents"
					class="group flex items-center rounded-full border border-purple-500/30 bg-purple-600/10 px-4 py-1.5 text-sm font-medium text-purple-300 shadow-md transition-all duration-200 hover:bg-purple-600/20 hover:text-purple-100 hover:shadow-purple-500/20 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
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
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
						/>
					</svg>
					<span class="whitespace-nowrap"></span>
				</a> -->
			{/if}
		</nav>

		<div class="flex items-center gap-2 md:gap-3">
			{#if !user}
				<a
					href="/auth"
					class="flex items-center rounded-full border border-blue-500/30 bg-blue-700/30 px-4 py-1.5 text-sm font-medium text-blue-200 shadow-md transition-all duration-200 hover:bg-blue-600/40 hover:text-blue-100 hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
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
					class="hidden items-center gap-2 rounded-full border border-blue-500/20 bg-blue-600/10 px-3 py-1.5 sm:flex"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-blue-300"
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
					<span class="max-w-[120px] truncate text-sm font-medium text-blue-200">{user.email}</span>
				</div>
				<button 
					onclick={logOut}
					class="flex items-center rounded-full border border-blue-500/30 bg-blue-700/20 px-3 py-1.5 text-sm font-medium text-blue-200 shadow-md transition-all duration-200 hover:bg-blue-600/40 hover:text-blue-100 hover:shadow-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
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
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
	}
</style>