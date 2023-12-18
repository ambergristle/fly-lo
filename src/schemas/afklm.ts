import { z } from 'zod';

/**
 * @see https://developer.airfranceklm.com/products/api/offers/api-reference
 */

// #region lowest-fares-by-destination

const LowestFaresByDestinationRequest = z.object({
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

const State = z.object({
  code: z.string().optional(),
  type: z
    .union([
      z.literal('STOPOVER'),
      z.literal('CITY'),
      z.literal('COUNTRY'),
      z.literal('REGION'),
      z.literal('WORLD'),
      z.literal('STATE'),
    ])
    .optional(),
  name: z.string().optional(),
});

const City = z.object({
  code: z.string().optional(),
  type: z
    .union([
      z.literal('STOPOVER'),
      z.literal('CITY'),
      z.literal('COUNTRY'),
      z.literal('REGION'),
      z.literal('WORLD'),
      z.literal('STATE'),
    ])
    .optional(),
  name: z.string().optional(),
  state: State.optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  zoneID: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
});

const DateInterval = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

const Disclaimer = z.object({
  displayPriceText: z.string().optional(),
  totalPriceText: z.string().optional(),
  fareMilesText: z.string().optional(),
  handBaggageText: z.string().optional(),
  flexibilityText: z.string().optional(),
  optionalUMText: z.string().optional(),
  infantAttributesSpecificitiesText: z.string().optional(),
});

const Money = z.object({
  value: z.number().optional(),
  currencyPrecision: z.number().optional(),
});

const Surcharge = z.object({
  code: z.string().optional(),
  amount: z.number().optional(),
});

const PriceInformation = z.object({
  displayPrice: z.number(),
  totalPrice: z.number(),
  surcharges: z.union([z.array(Surcharge), z.undefined()]).optional(),
  fare: Money,
  taxes: Money,
  currency: z.string(),
  displayType: z.union([z.literal('FARE'), z.literal('FEE'), z.literal('TAX'), z.literal('FARE_MILES')]),
});

const LowestFare = z.object({
  dateInterval: z.union([DateInterval, z.undefined()]).optional(),
  departureDate: z.union([z.string(), z.undefined()]).optional(),
  returnDate: z.union([z.string(), z.undefined()]).optional(),
  duration: z.union([z.number(), z.undefined()]).optional(),
  price: PriceInformation,
});

const LowestFaresByDestination = z.object({
  name: z.union([z.string(), z.undefined()]).optional(),
  code: City,
  flightProducts: z.array(LowestFare),
});

const LowestFaresByDestinationResponse = z.object({
  origin: z.string(),
  destinationCities: z.array(LowestFaresByDestination),
  disclaimer: z.union([Disclaimer, z.undefined()]).optional(),
});

export const post_GetLowestFaresByDestination = {
  method: z.literal('POST'),
  path: z.literal('/{version}/lowest-fares-by-destination'),
  parameters: z.object({
    path: z.object({
      version: z.string(),
    }),
    body: LowestFaresByDestinationRequest,
  }),
  response: LowestFaresByDestinationResponse,
};

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

const BestFareOffersRequest_BestFareOffer = z.object({
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

const Location_BestFareOffer = z.object({
  code: z.string().optional(),
  type: z
    .union([
      z.literal('AIRPORT'),
      z.literal('BUS_STATION'),
      z.literal('HELIPORT'),
      z.literal('RAILWAY_STATION'),
      z.literal('FERRY_STATION'),
      z.literal('OFFLINE_POINT'),
      z.literal('PORT'),
      z.literal('SEA_PLANE_BASE'),
      z.literal('MILITARY_BASE'),
      z.literal('LIMOUSINE'),
      z.literal('COLUMBUS_METROPOLITAN_AIRPORT'),
    ])
    .optional(),
});

const Surcharge_BestFareOffer = z.object({
  code: z.string().optional(),
  amount: z.number().optional(),
});

const PricePerPassenger_BestFareOffer = z.object({
  id: z.number().optional(),
  passengerType: z
    .union([
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
    ])
    .optional(),
  fare: z.number().optional(),
  taxes: z.number().optional(),
  surcharges: z.array(Surcharge_BestFareOffer).optional(),
  price: z.number().optional(),
  penalty: z.number().optional(),
});

const PricePerPassengerType_BestFareOffer = z.object({
  passengerType: z
    .union([
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
    ])
    .optional(),
  fare: z.number().optional(),
  taxes: z.number().optional(),
  products: z.number().optional(),
  surcharges: z.array(Surcharge_BestFareOffer).optional(),
  price: z.number().optional(),
  penalty: z.number().optional(),
  primaryPax: z.boolean().optional(),
});

const Price_BestFareOffer = z.object({
  displayPrice: z.number().optional(),
  adjustedDisplayPrice: z.number().optional(),
  totalPrice: z.number().optional(),
  adjustedTotalPrice: z.number().optional(),
  surcharges: z.array(Surcharge_BestFareOffer).optional(),
  pricePerPassengerTypes: z.array(PricePerPassengerType_BestFareOffer).optional(),
  pricePerPassengers: z.array(PricePerPassenger_BestFareOffer).optional(),
  dynamicWaiver: z.boolean().optional(),
  currency: z.string().optional(),
  displayType: z.union([z.literal('FARE'), z.literal('FEE'), z.literal('TAX'), z.literal('FARE_MILES')]).optional(),
});

const BestFareOffersConnection_BestFareOffer = z.object({
  origin: Location_BestFareOffer.optional(),
  destination: Location_BestFareOffer.optional(),
  commercialCabin: z
    .union([z.literal('ECONOMY'), z.literal('PREMIUM'), z.literal('BUSINESS'), z.literal('FIRST')])
    .optional(),
  promoFare: z.boolean().optional(),
});

const BestFareOffer_BestFareOffer = z.object({
  connections: z.array(BestFareOffersConnection_BestFareOffer).optional(),
  price: Price_BestFareOffer.optional(),
  priceInMiles: Price_BestFareOffer.optional(),
  taxDetails: Price_BestFareOffer.optional(),
  links: z.array(Link_BestFareOffer).optional(),
});


const BestFareOffersResponse_BestFareOffer = z.object({
  bestOffers: z.array(BestFareOffer_BestFareOffer).optional(),
});


export const post_GetBestFareOffers = {
  method: z.literal('POST'),
  path: z.literal('/{version}/best-fare-offers'),
  parameters: z.object({
    path: z.object({
      version: z.string(),
    }),
    body: BestFareOffersRequest_BestFareOffer,
  }),
  response: BestFareOffersResponse_BestFareOffer,
};

// #endregion
