<svelte:head>
	<title>Crescent - Campus Life Reimagined</title>
	<meta
		name="description"
		content="Explore events and organizations at B.S. Abdur Rahman Crescent Institute of Science & Technology."
	/>
</svelte:head>

<section
	class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black py-24"
>
	<!-- Enhanced Gradient Orbs -->
	<div class="pointer-events-none absolute inset-0 opacity-25">
		<div
			class="absolute top-24 left-16 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500 to-indigo-700 blur-[140px]"
		></div>
		<div
			class="absolute right-16 bottom-24 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500 to-teal-700 blur-[140px]"
		></div>
		<div
			class="absolute top-1/3 left-1/5 h-72 w-72 rounded-full bg-gradient-to-r from-purple-500 to-violet-700 blur-[140px]"
		></div>
	</div>

	<!-- Content Container -->
	<div class="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-12">
		<!-- Tagline -->
		<div class="mb-6">
			<span
				class="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-700/20 px-5 py-2 text-sm font-semibold tracking-wide text-indigo-300 shadow-md"
			>
				<svg
					class="mr-2 h-5 w-5"
					fill="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5zm0 12l-8-4v7h3v4h10v-4h3v-7l-8 4zm-4 5v-3h8v3h-8z" />
				</svg>

				CAMPUS LIFE REIMAGINED
			</span>
		</div>

		<!-- Headline -->
		<h1 class="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl">
			<span
				class="satoshi bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent"
				>Unite, Organize,</span
			>
			<br class="sm:hidden" />
			<span
				class=" satoshi bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent"
				>and Celebrate</span
			>
		</h1>

		<!-- Subheading -->
		<h3 class="relative mb-10 inline-block text-xl font-medium text-gray-300 sm:text-2xl">
			At B.S. Abdur Rahman Crescent Institute of Science & Technology
			<span class="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-500/50"></span>
		</h3>

		<!-- Call to Action Buttons -->
		<div class="mb-14 flex flex-col justify-center gap-6 sm:flex-row">
			<a
				href="/explore/events"
				class="group flex items-center justify-center rounded-full border border-indigo-500 bg-indigo-600/10 px-7 py-3 font-semibold text-indigo-300 shadow-lg transition-all duration-300 hover:bg-indigo-600/30 hover:text-indigo-100"
			>
				<svg
					class="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
				Explore Events
			</a>
			<a
				href="/explore/organizations"
				class="group flex items-center justify-center rounded-full border border-emerald-500 bg-emerald-600/10 px-7 py-3 font-semibold text-emerald-300 shadow-lg transition-all duration-300 hover:bg-emerald-600/30 hover:text-emerald-100"
			>
				<svg
					class="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					></path>
				</svg>
				Explore Organizations
			</a>
		</div>

		<!-- Event Statistics -->
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<div
				class="group rounded-xl border border-gray-700/60 bg-gray-800/60 p-8 shadow-lg transition-all duration-300 hover:border-indigo-500/50"
			>
				<p
					class="mb-2 text-4xl font-bold text-indigo-300 transition-colors group-hover:text-indigo-200"
				>
					200+
				</p>
				<p class="text-sm font-medium tracking-wide text-gray-400">EVENTS HOSTED</p>
			</div>
			<div
				class="group rounded-xl border border-gray-700/60 bg-gray-800/60 p-8 shadow-lg transition-all duration-300 hover:border-emerald-500/50"
			>
				<p
					class="mb-2 text-4xl font-bold text-emerald-300 transition-colors group-hover:text-emerald-200"
				>
					15
				</p>
				<p class="text-sm font-medium tracking-wide text-gray-400">DEPARTMENTS</p>
			</div>
			<div
				class="group rounded-xl border border-gray-700/60 bg-gray-800/60 p-8 shadow-lg transition-all duration-300 hover:border-amber-500/50"
			>
				<p
					class="mb-2 text-4xl font-bold text-amber-300 transition-colors group-hover:text-amber-200"
				>
					50+
				</p>
				<p class="text-sm font-medium tracking-wide text-gray-400">STUDENT CLUBS</p>
			</div>
		</div>
	</div>
</section>
