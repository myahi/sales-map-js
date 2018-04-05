import { MarketModel } from "../../models/market-model";
import { TourModel } from "../../models/tour-model";
import { Status } from "../../models/tour-status";


export class DataBaseProviderMock {
  private markets:Array<MarketModel>=[new MarketModel(0,"Market 1", "supermarket","Alger Centre","36.752863", "3.055910","0698393580"),
  new MarketModel(1,"Market 2", "supermarket","Madania","36.740963", "3.067368","0698393580"),
  new MarketModel(2,"Market 3", "shop","Kherouba","36.740963", "3.087368","0698393580"),
  new MarketModel(3,"Market 4", "shop","Staouali","36.741963", "3.087368","0696793580"),
  new MarketModel(4,"Market 5", "shop","Alger","36.741963", "3.082368","0596793510"),
  new MarketModel(5,"Market 6", "supermarket","Zeralda","36.741963", "3.132368","0596793510")
  ];

private tours:Array<TourModel>=[new TourModel(0,"First tour","12-04-2018",this.markets,Status.InProgress),
new TourModel(1,"Second tour","10-04-2018",this.markets,Status.Closed),
new TourModel(2,"Third tour","09-04-2018",this.markets,Status.Validate),
new TourModel(3,"Fourth tour","04-04-2018",this.markets,Status.Validate),
new TourModel(4,"Fifth tour","28-03-2018",this.markets,Status.Validate)];

constructor(){
}
getAllMarkets() :Promise<MarketModel[]>{
    return Promise.resolve(this.markets);
}

public getCurrentMarkets():Array<MarketModel>{
    return this.markets;
  }

  public addMarket(market:MarketModel): Promise<MarketModel> {
    market.marketId=this.markets.length;
    this.markets.push(market);
    return Promise.resolve(market);
    }
public getMarket(rowId):Promise<MarketModel>{
  return Promise.resolve(this.markets[rowId]);
}
public getTour(rowId): Promise<TourModel>{
  return Promise.resolve(this.tours[rowId]);
}
public getTours(): Promise<TourModel[]>{
  return Promise.resolve(this.tours);
}
}