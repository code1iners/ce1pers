export interface IGenerateProps {
  take?: number;
  data: any[];
}

export interface IGeneratePageData {
  index: number;
  page: number;
  data: any[];
}
export interface IGenerateResult {
  count: number;
  pages: IGeneratePageData[];
  currentPage: IGeneratePageData;
  firstPage: IGeneratePageData | null;
  lastPage: IGeneratePageData | null;
  hasNext: boolean;
  hasPrevious: boolean;
  next: () => IGenerateResult;
  previous: () => IGenerateResult;
}