import z from 'zod';

/**
 * @see https://developer.turkishairlines.com/documentation/get-availability
 */

const requestHeader_extraParameters = z.object({
  value: z.string().optional(),
  key: z.string().optional(),
});

const OriginLocation = z.object({
  MultiAirportCityInd: z.boolean().optional(),
  LocationCode: z.string().optional(),
});

const CabinPreferences = z.object({
  Cabin: z.string().optional(),
});

const DepartureDateTime = z.object({
  WindowAfter: z.string().optional(),
  WindowBefore: z.string().optional(),
  Date: z.string().optional(),
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

const PriceRequestInformation_NegotiatedFareCode = z.object({
  CodeContext: z.string().optional(),
});

const PriceRequestInformation_DiscountPricing = z.object({
  Type: z.string().optional(),
});

const PriceRequestInformation = z.object({
  Account: PriceRequestInformation_Account.optional(),
  NegotiatedFareCode: z.array(PriceRequestInformation_NegotiatedFareCode).optional(),
  DiscountPricing: PriceRequestInformation_DiscountPricing.optional(),
});

const getAvailabilityRequest = z.object({
  requestHeader: z
    .object({
      clientUsername: z.string().optional(),
      clientTransactionId: z.string().optional(),
      channel: z.string().optional(),
      languageCode: z.string().optional(),
      airlineCode: z.string().optional(),
      extraParameters: z.array(requestHeader_extraParameters).optional(),
    })
    .optional(),
  TargetSource: z.string().optional(),
  OriginDestinationInformation: z.array(OriginDestinationInformationInput).optional(),
  PassengerTypeQuantity: z.array(PassengerTypeQuantityInput).optional(),
  ReducedDataIndicator: z.boolean().optional(),
  PriceRequestInformation: PriceRequestInformation.optional(),
  RoutingType: z.string().optional(),
});

const Warning = z.object({
  Type: z.string().optional(),
  RPH: z.string().optional(),
  Code: z.string().optional(),
});

const Warnings = z.object({
  Warning: z.array(Warning).optional(),
});

const FareAmount = z.object({
  CurrencyCode: z.string().optional(),
  Amount: z.number().optional(),
});

const fareBrandOtaResponseItems = z.object({
  BrandName: z.string().optional(),
  BonusMile: z.boolean().optional(),
  BrandCode: z.string().optional(),
  CarrierCode: z.string().optional(),
  SeatSelection: z.boolean().optional(),
  BonusMileAmount: z.number().optional(),
  BrandKey: z.string().optional(),
  BrandIndex: z.number().optional(),
});

const extraOTABrandInfoList = z.object({
  fareBrandOtaResponseItems: z.array(fareBrandOtaResponseItems).optional(),
});

const extraOTASegmentInfoList = z.object({
  isAvailable: z.boolean().optional(),
  isConnected: z.boolean().optional(),
  segmentIndex: z.number().optional(),
  isAnadoluJetSegment: z.boolean().optional(),
  isDomestic: z.boolean().optional(),
  isStandBySeat: z.boolean().optional(),
});

const extraOTASegmentInfoListType = z.object({
  extraOTASegmentInfoList: z.array(extraOTASegmentInfoList).optional(),
});

const CarryOnBaggageAllowance_FreeBaggageAllowance = z.object({
  pieces: z.number().optional(),
  kilos: z.number().optional(),
});

const CarryOnBaggageAllowance = z.object({
  FreeBaggageAllowance: CarryOnBaggageAllowance_FreeBaggageAllowance.optional(),
});

const PercentageOrFixedAmount_FixedAmount = z.object({
  CurrencyCode: z.string().optional(),
  Amount: z.number().optional(),
});

const PercentageOrFixedAmount = z.object({
  FixedAmount: PercentageOrFixedAmount_FixedAmount.optional(),
});

const TimeToDeparture = z.object({
  TimePeriodCondition: z.string().optional(),
  TimeUnit: z.string().optional(),
  TimeAmount: z.number().optional(),
});

const ChangePenalty = z.object({
  PercentageOrFixedAmount: PercentageOrFixedAmount.optional(),
  TimeToDeparture: TimeToDeparture.optional(),
  IsChangeable: z.boolean().optional(),
});

const ChangePenaltyList = z.object({
  ChangePenalty: z.array(ChangePenalty).optional(),
});

const CancellationPenaltyList_CancellationPenalty = z.object({
  IsRefundable: z.boolean().optional(),
  TimeToDeparture: TimeToDeparture.optional(),
});

const CancellationPenaltyList = z.object({
  CancellationPenalty: z.array(CancellationPenaltyList_CancellationPenalty).optional(),
});

const PenaltyMiniRule = z.object({
  ChangePenaltyList: ChangePenaltyList.optional(),
  CancellationPenaltyList: CancellationPenaltyList.optional(),
});

const MiniRules = z.object({
  PassengerType: z.string().optional(),
  MealCommercialName: z.string().optional(),
  CarryOnBaggageAllowance: CarryOnBaggageAllowance.optional(),
  BrandCode: z.string().optional(),
  PenaltyMiniRule: PenaltyMiniRule.optional(),
  BusinessLounge: z.string().optional(),
  RPH: z.string().optional(),
  MealSubCode: z.string().optional(),
  BrandKey: z.string().optional(),
  CheckedBaggageAllowance: CarryOnBaggageAllowance.optional(),
});

const miniRulesList = z.object({
  MiniRules: z.array(MiniRules).optional(),
});

const FareBasisCodes_FareBasisCode = z.object({
  FlightSegmentRPH: z.string().optional(),
  content: z.string().optional(),
});

const FareBasisCodes = z.object({
  FareBasisCode: FareBasisCodes_FareBasisCode.optional(),
});

const PassengerTypeQuantity = z.object({
  CodeContext: z.string().optional(),
  Quantity: z.number().optional(),
  Code: z.string().optional(),
});

const FareInfo_FareInfo = z.object({
  FareType: z.string().optional(),
  RPH: z.string().optional(),
});

const FareInfo_FareReference = z.object({
  ResBookDesigCode: z.string().optional(),
  content: z.string().optional(),
});

const FareInfo = z.object({
  FareInfo: FareInfo_FareInfo.optional(),
  PassengerFare: z.string().optional(),
  FareReference: z.array(FareInfo_FareReference).optional(),
});

const PassengerFare_Taxes_Tax = z.object({
  CurrencyCode: z.string().optional(),
  TaxCode: z.string().optional(),
  Amount: z.number().optional(),
  RefundableInd: z.boolean().optional(),
});

const PassengerFare_Taxes = z.object({
  Tax: z.array(PassengerFare_Taxes_Tax).optional(),
});

const PassengerFare_FareBaggageAllowance = z.object({
  UnitOfMeasureCode: z.string().optional(),
  UnitOfMeasure: z.string().optional(),
  UnitOfMeasureQuantity: z.number().optional(),
  FlightSegmentRPH: z.string().optional(),
});

const PassengerFare = z.object({
  TotalFare: FareAmount.optional(),
  Taxes: PassengerFare_Taxes.optional(),
  BaseFare: FareAmount.optional(),
  FareBaggageAllowance: z.array(PassengerFare_FareBaggageAllowance).optional(),
  TourCode: z.string().optional(),
});

const PTC_FareBreakdown = z.object({
  FareBasisCodes: FareBasisCodes.optional(),
  PassengerTypeQuantity: PassengerTypeQuantity.optional(),
  FareInfo: FareInfo.optional(),
  PassengerFare: PassengerFare.optional(),
});

const PTC_FareBreakdowns = z.object({
  PTC_FareBreakdown: z.array(PTC_FareBreakdown).optional(),
});

const bookingPriceInfoType = z.object({
  PTC_FareBreakdowns: PTC_FareBreakdowns.optional(),
});

const extraOTAFlightInfoList = z.object({
  isPureAnadoluJetFlight: z.boolean().optional(),
  extraOTASegmentInfoListType: extraOTASegmentInfoListType.optional(),
  isElectronicTicketAvailable: z.boolean().optional(),
  isMarketable: z.boolean().optional(),
  isCodeShare: z.boolean().optional(),
  isFullCodeShare: z.boolean().optional(),
  miniRulesList: miniRulesList.optional(),
  isDomestic: z.boolean().optional(),
  isFullInternational: z.boolean().optional(),
  flightNumber: z.string().optional(),
  StandbyIndicator: z.boolean().optional(),
  bookingPriceInfoType: bookingPriceInfoType.optional(),
  isFullAvailable: z.boolean().optional(),
});

const extraOTAFlightInfoListType = z.object({
  extraOTAFlightInfoList: z.array(extraOTAFlightInfoList).optional(),
});

const extraOTAAvailabilityInfoList = z.object({
  extraOTAFlightInfoListType: extraOTAFlightInfoListType.optional(),
  isAllFlightsFullCodeShare: z.boolean().optional(),
  isIndeedHasMoreFlightsForAnotherPortInTheSameCity: z.boolean().optional(),
  RPH: z.string().optional(),
});

const extraOTAAvailabilityInfoListType = z.object({
  extraOTAAvailabilityInfoList: z.array(extraOTAAvailabilityInfoList).optional(),
});

const Location = z.object({
  AlternateLocationInd: z.boolean().optional(),
  LocationCode: z.string().optional(),
});

const Airport = z.object({
  LocationCode: z.string().optional(),
});

const BookingClassAvail = z.object({
  ResBookDesigQuantity: z.string().optional(),
  ResBookDesigStatusCode: z.string().optional(),
  ResBookDesigCode: z.string().optional(),
  RPH: z.string().optional(),
});

const Equipment = z.object({
  Value: z.string().optional(),
  AirEquipType: z.string().optional(),
});

const OperatingAirline = z.object({
  CompanyShortName: z.string().optional(),
});

const FlightSegment = z.object({
  DepartureAirport: Airport.optional(),
  Ticket: z.string().optional(),
  ArrivalAirport: Airport.optional(),
  BookingClassAvail: z.array(BookingClassAvail).optional(),
  DateChangeNbr: z.boolean().optional(),
  StopQuantity: z.number().optional(),
  GroundDuration: z.string().optional(),
  CodeshareInd: z.boolean().optional(),
  Equipment: Equipment.optional(),
  DepartureDateTime: z.string().optional(),
  ArrivalDateTime: z.string().optional(),
  FlightNumber: z.string().optional(),
  OperatingAirline: OperatingAirline.optional(),
  JourneyDuration: z.string().optional(),
});

const OriginDestinationOption = z.object({
  FlightSegment: z.array(FlightSegment).optional(),
});

const OriginDestinationOptions = z.object({
  OriginDestinationOption: z.array(OriginDestinationOption).optional(),
});

const OriginDestinationInformation = z.object({
  OriginLocation: Location.optional(),
  OriginDestinationOptions: OriginDestinationOptions.optional(),
  DepartureDateTime: z.string().optional(),
  ArrivalDateTime: z.string().optional(),
  RPH: z.string().optional(),
  DestinationLocation: Location.optional(),
});

const OTA_AirAvailRS = z.object({
  Comment: z.string().optional(),
  OriginDestinationInformation: OriginDestinationInformation.optional(),
  Version: z.string().optional(),
  Warnings: Warnings.optional(),
});

const createOTAAirRoute = z.object({
  extraOTAAvailabilityInfoListType: extraOTAAvailabilityInfoListType.optional(),
  OTA_AirAvailRS: OTA_AirAvailRS.optional(),
});

const availabilityOTAResponse = z.object({
  extraOTABrandInfoList: extraOTABrandInfoList.optional(),
  createOTAAirRoute: z.array(createOTAAirRoute).optional(),
  isMixCabin: z.boolean().optional(),
});

const duServiceOTAResponse = z.object({
  duBusiness: z.number().optional(),
  duCurrency: z.string().optional(),
  duEconomy: z.number().optional(),
});

const SUBERROR_ITEMS = z.object({
  NUMBER: z.number().optional(),
  TYPE: z.number().optional(),
});

const SUBERROR_LIST = z.object({
  SUBERROR_ITEMS: z.array(SUBERROR_ITEMS).optional(),
});

const LIST_MSG = z.object({
  NUMBER: z.number().optional(),
  SUBERROR_LIST: SUBERROR_LIST.optional(),
  TEXT: z.string().optional(),
  TYPE: z.string().optional(),
  SUBERROR: SUBERROR_ITEMS.optional(),
});

const LIST_VALUE_TYPE = z.object({
  CODE: z.string().optional(),
});

const LIST_VALUE = z.object({
  VALUE: z.string().optional(),
  TYPE: LIST_VALUE_TYPE.optional(),
});

const LIST_FEE = z.object({
  LIST_VALUE: LIST_VALUE.optional(),
  TYPE: LIST_VALUE_TYPE.optional(),
});

const LIST_APPLICABLE_MARKUP_DISCOUNT = z.object({
  HIDE_FEE: z.boolean().optional(),
  LIST_VALUE: LIST_VALUE.optional(),
  TYPE: LIST_VALUE_TYPE.optional(),
});

const CODENAME = z.object({
  CODE: z.string().optional(),
  NAME: z.string().optional(),
});

const LIST_BOUND_PRICE = z.object({
  CURRENCY: CODENAME.optional(),
  AMOUNT: z.number().optional(),
  EXCHANGE_RATE: z.number().optional(),
  AMOUNT_WITHOUT_TAX: z.number().optional(),
  TAX: z.number().optional(),
  LIST_FEE: z.array(LIST_FEE).optional(),
  TOTAL_AMOUNT: z.number().optional(),
});

const AVAIL_DATE = z.object({
  code: z.string().optional(),
  content: z.string().optional(),
});

const LIST_AVAILABILITY_RANGE = z.object({
  LOCATION: z.string().optional(),
  MAX_AVAIL_DATE: AVAIL_DATE.optional(),
  MIN_AVAIL_DATE: AVAIL_DATE.optional(),
});

const LIST_DATE = z.object({
  DATE: AVAIL_DATE.optional(),
});

const LIST_PROPOSED_BOUND_LOCATION = z.object({
  CITY_CODE: z.string().optional(),
  LOCATION_CODE: z.string().optional(),
  CITY_NAME: z.string().optional(),
  COUNTRY_NAME: z.string().optional(),
  LOCATION_NAME: z.string().optional(),
  COUNTRY_CODE: z.string().optional(),
});

const LIST_PROPOSED_BOUND_LIST_SEGMENT = z.object({
  AIRLINE: CODENAME.optional(),
  SEGMENT_ID: z.string().optional(),
  B_DATE: AVAIL_DATE.optional(),
  E_DATE: AVAIL_DATE.optional(),
  EQUIPMENT: CODENAME.optional(),
  E_TICKETING: z.boolean().optional(),
  SEGMENT_FLIGHT_TIME: z.string().optional(),
  NUMBER_OF_STOPS: z.string().optional(),
  E_LOCATION: LIST_PROPOSED_BOUND_LOCATION.optional(),
  B_LOCATION: LIST_PROPOSED_BOUND_LOCATION.optional(),
  FLIGHT_NUMBER: z.string().optional(),
});

const LIST_PROPOSED_BOUND_LIST_FLIGHT = z.object({
  LIST_SEGMENT: z.array(LIST_PROPOSED_BOUND_LIST_SEGMENT).optional(),
  FLIGHT_ID: z.string().optional(),
});

const LIST_PROPOSED_BOUND = z.object({
  LIST_FLIGHT: z.array(LIST_PROPOSED_BOUND_LIST_FLIGHT).optional(),
});

const FARE_FAMILY = z.object({
  HIGHLIGHTING_COLOR: z.string().optional(),
  BRAND_NAME: z.string().optional(),
  COLOR: z.string().optional(),
  SHORT_NAME: z.string().optional(),
  COLOR_NAME: z.string().optional(),
  HIERARCHY: z.number().optional(),
});

const LIST_BOUND_LSA_DEBUG_INFO = z.object({
  RBD: z.string().optional(),
  FIRST_FLIGHT_NUMBER: z.string().optional(),
});

const LIST_BOUND_LIST_FLIGHT = z.object({
  DISPLAY_LAST_SEATS: z.string().optional(),
  FLIGHT_ID: z.number().optional(),
  NUMBER_OF_LAST_SEATS: z.number().optional(),
  LSA_DEBUG_INFO: LIST_BOUND_LSA_DEBUG_INFO.optional(),
});

const LIST_BOUND = z.object({
  LIST_FLIGHT: z.array(LIST_BOUND_LIST_FLIGHT).optional(),
});

const LIST_TRIP_PRICE_LIST_DISPLAY_TAX = z.object({
  CODE: z.string().optional(),
  VALUE: z.number().optional(),
});

const LIST_TRIP_PRICE = z.object({
  CURRENCY: CODENAME.optional(),
  AMOUNT: z.number().optional(),
  EXCHANGE_RATE: z.number().optional(),
  LIST_DISPLAY_TAX: z.array(LIST_TRIP_PRICE_LIST_DISPLAY_TAX).optional(),
  LIST_FEE: z.array(LIST_FEE).optional(),
  LIST_BOUND_PRICE: z.array(LIST_BOUND_PRICE).optional(),
  AMOUNT_WITHOUT_TAX: z.number().optional(),
  TAX: z.number().optional(),
  TOTAL_AMOUNT: z.number().optional(),
});

const LIST_PTC_APPLIED = z.object({
  CODE: z.string().optional(),
});

const LIST_PNR_LIST_BOUND_LIST_SEGMENT = z.object({
  SEGMENT_ID: z.number().optional(),
  FARE_FAMILY: FARE_FAMILY.optional(),
  LIST_PTC_APPLIED: z.array(LIST_PTC_APPLIED).optional(),
  FARE_CLASS: z.string().optional(),
  RBD: z.string().optional(),
  CABIN: z.string().optional(),
  LIST_FARE_TYPES: z.array(CODENAME).optional(),
});

const LIST_PNR_LIST_BOUND = z.object({
  LIST_SEGMENT: z.array(LIST_PNR_LIST_BOUND_LIST_SEGMENT).optional(),
});

const LIST_PNR_LIST_TRAVELLER = z.object({
  IS_PRIMARY_TRAVELLER: z.boolean().optional(),
  HAS_INFANT: z.boolean().optional(),
  REQUESTED_TRAVELLER_TYPE: CODENAME.optional(),
});

const LIST_PNR_LIST_TRAVELLER_TYPE = z.object({
  NUMBER: z.number().optional(),
  LIST_TRAVELLER_TYPE_PRICE: z.array(LIST_TRIP_PRICE).optional(),
  TRAVELLER_TYPE: CODENAME.optional(),
  LIST_BOUND: z.array(LIST_PNR_LIST_BOUND).optional(),
  LIST_TRAVELLER_PRICE: z.array(LIST_TRIP_PRICE).optional(),
  LIST_TRAVELLER: z.array(LIST_PNR_LIST_TRAVELLER).optional(),
});

const LIST_PNR = z.object({
  LIST_TRAVELLER_TYPE: z.array(LIST_PNR_LIST_TRAVELLER_TYPE).optional(),
  LIST_PNR_PRICE: z.array(LIST_TRIP_PRICE).optional(),
  LIST_APPLICABLE_MARKUP_DISCOUNT: z.array(LIST_APPLICABLE_MARKUP_DISCOUNT).optional(),
});

const LIST_RECOMMENDATION = z.object({
  FARE_FAMILY: FARE_FAMILY.optional(),
  RECOMMENDATION_ID: z.number().optional(),
  LIST_BOUND: z.array(LIST_BOUND).optional(),
  LIST_TRIP_PRICE: z.array(LIST_TRIP_PRICE).optional(),
  LIST_PNR: z.array(LIST_PNR).optional(),
});

const LIST_TAB = z.object({
  LIST_DATE: z.array(LIST_DATE).optional(),
  LIST_PROPOSED_BOUND: z.array(LIST_PROPOSED_BOUND).optional(),
  LIST_RECOMMENDATION: z.array(LIST_RECOMMENDATION).optional(),
});

const SEARCH_LIST_COMMERCIAL_FARE_FAMILY = z.object({
  CODE: z.string().optional(),
  SET_INDEX: z.string().optional(),
  PANEL_TYPE: z.string().optional(),
  NAME: z.string().optional(),
});

const SEARCH_LIST_DESTINATION = z.object({
  B_TIME_WINDOW: z.string().optional(),
  B_DATE: AVAIL_DATE.optional(),
  E_LOCATION: LIST_PROPOSED_BOUND_LOCATION.optional(),
  B_LOCATION: LIST_PROPOSED_BOUND_LOCATION.optional(),
});

const SEARCH_DATA = z.object({
  LIST_COMMERCIAL_FARE_FAMILY: z.array(SEARCH_LIST_COMMERCIAL_FARE_FAMILY).optional(),
  TRIP_TYPE: z.string().optional(),
  LIST_DESTINATION: SEARCH_LIST_DESTINATION.optional(),
  PRICING_TYPE: z.string().optional(),
  DISPLAY_TYPE: z.string().optional(),
});

const LIST_PANEL = z.object({
  LIST_TAB: z.array(LIST_TAB).optional(),
  LIST_PROPOSED_BOUND: z.array(LIST_PROPOSED_BOUND).optional(),
  SEARCH_DATA: SEARCH_DATA.optional(),
  IS_LOADED_FROM_CACHE: z.boolean().optional(),
  TYPE: z.string().optional(),
});

const FLOW_SIGNATURE = z.object({
  INITIAL_PRODUCT: z.string().optional(),
  TRANSACTION: z.string().optional(),
  BOOKING_TYPE: z.string().optional(),
});

const FARE_FAMILY_DICTIONARY_LIST_FARE_FAMILY = z.object({
  COMMERCIAL_FARE_FAMILY: z.string().optional(),
  FARE_FAMILY: z.string().optional(),
});

const FARE_FAMILY_DICTIONARY = z.object({
  LIST_FARE_FAMILY: z.array(FARE_FAMILY_DICTIONARY_LIST_FARE_FAMILY).optional(),
});

const flexPricerAvailabilityOutput = z.object({
  LIST_AVAILABILITY_RANGE: LIST_AVAILABILITY_RANGE.optional(),
  jSessionId: z.string().optional(),
  LIST_PANEL: z.array(LIST_PANEL).optional(),
  PAGE_TICKET: z.string().optional(),
  TEMPLATE: z.string().optional(),
  FLOW_SIGNATURE: FLOW_SIGNATURE.optional(),
  FARE_FAMILY_DICTIONARY: FARE_FAMILY_DICTIONARY.optional(),
  LIST_MSG: z.array(LIST_MSG).optional(),
});

const availabilityFlexPricerResponse = z.object({
  flexPricerAvailabilityOutput: flexPricerAvailabilityOutput.optional(),
  duServiceOTAResponse: duServiceOTAResponse.optional(),
});

const data = z.object({
  availabilityOTAResponse: availabilityOTAResponse.optional(),
  availabilityFlexPricerResponse: availabilityFlexPricerResponse.optional(),
});

const MessageInformation = z.object({
  Code: z.string(),
  Description: z.string(),
});

const body = z.object({
  data: data.optional(),
  requestId: z.string().optional(),
  message: MessageInformation.optional(),
  status: z.string().optional(),
});

// const ErrorResponseDetail = z.object({
//   Status: z.number().optional(),
//   Message: z.string().optional(),
// });

export const post_TestgetAvailability = {
  method: z.literal('POST'),
  path: z.literal('/test/getAvailability'),
  parameters: z.object({
    header: z.object({
      apikey: z.string(),
      apisecret: z.string(),
    }),
    body: getAvailabilityRequest,
  }),
  response: body,
};
