import { Instrument, State } from "../enums/enums";
import { TwoWayPrice } from "../interfaces/interfaces";

export class TwoWayPriceImplementation implements TwoWayPrice {
  private instrument: Instrument;
  private state: State;
  private bidPrice: number;
  private offerAmount: number;
  private offerPrice: number;
  private bidAmount: number;

  constructor(
    instrument: Instrument,
    state: State,
    bidPrice: number,
    bidAmount: number,
    offerPrice: number,
    offerAmount: number
  ) {
    this.instrument = instrument;
    this.state = state;
    this.bidPrice = bidPrice;
    this.offerAmount = offerAmount;
    this.offerPrice = offerPrice;
    this.bidAmount = bidAmount;
  }

  public getInstrument(): Instrument {
    return this.instrument;
  }

  public getState(): State {
    return this.state;
  }

  public getBidPrice(): number {
    return this.bidPrice;
  }

  public getOfferAmount(): number {
    return this.offerAmount;
  }

  public getOfferPrice(): number {
    return this.offerPrice;
  }

  public getBidAmount(): number {
    return this.bidAmount;
  }
}
