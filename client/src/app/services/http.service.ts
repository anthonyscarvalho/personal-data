import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(
		private _httpClient: HttpClient
	) { }

	async post(pUrl, pData) {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		return await this._httpClient.post(environment.baseUrl + '/' + pUrl, JSON.stringify(pData), { headers }).toPromise();
	}

	delete(pUrl, pData) {
		return this._httpClient.delete(environment.baseUrl + '/' + pUrl + '/' + pData).toPromise();
	}

	update(pUrl, pId, pData) {
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._httpClient.put(environment.baseUrl + '/' + pUrl + '/' + pId, JSON.stringify(pData), { headers }).toPromise();
	}
}
