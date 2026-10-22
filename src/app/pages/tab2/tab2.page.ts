import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonGrid,IonRow, IonCol, IonText } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { CouponService } from '../../services/coupon';
import { Coupon } from '../../models/coupon.model';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, QRCodeComponent, IonGrid, IonRow, IonCol,IonText],
})
export class Tab2Page {

  private couponService:  CouponService = inject(CouponService);
  public QRCode!: string;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  async ionViewWillEnter() {
    const coupons: Coupon[] = await this.couponService.getCoupons();

    const couponsActive: Coupon[] = coupons.filter((coupon:Coupon) => coupon.active);
    if(couponsActive.length > 0){
      this.QRCode = JSON.stringify(couponsActive);
    }else{
      this.QRCode = '';
    }
    
    this.cdr.detectChanges();

    console.log("prueba de QR",this.QRCode);
  }
}
