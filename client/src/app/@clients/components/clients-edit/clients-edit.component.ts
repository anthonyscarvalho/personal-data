import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { cProduct, cClient, cClientProduct, cCompany } from '@sharedTypes/classes';
import { RECORD_STATUSES_CONST, RENEWABLE_CONST } from '@sharedTypes/constants';

import { GeneralService, HttpService, NotificationsService } from '@common/services';

@Component({
	selector: 'acc-clients-edit',
	templateUrl: './clients-edit.component.html',
	styleUrls: ['./clients-edit.component.scss']
})
export class ClientsEditComponent implements OnInit {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	selectedIndex: number;

	resultRecord: cClient;
	recordProduct: cClientProduct;
	productAdd = true;
	products: cProduct[] = [];

	// select values
	categories: any[];
	companies: cCompany[];
	recordStatuses = RECORD_STATUSES_CONST;
	renewableTypes = RENEWABLE_CONST;

	constructor(
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		this.add = this.route.snapshot.data.add;
		this.recordProduct = new cClientProduct();
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
			this.resultRecord = new cClient();
		}
	}

	ngOnInit(): void {
		if (this.parentId) {
			this.load();
			this.loadProducts();
		} else {
			this._generalService.setTitle(`Budget: Add`);
		}
	}

	load() {
		this._httpService.post(`clients/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new cClient(pResults.data);
				this._generalService.setTitle(`Budget: Edit - ` + pResults.data.business);
			}
		});
	}

	loadProducts() {
		this._httpService.post('products/view_active', {}).then((results: any) => {
			if (results.status === `00`) {
				this.products = results.data;
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
			this._httpService.post('clients/add', this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.resultRecord = new cClient();
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

	selectOption(event) {
		const product: cProduct = this.products.find((product) => product._id === event);

		if (product) {
			const date = new Date();
			const option = new cClientProduct();
			option.price = product.price;
			option.description = product.description;
			option.created = this._generalService.formatDate(date);
			option.date = this._generalService.formatDate(date);
			option.year = date.getFullYear();
			option.month = date.getMonth();

			this.recordProduct = option;
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
				this.recordProduct = new cClientProduct();
				this.productAdd = false;
			}
		} else {
			this.resultRecord.products[this.selectedIndex] = this.recordProduct;
			this.recordProduct = new cClientProduct();
			this.selectedIndex = undefined;
			this.productAdd = false;
		}
	}

	editBreakdown(pIndex) {
		this.recordProduct = new cClientProduct(this.resultRecord.products[pIndex]);
		this.productAdd = true;
		this.selectedIndex = pIndex;
	}

	removeBreakdown(pIndex) {
		this.resultRecord.products.splice(pIndex, 1);
	}
}
