<!--
@component LoginPage
@description Authentication component that provides a secure login interface
for users. Implements RRN (Registration Reference Number) based authentication
with real-time validation and error handling.

@features
- Secure RRN (Registration Reference Number) input with validation
- Password field with show/hide functionality
- Real-time form validation and error messages
- CSRF protection via form actions
- Responsive design for mobile and desktop
- Accessibility-compliant form controls
- Error state handling and user feedback
- Automatic redirect on successful login

@formFields
- rrn: Registration Reference Number
- password: User's password
- csrfToken: Hidden CSRF protection token

@serverActions
- default: Handles form submission and authentication
- logout: Handles user logout requests

@errorHandling
- Displays validation errors in real-time
- Shows server-side error messages
- Handles network and authentication failures
- Provides clear user feedback

@security
- CSRF protection
- Rate limiting
- Password field masking
- Secure form submission

@dependencies
- userstate ($lib/userstate.svelte.ts)
- $app/forms (form actions)
- +page.server.ts (server-side logic)

@example
Accessed via /auth/login route:
```ts
// Usage in navigation
goto('/auth/login');
```
  - Loading states
  
  Form Fields:
  1. RRN (Registration Number)
     - Required field
     - Numeric validation
     - Format checking
  
  2. Password
     - Required field
     - Secure input
     - Show/hide toggle
  
  States:
  - Loading
  - Error
  - Success
  - Initial
  
  Validation:
  - Client-side validation
  - Real-time feedback
  - Server-side validation
  
  Error Handling:
  - Invalid credentials
  - Network errors
  - Server errors
  - Validation errors
  
  Navigation:
  - Redirect on success
  - Registration link
  - Password reset
-->
<script lang="ts">
	import type { PageProps } from './$types.js';
	let { form }: PageProps = $props();
	import toast, { Toaster } from 'svelte-5-french-toast';
	$effect(() => {
		if (form) {
			if (form.error) {
				toast.error(form.error, {
					duration: 5000,
					position: 'top-center',
					style: {
						backgroundColor: '#1f2937',
						color: '#fff',
						borderRadius: '8px',
						padding: '16px',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
					}
				});
			}
		}
	});
</script>

<svelte:head>
	<title>Login - Cresbee</title>
	<meta name="description" content="Log in to access your events and dashboard." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- <Toaster></Toaster> -->
<div class="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 text-gray-100">
	<div class="mx-auto w-full max-w-md">
		<!-- Login Form Card -->
		<section class="rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
			<div class="border-b border-gray-700 px-6 py-5 text-center">
				<div class="flex items-center justify-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v1m0 14v1m-8-8h1m14 0h1M5.636 5.636l.707.707M18.364 18.364l-.707-.707M5.636 18.364l.707-.707M18.364 5.636l-.707.707M12 8v4l2 2"
						/>
					</svg>
					<h2 class="text-xl font-bold text-white">Login</h2>
				</div>
			</div>

			<form method="POST" class="space-y-5 p-6" aria-labelledby="login-heading">
				<div class="space-y-2">
					<label for="rrn-input" class="block text-sm font-medium text-gray-300">
						Registration Number (RRN)
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
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
							class="w-full rounded-md border border-gray-700 bg-gray-700 py-2.5 pr-4 pl-10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your RRN (e.g., 123456)"
							required
						/>
					</div>
				</div>

				<div class="space-y-2">
					<label for="password-input" class="block text-sm font-medium text-gray-300">
						Password
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<svg
								class="h-5 w-5 text-gray-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
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
							class="w-full rounded-md border border-gray-700 bg-gray-700 py-2.5 pr-4 pl-10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your password"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					class="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
				>
					Login
				</button>
			</form>

			<div class="border-t border-gray-700 px-6 py-4 text-center">
				<p class="text-sm text-gray-400">
					Don't have an account? <a href="/auth/register/" class="text-indigo-400 hover:underline"
						>Register</a
					>
				</p>
			</div>
		</section>
	</div>
</div>
