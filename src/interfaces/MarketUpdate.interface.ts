import { Market } from "../enums/Market.enum";
import { TwoWayPrice } from "./TwoWayPrice.interface";

export interface MarketUpdate {
  getMarket: () => Market;
  getTwoWayPrice: () => TwoWayPrice;
}
