<script lang="ts">

  import { page } from '$app/stores';
  import type { PageData } from './$types';
  
  import * as Alert from '$lib/components/Alert';
  import DataTable from './data-table.svelte';
  import SearchBar from './search-bar.svelte';
  import Sidebar from './sidebar.svelte';
    
  export let data: PageData;

</script>

<div class="container">
  {#if $page.form?.error}
  <Alert.Root variant="destructive">
    <Alert.Title>
      {`Error: ${$page.form.error.message}`}
    </Alert.Title>
    <Alert.Description>
      {$page.form.error.helperText}
    </Alert.Description>
  </Alert.Root>
{/if}
  <SearchBar query={data.query} />
  <div class="grid h-full items-stretch gap-6 md:grid-cols-[350px_1fr]">
    <Sidebar />
    <DataTable data={$page.form?.results ?? []} />
  </div>
</div>
