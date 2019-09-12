 /**
  * Ionic 4 Food Ordering PWA  & App Starter(https://store.enappd.com/product/ionic-4-food-ordering-pwa-app-starter)
  *
  * Copyright © 2019-present Enappd. All rights reserved.
  *
  * This source code is licensed as per the terms found in the
  * LICENSE.md file in the root directory of this source tree.
  */
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
