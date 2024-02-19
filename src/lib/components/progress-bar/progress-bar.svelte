
<script lang="ts">
  import { cn } from '$lib/utils/styles';
  import type { SvelteComponent } from 'svelte';

  // seems to be a known issue https://github.com/sveltejs/language-tools/issues/486
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type ComponentConstructor = new (...args: any[]) => SvelteComponent
  
  type $$Props = {
    loading: boolean;
    class?: string;
    Component: ComponentConstructor;
  }

  export let Component: ComponentConstructor;

  let className: $$Props['class'] = undefined;
  export { className as class };

  export let loading: boolean;
</script>

  <svelte:component 
    this={Component} 
    class={cn('relative h-0 bg-secondary', className)}
  >
    <div 
      class={cn(
        'absolute h-0.5 bg-muted-foreground',
        loading && 'progress-animation',
      )}
    ></div>
  </svelte:component>

<style>

  .progress-animation {
    animation: progress 1s infinite linear;
  }

  @keyframes progress {
    0% { width: 0%; }
    25% { width: 50%; }
    75% { width: 80% }
    100% { width: 100%; }
  }

</style>
