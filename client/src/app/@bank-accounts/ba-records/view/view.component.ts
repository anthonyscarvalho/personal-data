import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-ba-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class BaViewComponent implements OnInit {
	megaMenu: any;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.megaMenu = this.route.snapshot.data["menu"];
	}

}
