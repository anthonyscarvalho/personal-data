import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
// interfaces
import { JournalsAddInterface } from '../../../interfaces/journals';
import { JournalRecordsProcessInterface } from '../../../interfaces/journalRecords';
import { FilterBoxConfigInterface, FilterBoxOptionsInterface } from '../../../interfaces/filterBoxOptions';
// services
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
	selector: 'app-journals',
	templateUrl: './journals.component.html',
	styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {
	@ViewChild('form', { static: false }) form: NgForm;

	results: JournalsAddInterface;
	journalEntries: JournalRecordsProcessInterface[];
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
		this._generalService.setTitle('Journals: Add New');
		this.filterBoxConfig = new FilterBoxConfigInterface();
		this.filterBoxConfig.backLink = '/journals/view';
		this.filterBoxConfig.updateControls = true;
	}

	ngOnInit() {
		this.filterBoxOptions = new FilterBoxOptionsInterface();
		localStorage.setItem('activeMenu', 'journals');

		if (!this.parentId) {
			this.results = new JournalsAddInterface();
			this.filterBoxConfig.create = true;
		} else {
			this.load();
		}
	}

	submit() {
		if (!this.parentId) {
			if (this.results.accountName !== '' && this.results.status !== '') {
				this._httpService.post('journals/add', this.results).then((pResult: any) => {
					if (pResult.status === '00') {
						this.results = new JournalsAddInterface();
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
			this._httpService.update('journals/update', this.parentId, this.results).then((pResult: any) => {
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
		this._httpService.post('journals/view/' + this.parentId, {}).then((results: any) => {
			if (results.status === '00') {
				this.results = new JournalsAddInterface(results.data);
				this._generalService.setTitle('Journal Edit: ' + results.data.accountDescription);
			}
		});
	}

	findJournalEntries() {
		this._httpService.post('journalRecords/search/' + this.parentId, {}).then((results: any) => {
			if (results.status === '00') {
				if (!this.journalEntries) {
					this.journalEntries = [];
				}
				results.data.map((pRecord: any) => {
					const _record = new JournalRecordsProcessInterface(pRecord);
					_record.journalId = this.results._id;
					this.journalEntries.push(_record);
				});
			}
		});
	}

	saveJournalEntries() {
		this.journalEntries.map((pEntry: any) => {
			this._httpService.post('journalRecords/add/', pEntry).then((pResults: any) => {
				if (pResults.status === '00') {
					this._notificationsService.success(pResults.message);
				} else {
					if (pResults.errors) {
						pResults.errors.forEach(pError => {
							this._notificationsService.warn(pError);
						});
					}
				}
			});
		});

	}
}
