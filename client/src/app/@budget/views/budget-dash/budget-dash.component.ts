import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// common
import { GeneralService, HttpService } from '@common/services';
// modules
import { BudgetModel } from '@budget/interfaces';


@Component({
	selector: 'acc-budget-dash',
	templateUrl: './budget-dash.component.html',
	styleUrls: ['./budget-dash.component.scss']
})
export class BudgetDashComponent implements OnInit {
	@ViewChild('barChart') chartContainer: ElementRef;
	megaMenu: any;
	resultRecord: BudgetModel[];
	actualBudget = 0;
	totalBudget = 0;
	totalEssential = 0
	totalNonEssential = 0;
	monthlyIncome = 0;
	submitted = false;
	date = new Date();
	year: number;
	dateEnd: string;

	margin = { top: 20, right: 20, bottom: 30, left: 40 };
	private defaultAccount;

	constructor(
		private route: ActivatedRoute,
		private _generalService: GeneralService,
		private _httpService: HttpService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
	}

	ngOnInit(): void {
		this.year = this.date.getFullYear();
		this._generalService.setTitle('Budgets Dash');
		this.load();
		this.getDefaultAccount();
	}

	load() {
		this.resultRecord = [];
		this._httpService.post(`budget/dash`, { year: this.year }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				if (!this.resultRecord) {
					this.resultRecord = [];
				}
				pResults.data.map((record: BudgetModel) => {
					this.resultRecord.push(new BudgetModel(record))
					if (record.status === 'open') {
						const amount = record.actual;
						this.actualBudget += amount;
						this.totalBudget += record.budget;
						if (record.essential) {
							this.totalEssential += amount;
						} else if (!record.essential) {
							this.totalNonEssential += amount;
						}
					}
				});
			}
		});
	}

	updateYearMonth() {
		this._httpService.post(`bank-account-records/add-year-month`, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) { }
		});
	}

	getDefaultAccount() {
		this.defaultAccount = {};
		this._httpService.post(`bank-accounts/get-default`, { year: this.year }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.defaultAccount = pResults.data;
				this.getIncome();
			}
		});
	}

	async getIncome() {
		await this._httpService.post(`bank-account-records/get-income/${this.defaultAccount._id}`, { year: this.year }).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.monthlyIncome = pResults.data;
			}
		});
	}

	nextYear() {
		this.date.setFullYear(this.date.getFullYear() + 1);
		this.year = this.date.getFullYear();
		this.load();
		this.getIncome();
	}

	previousYear() {
		this.date.setFullYear(this.date.getFullYear() - 1);
		this.year = this.date.getFullYear();
		this.load();
		this.getIncome();
	}

	updateYear() {
		this.date = new Date(this.year);
		this.load();
		this.getIncome();
	}
}
