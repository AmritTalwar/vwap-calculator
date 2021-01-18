import { Instrument } from "../enums/Instrument.enum";
import { State } from "../enums/State.enum";

export interface TwoWayPrice {
  getInstrument: () => Instrument;
  getState: () => State;
  getBidPrice: () => number;
  getOfferAmount: () => number;
  getOfferPrice: () => number;
  getBidAmount: () => number;
}
