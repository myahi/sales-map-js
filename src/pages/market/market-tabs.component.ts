import { Component, ViewChild, NgModule } from '@angular/core';
import { Platform, Tabs, NavParams, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddMarketPage } from './add-market';

@Component({
  selector: 'tabs-root',
  templateUrl: 'market-tabs.html'
})
export class MarketTabs {
  @ViewChild('myTabs') tabRef: Tabs;
  imports: [
    AddMarketPage
  ]
  tab1Root = AddMarketPage;
  pages: Array<{ title: string, component: any }>;
  marketId :any;
  constructor(public navCtrl: NavController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public navParams: NavParams) { 
    console.log("Passed params", navParams.data);
    this.marketId = {
      marketId: this.navParams.get('marketId')
    };
  }
}