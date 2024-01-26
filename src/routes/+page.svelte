<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import {
    Loader2 as LoadingIcon, 
    Search as SearchIcon, 
  } from 'lucide-svelte';

  import type { PageData } from './$types';

  import * as Card from '$lib/components/card';
  import * as Form from '$lib/components/form';
  import DataTable from './data-table.svelte';
  import { ZQueryValues } from './schemas';
      
  export let data: PageData;

  const form = superForm(data.form, {
    dataType: 'json',
  });
</script>

<div class="container">
  <Card.Root class="flex flex-row justify-center items-center">
    <Form.Root
      form={form}
      schema={ZQueryValues}
      controlled
      let:config
    >
      <Card.Content class="flex flex-row items-center gap-2 pt-6">
        <Form.Field {config} name="origin">
          <Form.Item>
            <Form.Input placeholder="SFO"/>
          </Form.Item>
        </Form.Field>
        <Form.Field {config} name="destination">
          <Form.Item>
            <Form.Input placeholder="ATH"/>
          </Form.Item>
        </Form.Field>
        <Form.RangeCalendar />
        <Form.Button>
          {#await data.data}
            <LoadingIcon class="mr-2 h-4 w-4 animate-spin" />
          {:then}
            <SearchIcon class="mr-2 h-4 w-4" />
          {/await}
          Search
        </Form.Button>
      </Card.Content>
    </Form.Root>
  </Card.Root>
  {#await data.data then response}
    {#if response}
      <DataTable
        summary={response.summary}
        results={response.results}
      />
    {/if}
  {/await}
</div>


<!-- {#if $page.form?.error}
<Alert.Root variant="destructive">
  <Alert.Title>
    {`Error: ${$page.form.error.message}`}
  </Alert.Title>
  <Alert.Description>
    {$page.form.error.helperText}
  </Alert.Description>
</Alert.Root>
{/if} -->
