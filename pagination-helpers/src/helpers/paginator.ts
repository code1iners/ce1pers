export interface HelperPaginatorProps<T> {
  array: T[];
  take: number;
  offset?: number;
}

export type ArrayValue<T> = T[];

/**
 * Paginator helpers.
 */
export const paginator = <T>({
  array,
  take,
  offset = 10,
}: HelperPaginatorProps<T>) => {
  let __currentPage__: number = 0;
  let __arrayValues__: ArrayValue<T> = [];
  let __cursor__: number = 0;
  let __maxPage__: number = 0;
  let __pageList__: number[] = [];
  let __dividedPageList__: number[][] = [];

  /**
   * Paginator initialize.
   */
  const initialize = () => {
    __arrayValues__ = [...array.slice(0, take)];
    __cursor__ = take;
    __maxPage__ = Math.ceil(array.length / take);
    __pageList__ = [...Array(__maxPage__).keys()];
    __dividedPageList__ = __makePageListWithOffset__(offset);
  };

  /**
   * Getting values of current page.
   */
  const getValues = () => __arrayValues__;

  /**
   * Getting current page value.
   */
  const getCurrentPage = () => __currentPage__;

  /**
   * Go next page.
   */
  const next = () => {
    if (!hasNext()) return __arrayValues__;
    const newCursor = __cursor__ + take;
    __arrayValues__ = array.slice(__cursor__, newCursor);
    __cursor__ = newCursor;
    __currentPage__++;
    return __arrayValues__;
  };

  /**
   * Go Previous page.
   */
  const previous = () => {
    if (!hasPrevious()) return __arrayValues__;
    const newCursor = __cursor__ - take;
    __arrayValues__ = array.slice(__cursor__ - take * 2, newCursor);
    __cursor__ = newCursor;
    __currentPage__--;
    return __arrayValues__;
  };

  /**
   * Go to specific page.
   */
  const goTo = (page: number) => {
    // is unavailable?
    if (page < 0 || page > __maxPage__) return __arrayValues__;
    __arrayValues__ = array.slice(page * take, page * take + take);
    __cursor__ = page * take + take;
    __currentPage__ = page;
    return __arrayValues__;
  };

  /**
   * Go to first page.
   */
  const goFirst = () => goTo(0);

  /**
   * Go to last page.
   */
  const goLast = () => goTo(__maxPage__ - 1);

  /**
   * Check has next page.
   */
  const hasNext = () => array.length > __cursor__;

  /**
   * Check has previous page.
   */
  const hasPrevious = () => __cursor__ - take > 0;

  /**
   * Get page all list.
   */
  const getPageList = () => [...__pageList__];

  /**
   * Get divided page list with offset.
   */
  const getDividedPageList = (offset?: number) =>
    offset ? __makePageListWithOffset__(offset) : __dividedPageList__;

  /**
   * Make page list by offset.
   */
  const __makePageListWithOffset__ = (offset: number) => {
    const list = getPageList();
    __dividedPageList__ = [];
    [...Array(Math.ceil(list.length / offset)).keys()].forEach(() => {
      __dividedPageList__.push(list.splice(0, offset));
    });
    return __dividedPageList__;
  };

  /**
   * Get current page list range.
   */
  const getCurrentPageListRange = () => {
    for (const pageList of __dividedPageList__) {
      if (pageList.includes(__currentPage__)) return pageList;
    }
    return [];
  };

  initialize();

  return {
    getValues,
    getCurrentPage,
    next,
    previous,
    hasNext,
    hasPrevious,
    goTo,
    goFirst,
    goLast,
    getPageList,
    getDividedPageList,
    getCurrentPageListRange,
  };
};
