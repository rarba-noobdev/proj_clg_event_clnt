<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-12 text-gray-100"
>
	<!-- Subtle background glow -->
	<div class="pointer-events-none absolute inset-0 opacity-20">
		<div
			class="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-500 to-indigo-700 blur-[100px]"
		></div>
	</div>

	<div class="relative z-10 mx-auto w-full max-w-md">
		<!-- Login Form Card -->
		<section
			class="overflow-hidden rounded-xl border border-indigo-500/20 bg-gray-900/80 shadow-xl shadow-indigo-500/10 backdrop-blur-sm"
		>
			<div class="border-b border-indigo-500/20 bg-indigo-900/20 px-6 py-5">
				<div class="flex items-center justify-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-indigo-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v1m0 14v1m-8-8h1m14 0h1M5.636 5.636l.707.707M18.364 18.364l-.707-.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707M12 8v4l2 2"
						/>
					</svg>
					<h2
						class="bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-xl font-bold text-transparent"
					>
						Login
					</h2>
				</div>
			</div>

			<form method="POST" class="space-y-5 p-6" aria-labelledby="login-heading">
				<div class="space-y-1">
					<label for="rrn-input" class="block text-sm font-medium text-indigo-200">
						Registration Number (RRN)
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-indigo-400/60"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4m-4 0V4a2 2 0 114 0v2m-4 0h4m-8 6h8"
								/>
							</svg>
						</div>
						<input
							name="rrn"
							id="rrn-input"
							class="w-full rounded-md border border-indigo-500/30 bg-gray-800/70 py-2 pr-4 pl-10 text-gray-200 placeholder-gray-500 transition-all duration-300 hover:border-indigo-500/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
							placeholder="Enter your RRN (e.g., 123456)"
							required
						/>
					</div>
				</div>

				<div class="space-y-1">
					<label for="password-input" class="block text-sm font-medium text-indigo-200">
						Password
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-indigo-400/60"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</div>
						<input
							id="password-input"
							name="password"
							type="password"
							class="w-full rounded-md border border-indigo-500/30 bg-gray-800/70 py-2 pr-4 pl-10 text-gray-200 placeholder-gray-500 transition-all duration-300 hover:border-indigo-500/50 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 focus:outline-none"
							placeholder="Enter your password"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					class="mt-6 w-full rounded-full border border-indigo-500/40 bg-indigo-600/80 px-5 py-2.5 font-medium text-indigo-100 shadow-md transition-all duration-300 hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
				>
					Login
				</button>
			</form>
		</section>
	</div>
</div>

<style>
	* {
		font-family: 'satoshi', 'sans-serif';
	}
</style>
