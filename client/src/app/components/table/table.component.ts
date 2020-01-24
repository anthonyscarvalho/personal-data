import { Component, Input, OnInit } from '@angular/core';

import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableHead;
  @Input() tableBody;

  constructor(
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
  }

  changeColumn(newColumn: string) {
    const activeColumn = this._generalService.getSortColumn();
    if (newColumn !== activeColumn) {
      this._generalService.setActiveColumn(newColumn);
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

}
