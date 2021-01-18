import { MarketUpdate } from "./MarketUpdate.interface";
import { TwoWayPrice } from "./TwoWayPrice.interface";

export interface Calculator {
  applyMarketUpdate: (twoWayMarketPrice: MarketUpdate) => TwoWayPrice;
}
