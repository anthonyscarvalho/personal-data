import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  @Input() showStatusFilter: Boolean = true;
  @Input() showPaid: Boolean = false;
  @Input() showSort: Boolean = true;
  @Input() showCompanies: Boolean = false;
  @Input() showUsers: Boolean = false;
  @Input() showSearch: Boolean = true;
  @Input() showPager: Boolean = true;
  @Input() showDue: Boolean = false;
  @Input() pagerTotal: Number = 0;
  @Input() updateControls = false;
  @Input() backLink = '';

  @Output('updater') _updater = new EventEmitter<any>();

  state: string = 'all';
  date: Date = new Date();
  invoiceFilter: string = 'all';
  sortDir: string = 'ASC';
  company: string;
  user: string;
  searchPhrase: string;
  pagerRecords: string;
  currentPage: Number;

  maxSize = 5;

  public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    private generalService: GeneralService,
    private http: HttpService,
  ) {
    this.state = this.generalService.getActiveFilter();
    this.date.setMonth(this.date.getMonth() + 1);
    this.generalService.setDate(this.date);
    this.invoiceFilter = this.generalService.getInvFilter();
    this.sortDir = this.generalService.getSortDir();
    this.user = this.generalService.getUser();
    this.searchPhrase = this.generalService.getSearchPhrase();
    this.pagerRecords = this.generalService.getRecords();
    this.currentPage = this.generalService.getPage();

    this.bsConfig.containerClass = 'theme-dark-blue';
    this.bsConfig.dateInputFormat = 'YYYY-MM-DD'; // Or format like you want
  }
  ngOnInit() {
  }
  refreshRecords() {
    this._updater.emit('load');
  }

  addRecord() {
    this._updater.emit('add');
  }

  updateFilter() {
    this.generalService.setActiveFilter(this.state);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateInvFilter() {
    this.generalService.setInvFilter(this.invoiceFilter);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateDir() {
    this.generalService.setActiveDir(this.sortDir);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateRecords() {
    this.generalService.setRecords(this.pagerRecords);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updatePage(event: any) {
    this.generalService.setPage(event.page);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateDate() {
    this.generalService.setDate(this.date);
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateSearch() {
    if (this.searchPhrase === '') {
      this.generalService.setSearch(null);
    } else {
      this.generalService.setSearch(this.searchPhrase);
    }
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateUser() {
    if (this.user === '0') {
      this.generalService.setUser(null);
    } else {
      this.generalService.setUser(this.user);
    }
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  resetSearch() {
    this.generalService.setSearch('');
    this.searchPhrase = this.generalService.getSearchPhrase();
    this._updater.emit(
      {
        changed: 'true'
      }
    );
  }
  updateForm() {
    this._updater.emit('save');
  }

}
