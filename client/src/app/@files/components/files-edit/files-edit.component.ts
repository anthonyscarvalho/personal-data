import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { cFile } from '@sharedTypes/classes';
import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-files-edit',
	templateUrl: './files-edit.component.html',
	styleUrls: ['./files-edit.component.scss']
})
export class FilesEditComponent implements OnInit {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	breakdownIndex: number;

	resultRecord: cFile;
	breakdownAdd = false;

	constructor(
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		this.add = this.route.snapshot.data.add;
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
		}
	}

	ngOnInit(): void {
		if (this.parentId) {
			this.load();
		} else {
			this.resultRecord = new cFile();
			this._generalService.setTitle(`Files: Add`);
		}
	}

	uploadComplete(pFiles) {
		this.load();
	}

	load() {
		this._httpService.post(`assets/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new cFile(pResults.data);
				this._generalService.setTitle(`Asset: Edit - ` + this.resultRecord.name);
			}
		});
	}

	submit() {
		this.submitted = true;
		this.error = false;
		this.resultRecord.created = this.datePipe.transform(new Date(), `yyyy-MM-dd`);

		if (!this.add) {
			this._httpService.update(`assets/update`, this.resultRecord._id, this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === `valid`) {
					this._notificationsService.success(pResult.message);
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => this.submitted = false);
		} else {
			this._httpService.post('assets/add', this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.resultRecord = new cFile();
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => this.submitted = false);
		}
	}

	updateValue(pEvent, pModel) {
		this.resultRecord[pModel] = pEvent;
	}
}
