import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'acc-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
	@Input() megaMenu;
	@Input() footer = false;

	constructor() { }

	ngOnInit(): void { }
}
