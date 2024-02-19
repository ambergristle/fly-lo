<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';

  import * as Form from '$lib/components/form';
  import DataTable from './data-table.svelte';
  import { ZQueryValues } from './schemas';
  import { setLoading, setStore } from './store';
  import type { PageData } from './$types';
    import { Separator } from '$lib/components/separator';

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

<div class="container h-screen py-4 flex flex-col space-y-4">
  <Form.Root
    class="grid grid-cols-12"
    form={form}
    schema={ZQueryValues}
    controlled
    let:config
  >
    <h1 class="hidden md:block col-span1 scroll-m-20 text-2xl font-semibold tracking-tight whitespace-nowrap">
      fly-lo
    </h1>
    <div class="col-span-10 flex flex-row items-center justify-center space-x-2">
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
    </div>
  </Form.Root>
  <Separator />
  <DataTable />
</div>
