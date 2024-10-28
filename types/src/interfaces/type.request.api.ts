export type getRequest = {
  page?: number;
  pagerRecords?: string;
  column?: string;
  dir?: string;
  searchPhrase?: string;
  state?: string;
  url?: string;
  multi?: boolean;
}

export type postRequest = {
  entityId?: string;
  moduleType?: string;
}
