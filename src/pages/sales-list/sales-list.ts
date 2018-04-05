import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketTabs } from '../market/market-tabs.component';
import { MarketModel } from '../../models/market-model';
import { GeolocalisationProvider } from '../../providers/database/geolocalisation';
import { SalesPage } from '../sales/sales';
declare const google;

@IonicPage()
@Component({
  selector: 'page-sales-list',
  templateUrl: 'sales-list.html',
})
export class SalesListPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindow = new google.maps.InfoWindow();
  private marketsInMap:Array<MarketModel>=[];
  private items: Array<any>=[];
  private markers:Array<any>=[];
  private displayInMap=true;
  marketIcon  = {
    url: "",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  
  toggled: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataBaseProvider,public platform:Platform,public geolocalisationProvider:GeolocalisationProvider) {
    
  }

  ionViewDidLoad() {
    this.toggled=false;
    this.startMap();
  }
  ionViewWillEnter(){
    this.toggled=false;
    this.updateMarkers();
  }

  updateMarkers(){
    let newMakets:Array<MarketModel>=this.dataProvider.getCurrentMarkets();
    this.marketsInMap.forEach(market => {
      newMakets = newMakets.filter(item => !item.equals(market));  
    });
     if (newMakets.length > 0){
      newMakets.forEach(newMarket => {
         this.marketsInMap.push(newMarket);
       });
     }
  }

  startMap() {
    let markets = this.dataProvider.getCurrentMarkets();
    this.markers=[];
    this.marketsInMap = Object.assign([], markets);
  }
  
  
    toggleSearch() {
        this.toggled = this.toggled ? false : true;
    }

    initializeItems() {
      this.items=[];
      this.marketsInMap.forEach(market => {
        var item = {
          title:market.toString(),
          id:market.marketId
        }
        this.items.push(item);
      });
   } 
    
   triggerInput(ev: any) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        let val = ev.target.value;
        if (val.length>0){
          this.initializeItems();
          // if the value is an empty string don't filter the items
          if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
              return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
        }
        else {
          this.items=[];
        }
  }
  showMarket(id){
    this.navCtrl.push(MarketTabs,{marketId:id})
  }
}
