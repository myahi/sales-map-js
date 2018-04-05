import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TourModel } from '../../models/tour-model';
import { DataBaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-tours',
  templateUrl: 'tours-page.html',
})
export class ToursPage {

  @ViewChild('tourList') mapElement: ElementRef;

  private tours:Array<TourModel>=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataBaseProvider) {
    
  }

  ionViewDidLoad() {
    this.dataProvider.getTours().then(res=>{
      this.tours=res;
    });
  }
  ionViewWillEnter(){  
  }

}
