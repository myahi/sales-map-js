import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { Toast } from '@ionic-native/toast';
import { MarketModel } from '../../models/market-model';
//import { SalesMap } from '../map/salesMap';


@Component({
  selector: 'page-add-market',
  templateUrl: 'add-market.html',
})

export class AddMarketPage {
  market = { marketName:"", marketCategory:"", marketAddress:"",marketPhone:"",lat:"", lng: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataBaseProvider: DataBaseProvider,private toast: Toast) {
    let marketId = this.navParams.get('marketId');
    if (marketId!=null){
      this.getMarket(marketId);
    }
  }

  addMarket(){
    
  let newMarket = new MarketModel(this.dataBaseProvider.getCurrentMarkets.length + 1,
    this.market.marketName,this.market.marketCategory,this.market.marketAddress,"32.740963","3.047368",this.market.marketPhone);
  this.dataBaseProvider.addMarket(newMarket).then(
      (res) => {
        this.navCtrl.popToRoot();
     //   this.toast.show('Data saved', '5000', 'center').subscribe(
      //     toast => {
      //       this.navCtrl.popToRoot();
      //     }
      //   );
       });
  }
  getMarket(rowid){
    this.dataBaseProvider.getMarket(rowid).then(
      res => {
          this.market.marketName = res.marketName;
          this.market.marketAddress = res.marketAddress;
          this.market.marketCategory = res.marketCategory;
          this.market.marketPhone = res.marketPhone;
          this.market.lat = res.lat;
          this.market.lng = res.lng;
          });
  }
}