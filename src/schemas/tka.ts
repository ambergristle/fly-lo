import { z } from 'zod';

const CabinPreferences = z.object({
  Cabin: z.string().optional(),
});

const DepartureDateTime = z.object({
  WindowAfter: z.string().optional(),
  WindowBefore: z.string().optional(),
  Date: z.string().optional(),
});

export const OriginLocation = z.object({
  MultiAirportCityInd: z.boolean().optional(),
  LocationCode: z.string().optional(),
});

const OriginDestinationInformationInput = z.object({
  OriginLocation: OriginLocation.optional(),
  CabinPreferences: z.array(CabinPreferences).optional(),
  DepartureDateTime: DepartureDateTime.optional(),
  DestinationLocation: OriginLocation.optional(),
});

const PassengerTypeQuantityInput = z.object({
  Quantity: z.number().optional(),
  Code: z.string().optional(),
});

const PriceRequestInformation_Account = z.object({
  Code: z.string().optional(),
});

const PriceRequestInformation_DiscountPricing = z.object({
  Type: z.string().optional(),
});

const PriceRequestInformation_NegotiatedFareCode = z.object({
  CodeContext: z.string().optional(),
});

const PriceRequestInformation = z.object({
  Account: PriceRequestInformation_Account.optional(),
  NegotiatedFareCode: z.array(PriceRequestInformation_NegotiatedFareCode).optional(),
  DiscountPricing: PriceRequestInformation_DiscountPricing.optional(),
});

const RequestHeader_ExtraParameters = z.object({
  value: z.string().optional(),
  key: z.string().optional(),
});

export const GetAvailabilityRequest = z.object({
  requestHeader: z
    .object({
      clientUsername: z.string().optional(),
      clientTransactionId: z.string().optional(),
      channel: z.string().optional(),
      languageCode: z.string().optional(),
      airlineCode: z.string().optional(),
      extraParameters: z.array(RequestHeader_ExtraParameters).optional(),
    })
    .optional(),
  TargetSource: z.string().optional(),
  OriginDestinationInformation: z.array(OriginDestinationInformationInput).optional(),
  PassengerTypeQuantity: z.array(PassengerTypeQuantityInput).optional(),
  ReducedDataIndicator: z.boolean().optional(),
  PriceRequestInformation: PriceRequestInformation.optional(),
  RoutingType: z.string().optional(),
});
