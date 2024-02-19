<script lang="ts">
	import { getFormField } from 'formsnap';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Input, type InputEvents } from '$lib/components/input';
  import { cn } from '$lib/utils/styles';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

  let className: $$Props['class'] = undefined;
	export { className as class };

	const { attrStore, value, errors } = getFormField();
</script>

<Input
  class={cn($errors && 'border-destructive', className)}
	{...$attrStore}
	bind:value={$value}
	{...$$restProps}
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
/>
