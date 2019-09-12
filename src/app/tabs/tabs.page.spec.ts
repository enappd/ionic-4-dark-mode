 /**
  * Ionic 4 Food Ordering PWA  & App Starter(https://store.enappd.com/product/ionic-4-food-ordering-pwa-app-starter)
  *
  * Copyright © 2019-present Enappd. All rights reserved.
  *
  * This source code is licensed as per the terms found in the
  * LICENSE.md file in the root directory of this source tree.
  */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  let component: TabsPage;
  let fixture: ComponentFixture<TabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
