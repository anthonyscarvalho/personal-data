import { Component, OnInit } from '@angular/core';
// Services
import { GeneralService } from '../../services/general.service';

@Component({
	selector: 'app-loading',
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
