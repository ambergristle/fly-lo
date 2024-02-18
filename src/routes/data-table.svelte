
<script lang="ts">
  import { Render, Subscribe } from 'svelte-headless-table';
  import { ArrowUpDown as SortNeutralIcon } from 'lucide-svelte';
  import { ArrowUpAZ as SortAscendingIcon } from 'lucide-svelte';
  import { ArrowDownZA as SortDescendingIcon } from 'lucide-svelte';
  
  import { Button } from '$lib/components/button';
  import { FormItem } from '$lib/components/form';
  import { Label } from '$lib/components/label';
  import * as Table from '$lib/components/table';
  import * as ToggleGroup from '$lib/components/toggle-group';
  import { cn } from '$lib/utils/styles';

  import createTableModel from './model';
  import { series, summary } from './store';

  const {
    headerRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    sortKeys,
    filterState: {
      // miles: milesFilter,
      weekdays: weekdayFilter,
    }, 
  } = createTableModel(series, $summary.max);

</script>

<div class="h-full flex flex-row">
  <div class="space-y-4 p-4 border-r">
    <FormItem>
      <Label for="weekdays">
        Weekdays
      </Label>
      <ToggleGroup.Root
        id="weekdays"
        type="multiple"
        bind:value={$weekdayFilter}
      >
        <ToggleGroup.Item value="0">Su</ToggleGroup.Item>
        <ToggleGroup.Item value="1">M</ToggleGroup.Item>
        <ToggleGroup.Item value="2">Tu</ToggleGroup.Item>
        <ToggleGroup.Item value="3">W</ToggleGroup.Item>
        <ToggleGroup.Item value="4">Th</ToggleGroup.Item>
        <ToggleGroup.Item value="5">Fr</ToggleGroup.Item>
        <ToggleGroup.Item value="6">Sa</ToggleGroup.Item>
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
