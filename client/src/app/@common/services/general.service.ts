import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
// service
import { HttpService, NotificationsService } from '@common/services';

@Injectable({
	providedIn: 'root',
})
export class GeneralService {

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _datePipe: DatePipe,
		private _httpService: HttpService,
		private _notificationService: NotificationsService,
	) {
		this.route.queryParams.subscribe(params => {
			this.state = ((params.state) ? params.state : 'false');
			this.sortDir = ((params.dir) ? params.dir : 'ASC');
			this.column = ((params.column) ? params.column : '_id');
			this.searchPhrase = ((params.searchPhrase) ? params.searchPhrase : '');
			this.invFilter = ((params.invFilter) ? params.invFilter : 'false');
			this.page = Number((params.page) ? params.page : 1);
			this.pagerRecords = ((params.records) ? params.records : '20');
			this.user = ((params.user) ? params.user : '0');
			this.bankAccount = ((params.bankAccount) ? params.bankAccount : '');
		});
		this.authKey = localStorage.getItem('authKey');
	}

	// Title
	title = new BehaviorSubject<string>('');
	setTitle(pTitle: string) {
		this.title.next(pTitle);
	}
	getTitle() {
		return this.title.asObservable();
	}

	// Parent ID
	parentId: string = '';
	getParentId() {
		return this.parentId;
	}
	setParentId(id: string) {
		this.parentId = id;
	}

	// Authorisation Key
	authKey: string = '';
	getAuthkey() {
		return this.authKey;
	}
	setAuthkey(pAuthKey: string) {
		this.authKey = pAuthKey;
		// localStorage.setItem('authKey', key);
	}

	// Set the sort Direction
	sortDir: string = 'ASC';
	getSortDir() {
		return this.sortDir;
	}
	setActiveDir(pDirection: string) {
		if (pDirection === 'ASC') {
			this.router.navigate([], { queryParams: { dir: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
		} else {
			this.router.navigate([], { queryParams: { dir: pDirection }, relativeTo: this.route, queryParamsHandling: 'merge' });
		}
		this.sortDir = pDirection;
	}

	// Set the date used for due products
	date: Date = new Date();
	getDate() {
		return this.formatDate(this.date);
	}
	setDate(pDate: Date) {
		this.date = pDate;
	}

	// Get the column used to sort by
	column: string = '';
	getSortColumn() {
		return this.column;
	}
	setActiveColumn(pColumn: string) {
		if (pColumn === '_id') {
			this.router.navigate([], { queryParams: { column: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
		} else {
			this.router.navigate([], { queryParams: { column: pColumn }, relativeTo: this.route, queryParamsHandling: 'merge' });
		}
		this.column = pColumn;
	}

	// Get the items state used to filter results
	state: string = '';
	getActiveFilter() {
		return this.state;
	}
	setActiveFilter(pState: string) {
		if (pState === 'false') {
			this.router.navigate([], { queryParams: { state: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
		} else {
			this.router.navigate([], { queryParams: { state: pState }, relativeTo: this.route, queryParamsHandling: 'merge' });
		}
		this.state = pState;
	}

	// Set the search phrase used to filter results
	searchPhrase: string = '';
	getSearchPhrase() {
		return this.searchPhrase;
	}
	setSearch(pSearchPhrase: string) {
		this.router.navigate([], { queryParams: { searchPhrase: pSearchPhrase }, relativeTo: this.route, queryParamsHandling: 'merge' });
		this.searchPhrase = pSearchPhrase;
	}

	// Set the bank account used to filter results
	bankAccount: string = '';
	getBankAccount() {
		return this.bankAccount;
	}
	setBankAccount(pBankAccount: string) {
		this.router.navigate([], { queryParams: { bankAccount: pBankAccount }, relativeTo: this.route, queryParamsHandling: 'merge' });
		this.bankAccount = pBankAccount;
	}

	// Set whether to show the invoice filter or not
	invFilter: string = '';
	getInvFilter() {
		return this.invFilter;
	}
	setInvFilter(pInvoiceFilter: string) {
		this.router.navigate([], { queryParams: { invFilter: pInvoiceFilter }, relativeTo: this.route, queryParamsHandling: 'merge' });
		this.invFilter = pInvoiceFilter;
	}

	// Update the current page used to filter results
	page: number = 1;
	getPage() {
		return this.page;
	}
	setPage(pPage: number) {
		if (pPage === 1) {
			this.router.navigate([], { queryParams: { page: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
		} else {
			this.router.navigate([], { queryParams: { page: pPage }, relativeTo: this.route, queryParamsHandling: 'merge' });
		}
		this.page = pPage;
	}

	// Update the amount of records to show
	pagerRecords: string = '1';
	getRecords() {
		return this.pagerRecords;
	}
	setRecords(pRecords: string) {
		if (pRecords === '20') {
			this.router.navigate([], { queryParams: { records: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
		} else {
			this.router.navigate([], { queryParams: { records: pRecords }, relativeTo: this.route, queryParamsHandling: 'merge' });
		}
		this.pagerRecords = pRecords;
	}

	// Update the selected user, used to filter results
	user: string = '0';
	getUser() {
		return this.user;
	}
	setUser(pUser: string) {
		this.router.navigate([], { queryParams: { user: pUser }, relativeTo: this.route, queryParamsHandling: 'merge' });
		this.user = pUser;
	}

	// Loading Status
	private loadingStatusSource = new BehaviorSubject<boolean>(false);
	getLoadingStatus() {
		return this.loadingStatusSource.asObservable();
	}

	setLoadingStatus(pNewStatus) {
		this.loadingStatusSource.next(pNewStatus);
	}

	// show modal in component
	private modalShowName = new BehaviorSubject<boolean>(false);
	getModalShowName() {
		return this.modalShowName.asObservable();
	}

	setModalShowName(pNewStatus) {
		this.modalShowName.next(pNewStatus);
	}


	// redirect to page
	redirect(pUrl) {
		if (pUrl) {
			this.router.navigate(['/' + pUrl]);
		}
	}

	formatNumbers(value: any, fixed: number = 0) {
		let _tmp: any = (Math.round(value * 100) / 100);
		if (fixed > 0) {
			_tmp.toFixed(fixed);
		}
		_tmp += '';
		let x = _tmp.split('.');
		let x1 = x[0];
		let x2 = '';
		if (parseFloat(x[1]) < 10) {
			x2 = x.length > 1 ? '.' + x[1] + '0' : '';
		} else {
			x2 = x.length > 1 ? '.' + x[1] : '';
		}
		let rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		const total: any = x1 + x2;
		return total;
	}

	validateResponse(pResponse) {
		if (pResponse.status) {
			if (pResponse.status === '00') {
				return 'valid';
			} else if (pResponse === '01') {
				return 'failed';
			} else if (pResponse.status === '02') {
				return 'exists';
			}
		} else {
			return 'invalid';
		}
	}

	formatDate(pDate, pFormat: string = 'yyyy-MM-dd') {
		return this._datePipe.transform(pDate, pFormat);
	}

	changeStatus(pModule, pId, pAction) {
		this._httpService.update(`${pModule}/status`, pId, { action: pAction }).then((results: any) => {
			if (results.status === `00`) {
				this._notificationService.success(results.message);
			} else {
				this._notificationService.warn(results.message);
			}
		});
	}

	deleteRecord(pModule, pId) {
		this._httpService.delete(`${pModule}/delete`, pId).then((results: any) => {
			if (results.status === `00`) {
				this._notificationService.success(results.message);
				return true;
			} else {
				this._notificationService.warn(results.message);
				return false;
			}
		});
	}
}
