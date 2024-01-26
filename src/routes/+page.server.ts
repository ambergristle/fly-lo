import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import type { Actions, PageServerLoad } from './$types';

import { queryLowestFareOffers } from '$lib/afklm';
import { ZQueryValues } from './schemas';

export const load: PageServerLoad = async ({ url }) => {

  const query = {
    origin: url.searchParams.get('origin') ?? '',
    destination: url.searchParams.get('destination') ?? '',
    dateRange: {
      start: url.searchParams.get('start') ?? '',
      end: url.searchParams.get('end') ?? '',
    },
  };

  const form = await superValidate(query, ZQueryValues);

  if (!form.valid) {
    return { form };
  }
  
  const { origin, destination, dateRange } = form.data;

  const data = queryLowestFareOffers({
    origin,
    destination,
    filter: {
      fromDate: dateRange.start,
      toDate: dateRange.end,
      interval: 'DAY',
    },
    format: {
      currency: 'USD',
    },
  });

  return {
    form,
    data,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, ZQueryValues);
    if (!form.valid) {
      console.error('Invalid Query: ', JSON.stringify(form.errors, null, 2));
      return fail(400, { form });
    }

    const { origin, destination, dateRange } = form.data;

    const searchParams = new URLSearchParams({
      origin,
      destination,
      start: dateRange.start,
      end: dateRange.end,
    });

    throw redirect(303, `?${searchParams}`);
  },
};
