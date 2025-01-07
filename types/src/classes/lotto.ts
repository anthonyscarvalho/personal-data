// // import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { cCommonProperties } from './common-properties';

export class cLotto extends cCommonProperties {
	_id?: any;
	drawDate: string;
	drawNumber: number;
	results: cLottoResults[];
	boardsPlayed: cLottoBoardsPlayed[];
	cost: number;
	paidWith: number;
	description: string;

	constructor(pModel = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.drawDate = pModel?.drawDate || null;
		this.drawNumber = pModel?.drawNumber || null;
		this.results = pModel?.results || null;
		this.boardsPlayed = pModel?.boardsPlayed || null;
		this.cost = pModel?.cost || null;
		this.paidWith = pModel?.paidWith || null;
		this.description = pModel?.description || '';
	}
}

export class cLottoResults {
	lottoType: number;
	ballsDrawn: cLottoBalls[];

	constructor(pModel = null) {
		this.lottoType = pModel?.lottoType || null;
		this.ballsDrawn = pModel?.ballsDrawn || [];
	}
}

export class cLottoBalls {
	position: number;
	number: number;

	constructor(pModel = null) {
		this.position = pModel?.position || null;
		this.number = pModel?.number || null;
	}
}

export class cLottoBoardsPlayed {
	datePlayed: string;
	lottoPlus: boolean;
	lottoPlus2: boolean;
	ballNumber: number[];

	constructor(pModel = null) {
		this.datePlayed = pModel?.datePlayed || new Date();
		this.lottoPlus = pModel?.lottoPlus || false;
		this.lottoPlus2 = pModel?.lottoPlus2 || false;
		this.ballNumber = pModel?.ballNumber || [];
	}
}