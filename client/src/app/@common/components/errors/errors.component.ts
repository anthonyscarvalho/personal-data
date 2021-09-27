import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'acc-errors',
	templateUrl: './errors.component.html',
	styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
	@Input() element;

	constructor() { }

	ngOnInit() { }
}
