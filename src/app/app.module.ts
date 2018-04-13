import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataBaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MarketPage } from '../pages/market/market-page';
import { MarketTabs } from '../pages/market/market-tabs.component';
import { DataBaseProviderMock } from '../providers/database/data-base-mock';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { GeolocalisationProvider } from '../providers/database/geolocalisation';
import { Geolocation } from '@ionic-native/geolocation';
//import { SalesPage } from '../pages/sales/sales';
//import { SalesListPage } from '../pages/sales-list/sales-list';


@NgModule({
  declarations: [
    MyApp,
    MarketTabs,
    MarketPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MarketTabs,
    MarketPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   //SQLite,
    {provide:DataBaseProvider,useClass: DataBaseProviderMock},
   //{provide: SQLite, useClass: SQLiteMock},
    Toast,
    GeolocalisationProvider,
    Geolocation
  ]
})
export class AppModule {}
