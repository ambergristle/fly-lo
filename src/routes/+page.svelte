<script lang="ts">
   import { Loader2 } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  
  import { Button } from '$lib/components/button';
  import { DateRangePicker } from '$lib/components/date-range-picker';
  import * as Table from '$lib/components/table';

  import type { ActionData, PageData, SubmitFunction } from './$types';

  export let data: PageData;
  export let form: ActionData;

  // console.log(data);
  // console.log(form);

  let loading = false;

  const queryMonth: SubmitFunction = (options) => {
    /** @todo validate */
    loading = true;

    return async (options) => {
      loading = false;
      /** must manually call default post-submit behavior */
      await options.update();
    };
  };

</script>

<form method="POST" use:enhance={queryMonth}>
  <DateRangePicker />
  <Button type="submit" disabled={loading}>
    {#if loading}
      <Loader2 class="mr-2 h-4 w-4 animate-spin" />
    {/if}
    Search
  </Button>
</form>

<Table.Root>
  <Table.Caption>
  </Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>
        Airline
      </Table.Head>
      <Table.Head>
        Points
      </Table.Head>
      <Table.Head>
        Date
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
  </Table.Body>
</Table.Root>
