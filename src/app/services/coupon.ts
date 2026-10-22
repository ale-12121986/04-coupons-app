import { Service } from '@angular/core';
import { ICouponData, Coupon } from '../models/coupon.model';
import  { Preferences } from '@capacitor/preferences'


@Service()

export class CouponService {

private readonly KEY_COUPONS = 'ddr_key_coupons';


    async getCoupons(){

        const couponsData: ICouponData[] | null = await this.recoveryCoupon();

        if(couponsData){
            return this.processCouppons(couponsData);
        }

        return fetch('./assets/data/coupons.json').then(async (res:Response)=> {
            const couponsData: ICouponData[] = await res.json();
            const coupons: Coupon[] = this.processCouppons(couponsData);    
            coupons.forEach(coupon => coupon.active = false)
            return coupons;
        }).catch(err=>{
            console.error(err);
            return [];
        })
    }
    
    private processCouppons(couponsData: ICouponData[]){
        const coupons:Coupon[] = [];
        for (const couponData of couponsData) {
             coupons.push(new Coupon(couponData));
        }
        return coupons;
    }

    saveCoupon(coupons: Coupon[]){
        const couponsData:ICouponData[] = coupons.map((coupon:Coupon)=>coupon.toCouponData());
        Preferences.set({
            key: this.KEY_COUPONS,
            value: JSON.stringify(couponsData)
        })
    }
    
    private async recoveryCoupon(){
        const couponsPreferences = await Preferences.get({key: this.KEY_COUPONS});
        if(couponsPreferences.value){
            return JSON.parse(couponsPreferences.value) as ICouponData[];
        }
        return null;
    }

}
