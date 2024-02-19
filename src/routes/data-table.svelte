
<script lang="ts">
  import { Render, Subscribe } from 'svelte-headless-table';
  import { ArrowUpDown as SortNeutralIcon } from 'lucide-svelte';
  import { ArrowUpAZ as SortAscendingIcon } from 'lucide-svelte';
  import { ArrowDownZA as SortDescendingIcon } from 'lucide-svelte';
  
  import { Button } from '$lib/components/button';
  import { FormItem } from '$lib/components/form';
  import { Label } from '$lib/components/label';
  import { ProgressBar } from '$lib/components/progress-bar';
  import { Slider } from '$lib/components/slider';
  import * as Table from '$lib/components/table';
  import * as ToggleGroup from '$lib/components/toggle-group';
  import { cn } from '$lib/utils/styles';
  import createTableModel from './model';
  import { loading, series, summary } from './store';
  
const {
  headerRows,
  rows,
  tableAttrs,
  tableBodyAttrs,
  sortKeys,
  filterState: {
    preFilteredRows,
    miles: milesFilter,
    weekdays: weekdayFilter,
  }, 
} = createTableModel(series);

$: milesFilter.set([$summary.max]);

const WEEKDAYS = ['0', '1', '2', '3', '4', '5', '6'] as const;

const WEEKDAY_LABELS = {
  0: 'Su',
  1: 'Mo',
  2: 'Tu',
  3: 'W',
  4: 'Th',
  5: 'F',
  6: 'Sa',
};

</script>

<div class="h-full flex flex-row">
  <div class="space-y-4 p-4 border-r">
    <div>
      <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
        Filters
      </h4>
      <p class="leading-7 text-sm text-muted-foreground">
        Showing {$rows.length}/{$preFilteredRows.length} results
      </p>
    </div>
    <FormItem>
      <Label for="max-miles">
        Max Miles ({$milesFilter / 1000}k)
      </Label>
      {#key $summary}
        <div class="px-2">
          <Slider
            bind:value={$milesFilter}
            min={$summary.min}
            max={$summary.max}
            step={1000}
          />
        </div>
      {/key}
    </FormItem>
    <FormItem>
      <Label for="weekdays">
        Weekdays
      </Label>
      <ToggleGroup.Root
        id="weekdays"
        type="multiple"
        bind:value={$weekdayFilter}
      >
        {#each WEEKDAYS as weekday (weekday)}
          <ToggleGroup.Item value={weekday}>
            {WEEKDAY_LABELS[weekday]}
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </FormItem>
  </div>
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
                  {#if props.sort.disabled}
                    <Render of={cell.render()}/>
                  {:else}
                    <Button variant="ghost" on:click={props.sort.toggle}>
                      <Render of={cell.render()}/>
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
                        <SortNeutralIcon
                          class={cn(
                            $sortKeys[0]?.id === cell.id && 'text-foreground',
                            'ml-2 h-4 w-4',
                          )}
                        />
                      {/if}
                    </Button>
                  {/if}
                </Table.Head>
              </Subscribe>
            {/each}
          </Table.Row> 
          <ProgressBar
            Component={Table.Row} 
            loading={$loading}
            />
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
</div>
