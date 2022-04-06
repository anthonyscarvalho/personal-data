import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable({
	providedIn: 'root',
})
export class NotificationsService {
	toastOptions: ToastOptions = {
		title: `Success`,
		msg: ``,
		showClose: true,
		timeout: 5000,
		theme: `default`,
		onAdd: (toast: ToastData) => {
			console.log(`Toast ` + toast.id + ` has been added!`);
		},
		onRemove: (toast: ToastData) => {
			console.log(`Toast ` + toast.id + ` has been removed!`);
		}
	}

	constructor(
		private toastyService: ToastyService,
	) { }

	success(msg: string) {
		this.toastOptions.title = `Success`;
		this.toastOptions.msg = msg;
		this.toastyService.success(this.toastOptions);
	}

	warn(msg: string) {
		this.toastOptions.title = `Error`;
		this.toastOptions.msg = msg;
		this.toastOptions.timeout = 6000;

		this.toastyService.warning(this.toastOptions);
	}
}
