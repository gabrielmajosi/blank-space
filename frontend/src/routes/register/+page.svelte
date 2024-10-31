<script>
	import Field from '../../components/Field.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Button from '../../components/Button.svelte';

	onMount(() => {
		if (localStorage.user) {
			goto('/');
		}
	});

	function register(event) {
		event.preventDefault();
		const form = event.target;

		// post form data to the server as json
		fetch('/api/register', {
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
			} else if (response.status == 409) {
			}
		});
	}
</script>

<div class="flex w-full flex-col items-center">
	<h1 class="mt-[50px] font-sans text-5xl font-bold">Register</h1>
	<h2 class="mt-[10px] text-2xl">
		a new account on <span class="font-extralight italic">blank.space</span>
	</h2>

	<form onsubmit={register} class="mt-[120px] flex w-full flex-col items-center">
		<Field name="email" type="text" labelText="email 📧" />
		<Field name="username" type="text" labelText="username 👤" />
		<Field name="password" type="password" labelText="password 🔑" />

		<div class="mt-[45px] w-[55%]">
			<Button text="Create account"></Button>
		</div>
	</form>
</div>

<div class="absolute bottom-5 flex w-full justify-center">
	Already have an account?&nbsp;<a href="/login" class="font-bold">Sign in</a>
</div>
