import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel,
   IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView,IonGrid, IonRow, IonCol,
   IonCard, IonCardHeader, IonCardTitle, IonImg, IonCardSubtitle, IonCardContent,
  IonIcon, IonItem} from '@ionic/angular';
import {CouponService} from '../../services/coupon';
import { Coupon, ICouponData } from '../../models/coupon.model';
import { FilterCouponCategoryPipe } from '../../pipes/filter-coupon-category-pipe';
import { NgTemplateOutlet } from '@angular/common';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import{ CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerScanResult } from '@capacitor/barcode-scanner';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonSegment, IonSegmentButton, 
    IonSegmentContent, IonSegmentView, FilterCouponCategoryPipe, IonGrid, IonRow, IonCol, IonCard,
     IonCardHeader, IonCardTitle, IonImg, IonCardSubtitle, IonCardContent, NgTemplateOutlet, IonIcon, IonItem],
})
export class Tab1Page {

  constructor(){
    addIcons( {
      cameraOutline
    });
  }

  private couponService: CouponService = inject(CouponService);
  public coupons: Coupon[] = [];

  async ionViewWillEnter() {

    this.coupons =await this.couponService.getCoupons();
    console.log(this.coupons);
  }

  changeActive(coupon: Coupon){
    coupon.active = !coupon.active; 
    this.couponService.saveCoupon(this.coupons);
  }

  startCamera(){
    CapacitorBarcodeScanner.scanBarcode({
      hint:  CapacitorBarcodeScannerTypeHint.QR_CODE,
    }).then((resultBarcode: CapacitorBarcodeScannerScanResult) => {
      console.log("resultBarcode",resultBarcode);
      
      if(resultBarcode.ScanResult){
        try{
          const couponData:ICouponData =JSON.parse(resultBarcode.ScanResult);
          const coupon = new Coupon(couponData);
          
          if(coupon.isValid()){
            const couponExists = this.coupons.some((c:Coupon)=>c.isEquals(coupon));

            if(!couponExists){
              this.coupons =[
                ...this.coupons,
                coupon
              ]; 
              
              console.log("Cupón anadido:");
            }else{
              console.error("El cupón ya existe");
            }

          }else{
               console.error("El QR es invalido");
          }

        }catch(error){
          console.error("Error parsing coupon data from QR code:", error);
        }

      }

    })
  }


}
