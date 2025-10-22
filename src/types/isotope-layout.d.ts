declare module 'isotope-layout' {
  interface IsotopeSortAscending {
    [key: string]: boolean;
  }

  interface IsotopeArrangeOptions {
    filter?: string | ((itemElement: Element) => boolean);
    sortBy?: string;
    sortAscending?: boolean | IsotopeSortAscending;
  }

  export interface IsotopeOptions {
    itemSelector?: string;
    layoutMode?: string;
    getSortData?: Record<string, (itemElement: Element) => unknown>;
    sortBy?: string | string[];
    sortAscending?: boolean | IsotopeSortAscending;
    transitionDuration?: string | number;
    masonry?: {
      columnWidth?: string | number | Element;
      gutter?: number | string;
    };
    percentPosition?: boolean;
  }

  export default class Isotope {
    constructor(element: Element | null, options?: IsotopeOptions);

    arrange(options?: IsotopeArrangeOptions): void;
    layout(): void;
    destroy(): void;
    updateSortData(): void;
  }
}
