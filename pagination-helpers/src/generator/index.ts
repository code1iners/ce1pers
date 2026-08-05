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

/**
 * ### Pagination hook.
 */
export const generator = ({ take = 5, data }: IGenerateProps) => {
  let pages: IGeneratePageData[] = [];
  let currentIndex: number = 0;

  // Getters start.

  /**
   * ### Getting current page as index.
   */
  const getCurrentPageAsIndex = (): number => currentIndex;

  /**
   * ### Getting current page as number.
   */
  const getCurrentPageAsNumber = (): number => currentIndex + 1;

  /**
   * ### Getting current page as object.
   */
  const getCurrentPage = (): IGeneratePageData => getCurrentPageData();

  /**
   * ### Getting current page data.
   */
  const getCurrentPageData = (): IGeneratePageData =>
    pages[getCurrentPageAsIndex()];

  /**
   * ### Getting first page as index.
   */
  const getFirstPageAsIndex = (): number | null => {
    if (pages.length) return 0;
    else return null;
  };

  /**
   * ### Getting first page as number.
   */
  const getFirstPageAsNumber = (): number | null => {
    const firstPageIndex = getFirstPageAsIndex();
    if (firstPageIndex !== null) return firstPageIndex + 1;
    return firstPageIndex;
  };

  /**
   * ### Getting first page as object.
   */
  const getFirstPage = () => {
    const firstPageIndex = getFirstPageAsIndex();
    if (firstPageIndex === null) return null;
    return pages[firstPageIndex];
  };

  /**
   * ### Getting last page as index.
   */
  const getLastPageAsIndex = (): number | null => {
    const count = getPagesCount();
    if (count) return count - 1;
    return null;
  };

  /**
   * ### Getting last page as number.
   */
  const getLastPageAsNumber = (): number | null => {
    const lastPageIndex = getLastPageAsIndex();
    if (lastPageIndex !== null) return lastPageIndex + 1;
    return null;
  };

  /**
   * ### Getting last page as object.
   */
  const getLastPage = () => {
    const lastPageIndex = getLastPageAsIndex();
    if (lastPageIndex === null) return null;
    return pages[lastPageIndex];
  };

  /**
   * ### Getting page count.
   * @returns Pages total count.
   */
  const getPagesCount = (): number => Math.ceil(data.length / take);

  /**
   * ### Getting has next page.
   */
  const getHasNext = (): boolean => {
    const currentPage = getCurrentPageAsIndex();
    const lastPage = getLastPageAsIndex();
    if (lastPage === null) return false;

    return currentPage < lastPage;
  };

  /**
   * ### Getting has previous page.
   */
  const getHasPrevious = (): boolean => {
    const currentPage = getCurrentPageAsIndex();
    const firstPage = getFirstPageAsIndex();
    if (firstPage === null) return false;

    return currentPage > firstPage;
  };

  // Getters end.

  // Actions start.

  const goNext = (): IGenerateResult => {
    ++currentIndex;
    return generate();
  };

  const goPrevious = (): IGenerateResult => {
    --currentIndex;
    return generate();
  };

  /**
   * ### Make pages.
   */
  const makePages = (): void => {
    pages = [];
    for (let i = 0; i < getPagesCount(); i++) {
      pages.push({
        index: i,
        page: i + 1,
        data: data.slice(take * i, take * (i + 1)),
      });
    }
  };

  const generate = (): IGenerateResult => {
    // Data is array?
    const isArray = Array.isArray(data);
    if (!isArray) throw new Error("Data is must be array type.");

    // Divide pages.
    makePages();

    // Create result.
    const result: IGenerateResult = {
      count: getPagesCount(),
      pages,
      currentPage: getCurrentPage(),
      firstPage: getFirstPage(),
      lastPage: getLastPage(),
      hasNext: getHasNext(),
      hasPrevious: getHasPrevious(),
      next: goNext,
      previous: goPrevious,
    };

    return result;
  };

  // Actions end.

  return {
    generate,
  };
};
