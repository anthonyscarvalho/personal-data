export class FilterBoxOptionsInterface {
  state: string;
  date: Date;
  invoiceFilter: string;
  user: number;
  searchPhrase: string;
  column: string;
  dir: string;
  page: number;
  pagerRecords: string;
  totalRecords: number;

  constructor() {
    this.state = 'active';
    this.date = new Date();
    this.invoiceFilter = '';
    this.user = 0;
    this.searchPhrase = '';
    this.column = '';
    this.dir = '';
    this.page = 1;
    this.pagerRecords = '';
    this.totalRecords = 0;
  }
}

export class FilterBoxConfigInterface {
  showStatusFilter: boolean;
  showSearch: boolean;
  showPager: boolean;
  pagerTotal: number;
  updateControls: boolean;
  backLink?: string;

  constructor() {
    this.showStatusFilter = true;
    this.showSearch = true;
    this.showPager = true;
    this.pagerTotal = 0;
    this.updateControls = false;
  }
}
