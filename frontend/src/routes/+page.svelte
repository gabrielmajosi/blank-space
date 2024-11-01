<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '../components/Button.svelte';

	let user;

	function signOut() {
		localStorage.clear();
		goto('/login');
		return;
	}

	onMount(() => {
		if (!localStorage.user) {
			goto('/login');
			return;
		} else {
			user = JSON.parse(localStorage.user);
		}
	});
</script>

<div class="flex h-screen w-full flex-col items-center justify-between">
	<div class="flex flex-col items-center">
		<h1 class="mt-[50px] font-sans text-5xl font-bold">yipee 🎉</h1>
		<h2 class="mt-[10px] text-2xl">successfully logged in</h2>
	</div>

	<div class="mb-[75px] flex w-[55%] flex-col items-center space-y-5 lg:w-[35%]">
		<div class="font-light italic">Logged in as {user ? user.username : ''}</div>
		<Button text="Sign out" onclick={signOut}></Button>
	</div>
</div>
