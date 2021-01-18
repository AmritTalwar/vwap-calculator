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
