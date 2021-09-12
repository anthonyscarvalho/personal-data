import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-bar-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class BarEditComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data["menu"];
	}

}
