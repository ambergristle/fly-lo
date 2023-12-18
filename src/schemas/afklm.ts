import { z } from 'zod';

// #region lowest-fares-by-destination

export const LowestFaresByDestinationRequest = z.object({
  bookingFlow: z
    .union([z.literal('REWARD'), z.literal('CORPORATE'), z.literal('LEISURE'), z.literal('STAFF'), z.undefined()])
    .optional(),
  origin: z.object({
    type: z
      .union([
        z.literal('STOPOVER'),
        z.literal('CITY'),
        z.literal('AIRPORT'),
        z.literal('BUS_STATION'),
        z.literal('HELIPORT'),
        z.literal('RAILWAY_STATION'),
        z.literal('FERRY_STATION'),
      ])
      .optional(),
    code: z.string().optional(),
  }),
  destinationCities: z.array(z.string()),
  type: z.union([z.literal('DAY'), z.literal('MONTH'), z.literal('OVERALL'), z.undefined()]).optional(),
  fromDate: z.union([z.string(), z.undefined()]).optional(),
  untilDate: z.union([z.string(), z.undefined()]).optional(),
});

// #endregion

// #region best-fare-offers

const Link_BestFareOffer = z.object({
  rel: z.string().optional(),
  href: z.string().optional(),
  hreflang: z.string().optional(),
  media: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  deprecation: z.string().optional(),
  profile: z.string().optional(),
  name: z.string().optional(),
});

const BasicConnectionRequest_BestFareOffer = z.object({
  departureDate: z.string(),
  departureTime: z.union([z.string(), z.undefined()]).optional(),
  arrivalDate: z.union([z.string(), z.undefined()]).optional(),
  arrivalTime: z.union([z.string(), z.undefined()]).optional(),
  origin: z
    .union([
      z.object({
        type: z
          .union([
            z.literal('STOPOVER'),
            z.literal('CITY'),
            z.literal('AIRPORT'),
            z.literal('BUS_STATION'),
            z.literal('HELIPORT'),
            z.literal('RAILWAY_STATION'),
            z.literal('FERRY_STATION'),
          ])
          .optional(),
        code: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
  destination: z
    .union([
      z.object({
        type: z
          .union([
            z.literal('STOPOVER'),
            z.literal('CITY'),
            z.literal('AIRPORT'),
            z.literal('BUS_STATION'),
            z.literal('HELIPORT'),
            z.literal('RAILWAY_STATION'),
            z.literal('FERRY_STATION'),
          ])
          .optional(),
        code: z.string().optional(),
      }),
      z.undefined(),
    ])
    .optional(),
  links: z.union([z.array(Link_BestFareOffer), z.undefined()]).optional(),
});

const BestFareFilter_BestFareOffer = z.object({
  maximumNumberOfSegments: z.number().optional(),
  marketingCarriers: z.array(z.string()).optional(),
});

const TravelCompanion_BestFareOffer = z.object({
  passengerId: z.number(),
  travelerKey: z.number(),
  travelerSource: z.union([z.literal('PROFILE'), z.literal('CORPORATE'), z.undefined()]).optional(),
});

const Customer_BestFareOffer = z.object({
  profileId: z.string(),
  cardKey: z.union([z.number(), z.undefined()]).optional(),
  corporateContractKey: z.union([z.number(), z.undefined()]).optional(),
  selectedTravelCompanions: z.union([z.array(TravelCompanion_BestFareOffer), z.undefined()]).optional(),
});

const DateInterval_BestFareOffer = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

const Passenger_BestFareOffer = z.object({
  id: z.number(),
  type: z.union([
    z.literal('ADT'),
    z.literal('CHD'),
    z.literal('INF'),
    z.literal('C14'),
    z.literal('YTH'),
    z.literal('YCD'),
    z.literal('STU'),
    z.literal('B12'),
    z.literal('B13'),
    z.literal('B14'),
    z.literal('B15'),
    z.literal('UNN'),
  ]),
  pnrId: z.number(),
  birthDate: z.union([z.string(), z.undefined()]).optional(),
  minAge: z.union([z.number(), z.undefined()]).optional(),
  maxAge: z.union([z.number(), z.undefined()]).optional(),
  ticketNumber: z.union([z.string(), z.undefined()]).optional(),
});

export const BestFareOffersRequest_BestFareOffer = z.object({
  departureDate: z.union([z.string(), z.undefined()]).optional(),
  bookingFlow: z.union([z.literal('REWARD'), z.literal('CORPORATE'), z.literal('LEISURE'), z.literal('STAFF')]),
  passengers: z.array(Passenger_BestFareOffer),
  commercialCabins: z.array(
    z.union([z.literal('ECONOMY'), z.literal('PREMIUM'), z.literal('BUSINESS'), z.literal('FIRST'), z.literal('ALL')]),
  ),
  withUpsellCabins: z.union([z.boolean(), z.undefined()]).optional(),
  customer: Customer_BestFareOffer,
  passengerCount: z.union([z.unknown(), z.undefined()]).optional(),
  currency: z.union([z.string(), z.undefined()]).optional(),
  reservationId: z.string(),
  fareOption: z
    .union([
      z.literal('CORSICA'),
      z.literal('FAMILY'),
      z.literal('FLEXIBLE'),
      z.literal('UM_OPTIONAL'),
      z.literal('UM_MANDATORY'),
      z.undefined(),
    ])
    .optional(),
  negotiatedFareOnly: z.union([z.boolean(), z.undefined()]).optional(),
  officeId: z.union([z.string(), z.undefined()]).optional(),
  commercialCabin: z.union([z.literal('ECONOMY'), z.literal('PREMIUM'), z.literal('BUSINESS'), z.literal('FIRST')]),
  dateInterval: z.union([DateInterval_BestFareOffer, z.undefined()]).optional(),
  requestedConnections: z.union([z.array(BasicConnectionRequest_BestFareOffer), z.undefined()]).optional(),
  filters: z.union([BestFareFilter_BestFareOffer, z.undefined()]).optional(),
  maximumNumberOfSegments: z.union([z.number(), z.undefined()]).optional(),
  marketingCarrierCodeList: z.union([z.array(z.string()), z.undefined()]).optional(),
});

// #endregion
