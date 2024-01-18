
<script lang="ts">
  import { writable } from 'svelte/store';
  import { Render, Subscribe, createTable } from 'svelte-headless-table';
  import { addSortBy } from 'svelte-headless-table/plugins';
  import { ArrowUpDown as SortIcon } from 'lucide-svelte';

  import * as Table from '$lib/components/table';
  import { cn } from '$lib/utils/styles';
  import { isNumber } from '$lib/utils/types';
  import { Button } from '$lib/components/button';
  import type { BestOfferItem } from '../types';

  export let results: BestOfferItem[] = [];

  const store = writable(results);

  $: store.set(results ?? []);

  const table = createTable(store, {
    sort: addSortBy(),
  });

  const columns = table.createColumns([
    table.column({
      accessor: 'departureDate',
      header: 'Date',
    }),
    table.column({
      accessor: 'duration',
      header: 'Duration (hrs)',
      cell: ({ value }) => {
        return isNumber(value) 
          ? value / 60 
          : 'ERR';
      },
    }),
    table.column({
      accessor: 'miles',
      header: 'Miles (k)',
      cell: ({ value }) => {
        return isNumber(value)
          ? value / 1000
          : 'ERR';
      },
    }),
    table.column({
      accessor: 'taxes',
      header: 'Taxes',
      cell: ({ value }) => {
        // or return result of createRender
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      },
    }),
    table.column({
      accessor: 'numberOfSeatsAvailable',
      header: 'Seats Available',
    }),
  ]);

  const { 
    headerRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
  } = table.createViewModel(columns);

  const { sortKeys } = pluginStates.sort;
</script>

<Table.Root {...$tableAttrs}>
  <Table.Header>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()}>
        <Table.Row>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe 
              attrs={cell.attrs()}
              let:attrs
              props={cell.props()}
              let:props
            >
              <Table.Head {...attrs}>
                <!-- what is cond? -->
                <!-- probably not going to do this here regardless -->
                {#if true}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()}/>
                    <SortIcon
                      class={cn(
                        $sortKeys[0]?.id === cell.id && 'text-foreground',
                        'ml-2 h-4 w-4',
                      )}
                    />
                  </Button>
                {:else}
                  <Render of={cell.render()}/>
                {/if}
              </Table.Head>
            </Subscribe>
          {/each}
        </Table.Row> 
      </Subscribe>
    {/each}
  </Table.Header>
  <Table.Body {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}
      <Subscribe
        rowAttrs={row.attrs()}
        let:rowAttrs
      >
        <Table.Row {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe
              attrs={cell.attrs()}
              let:attrs
            >
              <Table.Cell {...attrs}>
                <Render of={cell.render()} />
              </Table.Cell>
            </Subscribe>
          {/each}
        </Table.Row>
      </Subscribe>
    {/each}
  </Table.Body>
</Table.Root>
