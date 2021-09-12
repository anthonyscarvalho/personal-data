import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'acc-account-records-view',
	templateUrl: './account-records-view.component.html',
	styleUrls: ['./account-records-view.component.scss']
})
export class AccountRecordsViewComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;
	}

}
