import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesMap } from './salesMap';

@NgModule({
  declarations: [
    SalesMap,
  ],
  imports: [
    IonicPageModule.forChild(SalesMap),
  ],
})
export class SalesMapPageModule {}
