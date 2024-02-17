import { error, json, type RequestHandler } from '@sveltejs/kit';

import { queryLowestFareOffers } from '$lib/afklm';
import { getSearchParam } from '$lib/utils';
import { ZQueryValues } from '../../schemas';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const query = {
      origin: getSearchParam(url, 'origin'),
      destination: getSearchParam(url, 'destination'),
      dateRange: {
        start: getSearchParam(url, 'start'),
        end: getSearchParam(url, 'end'),
      },
    };

    const { 
      origin, 
      destination,
      dateRange,
    } = ZQueryValues.parse(query);

    const data = await queryLowestFareOffers({
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

    return json({
      success: true,
      data,
    });

  } catch (cause) {
    if (cause instanceof Error) {
      return error(500, cause);
    }

    return error(500);
  }
};
