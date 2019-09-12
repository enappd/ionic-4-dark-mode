 /**
  * Ionic 4 Food Ordering PWA  & App Starter(https://store.enappd.com/product/ionic-4-food-ordering-pwa-app-starter)
  *
  * Copyright © 2019-present Enappd. All rights reserved.
  *
  * This source code is licensed as per the terms found in the
  * LICENSE.md file in the root directory of this source tree.
  */
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
