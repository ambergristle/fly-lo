<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';

  import * as Alert from '$lib/components/alert';
  import * as Form from '$lib/components/form';
  import { Separator } from '$lib/components/separator';
  import DataTable from './data-table.svelte';
  import { ZQueryValues } from './schemas';
  import { setLoading, setStore } from './store';
  import type { PageData } from './$types';

  export let data: PageData;

  const form = superForm(data.form, {
    dataType: 'json',
  });

  $: setLoading(data.data instanceof Promise);

  let error: {
    message: string;
    helperText?: string;
   } | undefined;

  $: data.data?.then((res) => {
    if (res.success) return setStore(res.data);
    error = res;
    setLoading(false);
  });

</script>

{#if error}
  <div class="p-2">
    <Alert.Root variant="destructive">
      <Alert.Title>
        {`Error: ${error.message}`}
      </Alert.Title>
      {#if error.helperText}
        <Alert.Description>
          {error.helperText}
        </Alert.Description>
      {/if}
    </Alert.Root>
  </div>
{/if}

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
    <div class="col-span-12 md:col-span-10 flex flex-row items-center justify-center space-x-2">
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
