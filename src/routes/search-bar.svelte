<script lang="ts">
  import { 
    getLocalTimeZone, 
    parseDate, 
    today,
    DateFormatter, 
    type DateValue, 
  } from '@internationalized/date';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';
  import { 
    Calendar as CalendarIcon,
    Loader2 as LoadingIcon, 
    Search as SearchIcon, 
  } from 'lucide-svelte';
  
  import { page } from '$app/stores';
  import { cn } from '$lib/utils/styles';
  import * as Alert from '$lib/components/alert';
  import { Button } from '$lib/components/button';
  import { Field, Form, FormButton, FormItem, Input } from '$lib/components/form';
  import * as Card from '$lib/components/card';
  import * as Popover from '$lib/components/popover';
  import { RangeCalendar } from '$lib/components/range-calendar';
  import { ZQueryValues } from './schemas';
  
  export let query: SuperValidated<typeof ZQueryValues>;

  const df = new DateFormatter('en-US', {
    dateStyle: 'long',
  });

  const formProps = superForm(query, {
    dataType: 'json',
  });
  
  const { form, errors, delayed, enhance } = formProps;

  let datePickerValue = $form.dateRange
    ? {
      start: $form.dateRange.start ? parseDate($form.dateRange.start) : undefined,
      end: $form.dateRange.end ? parseDate($form.dateRange.end) : undefined,
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
      schema={ZQueryValues}
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
