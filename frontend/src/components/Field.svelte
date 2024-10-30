<script>
	export let name;
	export let type;
	export let labelText;
</script>

<div class="mb-[7px] flex w-[55%] flex-col space-y-[2px]">
	<label for={name} class="text-[14px] font-light">{labelText}</label>
	<input {name} {type} id={name} class="h-[40px] border border-[#A4A4A4] pl-[15px]" />
</div>
