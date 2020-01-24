import { GeneralService } from '../services/general.service';

export class SortOptionsInterface {
  state: string;
  searchPhrase: string;
  column: string;
  dir: string;
  page: number;
  pagerRecords: string;

  constructor() {
    this.state = '';
    this.searchPhrase = '';
    this.column = '';
    this.dir = '';
    this.page = 1;
    this.pagerRecords = '';
  }
}
