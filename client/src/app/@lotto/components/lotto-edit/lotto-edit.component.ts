import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

import { cLotto, cLottoBoardsPlayed, cLottoResults, cLottoBalls } from "@sharedTypes/classes";
import { RECORD_STATUSES_CONST, CATEGORY_CONST, LOTTO_TYPES, PAYMENT_TYPES } from '@sharedTypes/constants';
import { GeneralService, HttpService, NotificationsService } from '@common/services';


@Component({
	selector: 'acc-lotto-edit',
	templateUrl: './lotto-edit.component.html',
	styleUrls: ['./lotto-edit.component.scss']
})
export class LottoEditComponent implements OnInit {
	megaMenu: any;
	submitted = false;
	error = false;
	add = false;
	parentId: string;
	breakdownIndex: number;
	resultsIndex: number;

	lottoTypes = LOTTO_TYPES;
	paymentTypes = PAYMENT_TYPES;

	resultRecord: cLotto;
	boardsPlayed: cLottoBoardsPlayed;
	lottoResults: cLottoResults;
	addBoard = false;
	addResults = false;

	// select values
	categories: any;
	recordStatuses;

	public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

	constructor(
		private route: ActivatedRoute,
		private datePipe: DatePipe,
		private changeDetectionRef: ChangeDetectorRef,
		private _generalService: GeneralService,
		private _httpService: HttpService,
		private _notificationsService: NotificationsService,
	) {
		this.megaMenu = this.route.snapshot.data.menu;
		this.add = this.route.snapshot.data.add;
		this.lottoResults = new cLottoResults();
		if (this.route.snapshot.paramMap.get(`id`)) {
			this.parentId = this.route.snapshot.paramMap.get(`id`);
		} else {
			this.parentId = null;
			this.resultRecord = new cLotto();
		}
		this.categories = CATEGORY_CONST;
		this.recordStatuses = RECORD_STATUSES_CONST;
		this.boardsPlayed = new cLottoBoardsPlayed();

		this.createLottoResultsBlank();
	}

	ngOnInit(): void {
		if (this.parentId) {
			this.load();
		} else {
			this._generalService.setTitle(`Lotto: Add`);
		}
	}

	createLottoResultsBlank() {
		this.lottoResults = new cLottoResults();
		for (let index = 0; index < 7; index++) {
			this.lottoResults.ballsDrawn[index] = new cLottoBalls({ position: index + 1 });
		}
	}

	load() {
		this._httpService.post(`lotto/edit/` + this.parentId, {}).then((pResults: any) => {
			const _valid = this._generalService.validateResponse(pResults);
			if (_valid === `valid`) {
				this.resultRecord = new cLotto(pResults.data);
				this._generalService.setTitle(`Lotto: Edit - ` + pResults.data.description);
				this.sortResults();
				this.sortBoards();
			}
		});
	}

	sortResults() {
		this.resultRecord.results?.sort((a, b) => a.lottoType < b.lottoType ? -1 : 1)
		this.resultRecord.results?.forEach((result) => {
			result.ballsDrawn.sort((a, b) => {
				if (a.position < 7) return a.number < b.number ? -1 : 1
			});
		});
	}

	sortBoards() {
		this.resultRecord.boardsPlayed?.sort((a, b) => new Date(a.datePlayed) < new Date(b.datePlayed) ? -1 : 1)
	}

	submit() {
		this.submitted = true;
		this.error = false;

		this.resultRecord.created = this.datePipe.transform(new Date(this.resultRecord.created), `yyyy-MM-dd`);
		this.resultRecord.drawDate = this.datePipe.transform(new Date(this.resultRecord.drawDate), `yyyy-MM-dd`);

		if (!this.add) {
			this._httpService.update(`lotto/update`, this.resultRecord._id, this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === `valid`) {
					this._notificationsService.success(pResult.message);
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => {
				this.submitted = false;
			});
		} else {

			this._httpService.post('lotto/add', this.resultRecord).then((pResult: any) => {
				const _valid = this._generalService.validateResponse(pResult);
				if (_valid === 'valid') {
					this._notificationsService.success(pResult.message);
					this.resultRecord = new cLotto();
				} else {
					this._notificationsService.warn(pResult.message);
				}
				setTimeout(() => {
					this.submitted = false;
				}, 500);
			}, (error) => {
				this.submitted = false;
			});
		}
	}

	updateValue(pEvent, pModel) {
		this.resultRecord[pModel] = pEvent;
	}

	addBreakdown() {
		if (this.breakdownIndex === undefined) {
			if (!this.resultRecord.boardsPlayed) {
				this.resultRecord.boardsPlayed = [];
			}
			if (this.boardsPlayed.datePlayed !== ``) {
				this.resultRecord.boardsPlayed.push(this.boardsPlayed);
				this.boardsPlayed = new cLottoBoardsPlayed();
				this.addBoard = false;
			}
		} else {
			this.resultRecord.boardsPlayed[this.breakdownIndex] = this.boardsPlayed;
			this.boardsPlayed = new cLottoBoardsPlayed();
			this.breakdownIndex = undefined;
			this.addBoard = false;
		}
	}

	addResultsBreakdown() {
		if (this.resultsIndex === undefined) {
			if (!this.resultRecord.results) {
				this.resultRecord.results = [];
			}
			if (this.lottoResults.lottoType !== null) {
				this.resultRecord.results.push(this.lottoResults);
				this.addResults = false;
			}
		} else {
			this.resultRecord.results[this.resultsIndex] = this.lottoResults;
			this.resultsIndex = undefined;
			this.addResults = false;
		}
		this.createLottoResultsBlank();
	}

	renderBallsDrawn(pBalls) {
		return pBalls.map((result) => '<span class="lotto-edit__ball">' + (result < 10 ? `0${result}` : result) + '</span>').join('');
	}

	renderResultsBallsDrawn(pBalls) {
		return this.renderBallsDrawn(pBalls.map((result) => result.number));
	}

	editBreakdown(pIndex) {
		this.boardsPlayed = new cLottoBoardsPlayed(this.resultRecord.boardsPlayed[pIndex]);
		this.addBoard = true;
		this.breakdownIndex = pIndex;
	}

	editResultsBreakdown(pIndex) {
		this.lottoResults = new cLottoResults(this.resultRecord.results[pIndex]);
		this.addResults = true;
		this.resultsIndex = pIndex;
	}

	removeBreakdown(pIndex) {
		this.resultRecord.boardsPlayed.splice(pIndex, 1);
	}

	removeResultsBreakdown(pIndex) {
		this.resultRecord.results.splice(pIndex, 1);
	}

	ngAfterContentChecked() {
		this.changeDetectionRef.detectChanges();
	}

	getLottoType(pType) {
		return LOTTO_TYPES.find((type) => type.id === parseInt(pType))['name'];
	}
}
