import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';

@Component({
	selector: 'app-ba-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.scss']
})
export class BaDashComponent implements OnInit {
	accounts;
	journalEntries;
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this._generalService.setTitle('Dashboard');
	}

	ngOnInit() {
		this.megaMenu = this.route.snapshot.data["menu"];
		localStorage.removeItem('activeMenu');
		if (!this.accounts) {
			this.accounts = [];
		}
		this.loadAccounts();
	}

	loadAccounts() {
		this._httpService.post('bank-accounts/view/dash', {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === 'valid') {
				this.accounts = pResults.data;
			}
		});
	}

	loadAccountInformation() { }
}
