<svelte:head>
	<title>Crescent - Campus Life Reimagined</title>
	<meta
		name="description"
		content="Explore events and organizations at B.S. Abdur Rahman Crescent Institute of Science & Technology."
	/>
</svelte:head>

<div class="min-h-screen bg-gray-950 text-gray-100">
	<!-- App Header -->

	<!-- Hero Section -->
	<main class="mx-auto max-w-7xl px-6 py-16">
		<div class="flex flex-col items-center text-center">
			<!-- Tagline -->
			<div class="mb-6 rounded-full bg-indigo-900/30 px-4 py-2">
				<span class="flex items-center text-sm font-medium text-indigo-400">
					<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2L2 7l10 5 10-5-10-5zm0 12l-8-4v7h3v4h10v-4h3v-7l-8 4zm-4 5v-3h8v3h-8z" />
					</svg>
					CAMPUS LIFE REIMAGINED
				</span>
			</div>

			<!-- Headline -->
			<h1 class="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl">
				<span class="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
					Unite, Organize,
				</span>
				<br class="sm:hidden" />
				<span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
					and Celebrate
				</span>
			</h1>

			<!-- Subheading -->
			<p class="mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl">
				At B.S. Abdur Rahman Crescent Institute of Science & Technology
			</p>

			<!-- Call to Action Buttons -->
			<div class="mb-16 flex flex-wrap justify-center gap-4">
				<a
					href="/explore/events"
					class="flex items-center rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					class="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-700"
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
		</div>

		<!-- Stats Grid -->
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
			<div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
				<p class="mb-1 text-3xl font-bold text-indigo-400">200+</p>
				<p class="text-sm text-gray-400">Events Hosted</p>
			</div>
			<div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
				<p class="mb-1 text-3xl font-bold text-emerald-400">15</p>
				<p class="text-sm text-gray-400">Departments</p>
			</div>
			<div class="rounded-xl border border-gray-800 bg-gray-900 p-6">
				<p class="mb-1 text-3xl font-bold text-amber-400">50+</p>
				<p class="text-sm text-gray-400">Student Clubs</p>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="border-t border-gray-800 bg-gray-900 py-12">
		<div class="mx-auto max-w-7xl px-6">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
				<div>
					<h3 class="mb-4 text-lg font-semibold">Crescent</h3>
					<p class="text-sm text-gray-400">
						Reimagining campus life through technology and community.
					</p>
				</div>
				<div>
					<h4 class="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">Explore</h4>
					<ul class="space-y-2">
						<li><a href="/events" class="text-sm text-gray-400 hover:text-white">Events</a></li>
						<li>
							<a href="/organizations" class="text-sm text-gray-400 hover:text-white"
								>Organizations</a
							>
						</li>
						<li><a href="/calendar" class="text-sm text-gray-400 hover:text-white">Calendar</a></li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
						Resources
					</h4>
					<ul class="space-y-2">
						<li><a href="/help" class="text-sm text-gray-400 hover:text-white">Help Center</a></li>
						<li>
							<a href="/contact" class="text-sm text-gray-400 hover:text-white">Contact Us</a>
						</li>
						<li>
							<a href="/privacy" class="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">Connect</h4>
					<div class="flex space-x-4"></div>
				</div>
			</div>
			<div class="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
				<p>© 2023 Crescent. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
