import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-account-records',
  templateUrl: './account-records.component.html',
  styleUrls: ['./account-records.component.scss']
})
export class AccountRecordsComponent implements OnInit {

  constructor(
    private _generalService: GeneralService
  ) {
    this._generalService.setTitle('Account Records: Add New');
  }

  ngOnInit() {
    localStorage.setItem('activeMenu', 'account-records');
  }

}
