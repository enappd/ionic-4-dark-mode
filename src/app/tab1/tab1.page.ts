import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DeliveryService } from '../delivery.service';
import { Router } from '@angular/router';
declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lat: number;
  lng: number;
  map: any;
  block: any;
  street: any;
  building: any;
  flag: boolean;
  pickup: string;
  COMPLETE_ADDRESS: any;
  IMAGE_HEADER = '../../assets/offer.png';
  cardDetails: { text1: string; text2: string; image: string; }[];
  // tslint:disable-next-line: max-line-length
  itemDetails: ({ thumbnail: string; title: string; subTitle: string; imgSmall: string; text: string; rate: string; time: string; cost: string; slidesVertical?: any; slidesVerticalAvater?: any; })[];
  itemDetailsPWa: { thumbnail: string; title: string; subTitle: string; imgSmall: string; text: string; rate: string; time: string; cost: string; for: string; }[];
  constructor(
    public geolocation: Geolocation,
    public serviceProvider: DeliveryService,
    public _ZONE: NgZone,
    public route: Router
  ) {
    this.cardDetails = this.serviceProvider.slidesVertical;
    this.itemDetails = this.serviceProvider.slidesHorizontal;
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      console.log('🎉 Dark mode is supported');
      console.log(window.matchMedia('(prefers-color-scheme)'));
    }
  }

  ionViewWillenter() {
    // this.serviceProvider.getCurrentLoaction();
    console.log('view enetered');
  }
  logScrolling(event) {
    // console.log(events)
    if (event.detail.scrollTop > 224.6666717529297) {
      document.getElementById('fixPosition').style.position = 'sticky';
      document.getElementById('fixPosition').style.top = '0px';
      document.getElementById('fixPosition').style.zIndex = '999';
      document.getElementById('fixPosition').style.background = 'white';

    } else if (event.detail.scrollTop < 224.6666717529297) {
      document.getElementById('fixPosition').style.position = 'relative';
      document.getElementById('fixPosition').style.top = '0px';
      document.getElementById('fixPosition').style.background = '#f4f5f8';

    }
  }
}
