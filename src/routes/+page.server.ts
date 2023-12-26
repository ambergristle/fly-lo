import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

import { queryLowestFareOffers } from '$lib/afklm';
import { QueryValues } from './schemas';

export const load: PageServerLoad = async ({ request }) => {
  return {
    query: await superValidate(request, QueryValues),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const query = await superValidate(request, QueryValues);

    if (!query.valid) {
      console.error(query.errors);
      console.info(query.data);
      return fail(400, { query });
    }

    const {
      origin,
      destination,
      dateRange,
    } = query.data;

    const results = await queryLowestFareOffers({
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
      query,
      results,
    };
  },
};
