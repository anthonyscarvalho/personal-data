import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { AccountsAddInterface } from '../../../interfaces/accounts';
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
	@ViewChild('form', { static: false }) form: NgForm;

	results: AccountsAddInterface;
	parentId: string;
	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	private filterBoxOptions: FilterBoxOptionsInterface;
	private filterBoxConfig: FilterBoxConfigInterface;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		if (this.route.snapshot.paramMap.get('id')) {
			this.parentId = this.route.snapshot.paramMap.get('id');
		} else {
			this.parentId = null;
		}
		this.bsConfig.containerClass = 'theme-dark-blue';
		this.bsConfig.dateInputFormat = 'YYYY-MM-DD'; // Or format like you want
		this._generalService.setTitle('Accounts: Add New');
		this.filterBoxConfig = new FilterBoxConfigInterface();
		this.filterBoxConfig.backLink = '/accounts/view';
		this.filterBoxConfig.updateControls = true;
	}

	ngOnInit() {
		this.filterBoxOptions = new FilterBoxOptionsInterface();
		localStorage.setItem('activeMenu', 'accounts');

		if (!this.parentId) {
			this.results = new AccountsAddInterface();
		} else {
			this.load();
		}
	}

	submit() {
		if (!this.parentId) {
			if (this.results.accountNumber !== '' && this.results.accountDescription !== '') {
				this._httpService.post('accounts/add', this.results).then((pResult: any) => {
					if (pResult.status === '00') {
						this.results = new AccountsAddInterface();
						this._notificationsService.success(pResult.message);
					} else {
						if (pResult.errors) {
							pResult.errors.forEach(pError => {
								this._notificationsService.warn(pError);
							});
						}
					}
				});
			}
		} else {
			this._httpService.update('accounts/update', this.parentId, this.results).then((pResult: any) => {
				if (pResult.status === '00') {
					this.load();
					this._notificationsService.success(pResult.message);
				} else {
					if (pResult.errors) {
						pResult.errors.forEach(pError => {
							this._notificationsService.warn(pError);
						});
					}
				}
			});
		}
	}

	submitForm() {
		this.form.ngSubmit.emit();
	}

	load() {
		this._httpService.post('accounts/view/' + this.parentId, {}).then((results: any) => {
			if (results.status === '00') {
				this.results = new AccountsAddInterface(results.data);
				this._generalService.setTitle('Accounts Edit: ' + results.data.accountDescription);
			}
		});
	}
}
