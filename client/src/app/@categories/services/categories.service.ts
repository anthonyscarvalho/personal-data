import { Injectable } from '@angular/core';
// common
import { HttpService } from '@common/services';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	constructor(
		private _httpService: HttpService,
	) { }


	getRecords(filterBoxOptions) {
		return this._httpService.post(`categories/view`, filterBoxOptions);
	}
}
