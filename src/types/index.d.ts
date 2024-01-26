type LocationCode = string;

/** BUSINESS */
type CommercialCabin = string;

export type BestOfferItem = {
  /** code */
  origin: LocationCode;
  /** code */
  destination: LocationCode;
  commercialCabin: CommercialCabin;
  departureDate: string;
  duration: number;
  miles: number;
  taxes: number;
  numberOfSeatsAvailable: number;
  offers: string | undefined;
}

export type BestOfferSummary = {
  min: null | number;
  max: null | number;
}
