import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { RECORD_STATUSES } from '@common/constants';
// modules
import { AssetStatusConst, AssetTypeConst } from '@assets/constants';
import { AssetsEnum } from '@assets/enums';
import { AssetsModel } from '@assets/interfaces';

@Component({
	selector: 'acc-assets-edit',
	templateUrl: './assets-edit.component.html',
	styleUrls: ['./assets-edit.component.scss']
})
export class AssetsEditComponent implements OnInit {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	breakdownIndex: number;

	resultRecord: AssetsModel;
	breakdownAdd = false;

	public readonly AssetsEnum = AssetsEnum;
	public readonly AssetStatusConst = AssetStatusConst;
	public readonly AssetTypeConst = AssetTypeConst;

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
			this.resultRecord = new AssetsModel();
			this._generalService.setTitle(`Asset: Add`);
		}
	}

	load() {
		this._httpService.post(`assets/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new AssetsModel(pResults.data);
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
					this.resultRecord = new AssetsModel();
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
