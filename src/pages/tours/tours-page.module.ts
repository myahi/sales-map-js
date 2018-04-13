import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToursPage } from './tours-page';


@NgModule({
  declarations: [
    ToursPage,
  ],
  imports: [
    IonicPageModule.forChild(ToursPage),
  ],
})
export class ToursPageModule {}
