<script lang="ts">
  import { getForm } from 'formsnap';
  import { 
    getLocalTimeZone,
    parseDate,
    today,
    DateFormatter,
    type DateValue,
  } from '@internationalized/date';
  import { Calendar as CalendarIcon } from 'lucide-svelte';
  
  import { cn } from '$lib/utils/styles';
  import { Button } from '$lib/components/button';
  import * as Popover from '$lib/components/popover';
  import { RangeCalendar } from '$lib/components/range-calendar';

  const { form } = getForm();

  let value = $form.dateRange
    ? {
      start: $form.dateRange.start ? parseDate($form.dateRange.start) : undefined,
      end: $form.dateRange.end ? parseDate($form.dateRange.end) : undefined,
    }
    : undefined;

  let startValue: DateValue | undefined = undefined;

  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });
</script>

<Popover.Root openFocus>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn('w-[300px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {#if value && value.start}
        {#if value.end}
          {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(value.end.toDate(getLocalTimeZone()))}
        {:else}
          {df.format(value.start.toDate(getLocalTimeZone()))}
        {/if}
      {:else if startValue}
        {df.format(startValue.toDate(getLocalTimeZone()))}
      {:else}
        Pick a date
      {/if}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0" align="start">
    <RangeCalendar
      bind:value
      bind:startValue
      initialFocus
      numberOfMonths={2}
      placeholder={value?.start}
      minValue={today(getLocalTimeZone())}
      onValueChange={(v) => {
        $form.dateRange.start = v.start
          ? v.start.toString()
          : '';
          
        $form.dateRange.end = v.end
          ? v.end.toString()
          : '';
      }}
    />
  </Popover.Content>
</Popover.Root>
