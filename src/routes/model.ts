import { createTable } from 'svelte-headless-table';
import { addColumnFilters, addSortBy } from 'svelte-headless-table/plugins';
import { keyed } from 'svelte-keyed';
import type { Writable } from 'svelte/store';

import { isNumber } from '$lib/utils/types';
import type { BestOfferItem } from '$types';

const createTableModel = (series: Writable<BestOfferItem[]>) => {

  const table = createTable(series, {
    filter: addColumnFilters(),
    sort: addSortBy(),
  });

  const columns = table.createColumns([
    table.column({
      accessor: 'departureDate',
      header: 'Date',
      plugins: {
        filter: {
          initialFilterValue: ['0', '1', '2', '3', '4', '5', '6'],
          fn: ({ value, filterValue }) => {
            const weekday = new Date(`${value}T00:00`).getDay();
            return filterValue.includes(`${weekday}`);
          },
        },
      },
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
          initialFilterValue: [0],
          fn: ({ value, filterValue }) => {
            const [max] = filterValue; // array
            if (!isNumber(max) || !isNumber(value)) return true;
            return value <= max;
          },
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
    
  const { 
    headerRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    pluginStates,
  } = table.createViewModel(columns);

  const { filterValues } = pluginStates.filter;
  const { sortKeys } = pluginStates.sort;

  const milesFilter = keyed(filterValues, 'miles');
  const weekdayFilter = keyed(filterValues, 'departureDate');

  return {
    headerRows,
    rows,
    tableAttrs,
    tableBodyAttrs,
    sortKeys,
    filterState: {
      miles: milesFilter,
      weekdays: weekdayFilter,
    },
  };
};

export default createTableModel;
