import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AddMarketPage } from '../market/add-market';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketTabs } from '../market/market-tabs.component';
import { MarketModel } from '../../models/market-model';

declare const google;

@IonicPage()
@Component({
  selector: 'sales-map',
  templateUrl: 'salesMap.html',
})
export class SalesMap {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindow = new google.maps.InfoWindow();
  private marketsInMap:Array<MarketModel>=[];
  private items: Array<String>=[];
  
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataBaseProvider) {
  }


  ionViewDidLoad() {
    this.startMap();
  }
  ionViewWillEnter(){
    //alert("ionViewWillEnter");
    //this.startMap() ;
  }

  updateMarker(){
    let newMarkers=this.dataProvider.getCurrentMarkets().filter(
      function(e){return this.indexOf(e)<0;},this.marketsInMap);

    if (newMarkers.length>0){
      newMarkers.forEach(market => {
        this.addMarker(market,this.map)
      });
    }
  }
  startMap() {
    let algerCenter = { lat: 36.7525000, lng: 3.0419700 }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8,
      center: algerCenter,
      mapTypeId: 'roadmap',
      fullscreenControl:false,
      mapTypeControl:false,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    });
    var longpress = false;
    let start=0;
    let end=0;

    google.maps.event.addListener(this.map,'click', function (event) {
            if (longpress){
              this.addMarket();
            }  
        });
    google.maps.event.addListener(this.map, 'mousedown', function(event){
                start = new Date().getTime();           
            });

    google.maps.event.addListener(this.map, 'mouseup', function(event){
                let end = new Date().getTime();
                longpress = (end - start < 500) ? false : true;
            });
    let markets = this.dataProvider.getCurrentMarkets();
    for (let i = 0; i < markets.length; i++) {
      //alert(markets[i].lat+" : "+markets[i].lng);
      this.addMarker(markets[i],this.map)
    }
    this.marketsInMap = markets;
    //this.getCurrentLocation(this.map); 
    this.map.setCenter(algerCenter);
  }
  addMarket (){
    this.navCtrl.push(MarketTabs,{});
  }
  getCurrentLocation(map:any):Promise<Position>{
    let currentPosition;
    var infoWindow = new google.maps.InfoWindow({map: map});
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentPosition = pos;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            this.handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          this.handleLocationError(false, infoWindow, map.getCenter());
        }
        return Promise.resolve(currentPosition);
      }
      handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

    toggleSearch() {
        this.toggled = this.toggled ? false : true;
    }

    initializeItems() {
      this.items=[];
      this.marketsInMap.forEach(market => {
        this.items.push(market.toString());
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
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
        }
        else {
          this.items=[];
        }
  }
  addMarker(market:MarketModel, map) {
    this.marketIcon.url =market.marketCategory=="market" ? "../../assets/icon/market.png":"../../assets/icon/super-market.png";
    //alert(marketIcon.url);
    let marker = new google.maps.Marker({
      position: {lat: Number(market.lat), lng: Number(market.lng)},
      icon:this.marketIcon,
      map: map,
      title: market.marketName,
      address: market.marketAddress,
    });
    let infoWindow = this.infoWindow;
    let navCtrl = this.navCtrl;
    marker.addListener('click', function() {
      infoWindow.close();
      var div = document.createElement('div');
      div.id="marketInfo";
      var content = '<div id="iw-container">' +
      '<div class="firstHeading">' + marker.title +'</div>' +
      '<div class="iw-content">' + marker.address +'</div></div>';
      div.innerHTML=content;
      infoWindow.setContent(div);
      infoWindow.open(map, marker);
      div.onclick = function(){navCtrl.push(MarketTabs,{})};
    }); 
  }
}