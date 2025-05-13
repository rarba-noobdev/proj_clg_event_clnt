<!--
	+layout.svelte
	-------------
	Root layout component that wraps all pages in the application.
	
	Features:
	- Global navigation header
	- Authentication state management
	- Navigation progress indicator
	- User session synchronization with Supabase
	- Global styles integration
	
	Props:
	- data: Server-side loaded data containing session and Supabase client
	- children: Child components/routes to render
	
	State Management:
	- Maintains global user state via UserState
	- Syncs authentication state changes with Supabase
	- Invalidates auth cache when session changes
	
	UI Features:
	- Animated gradient progress bar during navigation
	- Persistent header across all routes
	- Global CSS styles
-->
<script lang="ts">
	import { navigating } from '$app/state';
	import { invalidate } from '$app/navigation';
	let { data, children } = $props();
	let { session, supabase } = $derived(data);
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import { setUserState } from '$lib/userstate.svelte';
	const userState = setUserState({
		session: data.session,
		supabase: data.supabase,
		user: data.user
	});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			userState.updateState({
				session: newSession,
				supabase: supabase,
				user: newSession?.user || null
			});
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

{#if navigating.to || navigating.from}
	<div
		class="animate-gradient-motion h-1 w-full rounded-full bg-gradient-to-r from-pink-500 via-green-400 to-purple-600 bg-[length:400%_100%]"
	></div>
{/if}
<Header />
{@render children()}

<style>
	@keyframes gradient-motion {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.animate-gradient-motion {
		animation: gradient-motion 2s linear infinite;
	}
</style>
