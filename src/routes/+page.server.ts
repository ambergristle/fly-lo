import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { getSearchParam } from '$lib/utils';
import { ZQueryValues } from './schemas';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {

  const query = {
    origin: getSearchParam(url, 'origin'),
    destination: getSearchParam(url, 'destination'),
    dateRange: {
      start: getSearchParam(url, 'start'),
      end: getSearchParam(url, 'end'),
    },
  };

  /**
   * presence of origin assumed to indicate attempted query;
   * if no query, omit data to avoid making form invalid on init
   */
  const form = query.origin
    ? await superValidate(query, ZQueryValues)
    : await superValidate(ZQueryValues);

  return { form };
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
