import { Injectable } from '@angular/core';

import { HttpService } from '@common/services';

@Injectable({
	providedIn: 'root'
})
export class ClientsService {

	constructor(
		private _httpService: HttpService,
	) { }

	getClients(filterBoxOptions) {
		return this._httpService.post(`clients/view`, filterBoxOptions);
	}
}
