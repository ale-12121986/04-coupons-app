import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular';
import {CouponService} from '../../services/coupon';
import { Coupon } from '../../models/coupon.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView],
})
export class Tab1Page {

  private couponService: CouponService = inject(CouponService);
  
  public coupons: Coupon[] = [];

  async ionViewWillEnter() {

    this.coupons =await this.couponService.getCoupons();
    console.log(this.coupons);
  }
}
