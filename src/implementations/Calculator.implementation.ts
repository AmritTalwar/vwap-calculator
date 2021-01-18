import { TwoWayPriceImplementation } from "./TwoWayPrice.implementation";

import { Instrument, Market } from "../enums/enums";
import {
  VwapParts,
  Calculator,
  TwoWayPrice,
  MarketUpdate,
} from "../interfaces/interfaces";

export class CalculatorImplementation implements Calculator {
  // create a store for current vwap values of each instrument in each market to keep track of most recent vwaps
  private vwapStore: Array<Array<VwapParts>> = this.createVwapStore();

  public applyMarketUpdate(twoWayPrice: MarketUpdate): TwoWayPrice {
    // get the market update price, market and instrument
    const updatePrice: TwoWayPrice = twoWayPrice.getTwoWayPrice();
    const updateMarket: number = twoWayPrice.getMarket();
    const updateInstrument: number = updatePrice.getInstrument();

    // retrieve the most recent vwap values for the instrument in the market update
    const instrumentVwapParts: VwapParts = this.vwapStore[updateMarket][
      updateInstrument
    ];

    // Update bid and offer numerators and denominators as per vwap equation (cumulative weighted volume and volume)
    instrumentVwapParts.bidVwapNumerator +=
      updatePrice.getBidAmount() * updatePrice.getBidPrice();
    instrumentVwapParts.bidVwapDenominator += updatePrice.getBidAmount();

    instrumentVwapParts.offerVwapNumerator +=
      updatePrice.getOfferAmount() * updatePrice.getOfferPrice();
    instrumentVwapParts.offerVwapDenominator += updatePrice.getOfferAmount();

    // Save new updated vwap parts
    this.vwapStore[updateMarket][updateInstrument] = instrumentVwapParts;

    // Calculate new bid and offer vwaps
    // If the bid/ offer denominator is <= 0, set the vwap to 0
    const bidVwap: number =
      instrumentVwapParts.bidVwapDenominator > 0
        ? instrumentVwapParts.bidVwapNumerator /
          instrumentVwapParts.bidVwapDenominator
        : 0;

    const offerVwap: number =
      instrumentVwapParts.offerVwapDenominator > 0
        ? instrumentVwapParts.offerVwapNumerator /
          instrumentVwapParts.offerVwapDenominator
        : 0;

    // return vwap as a TwoWayPrice as per the instructions
    // Note: the state of the vwap price is the same as the state of the market update price as per the instructions
    return new TwoWayPriceImplementation(
      updateInstrument,
      updatePrice.getState(),
      bidVwap,
      instrumentVwapParts.bidVwapDenominator,
      offerVwap,
      instrumentVwapParts.offerVwapDenominator
    );
  }

  // Creates a 2D array to store all current vwaps for each instrument in each market
  private createVwapStore(): Array<Array<VwapParts>> {
    const vwapStore: Array<Array<VwapParts>> = [];

    const numberOfMarkets = Object.keys(Market).length / 2;
    const numberOfInstruments = Object.keys(Instrument).length / 2;

    // construct 2D array
    for (let market = 0; market < numberOfMarkets; market++) {
      vwapStore.push([]);
      for (let instrument = 0; instrument < numberOfInstruments; instrument++) {
        // store the individual parts of the vwap so we can incrementally update instrument vwap on each call of applyMarketUpdate
        const vwap: VwapParts = {
          bidVwapDenominator: 0,
          bidVwapNumerator: 0,
          offerVwapDenominator: 0,
          offerVwapNumerator: 0,
        };
        vwapStore[market][instrument] = vwap;
      }
    }
    return vwapStore;
  }
}
