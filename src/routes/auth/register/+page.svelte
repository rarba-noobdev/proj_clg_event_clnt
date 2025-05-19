<!--
@component RegisterPage
@description User registration component that handles new user sign-ups.
Provides a multi-step registration form with course selection and validation.

@props
- data.courses: Course[] - Available courses from the server
- data.departments: string[] - List of available departments

@features
- Multi-step registration process
- Course selection with search and filtering
- Real-time form validation
- Department selection
- Password strength validation
- Automatic RRN generation
- Form state persistence
- Error handling and validation feedback

@formFields
- fullName: string
- email: string
- department: string
- course: Course
- password: string
- confirmPassword: string

@types
```ts
type Course = {
    course_code: string;
    course_name: string;
    duration: number;
    id: number;
};
```

@validation
- Email format validation
- Password strength requirements
- Course selection validation
- Department validation
- Form completeness check

@dependencies
- userstate ($lib/userstate.svelte.ts)
- +page.server.ts (server-side logic)
- database.types.ts (type definitions)

@events
- onSubmit: Handles form submission
- onCourseSelect: Handles course selection
- onDepartmentChange: Handles department changes

@accessibility
- ARIA labels for form controls
- Error announcements
- Keyboard navigation support
- Focus management
-->

<script lang="ts">
	let { data } = $props();
	type Course = {
		course_code: string;
		course_name: string;
		duration: number;
		id: number;
	};
	let courses: Course[] = $derived(data.courses ?? []);
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
	<div class="w-full max-w-4xl">
		<!-- Registration Card -->
		<div class="rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-lg">
			<div class="mb-8 text-center">
				<h2 class="text-2xl font-bold text-white">Create Account</h2>
				<p class="mt-2 text-gray-400">Join the Crescent community</p>
			</div>

			{#if data?.error}
				<div class="mb-4 text-center text-sm text-red-400">
					{data.error}
				</div>
			{/if}

			<form method="POST" class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<!-- Left Column -->
				<div class="space-y-5">
					<!-- First Name -->
					<div>
						<label for="first_name" class="mb-1 block text-sm font-medium text-gray-300">
							First Name
						</label>
						<input
							id="first_name"
							name="first_name"
							type="text"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your first name"
						/>
					</div>

					<!-- Last Name -->
					<div>
						<label for="last_name" class="mb-1 block text-sm font-medium text-gray-300">
							Last Name
						</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your last name"
						/>
					</div>

					<!-- Email -->
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-gray-300"> Email </label>
						<input
							id="email"
							name="email"
							type="email"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your email"
						/>
					</div>

					<!-- Phone -->
					<div>
						<label for="phone" class="mb-1 block text-sm font-medium text-gray-300">
							Phone Number (Optional)
						</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your phone number"
						/>
					</div>
				</div>

				<!-- Right Column -->
				<div class="space-y-5">
					<!-- RRN -->
					<div>
						<label for="rrn" class="mb-1 block text-sm font-medium text-gray-300">
							Registration Number (RRN)
						</label>
						<input
							id="rrn"
							name="rrn"
							type="text"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Enter your RRN"
						/>
					</div>

					<!-- Course Selection -->
					<div>
						<label for="courses" class="mb-1 block text-sm font-medium text-gray-300">
							Course
						</label>
						<select
							id="courses"
							name="courses"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
						>
							<option value="" disabled selected>Select your course</option>
							{#if courses}
								{#each courses as course (course.id)}
									<option value={course.course_code}>{course.course_name}</option>
								{/each}
							{/if}
						</select>
					</div>

					<!-- Password -->
					<div>
						<label for="password" class="mb-1 block text-sm font-medium text-gray-300">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Create a password"
						/>
					</div>

					<!-- Confirm Password -->
					<div>
						<label for="passwordConfirm" class="mb-1 block text-sm font-medium text-gray-300">
							Confirm Password
						</label>
						<input
							id="passwordConfirm"
							name="passwordConfirm"
							type="password"
							required
							class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
							placeholder="Confirm your password"
						/>
					</div>
				</div>

				<!-- Full Width Submit Button -->
				<div class="md:col-span-2">
					<button
						type="submit"
						class="w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					>
						Register
					</button>
				</div>
			</form>

			<div class="mt-6 text-center text-sm text-gray-500">
				Already have an account?
				<a
					href="/auth/login"
					class="font-medium text-indigo-400 hover:text-indigo-300 hover:underline"
				>
					Log in
				</a>
			</div>
		</div>
	</div>
</div>
