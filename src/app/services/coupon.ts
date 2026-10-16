import { Service } from '@angular/core';
import { ICouponData, Coupon } from '../models/coupon.model';


@Service()

export class CouponService {
    getCoupons(){

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
    
    processCouppons(couponsData: ICouponData[]){
        const coupons:Coupon[] = [];
        for (const couponData of couponsData) {
             coupons.push(new Coupon(couponData));
        }
        return coupons;
    }
    

}
