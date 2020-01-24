import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableHead;
  @Input() tableBody;
  @Input() editModule;
  @Input() filterBoxOptions;
  @Output('updater') _updater = new EventEmitter<any>();

  constructor(
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
  }

  changeColumn(pNewColumn: string) {
    if (pNewColumn === this.filterBoxOptions.column) {
      if (this.filterBoxOptions.dir === 'ASC') {
        this._generalService.setActiveDir('DESC');
        this.filterBoxOptions.dir = 'DESC';
      } else {
        this._generalService.setActiveDir('ASC');
        this.filterBoxOptions.dir = 'ASC';
        this.filterBoxOptions.column = '';
        pNewColumn = null;
      }
    } else {
      this.filterBoxOptions.dir = 'ASC';
      this._generalService.setActiveDir('ASC');
    }
    this.filterBoxOptions.column = pNewColumn;
    this._generalService.setActiveColumn(pNewColumn);
    this._updater.emit('load');
  }

  updatePage(event: any) {
    this.filterBoxOptions.page = event.page;
    this._generalService.setPage(event.page);
    this._updater.emit('load');
  }

  getActiveColumn(currentColumn: string) {
    const activeColumn = this._generalService.getSortColumn();
    if (currentColumn === activeColumn) {
      return true;
    } else {
      return false;
    }
  }

  enable(pId) {
    if (confirm('Are you sure you want to enable this record?')) {
      this._updater.emit({ action: 'enable', record: pId });
    }
  }

  cancel(pId) {
    if (confirm('Are you sure you want to cancel this record?')) {
      this._updater.emit({ action: 'cancel', record: pId });
    }
  }

  delete(pId) {
    if (confirm('Are you sure you want to delete this record?')) {
      this._updater.emit({ action: 'delete', record: pId });
    }
  }
}
