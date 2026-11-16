import { Service, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Service()

export class ToastService {

    private toastController:ToastController = inject(ToastController); 

    async showToast(
        message: string,
        position: 'top' | 'middle' | 'bottom' | undefined = 'top',
        duration: number = 5000 
    ){
        const toast = await this.toastController.create({
            message,
            duration,
            position,
        });

        await toast.present();
    }

}
