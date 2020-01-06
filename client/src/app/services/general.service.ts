import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';


@Injectable()
export class GeneralService {
  title: String = '';
  mainNav: Boolean = false;
  subNav: Boolean = false;
  subNavView: String = 'main';
  parentId: String = '';
  jobView: String = 'list';
  authKey: String = '';
  // Sort filters
  sortDir: String = 'ASC';
  date: Date = new Date();
  column: String = '';
  state: String = '';
  searchPhrase: String = '';
  invFilter: String = '';
  page: Number = 1;
  pagerRecords: String = '1';
  company: String = '0';
  user: String = '0';

  private loadingStatusSource = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {
    this.route.queryParams.subscribe(params => {
      this.state = ((params['state']) ? params['state'] : 'false');
      this.sortDir = ((params['dir']) ? params['dir'] : 'ASC');
      this.column = ((params['column']) ? params['column'] : 'id');
      this.searchPhrase = ((params['searchPhrase']) ? params['searchPhrase'] : '');
      this.invFilter = ((params['invFilter']) ? params['invFilter'] : 'false');
      this.page = Number((params['page']) ? params['page'] : 1);
      this.pagerRecords = ((params['records']) ? params['records'] : '10');
      this.company = ((params['company']) ? params['company'] : '0');
      this.user = ((params['user']) ? params['user'] : '0');
    });
    this.authKey = localStorage.getItem('authKey');
  }
  // Title
  setTitle(message: String) {
    this.title = message;
  }

  // Main Navigation
  setMainNav(newMain: Boolean) {
    this.mainNav = newMain;
  }


  // Sub Navigation
  setSubNav(newSub: Boolean, navView: String = '') {
    this.subNav = newSub;
    if (navView !== '') {
      this.subNavView = navView;
    } else {
      this.subNavView = 'main';
    }
  }

  // Parent ID
  getParentId() {
    return this.parentId;
  }
  setParentId(id: String) {
    this.parentId = id;
  }

  // Scheduler view
  setJobView(view: String) {
    this.jobView = view;
  }

  // Authorisation Key
  getAuthkey() {
    return this.authKey;
  }
  setAuthkey(key: String) {
    this.authKey = key;
    // localStorage.setItem('authKey', key);
  }

  // Set the sort Direction
  getSortDir() {
    return this.sortDir;
  }
  setActiveDir(dir: String) {
    if (dir === 'ASC') {
      this.router.navigate([], { queryParams: { dir: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { dir: dir }, relativeTo: this.route, queryParamsHandling: 'merge' });
    }
    this.sortDir = dir;
  }

  // Set the date used for due products
  getDate() {
    return this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }
  setDate(date: Date) {
    this.date = date;
  }

  // Get the column used to sort by
  getSortColumn() {
    return this.column;
  }
  setActiveColumn(column: String) {
    if (column === 'id') {
      this.router.navigate([], { queryParams: { column: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { column: column }, relativeTo: this.route, queryParamsHandling: 'merge' });
    }
    this.column = column;
  }

  // Get the items state used to filter results
  getActiveFilter() {
    return this.state;
  }
  setActiveFilter(state: String) {
    if (state === 'false') {
      this.router.navigate([], { queryParams: { state: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { state: state }, relativeTo: this.route, queryParamsHandling: 'merge' });
    }
    this.state = state;
  }

  // Set the search phrase used to filter results
  getSearchPhrase() {
    return this.searchPhrase;
  }
  setSearch(searchPhrase: String) {
    this.router.navigate([], { queryParams: { searchPhrase: searchPhrase }, relativeTo: this.route, queryParamsHandling: 'merge' });
    this.searchPhrase = searchPhrase;
  }

  // Set whether to show the invoice filter or not
  getInvFilter() {
    return this.invFilter;
  }
  setInvFilter(invFilter: String) {
    this.router.navigate([], { queryParams: { invFilter: invFilter }, relativeTo: this.route, queryParamsHandling: 'merge' });
    this.invFilter = invFilter;
  }

  // Update the ecurrent page used to filter reuslts
  getPage() {
    return this.page;
  }
  setPage(page: number) {
    if (page === 1) {
      this.router.navigate([], { queryParams: { page: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { page: page }, relativeTo: this.route, queryParamsHandling: 'merge' });
    }
    this.page = page;
  }

  // Update the amount of records to show
  getRecords() {
    return this.pagerRecords;
  }
  setRecords(records: String) {
    if (records === '10') {
      this.router.navigate([], { queryParams: { records: null }, relativeTo: this.route, queryParamsHandling: 'merge' });
    } else {
      this.router.navigate([], { queryParams: { records: records }, relativeTo: this.route, queryParamsHandling: 'merge' });
    }
    this.pagerRecords = records;
  }


  // Update the company used to filter results
  getCompany() {
    return this.company;
  }
  setCompany(company: String) {
    this.router.navigate([], { queryParams: { company: company }, relativeTo: this.route, queryParamsHandling: 'merge' });
    this.company = company;
  }

  // Update the selected user, used to filter results
  getUser() {
    return this.user;
  }
  setUser(user: String) {
    this.router.navigate([], { queryParams: { user: user }, relativeTo: this.route, queryParamsHandling: 'merge' });
    this.user = user;
  }

  // Loading Status
  getLoadingStatus() {
    return this.loadingStatusSource.asObservable();
  }

  setLoadingStatus(_newStatus) {
    this.loadingStatusSource.next(_newStatus);
  }

  // redirect to page
  redirect(pUrl) {
    if (pUrl) {
      this.router.navigate(['/' + pUrl]);
    }
  }
}
