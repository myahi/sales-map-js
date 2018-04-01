import { Component, ViewChild, ElementRef } from '@angular/core';

import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AddMarketPage } from '../market/add-market';
import { MarketModel } from '../../models/MarketModel';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketTabs } from '../market/market-tabs.component';

declare const google;

@IonicPage()
@Component({
  selector: 'page-example-4',
  templateUrl: 'salesMap.html',
})
export class SalesMap {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;
  
  infoWindow = new google.maps.InfoWindow();

  

  private marketsInMap:Array<MarketModel>=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataBaseProvider) {
  }


  ionViewDidLoad() {
    //this.startMap();
  }
  ionViewWillEnter(){
    this.startMap() ;
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
      zoom: 12,
      center: algerCenter,
      mapTypeId: 'roadmap',
      fullscreenControl:false,
      mapTypeControl:false,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    });
    google.maps.event.addListener(this.map, 'touchstart', (event) => {
      this.addMarket();
    });
    let markets = this.dataProvider.getCurrentMarkets();
    this.marketsInMap = markets;
    for (let i = 0; i < markets.length; i++) {
      //alert(markets[i].lat+" : "+markets[i].lng);
      this.addMarker(markets[i],this.map)
    }
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

  addMarker(market:MarketModel, map) {
    let marketIcon  = {
      url: market.marketCategory=="market" ? "../../assets/icon/market.png":"../../assets/icon/super-market.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    //alert(marketIcon.url);
    let marker = new google.maps.Marker({
      position: {lat: Number(market.lat), lng: Number(market.lng)},
      //label: this.labels[this.labelIndex++ % this.labels.length],
      icon:marketIcon,
      map: map,
      title: market.marketName,
      address: market.marketAddress
    });
    let infoWindow = this.infoWindow;
    marker.addListener('click', function() {
      infoWindow.close();
      var div = document.createElement('div');
      //div.innerHTML = marker.title;
      div.id="marketInfo";
      var content = '<div id="iw-container">' +
      '<div class="firstHeading">' + marker.title +'</div>' +
      '<div class="iw-content">' + marker.address +'</div></div>';
      div.innerHTML=content;
      infoWindow.setContent(div);
      //infoWindow.setTitle("test");
      //infoWindow.setContent(marker.title);
      infoWindow.open(map, marker);
      div.onclick = function(){alert("hello")};
    }); 
  }
}