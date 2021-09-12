import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'acc-edit',
	templateUrl: './contacts-edit.component.html',
	styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data.menu;
	}

}
