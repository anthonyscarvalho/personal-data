import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { RECORD_STATUSES, RENEWABLE } from '@common/constants';
import { CompanyInterface } from '@companies/interfaces';
// modules
import { ClientModel, ClientProductModel } from '@clients/interfaces';

@Component({
	selector: 'acc-categories-edit',
	templateUrl: './categories-edit.component.html',
	styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	selectedIndex: number;

	resultRecord: ClientModel;
	recordProduct: ClientProductModel;
	productAdd = true;

	// select values
	categories: any[];
	companies: CompanyInterface[];
	recordStatuses = RECORD_STATUSES;
	renewableTypes = RENEWABLE;

	constructor(
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		this.add = this.route.snapshot.data.add;
		this.recordProduct = new ClientProductModel();
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
			this.resultRecord = new ClientModel();
		}
	}

	ngOnInit(): void {
		if (this.parentId) {
			this.load();
		} else {
			this._generalService.setTitle(`Categories: Add`);
		}
	}

	load() {
		this._httpService.post(`clients/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new ClientModel(pResults.data);
				this._generalService.setTitle(`Categories: Edit - ` + pResults.data.business);
			}
		});
	}

	submit() {
		this.submitted = true;
		this.error = false;
		const _dateOp = new Date(this.resultRecord.signupDate);
		this.resultRecord.signupDate = this.datePipe.transform(_dateOp, `yyyy-MM-dd`);

		if (!this.add) {
			this._httpService.update(`clients/update`, this.resultRecord._id, this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === `valid`) {
					this._notificationsService.success(pResult.message);
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => {
				this.submitted = false;
			});
		} else {
			this._httpService.post('budget/add', this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.resultRecord = new ClientModel();
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => {
				this.submitted = false;
			});
		}
	}

	updateValue(pEvent, pModel) {
		this.resultRecord[pModel] = pEvent;
	}

	updateBreakdownValue(pEvent, pModel) {
		this.recordProduct[pModel] = pEvent;
	}

	addClientProduct() {
		if (this.selectedIndex === undefined) {
			if (!this.resultRecord.products) {
				this.resultRecord.products = [];
			}
			if (this.recordProduct.description !== ``) {
				this.resultRecord.products.push(this.recordProduct);
				this.recordProduct = new ClientProductModel();
				this.productAdd = false;
			}
		} else {
			this.resultRecord.products[this.selectedIndex] = this.recordProduct;
			this.recordProduct = new ClientProductModel();
			this.selectedIndex = undefined;
			this.productAdd = false;
		}
	}

	editBreakdown(pIndex) {
		this.recordProduct = new ClientProductModel(this.resultRecord.products[pIndex]);
		this.productAdd = true;
		this.selectedIndex = pIndex;
	}

	removeBreakdown(pIndex) {
		this.resultRecord.products.splice(pIndex, 1);
	}
}
