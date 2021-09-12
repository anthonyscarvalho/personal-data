import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'acc-contacts-view',
	templateUrl: './contacts-view.component.html',
	styleUrls: ['./contacts-view.component.scss']
})
export class ContactsViewComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;
	}

}
