/**
 * Ionic 4 Food Ordering PWA  & App Starter(https://store.enappd.com/product/ionic-4-food-ordering-pwa-app-starter)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { Injectable, NgZone } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MouseEvent } from '@agm/core';
declare var google;
@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  locatedCountry = 'IN';
  toggleCArt: boolean;
  // Obsevables filters
  public latitudeOrigin = new BehaviorSubject<any>('');
  originlatitude = this.latitudeOrigin.asObservable();
  public longitudeOrigin = new BehaviorSubject<any>('');
  originlongititude = this.longitudeOrigin.asObservable();

  // complete address details
  public ADDRESS_DETAIL = new BehaviorSubject<any>('');
  COMPLETE_ADDRESS = this.ADDRESS_DETAIL.asObservable();
  // cart Counter
  public totalCount = new BehaviorSubject<any>('');
  COUNT_TOTAL = this.totalCount.asObservable();

  public COUPON_COMING = new BehaviorSubject<any>('');
  COMING_COUPON = this.COUPON_COMING.asObservable();

  public NAME_USER = new BehaviorSubject<any>('');
  USER_NAME = this.NAME_USER.asObservable();

  public ADDRESS_USER = new BehaviorSubject<any>('');
  USER_ADDRESS = this.ADDRESS_USER.asObservable();

  public CONTACT_USER = new BehaviorSubject<any>('');
  USER_CONTACT = this.CONTACT_USER.asObservable();

  public LOC_USER = new BehaviorSubject<any>('');
  USER_LOC = this.LOC_USER.asObservable();

  public DESC_USER = new BehaviorSubject<any>('');
  USER_DESC = this.DESC_USER.asObservable();

  public IMAGE_USER = new BehaviorSubject<any>('');
  USER_IMAGE = this.IMAGE_USER.asObservable();
  public inputCount = new BehaviorSubject<any>('');
  countInput = this.inputCount.asObservable();

  slidesVertical = [
    { text1: 'UPTO 70% OFF', text2: 'GURU WHICH TASTE THE BEST', image: '../../assets/food1.jpg' },
    { text1: 'GET 40% OFF', text2: 'FROM YOUR CHOICE', image: '../../assets/food8.jpg' },
    { text1: 'FLAT 45% OFF', text2: 'FROM HOME', image: '../../assets/food5.jpg' },
    { text1: 'UPTO 10% OFF', text2: 'EXCLUSIVE ROASTED CHICKEN', image: '../../assets/food11.jpg' },
  ];
  slidesHorizontal = [
    {
      thumbnail: '../../assets/food1.jpg',
      title: 'Burger King',
      subTitle: 'American, Fast Food',
      imgSmall: '../../assets/offer.png',
      text: '40% OFF | Use coupon ENAPPD40',
      rate: ' 4.4',
      time: '30 mins',
      cost: '450',
      for: 'For two'
    },
    {
      thumbnail: '../../assets/food11.jpg',
      title: 'Burger King',
      subTitle: 'American, Fast Food',
      imgSmall: '../../assets/offer.png',
      text: '40% OFF | Use coupon ENAPPD40',
      rate: ' 4.4',
      time: '30 mins',
      cost: '450',
      for: 'For two',
      famousFor: [
        // tslint:disable-next-line: max-line-length
        { text1: 'North INDIAN', text2: '28 MINS', image: '../../assets/food19.jpg' }, { text1: 'PASTA', text2: '30 MINS', image: '../../assets/food19.jpg' }, { text1: 'BEVERAGES', text2: '21 MINS', image: '../../assets/food5.jpg' }, { text1: 'AL-HAQ', text2: '4 MINS', image: '../../assets/food18.jpg' },
        // tslint:disable-next-line: max-line-length
        { text1: 'FAST FOOD', text2: '12 MINS', image: '../../assets/food20.jpg' }, { text1: 'BIRYANI', text2: '37 MINS', image: '../../assets/food16.jpg' }, { text1: 'DESSERTS', text2: '11 MINS', image: '../../assets/food3.jpg' }, { text1: 'AL-BEK', text2: '21 MINS', image: '../../assets/food19.jpg' },
        // tslint:disable-next-line: max-line-length
        { text1: 'PIZZA', text2: '48 MINS', image: '../../assets/food12.jpg' }, { text1: 'KAWABS', text2: '28 MINS', image: '../../assets/food6.jpg' }, { text1: 'CHINESE', text2: '32 MINS', image: '../../assets/food9.jpg' }, { text1: 'AL-SHAD', text2: '32 MINS', image: '../../assets/food12.jpg' },
      ]
    },
    {
      thumbnail: '../../assets/food11.jpg',
      title: 'Burger King',
      subTitle: 'American, Fast Food',
      imgSmall: '../../assets/offer.png',
      text: '40% OFF | Use coupon ENAPPD40',
      rate: ' 4.4',
      time: '30 mins',
      cost: '450',
      for: 'For two'
    },
    {
      thumbnail: '../../assets/food12.jpg',
      title: 'Burger King',
      subTitle: 'American, Fast Food',
      imgSmall: '../../assets/offer.png',
      text: '40% OFF | Use coupon ENAPPD40',
      rate: ' 4.4',
      time: '30 mins',
      cost: '450',
      for: 'For two'
    },
  ];
  radios = [
    { name: 'Relevance', value: 'first' },
    { name: 'Cost For Two', value: 'sec' },
    { name: 'Delivery Time', value: 'thirs' },
    { name: 'Rating', value: 'fourth' },
  ];
  offers = [
    { name: 'My Favorites', value: 'first' },
    { name: 'Offer', value: 'sec' },
    { name: 'Pure Veg', value: 'thirs' },
  ];
  restorentProducts = [
    {
      head: 'Your Previous orders',
      id: 'orders',
      repeatMenu: [
        { restroName: 'Maa di special Chiken dum Biryani', foodType: 'Main Course', cost: '100', inputValue: 1, clicked: false },
        { restroName: 'Maa di special Chiken dum Biryani', foodType: 'Main Course', cost: '200', inputValue: 1, clicked: false },
        { restroName: 'Maa di special Chiken dum Biryani', foodType: 'Main Course', cost: '102', inputValue: 1, clicked: false },
        { restroName: 'Maa di special Chiken dum Biryani', foodType: 'Main Course', cost: '120', inputValue: 1, clicked: false },
        { restroName: 'Maa di special Chiken dum Biryani', foodType: 'Main Course', cost: '110', inputValue: 1, clicked: false }
      ]
    },
    {
      head: 'Recommended',
      id: 'Recommended',
      menus: [
        { image: '../../assets/food14.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food13.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food10.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food11.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food3.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food4.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food5.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food6.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food7.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food8.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food9.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food10.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food11.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food12.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food13.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food14.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food15.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food16.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food17.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food18.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food19.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food1.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food12.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food13.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food14.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food15.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food18.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food11.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food15.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
        { image: '../../assets/food12.jpg', sellerType: 'Top Sellers', name: 'Shadman\'s Choice', price: '101', inputValue: 1, clicked: false },
      ]
    },
    {
      head: 'Some Enappd Special',
      id: 'special',
      itemView: [
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
        { dishName: 'The developer\'s Coded Biryani', dishPrice: '329', contents: 'Developers Biryani- Flask + Veg Puff + Chicken Roated + Mutton Chaanp + Raita & Lassi', inputValue: 1, clicked: false },
      ]
    }, {
      head: 'Top Sellers',
      id: 'seller',
      itemView: [
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
        { dishName: 'Classi Masala Chiken curry', dishPrice: '329', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
      ]
    },
    {
      head: 'Hot Beverages',
      id: 'hot',
      accordianItem: [
        {
          dishName: 'Chiken Flask', dishItem: '24 items:', items: 'Dilliwali Dum Biryani,Bhuna Masaala tikka...and more', acordian: false, id: 'Flask',
          accordian: [
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Cutting Ghobhi Masaala', dishPrice: '654', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
          ]
        },
        {
          dishName: 'Vegetable Soup', dishItem: '23 items:', items: 'Dilliwali Dum Biryani,Bhuna Masaala tikka...and more', acordian: false, id: 'Soup',
          accordian: [
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Ginger Lemon Mix Soup', dishPrice: '102', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
          ]
        },
        {
          dishName: 'Kalmi Kabab', dishItem: '15 items:', items: 'Dilliwali Dum Biryani,Bhuna Masaala tikka...and more', acordian: false, id: 'Kabab',
          accordian: [
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Punjabi Daal Tadka', dishPrice: '189', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
          ]
        },
        {
          dishName: 'Kalmi Biryani', dishItem: '15 items:', items: 'Dilliwali Dum Biryani,Bhuna Masaala tikka...and more', acordian: false, id: 'Kalmi',
          accordian: [
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
            { dishName: 'Hydrabadi Dum Biryani', dishPrice: '120', sellerType: 'BESTSELLER', inputValue: 1, clicked: false },
          ]
        },
      ]
    },
  ];


  menuList = [
    { menu: 'Kalmi Biryani', quantity: '23', id: 'hot' },
    { menu: 'Kalmi Kabab', quantity: '26', id: 'seller' },
    { menu: 'Vegetable Soup', quantity: '21', id: 'special' },
    { menu: 'Chiken Flask', quantity: '28', id: 'Recommended' },
    { menu: 'Chiken Tikka\'s', quantity: '28', id: 'orders' }
  ];
  addresses = [
    { icon: 'home', name: 'Home', clicked: false }, { icon: 'briefcase', name: 'Work', clicked: false }, { icon: 'pin', name: 'Other', clicked: false }];



  block: any;
  street: any;
  building: any;
  pickup: string;
  lat: any;
  lng: any;
  markers = [];
  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    public _ZONE: NgZone
  ) { }

  changeFilterPicup(lat: any, lng: any, ) {
    this.latitudeOrigin.next(lat);
    this.longitudeOrigin.next(lng);
  }
  completeAddr(CURRENT_ADDRESS: any) {
    this.ADDRESS_DETAIL.next(CURRENT_ADDRESS);
  }
  productsCount(TOTAL_COUNT: any) {
    this.totalCount.next(TOTAL_COUNT);
  }
  checkCouponStatus(COUPON_STATUS: boolean) {
    this.COUPON_COMING.next(COUPON_STATUS);
  }

  checkProfileData(USER_NAME: string, USER_ADDRESS: string, USER_CONTACT: number, USER_DESC: string, USER_IMAGE) {
    this.NAME_USER.next(USER_NAME);
    this.ADDRESS_USER.next(USER_ADDRESS);
    this.CONTACT_USER.next(USER_CONTACT);
    // this.LOC_USER.next(USER_LOC);
    this.DESC_USER.next(USER_DESC);
    this.IMAGE_USER.next(USER_IMAGE);
  }

  totalInputCount(INPUT_VALUE) {
    this.inputCount.next(INPUT_VALUE);
  }
  getLatLan(address: string) {
    const geocoder = new google.maps.Geocoder();
    // tslint:disable-next-line: max-line-length
    return new Observable((observer) => {
      geocoder.geocode({ address }, (results: { geometry: { location: any; }; }[], status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          observer.next({ err: true });
          observer.complete();
        }
      });
    });
  }

  async getCurrentLoaction() {
    const loader = await this.loading('Getting your location...');
    loader.present();
    this.geolocation.getCurrentPosition().then((resp: { coords: { latitude: number; longitude: number; }; }) => {
      this._ZONE.run(() => {
        const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapOptions = {
          center: latLng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        console.log('lat', this.lat, 'lng', this.lng);
        this.changeFilterPicup(this.lat, this.lng);
        this.getGeoLocation(resp.coords.latitude, resp.coords.longitude);
        loader.dismiss();
      });
      loader.dismiss();
    }).catch((error) => {
      console.log(error);
      loader.dismiss();
    }).finally(() => {
      loader.dismiss();
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data: any) => {
    });
  }
  async getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      await geocoder.geocode(request, (results: any[], status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          if (result != null) {
            if (rsltAdrComponent[0] != null) {
              this.block = rsltAdrComponent[0].long_name;
              this.street = rsltAdrComponent[2].short_name;
              this.building = rsltAdrComponent[1].short_name;
              this.pickup = this.block + ' ' + this.street + ' ' + this.building;
              this.completeAddr(this.block);
            }
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  async markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    if ($event.coords && $event.coords.lat && $event.coords.lng) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng($event.coords.lat, $event.coords.lng);
      const request = { latLng: latlng };

      await geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          console.log(result);
          const rsltAdrComponent = result.address_components;
          console.log(rsltAdrComponent);
          if (result !== null) {
            if (rsltAdrComponent[0] !== null) {
              this.block = rsltAdrComponent[0].long_name;
              this.street = rsltAdrComponent[2].short_name;
              console.log(this.street);
              this.building = rsltAdrComponent[1].short_name;
              console.log(this.building);
            }
            this._ZONE.run(() => {
              this.lat = $event.coords.lat;
              this.lng = $event.coords.lng;
              this.changeFilterPicup(this.lat, this.lng);
              this.pickup = this.block + ' ' + this.street + ' ' + this.building;
            });

          } else {
            alert('No address available!');
          }

        }
      });
    }
  }
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  async opneModal(component?: any, props?: any, modalClass?: any) {
    const modal = await this.modalCtrl.create({
      component,
      componentProps: props,
      cssClass: modalClass,
      showBackdrop: true,
      backdropDismiss: true
    });
    return modal;
  }

  async loading(message: string) {
    const loader = await this.loadingCtrl.create({
      message
    });
    return loader;
  }

}
// tslint:disable-next-line: class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
