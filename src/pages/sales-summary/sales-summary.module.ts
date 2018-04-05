import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesSummaryPage } from './sales-summary';

@NgModule({
  declarations: [
    SalesSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesSummaryPage),
  ],
})
export class SalesSummaryPageModule {}
