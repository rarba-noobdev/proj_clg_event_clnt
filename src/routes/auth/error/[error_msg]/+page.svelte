<script>
	let { data } = $props();
	let { error_msg } = data;
</script>

<!-- Error.svelte -->

<div
	class="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-gray-100 sm:px-6 lg:px-8"
>
	<div class="mx-auto w-full max-w-md text-center">
		<!-- Error Icon -->
		<div class="mb-8">
			<svg
				class="mx-auto h-20 w-20 animate-pulse text-indigo-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</div>

		<!-- Error Card -->
		<section
			class="rounded-xl border border-gray-800/50 bg-gray-900 p-6 shadow-lg shadow-indigo-500/10"
		>
			<h1 class="mb-4 text-2xl font-semibold text-indigo-300">Oops!</h1>

			<p class="mb-6 text-sm text-gray-400">
				{error_msg}
			</p>

			<a
				href="/auth/login"
				
				class="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white shadow-md shadow-indigo-500/20 transition-colors duration-200 hover:bg-indigo-700 hover:shadow-indigo-500/30 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
			>
				Back To Login
			</a>
		</section>
	</div>
</div>
