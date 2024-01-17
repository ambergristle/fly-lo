import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { queryLowestFareOffers } from '$lib/afklm';
import { RateLimitError } from '$lib/errors';
import type { Actions, PageServerLoad } from './$types';
import { QueryValues } from './schemas';

export const load: PageServerLoad = async ({ request }) => {
  return {
    form: await superValidate(request, QueryValues),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, QueryValues);

    if (!form.valid) {
      console.error('Invalid Query: ', JSON.stringify(form.errors, null, 2));

      return fail(400, { 
        form, 
      });
    }

    const {
      origin,
      destination,
      dateRange,
    } = form.data;

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
        form,
        results,
      };

    } catch (error) {
      console.error(error);

      if (error instanceof RateLimitError) {
        return fail(error.status, { 
          form,
          error: error.json,
        });
      }

      return fail(500, { 
        success: false,
      });
    }
  },
};
