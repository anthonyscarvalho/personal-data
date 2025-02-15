import { Component, OnInit } from '@angular/core';
// Services
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

	showLoading: boolean;
	constructor(
		private _generalService: GeneralService
	) { }

	ngOnInit(): void {
		this._generalService.getLoadingStatus().subscribe(pStatus => {
			if (pStatus) {
				this.showLoading = true;
			} else {
				this.showLoading = false;
			}
		});
	}
}
