import { writable } from 'svelte/store';

import { keyed } from 'svelte-keyed';
import type { BestOfferItem, BestOfferSummary } from '../types';

export const loading = writable(false);

export const setLoading = (isLoading: boolean) => {
  return loading.set(isLoading);
};

export const series = writable<BestOfferItem[]>([]);

export const summary = writable<{
  min: number;
  max: number;
}>({
  min: 0,
  max: 0,
});

export const min = keyed(summary, 'min');
export const max = keyed(summary, 'max');

export const setStore = (data: { 
  series: BestOfferItem[];
  summary: BestOfferSummary;
}) => {

  const { min, max } = data.summary;

  if (data.series.length && min && max) {
    series.set(data.series);
    summary.set({ min, max });
  }

  loading.set(false);
};
