
 /**
  * Ionic 4 Food Ordering PWA  & App Starter(https://store.enappd.com/product/ionic-4-food-ordering-pwa-app-starter)
  *
  * Copyright © 2019-present Enappd. All rights reserved.
  *
  * This source code is licensed as per the terms found in the
  * LICENSE.md file in the root directory of this source tree.
  */
// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
