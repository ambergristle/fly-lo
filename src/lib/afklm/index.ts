import wretch from 'wretch';
import { z } from 'zod';

import { AFKLM_BASE_URL, AFKLM_KEY } from '$env/static/private';

enum Provider {
  AirFrance = 'AF',
  KLM = 'KLM',
  TurkishAir = 'TKA',
}

type OfferRow = {
  origin: {
    name: string;
    code: string;
  };
  destination: {
    name: string;
    code: string;
  };
  // split somehow?
  departsAt: Date;
  arrivesAt: Date;
  duration: number;
  airline: Provider;
  flightId: string; // number?
  price: {
    miles: number;
    taxes: number;
  }
}

type LowestFareOffersResponse = z.infer<typeof LowestFareOffersResponseSchema>;
const LowestFareOffersResponseSchema = z.object({
  connections: z.object({
    id: z.number(),
    dateInterval: z.string(),
    departureDate: z.string(),
    origin: z.object({
      code: z.string(),
      name: z.string(),
    }),
    destination: z.object({
      code: z.string(),
      name: z.string(),
    }),
    duration: z.number(),
  }).array().array(),
  recommendations: z.object({
    flightProducts: z.object({
      priceInMiles: z.object({
        displayPrice: z.number(),
        totalPrice: z.number(),
      }),
      connections: z.object({
        connectionId: z.number(),
        commercialCabin: z.enum(['BUSINESS']),
        numberOfSeatsAvailable: z.number(),
        _links: z.object({
          availableOffers: z.object({
            href: z.string(),
          }).optional(),
        }),
      }).array(),
      taxDetails: z.object({
        totalPrice: z.number(),
      }), 
    }).array(),
  }).array(),
});

const AFKLM = wretch(AFKLM_BASE_URL)
  .headers({
    'accept-language': 'en-US',
    'api-key': AFKLM_KEY,
    'afkl-travel-host': 'AF',
  });

export const lowestFareOffers = async ({
  origin,
  destination,
  filter,
  format,
}: {
  origin: string;
  destination: string;
  filter: {
    fromDate: string;
    toDate: string;
    interval: 'DAY' | 'MONTH';
  },
  format: {
    currency: 'USD' | 'EUR';
  }
}) => {
  const dateInterval = `${filter.fromDate}/${filter.toDate}`;

  return await AFKLM
    .url('/lowest-fare-offers')
    .post({
      'bookingFlow': 'REWARD',
      'commercialCabins': ['BUSINESS'],
      'customer': {},
      'passengers': [{
        'id': 0,
        'type': 'ADT',
      }, {
        'id': 1,
        'type': 'ADT',
      }],
      'requestedConnections': [{
        'dateInterval': dateInterval,
        'origin': {
          'type': 'AIRPORT',
          'code': origin,
        },
        'destination': {
          'type': 'AIRPORT',
          'code': destination,
        },
      }],
      'type': filter.interval,
      'currency': format.currency,
    })
    .json(LowestFareOffersResponseSchema.parse);
};

export const queryLowestFareOffers = async (params: {
  origin: string;
  destination: string;
  filter: {
    fromDate: string;
    toDate: string;
    interval: 'DAY' | 'MONTH';
  },
  format: {
    currency: 'USD' | 'EUR';
  }
}) => {
  const response = await lowestFareOffers(params);
  const connections = response.connections[0];
  
  return response.recommendations
    .map((recommendation, index) => {
      const flightProduct = recommendation.flightProducts[0];
      const c = flightProduct.connections[0];

      const connection = connections[index];
      if (connection.id !== c.connectionId) throw new Error('Failed to match connection: Invalid ID');

      return {
        origin: connection.origin.code,
        destination: connection.origin.code,
        commercialCabin: c.commercialCabin,
        departureDate: connection.departureDate,
        duration: connection.duration,
        miles: flightProduct.priceInMiles.totalPrice,
        taxes: flightProduct.taxDetails.totalPrice,
        numberOfSeatsAvailable: c.numberOfSeatsAvailable,
        offers: c._links.availableOffers?.href,
      };
    });
};
