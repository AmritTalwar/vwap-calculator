import { Market, Instrument, State } from "./enums";

export interface Calculator {
  applyMarketUpdate: (twoWayMarketPrice: MarketUpdate) => TwoWayPrice;
}

export interface MarketUpdate {
  getMarket: () => Market;
  getTwoWayPrice: () => TwoWayPrice;
}

export interface TwoWayPrice {
  getInstrument: () => Instrument;
  getState: () => State;
  getBidPrice: () => number;
  getOfferAmount: () => number;
  getOfferPrice: () => number;
  getBidAmount: () => number;
}

/**
 * Since we incrementally update Vwap per market update, we need a structure to store Vwap numerators and denominators so we
 * can just add to the Vwap numerators and denominators per market update to get our updated Vwap
 */
export interface VwapParts {
  bidVwapNumerator: number;
  bidVwapDenominator: number;
  offerVwapNumerator: number;
  offerVwapDenominator: number;
}
