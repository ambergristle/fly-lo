// import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { queryLowestFareOffers } from '$lib/afklm';

export const load: PageServerLoad = ({ url, route, params }) => {
  console.log({ url, route, params });

  return {
  //   offers: lowestFareOffers({
  //     origin: 'SFO',
  //     destination: 'ATH',
  //     filter: {
  //       fromDate: '2024-01-01',
  //       toDate: '2024-12-31',
  //       interval: 'DAY',
  //     },
  //     format: {
  //       currency: 'USD',
  //     },
  //   }),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const result = await queryLowestFareOffers({
      origin: 'SFO',
      destination: 'ATH',
      filter: {
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
        interval: 'DAY',
      },
      format: {
        currency: 'USD',
      },
    });

    return {
      success: true,
      data: result,
    };
  },
};
