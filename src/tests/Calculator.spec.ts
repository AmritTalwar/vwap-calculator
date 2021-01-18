import { expect } from "chai";

import { Market } from "../enums/Market.enum";
import { Instrument } from "../enums/Instrument.enum";
import { State } from "../enums/State.enum";

import { MarketUpdate } from "../interfaces/MarketUpdate.interface";
import { Calculator } from "../interfaces/Calculator.interface";
import { TwoWayPrice } from "../interfaces/TwoWayPrice.interface";

import { MarketUpdateImplementation } from "../implementations/MarketUpdate.implementation";
import { TwoWayPriceImplementation } from "../implementations/TwoWayPrice.implementation";
import { CalculatorImplementation } from "../implementations/Calculator.implementation";

// test for applyMarketUpdate functionality
describe("applyMarketUpdate()", () => {
  const calculator: Calculator = new CalculatorImplementation();

  it("Correctly updates instrument vwap upon successive market updates", () => {
    let result: TwoWayPrice = calculator.applyMarketUpdate(
      createMarketUpdate(
        Market.MARKET0,
        Instrument.INSTRUMENT0,
        State.FIRM,
        10,
        100,
        0,
        0
      )
    );
    expect(result).to.deep.equal({
      instrument: 0,
      state: 0,
      bidPrice: 10,
      offerAmount: 0,
      offerPrice: 0,
      bidAmount: 100,
    });

    result = calculator.applyMarketUpdate(
      createMarketUpdate(
        Market.MARKET0,
        Instrument.INSTRUMENT0,
        State.INDICATIVE,
        20,
        200,
        0,
        0
      )
    );
    expect(result).to.deep.equal({
      instrument: 0,
      state: 1,
      bidPrice: 16.666666666666668,
      offerAmount: 0,
      offerPrice: 0,
      bidAmount: 300,
    });
  });
});

const createMarketUpdate = (
  market: Market,
  instrument: Instrument,
  state: State,
  bidPrice: number,
  bidAmount: number,
  offerPrice: number,
  offerAmount: number
): MarketUpdate => {
  return new MarketUpdateImplementation(
    market,
    new TwoWayPriceImplementation(
      instrument,
      state,
      bidPrice,
      bidAmount,
      offerPrice,
      offerAmount
    )
  );
};
