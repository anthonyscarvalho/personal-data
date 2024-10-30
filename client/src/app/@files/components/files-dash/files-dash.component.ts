import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-files-dash',
	templateUrl: './files-dash.component.html',
	styleUrls: ['./files-dash.component.scss']
})
export class FilesDashComponent implements OnInit {
	accounts;
	journalEntries;
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this._generalService.setTitle('Files: Dashboard');
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit() {
		localStorage.removeItem('activeMenu');
		if (!this.accounts) {
			this.accounts = [];
		}
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post('files/view/dash', {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === 'valid') {
				this.accounts = pResults.data;
			}
		});
	}

	loadAccountInformation() { }
}
