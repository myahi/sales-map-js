import { Component, ViewChild, NgModule } from '@angular/core';
import { Platform, Tabs, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddMarketPage } from './add-market';

@Component({
  selector: 'tabs-root',
  templateUrl: 'market-tabs.html'
})
export class MarketTabs {
  //@ViewChild('myTabs') tabRef: Tabs;
  imports: [
    AddMarketPage
  ]
  tab1Root = AddMarketPage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public navParams: NavParams) { 
  }
}
