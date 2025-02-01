export type getRequest = {
  bankAccount?: string;
  column?: string;
  date?: string;
  dir?: string;
  displayType?: string;
  invoiceFilter?: string;
  page?: number;
  pagerRecords?: string;
  searchPhrase?: string;
  state?: string;
  totalRecords?: string;
  user?: string;
}

export type postRequest = {
  entityId?: string;
  moduleType?: string;
}
