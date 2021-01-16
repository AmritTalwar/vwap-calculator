interface Calculator {
  applyMarketUpdate: (twoWayMarketPrice: MarketUpdate) => TwoWayPrice;
}

interface MarketUpdate {
  getMarket: () => Market;
  getTwoWayPrice: () => TwoWayPrice;
}

interface TwoWayPrice {
  getInstrument: () => Instrument;
  getState: () => State;
  getBidPrice: () => number;
  getOfferAmount: () => number;
  getOfferPrice: () => number;
  getBidAmount: () => number;
}
