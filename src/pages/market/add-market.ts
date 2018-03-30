import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { Toast } from '@ionic-native/toast';
import { MarketModel } from '../../models/MarketModel';
//import { SalesMap } from '../map/salesMap';


@Component({
  selector: 'page-add-market',
  templateUrl: 'add-market.html',
})

export class AddMarketPage {
  market = { marketName:"", marketCategory:"", marketAddress:"",marketPhone:"",lat:36.7725000, lng: 3.0419700};
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataBaseProvider: DataBaseProvider,private toast: Toast) {
  }

  addMarket(){
  alert(this.market.marketName);
  this.dataBaseProvider.addMarket(this.market).then(
      (res) => {
        this.toast.show('Data saved', '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      });
  } 
}