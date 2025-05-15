<div class="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-12">
  <div class="w-full max-w-md">
    <!-- Registration Card -->
    <div class="rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-lg">
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold text-white">Create Account</h2>
        <p class="mt-2 text-gray-400">Join the Crescent community</p>
      </div>

      <form class="space-y-5"> 

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
            class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="" disabled selected>Select your course</option>
            <option value="btech-civil">B. Tech. Civil Engineering</option>
            <option value="btech-mechanical">B. Tech. Mechanical Engineering</option>
            <option value="btech-automobile">B. Tech. Automobile Engineering</option>
            <option value="btech-aeronautical">B. Tech. Aeronautical Engineering</option>
            <option value="btech-polymer">B. Tech. Polymer Engineering</option>
            <option value="btech-eee">B. Tech. Electrical and Electronics Engineering</option>
            <option value="btech-ece">B. Tech. Electronics and Communication Engineering</option>
            <option value="btech-ecpe">B. Tech. Electronics and Computer Engineering</option>
            <option value="btech-eie">B. Tech. Electronics and Instrumentation Engineering</option>
            <option value="btech-ai-ds">B. Tech. Artificial Intelligence and Data Science</option>
            <option value="btech-cse">B. Tech. Computer Science and Engineering</option>
            <option value="btech-cybersecurity">B. Tech. Computer Science and Engineering (Cyber Security)</option>
            <option value="btech-iot">B. Tech. Computer Science and Engineering (Internet of Things)</option>
            <option value="btech-it">B. Tech. Information Technology</option>
            <option value="btech-biotech">B. Tech. Biotechnology</option>
            <option value="btech-lateral">B. Tech. Lateral Entry</option>
            <option value="barch">B. Arch.</option>
            <option value="bdes">B. Des.</option>
            <option value="bpharm">B. Pharm.</option>
            <option value="bba-llb">BBA LLB (Hons.)</option>
            <option value="ba-llb">BA LLB (Hons.)</option>
            <option value="bsc-aviation">B. Sc. Aviation</option>
            <option value="bsc-biotech">B. Sc. Biotechnology</option>
            <option value="bsc-cs">B. Sc. Computer Science</option>
            <option value="bca">BCA</option>
            <option value="bcom-general">B. Com. General</option>
            <option value="bcom-af">B. Com. Accounts & Finance</option>
            <option value="bcom-pa">B. Com. Professional Accounting</option>
            <option value="bcom-iaf">B. Com. International Accounting & Finance</option>
            <option value="bba-general">BBA General</option>
            <option value="ba-policy">B.A. Public Policy</option>
            <option value="ba-english">B.A. English</option>
            <option value="ba-islamic">B.A. Islamic Studies</option>
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
          <label for="confirm-password" class="mb-1 block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            class="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Register
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="/auth/login" class="font-medium text-indigo-400 hover:text-indigo-300 hover:underline">
          Log in
        </a>
      </div>
    </div>
  </div>
</div>