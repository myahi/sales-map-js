import { MarketModel } from '../../models/MarketModel';

export class DataBaseProviderMock {
private markets:Array<MarketModel>=[new MarketModel("Market 1", "super-market","Alger Centre","36.752863", "3.055910","0698393580"),
new MarketModel("Market 1", "super-market","Madania","36.740963", "3.067368","0698393580"),
new MarketModel("Market 3", "market","Autre","36.740963", "3.087368","0698393580")
];

constructor(){
}
getAllMarkets() :Promise<MarketModel[]>{
    return Promise.resolve(this.markets);
}

public getCurrentMarkets():Array<MarketModel>{
    return this.markets;
  }

public addMarket(market): any {
    return this.markets.push(market)
}

}