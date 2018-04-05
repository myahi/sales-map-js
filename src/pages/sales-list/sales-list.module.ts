import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesListPage } from './sales-list';

@NgModule({
  declarations: [
    SalesListPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesListPage),
  ],
})
export class SalesListPageModule {}
