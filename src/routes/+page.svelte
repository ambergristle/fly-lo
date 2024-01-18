<script lang="ts">

  import type { ActionData, PageData } from './$types';
  import DataTable from './data-table.svelte';
  import SearchBar from './search-bar.svelte';
  
  export let data: PageData;
  export let form: ActionData;

</script>

<div class="container">
  <SearchBar query={data.query} />
  <DataTable results={form?.results} />
</div>
