import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class NotificationsService {
	toastOptions: Partial<IndividualConfig> = {
		closeButton: true,
		timeOut: 5000,
	}

	constructor(
		private toastr: ToastrService
	) { }

	success(msg: string) {
		this.toastr.success(msg, `Success`, this.toastOptions);
	}

	warn(msg: string) {
		this.toastOptions.timeOut = 6000;

		this.toastr.warning(msg, `Error`, this.toastOptions);
	}
}
