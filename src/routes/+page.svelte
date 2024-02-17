<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';

  import * as Card from '$lib/components/card';
  import * as Form from '$lib/components/form';
  import { ZQueryValues } from './schemas';
  import type { PageData } from './$types';
  import DataTable from './data-table.svelte';
  import { setLoading, setStore } from './store';
    
  export let data: PageData;

  const form = superForm(data.form, {
    dataType: 'json',
  });

  $: setLoading(data.data instanceof Promise);

  $: data.data?.then(({ data }) => setStore(data));

</script>

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
        <Form.Button>submit</Form.Button>
      </Card.Content>
    </Form.Root>
  </Card.Root>
  <DataTable />
</div>
