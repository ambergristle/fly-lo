<script lang="ts">
  import * as Table from '$lib/components/table';
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);
</script>

<Table.Root>
  <Table.Caption>
  </Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>
        Airline
      </Table.Head>
      <Table.Head>
        Points
      </Table.Head>
      <Table.Head>
        Date
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data.results as result}
      <Table.Row>
        <Table.Cell>
          {result.airline}
        </Table.Cell>
        <Table.Cell>
          {result.points}
        </Table.Cell>
        <Table.Cell>
          {'date'}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
