import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'acc-account-records-edit',
	templateUrl: './account-records-edit.component.html',
	styleUrls: ['./account-records-edit.component.scss']
})
export class AccountRecordsEditComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;
	}

}
