<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';

  import * as Card from '$lib/components/card';
  import * as Form from '$lib/components/form';
  import DataTable from './data-table.svelte';
  import { ZQueryValues } from './schemas';
  import { setLoading, setStore } from './store';
  import type { PageData } from './$types';

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
  <Card.Root class="flex flex-row justify-center items-center my-4">
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
          search
        </Form.Button>
      </Card.Content>
    </Form.Root>
  </Card.Root>
  <DataTable />
</div>
