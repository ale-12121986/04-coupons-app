import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel,
   IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView,IonGrid, IonRow, IonCol,
   IonCard, IonCardHeader, IonCardTitle, IonImg, IonCardSubtitle, IonCardContent} from '@ionic/angular';
import {CouponService} from '../../services/coupon';
import { Coupon } from '../../models/coupon.model';
import { FilterCouponCategoryPipe } from '../../pipes/filter-coupon-category-pipe';

import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, 
    IonSegmentContent, IonSegmentView, FilterCouponCategoryPipe, IonGrid, IonRow, IonCol, IonCard,
     IonCardHeader, IonCardTitle, IonImg, IonCardSubtitle, IonCardContent, NgTemplateOutlet],
})
export class Tab1Page {

  private couponService: CouponService = inject(CouponService);
  
  public coupons: Coupon[] = [];

  async ionViewWillEnter() {

    this.coupons =await this.couponService.getCoupons();
    console.log(this.coupons);
  }
}
