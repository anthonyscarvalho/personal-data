import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// service
import { GeneralService } from '../../../services/general.service';
import { HttpService } from '../../../services/http.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss']
})
export class AccountsViewComponent implements OnInit {

  private results = [];
  private sortOptions = {};
  totalRecords: string;

  constructor(
    private route: ActivatedRoute,
    private _generalService: GeneralService,
    private _httpService: HttpService,
    private _notificationService: NotificationsService
  ) {
    _generalService.setTitle('View All Clients');
    _generalService.setMainNav(true);
    _generalService.setSubNav(false);
  }

  ngOnInit() {
    this.load();
  }

  filterUpdater(pEvent) {
    if (!isArray(pEvent)) {
      if (pEvent == 'load') {
        this.load();
      } else if (pEvent == 'add') {
        this._generalService.redirect('accounts/add');
      }
    }
  }

  changeColumn(newColumn: string) {
    const activeColumn = this._generalService.getSortColumn();
    if (newColumn !== activeColumn) {
      this._generalService.setActiveColumn(newColumn);
      this.load();
    }
  }

  getActiveColumn(currentColumn: string) {
    const activeColumn = this._generalService.getSortColumn();
    if (currentColumn === activeColumn) {
      return 'active pointer';
    } else {
      return 'pointer';
    }
  }

  load() {
    this.sortOptions = {};
    this.sortOptions['state'] = this._generalService.getActiveFilter();
    this.sortOptions['searchPhrase'] = this._generalService.getSearchPhrase();
    this.sortOptions['column'] = this._generalService.getSortColumn();
    this.sortOptions['dir'] = this._generalService.getSortDir();
    this.sortOptions['page'] = this._generalService.getPage();
    this.sortOptions['pagerRecords'] = this._generalService.getRecords();

    this._httpService.post('accounts/view', this.sortOptions).then(results => {
      if (results['status'] === '00') {
        this.results = results['data'];
        this.totalRecords = results['records'];
      }
    });
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
