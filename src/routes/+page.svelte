<script lang="ts">
  import { 
    getLocalTimeZone, 
    parseDate, 
    today,
    DateFormatter, 
    type DateValue, 
  } from '@internationalized/date';
  import { superForm } from 'sveltekit-superforms/client';
  import { 
    Calendar as CalendarIcon,
    Loader2 as LoadingIcon, 
    Search as SearchIcon, 
  } from 'lucide-svelte';
  
  import { page } from '$app/stores';
  import * as Alert from '$lib/components/alert';
  import { Button } from '$lib/components/button';
  import { Field, Form, FormButton, FormItem, Input } from '$lib/components/form';
  import * as Card from '$lib/components/card';
  import * as Popover from '$lib/components/popover';
  import { RangeCalendar } from '$lib/components/range-calendar';
  import * as Table from '$lib/components/table';
  import { cn } from '$lib/utils/styles';
  import type { PageData } from './$types';
  import { QueryValues } from './schemas';
    
  export let data: PageData;

  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });

  const formProps = superForm(data.form, {
    dataType: 'json',
  });
  
  const { form: query, delayed } = formProps;

  let datePickerValue = $query.dateRange
    ? {
      start: $query.dateRange.start ? parseDate($query.dateRange.start) : undefined,
      end: $query.dateRange.end ? parseDate($query.dateRange.end) : undefined,
    }
    : undefined;

  let datePickerStartValue: DateValue | undefined = undefined;
</script>

{#if $page.form?.error}
  <Alert.Root variant="destructive">
    <Alert.Title>
      {`Error: ${$page.form.error.message}`}
    </Alert.Title>
    <Alert.Description>
      {$page.form.error.helperText}
    </Alert.Description>
  </Alert.Root>
{/if}

<Card.Root class="flex flex-row justify-center items-center">
  <Card.Content class="pt-4">
    <Form
      schema={QueryValues}
      form={formProps}
      controlled
      let:config
      class="flex flex-row items-center gap-2"
    >
      <Field {config} name="origin">
        <FormItem>
          <Input placeholder="SFO"/>
        </FormItem>
      </Field>
      <Field {config} name="destination">
        <FormItem>
          <Input placeholder="ATH"/>
        </FormItem>
      </Field>
      <Popover.Root openFocus>
        <Popover.Trigger asChild let:builder>
          <Button
            variant="outline"
            class={cn(
              'w-[300px] justify-start text-left font-normal',
              !datePickerValue && 'text-muted-foreground',
            )}
            builders={[builder]}
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            {#if datePickerValue && datePickerValue.start}
              {#if datePickerValue.end}
                {df.format(datePickerValue.start.toDate(getLocalTimeZone()))} - {df.format(
                  datePickerValue.end.toDate(getLocalTimeZone()),
                )}
              {:else}
                {df.format(datePickerValue.start.toDate(getLocalTimeZone()))}
              {/if}
            {:else if datePickerStartValue}
              {df.format(datePickerStartValue.toDate(getLocalTimeZone()))}
            {:else}
              Pick a date
            {/if}
          </Button>
        </Popover.Trigger>
        <Popover.Content class="w-auto p-0" align="start">
          <RangeCalendar
            bind:value={datePickerValue}
            bind:startValue={datePickerStartValue}
            initialFocus
            numberOfMonths={2}
            placeholder={datePickerValue?.start}
            minValue={today(getLocalTimeZone())}
            onValueChange={(v) => {
              $query.dateRange.start = v.start
                ? v.start.toString()
                : '';
                
              $query.dateRange.end = v.end
                ? v.end.toString()
                : '';
            }}
          />
        </Popover.Content>
      </Popover.Root>
      <FormButton>
        {#if $delayed}
          <LoadingIcon class="mr-2 h-4 w-4 animate-spin" />
        {:else}
          <SearchIcon class="mr-2 h-4 w-4" />
        {/if}
        Search
      </FormButton>
    </Form>
  </Card.Content>
</Card.Root>

<Table.Root>
  <Table.Caption>
  </Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>
        Date
      </Table.Head>
      <Table.Head>
        Duration
      </Table.Head>
      <Table.Head>
        Miles
      </Table.Head>
      <Table.Head>
        Taxes
      </Table.Head>
      <Table.Head>
        Seats Available
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $page.form?.results ?? [] as offer}
      <Table.Row>
        <Table.Cell>
          {offer.departureDate}
        </Table.Cell>
        <Table.Cell>
          {offer.duration}
        </Table.Cell>
        <Table.Cell>
          {offer.miles}
        </Table.Cell>
        <Table.Cell>
          {offer.taxes}
        </Table.Cell>
        <Table.Cell>
          {offer.numberOfSeatsAvailable}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
