<script lang="ts">
	export let name: 'login' | 'user' | 'lock';
	export let className: string = '';
</script>

{#if name === 'login'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class={className}
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
{:else if name === 'user'}
	<svg class={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4m-4 0V4a2 2 0 114 0v2m-4 0h4m-8 6h8"
		/>
	</svg>
{:else if name === 'lock'}
	<svg class={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
		/>
	</svg>
{/if}
