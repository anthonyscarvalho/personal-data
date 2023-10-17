import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'acc-file-block',
	templateUrl: './file-block.component.html',
	styleUrls: ['./file-block.component.scss']
})
export class FileBlockComponent implements OnInit {
	@Input('file') _file: any;
	@Output() updater = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void { }

	deleteFile() {
		this.updater.emit({ action: 'delete', record: this._file._id });
	}
}
