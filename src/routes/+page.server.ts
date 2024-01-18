import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { queryLowestFareOffers } from '$lib/afklm';
import { RateLimitError } from '$lib/errors';
import type { Actions, PageServerLoad } from './$types';
import { ZQueryValues } from './schemas';

export const load: PageServerLoad = async ({ request }) => {
  return {
    query: await superValidate(request, ZQueryValues),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const query = await superValidate(request, ZQueryValues);

    if (!query.valid) {
      console.error('Invalid Query: ', JSON.stringify(query.errors, null, 2));

      return fail(400, { 
        query, 
      });
    }

    const {
      origin,
      destination,
      dateRange,
    } = query.data;

    try {
      
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

    } catch (error) {
      console.error(error);

      if (error instanceof RateLimitError) {
        return fail(error.status, { 
          query,
          error: error.json,
        });
      }

      return fail(500, { 
        query,
      });
    }
  },
};
