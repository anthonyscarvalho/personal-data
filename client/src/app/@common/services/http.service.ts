import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	config = {
		headers: {
			'Content-Type': 'application/json',
		}
	}

	constructor() { }

	async post(pUrl, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + pUrl;
		const res = await axios.post<{ data: any }>(url, pData, this.config);
		return res.data;
	}

	async get(pUrl, version = 'v1') {
		const url = environment.baseUrl + '/' + pUrl;
		const res = await axios.get<{ data: any }>(url, this.config);
		return res.data;
	}

	async delete(pUrl, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + pUrl + '/' + pData;
		const res = await axios.delete<{ data: any }>(url);
		return res.data;
	}

	async update(pUrl, pId, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + pUrl + '/' + pId;
		const res = await axios.put<{ data: any }>(url, pData, this.config);
		return res.data;
	}
}
