import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _generalService: GeneralService
  ) {
    this._generalService.setTitle('Dashboard');
  }

  ngOnInit() {
    localStorage.removeItem('activeMenu');
  }

}
