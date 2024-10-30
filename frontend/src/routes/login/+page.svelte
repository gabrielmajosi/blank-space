<script>
	import Field from '../../components/Field.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Toastify from 'toastify-js';

	onMount(() => {
		if (localStorage.user) {
			goto('/');
		}
	});

	async function login(event) {
		event.preventDefault();
		const form = event.target;

		// post form data to the server as json
		fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(Object.fromEntries(new FormData(form)))
		}).then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					localStorage.setItem('user', JSON.stringify(json));
				});

				goto('/');
			}
		});
	}
</script>

<div class="flex w-full flex-col items-center">
	<h1 class="mt-[50px] font-sans text-5xl font-bold">Sign in</h1>
	<h2 class="mt-[10px] text-2xl">
		to your <span class="font-extralight italic">blank.space</span> account
	</h2>

	<form onsubmit={login} class="mt-[120px] flex w-full flex-col items-center">
		<Field name="username" type="text" labelText="username 👤" />
		<Field name="password" type="password" labelText="password 🔑" />

		<button class="mt-[45px] h-[45px] w-[55%] bg-black text-white">Sign in</button>
		<div class="mt-[8px] w-[55%] text-right">
			Having trouble signing in?&nbsp;<a href="/forgot-password" class="cursor-pointer font-bold"
				>Forgot Password</a
			>
		</div>
	</form>
</div>

<div class="absolute bottom-5 flex w-full justify-center">
	Don't have an account?&nbsp;<a href="/register" class="font-bold">Register</a>
</div>
