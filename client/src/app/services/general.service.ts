import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable()
export class GeneralService {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {
    this.route.queryParams.subscribe(params => {
      this.state = ((params.state) ? params.state : 'false');
      this.sortDir = ((params.dir) ? params.dir : 'ASC');
      this.column = ((params.column) ? params.column : 'id');
      this.searchPhrase = ((params.searchPhrase) ? params.searchPhrase : '');
      this.invFilter = ((params.invFilter) ? params.invFilter : 'false');
      this.page = Number((params.page) ? params.page : 1);
      this.pagerRecords = ((params.records) ? params.records : '10');
      this.user = ((params.user) ? params.user : '0');
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
    return this.datepipe.transform(this.date, 'yyyy-MM-dd');
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
    }
    this.router.navigate([], { queryParams: { column: pColumn }, relativeTo: this.route, queryParamsHandling: 'merge' });
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
    if (pRecords === '10') {
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

  // redirect to page
  redirect(pUrl) {
    if (pUrl) {
      this.router.navigate(['/' + pUrl]);
    }
  }
}
