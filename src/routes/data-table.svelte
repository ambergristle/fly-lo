
<script lang="ts">

  import { Render, Subscribe, createTable } from 'svelte-headless-table';
  import { addColumnFilters, addSortBy } from 'svelte-headless-table/plugins';
  import { keyed } from 'svelte-keyed';
  import { ArrowUpDown as SortIcon } from 'lucide-svelte';
  import { ArrowUpAZ as SortAscendingIcon } from 'lucide-svelte';
  import { ArrowDownZA as SortDescendingIcon } from 'lucide-svelte';

  import { Button } from '$lib/components/button';
  import * as Table from '$lib/components/table';
  import { cn } from '$lib/utils/styles';
  import { isNumber } from '$lib/utils/types';
  import { Slider } from '$lib/components/slider';
  import { minFilter } from '$lib/components/table/filters';
  import { loading, series, summary } from './store';

  const table = createTable(series, {
    filter: addColumnFilters(),
    sort: addSortBy(),
  });

  const createColumns = (max?: number) => {
    return table.createColumns([
      table.column({
        accessor: 'departureDate',
        header: 'Date',
      }),
      table.column({
        accessor: 'duration',
        header: 'Duration (hrs)',
        cell: ({ value }) => {
          return isNumber(value) 
            ? (value / 60).toFixed(1) 
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
        plugins: {
          filter: {
            fn: minFilter,
            initialFilterValue: max,
          },
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
        plugins: {
          sort: { disable: true },
        },
      }),
      table.column({
        accessor: 'numberOfSeatsAvailable',
        header: 'Seats Available',
      }),
    ]);
  };

  let columns = createColumns(0);

  $: {
    columns = createColumns($summary.max);
  }

  const { 
    headerRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
  } = table.createViewModel(columns);

  const { filterValues } = pluginStates.filter;
  const milesFilter = keyed(filterValues, 'miles');

  $: filterValue = [$milesFilter ?? 0];
  $: milesFilter.set(filterValue[0]);

  const { sortKeys } = pluginStates.sort;

</script>

<div class="m-4">
  <Slider 
    bind:value={filterValue}
    min={$summary.min}
    max={$summary.max}
    step={10000}
  />
</div>
{$loading && 'Loading...'}
<Table.Root {...$tableAttrs}>
  <Table.Header>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe 
        rowAttrs={headerRow.attrs()} 
        rowProps={headerRow.props()} 
        let:rowProps
      >
        <Table.Row {...rowProps}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe 
              attrs={cell.attrs()}
              let:attrs
              props={cell.props()}
              let:props
            >
              <Table.Head {...attrs}>
                {#if !props.sort.disabled}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()}/>
                    <!-- streamline icon; style on full arr inclusion? -->
                    {#if props.sort.order === 'asc'}
                      <SortAscendingIcon
                        class={cn(
                          $sortKeys[0]?.id === cell.id && 'text-foreground',
                          'ml-2 h-4 w-4',
                        )}
                      />
                    {:else if props.sort.order === 'desc'}
                      <SortDescendingIcon
                        class={cn(
                          $sortKeys[0]?.id === cell.id && 'text-foreground',
                          'ml-2 h-4 w-4',
                        )}
                      />
                    {:else}
                      <SortIcon
                        class={cn(
                          $sortKeys[0]?.id === cell.id && 'text-foreground',
                          'ml-2 h-4 w-4',
                        )}
                      />
                    {/if}
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
