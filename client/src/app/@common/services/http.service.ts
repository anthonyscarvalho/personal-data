import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import axios from "axios";

import { NotificationsService } from '@common/services';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	config = {
		headers: {
			'Content-Type': 'application/json',
		}
	}
	constructor(
		private _httpClient: HttpClient,
		private _notificationsService: NotificationsService,
	) { }

	async post(pUrl, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + pUrl;
		const res = await axios.post<{ data: any }>(url, pData, this.config);
		return res.data;
	}

	async get(pUrl, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + pUrl;
		const res = await axios.get<{ data: any }>(url, this.config);
		return res.data;
	}

	async delete(pUrl, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + pUrl + '/' + pData;
		const res = await axios.delete<{ data: any }>(url);
		return res.data;
	}

	async update(pUrl, pId, pData, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + pUrl + '/' + pId;
		const res = await axios.put<{ data: any }>(url, pData, this.config);
		return res.data;
	}

	async consumerUpdate(pModuleType, pEntityId, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + `consumer/update`;
		const res = await axios.post<{ data: any }>(url, { moduleType: pModuleType, entityId: pEntityId }, this.config).then((pResult: any) => { this._notificationsService.success('message sent'); });
	}

	async consumerScrape(pActionUrl, pActionRecord, multi, version = 'v1') {
		const url = environment.baseUrl + '/' + version + '/' + `consumer/scrape`;
		const res = await axios.post<{ data: any }>(url, { actionUrl: pActionUrl, actionRecord: pActionRecord, actionMulti: multi }, this.config).then((pResult: any) => { this._notificationsService.success('message sent'); });
	}
}
