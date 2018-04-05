import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html'
})
export class SalesPage {

  salesListPageRoot = 'SalesListPage'
  salesSummaryPageRoot = 'SalesSummaryPage'
  salesMapPageRoot = 'SalesMap'
  constructor(public navCtrl: NavController) {}
   
}
