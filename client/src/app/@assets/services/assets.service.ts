import { Injectable } from '@angular/core';
// common
import { HttpService } from '@common/services';

@Injectable({
	providedIn: 'root'
})
export class AssetsService {

	constructor(
		private _httpService: HttpService,
	) { }

	getAssets(filterBoxOptions) {
		return this._httpService.post(`assets/view`, filterBoxOptions);
	}
}
