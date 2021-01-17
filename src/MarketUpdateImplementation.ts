import { Market } from "./enums";
import { MarketUpdate, TwoWayPrice } from "./interfaces";

export class MarketUpdateImplementation implements MarketUpdate {
  private market: Market;
  private twoWayPrice: TwoWayPrice;

  constructor(market: Market, twoWayPrice: TwoWayPrice) {
    this.market = market;
    this.twoWayPrice = twoWayPrice;
  }

  public getMarket(): Market {
    return this.market;
  }

  public getTwoWayPrice(): TwoWayPrice {
    return this.twoWayPrice;
  }
}
