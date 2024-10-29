import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { cBudget, cBreakDown, cBudgetHistory } from "@sharedTypes/classes";
import { CATEGORIES } from "@sharedTypes/constants";
import { GeneralService, HttpService, NotificationsService } from '@common/services';
import { RECORD_STATUSES } from '@common/constants';

@Component({
	selector: 'acc-budget-edit',
	templateUrl: './budget-edit.component.html',
	styleUrls: ['./budget-edit.component.scss']
})
export class BudgetEditComponent implements OnInit, AfterContentChecked {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	breakdownIndex: number;

	resultRecord: cBudget;
	recordBreakdown: cBreakDown;
	breakdownAdd = false;

	// select values
	categories: any;
	recordStatuses;

	constructor(
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private changeDetectionRef: ChangeDetectorRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		this.add = this.route.snapshot.data.add;
		this.recordBreakdown = new cBreakDown();
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
			this.resultRecord = new cBudget();
		}
		this.categories = CATEGORIES;
		this.recordStatuses = RECORD_STATUSES;
	}

	ngOnInit(): void {
		if (this.parentId) {
			this.load();
		} else {
			this._generalService.setTitle(`Budget: Add`);
		}
	}

	load() {
		this._httpService.post(`budget/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new cBudget(pResults.data);
				this._generalService.setTitle(`Budget: Edit - ` + pResults.data.description);
				this.sortBreakDown();

				const historyDate = this._generalService.formatDate(new Date());
				const historySource = JSON.parse(JSON.stringify(pResults.data));
				delete (historySource._id);
				delete (historySource.history);

				this.resultRecord.history.push({ ...historySource, date: historyDate, _id: this._generalService.generateUuid() });
			}
		});
	}

	sortBreakDown() {
		this.resultRecord.breakdown.sort((a, b) => a.description.toLocaleLowerCase() < b.description.toLowerCase() ? -1 : 1);
	}

	submit() {
		this.submitted = true;
		this.error = false;
		const _dateOp = new Date(this.resultRecord.created);
		this.resultRecord.created = this.datePipe.transform(_dateOp, `yyyy-MM-dd`);

		if (!this.add) {
			this._httpService.update(`budget/update`, this.resultRecord._id, this.resultRecord).then((pResult: any) => {
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
					this.resultRecord = new cBudget();
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
		this.recordBreakdown[pModel] = pEvent;
	}

	addBreakdown() {
		this.recordBreakdown.created = this._generalService.formatDate(this.recordBreakdown.created);
		if (this.breakdownIndex === undefined) {
			if (!this.resultRecord.breakdown) {
				this.resultRecord.breakdown = [];
			}
			if (this.recordBreakdown.description !== ``) {
				this.recordBreakdown.created = this._generalService.formatDate(this.recordBreakdown.created);
				this.resultRecord.breakdown.push(this.recordBreakdown);
				this.recordBreakdown = new cBreakDown();
				this.breakdownAdd = false;
			}
		} else {
			this.resultRecord.breakdown[this.breakdownIndex] = this.recordBreakdown;
			this.recordBreakdown = new cBreakDown();
			this.breakdownIndex = undefined;
			this.breakdownAdd = false;
		}
		this.updateActual();
		this.sortBreakDown();
	}

	updateActual() {
		let actual = 0;
		this.resultRecord.breakdown.map((record) => {
			if (record.status === 'open') {
				actual += parseFloat(Number(record.budget).toFixed(2));
			}
		});
		this.resultRecord.actual = Math.round(actual * 100 + Number.EPSILON) / 100;
	}

	editBreakdown(pIndex) {
		this.recordBreakdown = new cBreakDown(this.resultRecord.breakdown[pIndex]);
		this.breakdownAdd = true;
		this.breakdownIndex = pIndex;
		this.sortBreakDown();
	}

	removeBreakdown(pIndex) {
		this.resultRecord.breakdown.splice(pIndex, 1);
		this.updateActual();
	}

	ngAfterContentChecked() {
		this.changeDetectionRef.detectChanges();
	}
}
