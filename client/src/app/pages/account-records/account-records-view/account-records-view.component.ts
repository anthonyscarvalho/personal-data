import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// service
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

// interfaces
import { SortOptionsInterface } from '../../../interfaces/sortOptions';
import { AccountRecordsInterface } from '../../../interfaces/accountRecords';

@Component({
  selector: 'app-account-records-view',
  templateUrl: './account-records-view.component.html',
  styleUrls: ['./account-records-view.component.scss']
})
export class AccountRecordsViewComponent implements OnInit {

  private results: AccountRecordsInterface[];
  private sortOptions: SortOptionsInterface;
  totalRecords: string;

  constructor(
    private route: ActivatedRoute,
    private _generalService: GeneralService,
    private _httpService: HttpService,
    private _notificationService: NotificationsService
  ) {
    this._generalService.setTitle('Account Records: View All');
  }

  ngOnInit() {
    localStorage.setItem('activeMenu', 'account-records');
    this.load();
  }

  load() {
    this.sortOptions = new SortOptionsInterface();
    this.sortOptions.state = this._generalService.getActiveFilter();
    this.sortOptions.searchPhrase = this._generalService.getSearchPhrase();
    this.sortOptions.column = this._generalService.getSortColumn();
    this.sortOptions.dir = this._generalService.getSortDir();
    this.sortOptions.page = this._generalService.getPage();
    this.sortOptions.pagerRecords = this._generalService.getRecords();

    this._httpService.post('accountRecords/view', this.sortOptions).then((results: any) => {
      if (results.status === '00') {
        this.results = results.data;
        this.totalRecords = results.records;
      }
    });
  }

  getActiveColumn(currentColumn: string) {
    const activeColumn = this._generalService.getSortColumn();
    if (currentColumn === activeColumn) {
      return 'active pointer';
    } else {
      return 'pointer';
    }
  }

  enable(pId) {
    if (confirm('Are you sure you want to enable this record?')) {
      this._httpService.post('accounts/enable', {
        id: pId
      }).then((results: any) => {
        if (results.status === '00') {
          this.load();
          this._notificationService.success(results.message);
        } else {
          if (results.errors) {
            results.errors.forEach(pError => {
              this._notificationService.warn(pError);
            });
          }
        }
      });
    }
  }

  cancel(pId) {
    if (confirm('Are you sure you want to cancel this record?')) {
      this._httpService.post('accounts/cancel', {
        id: pId
      }).then((results: any) => {
        if (results.status === '00') {
          this.load();
          this._notificationService.success(results.message);
        } else {
          if (results.errors) {
            results.errors.forEach(pError => {
              this._notificationService.warn(pError);
            });
          }
        }
      });
    }
  }

  delete(pId) {
    if (confirm('Are you sure you want to delete this record?')) {
      this._httpService.delete('accounts/delete', pId).then((results: any) => {
        if (results.status === '00') {
          this.load();
          this._notificationService.success(results.message);
        } else {
          if (results.errors) {
            results.errors.forEach(pError => {
              this._notificationService.warn(pError);
            });
          }
        }
      });
    }
  }

}
