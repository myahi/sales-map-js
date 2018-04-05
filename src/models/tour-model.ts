import { MarketModel } from "./market-model";
import { Status } from "./tour-status";

export class TourModel {
    tourId: number;
    tourLabel: string;
    tourDate:string;
    markets:Array<MarketModel>;
    status:Status;
    icon:String;
    color:String;
    constructor(tourId: number,tourLabel: string,tourDate,markets: Array<MarketModel>,status:Status){
       this.tourId = tourId;
       this.tourLabel= tourLabel;
       this.markets = markets;
       this.tourDate = tourDate;
       this.status = status;
       this.setProperties();
   }
   private setProperties(){
    switch(this.status) { 
        case Status.Closed:{
            this.icon= "ios-flash-outline";
            this.color="default";
            break;
        }
        case Status.Validate:{
            this.icon= "ios-checkmark-outline";
            this.color="secondary";
            break;
        }
        default: {
            this.icon= "ios-walk-outline";
            this.color="dark";
            break;
        }
   }
}
}