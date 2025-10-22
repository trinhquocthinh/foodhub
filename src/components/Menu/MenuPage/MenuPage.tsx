'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IoChevronDown,
  IoChevronUp,
  IoFilter,
  IoReload,
} from 'react-icons/io5';

import { ProductCard } from '@/components';
import { useCart } from '@/context/CartContext';
import type { MenuItem, Product } from '@/types';

import './MenuPage.scss';

type MenuCategory = {
  id: string;
  label: string;
  helper?: string;
};

type MenuDietaryFilter = {
  id: NonNullable<Product['tags']>[number];
  label: string;
};

type MenuSortOption = {
  id: string;
  label: string;
  sortBy: 'original' | 'price' | 'rating' | 'name';
  sortAscending?: boolean;
  helper?: string;
};

type MenuPageProps = {
  items: MenuItem[];
  categories: MenuCategory[];
  dietaryFilters: MenuDietaryFilter[];
  sortOptions: MenuSortOption[];
};

type IsotopeInstance = {
  arrange: (options: {
    filter?: ((element: Element) => boolean) | string;
    sortBy?: string;
    sortAscending?: boolean;
  }) => void;
  destroy: () => void;
  updateSortData: () => void;
};

const MenuPage = ({
  items,
  categories,
  dietaryFilters,
  sortOptions,
}: MenuPageProps) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id ?? 'all'
  );
  const [activeTags, setActiveTags] = useState<Set<MenuDietaryFilter['id']>>(
    new Set()
  );
  const [activeSort, setActiveSort] = useState<string>(
    sortOptions[0]?.id ?? 'recommended'
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isIsotopeReady, setIsIsotopeReady] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const isotopeRef = useRef<IsotopeInstance | null>(null);

  const activeTagList = useMemo<MenuDietaryFilter['id'][]>(
    () => Array.from(activeTags),
    [activeTags]
  );

  const menuSubtitle =
    "Filter, sort, and discover plates made to share or savor solo. Animations are powered by our kitchen's rhythm so everything stays lively.";

  const isotopeFilter = useMemo(
    () => createFilterFn(activeCategory, activeTagList),
    [activeCategory, activeTagList]
  );

  const sortConfig = useMemo(
    () => sortOptions.find(option => option.id === activeSort),
    [activeSort, sortOptions]
  );

  useEffect(() => {
    let isMounted = true;

    const bootstrapIsotope = async () => {
      if (!gridRef.current || typeof window === 'undefined') {
        return;
      }

      const { default: Isotope } = await import('isotope-layout');
      if (!isMounted || !gridRef.current) {
        return;
      }

      const grid = gridRef.current;

      const instance = new Isotope(grid, {
        itemSelector: '.menu-card',
        layoutMode: 'fitRows',
        percentPosition: false,
        transitionDuration: '0.45s',
        getSortData: {
          original: (element: Element) =>
            parseInt(
              (element as HTMLElement).getAttribute('data-original-order') ??
                '0',
              10
            ),
          price: (element: Element) =>
            parseFloat(
              (element as HTMLElement).getAttribute('data-price') ?? '0'
            ),
          rating: (element: Element) =>
            parseFloat(
              (element as HTMLElement).getAttribute('data-rating') ?? '0'
            ),
          name: (element: Element) =>
            (element as HTMLElement).getAttribute('data-name') ?? '',
        },
      });

      isotopeRef.current = instance;
      setIsIsotopeReady(true);
    };

    const timer = setTimeout(bootstrapIsotope, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (isotopeRef.current) {
        isotopeRef.current.destroy();
        isotopeRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const iso = isotopeRef.current;
    if (!iso || !isIsotopeReady) {
      return;
    }

    try {
      iso.updateSortData();
      const arrangeOptions: {
        filter?: ((element: Element) => boolean) | string;
        sortBy?: string;
        sortAscending?: boolean;
      } = {
        filter: isotopeFilter,
      };

      if (sortConfig?.sortBy) {
        arrangeOptions.sortBy = sortConfig.sortBy;
        arrangeOptions.sortAscending = sortConfig.sortAscending;
      }

      iso.arrange(arrangeOptions);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Isotope arrange error:', error);
    }
  }, [isotopeFilter, sortConfig, isIsotopeReady]);

  const filteredItems = useMemo(
    () =>
      items.filter(item =>
        matchesFilters({
          item,
          activeCategory,
          activeTags: activeTagList,
        })
      ),
    [items, activeCategory, activeTagList]
  );

  const toggleTag = (tagId: MenuDietaryFilter['id']) => {
    setActiveTags(previous => {
      const next = new Set(previous);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setActiveCategory(categories[0]?.id ?? 'all');
    setActiveTags(new Set());
    setActiveSort(sortOptions[0]?.id ?? 'recommended');
  };

  const resultLabel = `${filteredItems.length} ${
    filteredItems.length === 1 ? 'dish' : 'dishes'
  }`;

  return (
    <section className="menu-page" aria-labelledby="menu-heading">
      <div className="menu-hero">
        <p className="eyebrow">Explore the full experience</p>
        <h1 className="title" id="menu-heading">
          Full menu
        </h1>
        <p className="subtitle">{menuSubtitle}</p>
      </div>

      <div className="menu-layout">
        <aside
          className={`menu-sidebar${sidebarOpen ? ' open' : ''}`}
          aria-label="Menu filters"
        >
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(previous => !previous)}
            aria-expanded={sidebarOpen}
          >
            <IoFilter aria-hidden="true" />
            Filters
            {sidebarOpen ? (
              <IoChevronUp aria-hidden="true" />
            ) : (
              <IoChevronDown aria-hidden="true" />
            )}
          </button>

          <div className="sidebar-section">
            <div className="sidebar-section__header">
              <h2>Categories</h2>
              <p>Select a lane to shape the table.</p>
            </div>
            <ul>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`filter-chip${
                      activeCategory === category.id ? ' active' : ''
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span>{category.label}</span>
                    {category.helper ? <small>{category.helper}</small> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section__header">
              <h2>Dietary moods</h2>
              <p>Layer on highlights for tailored picks.</p>
            </div>
            <ul className="dietary-list">
              {dietaryFilters.map(filter => (
                <li key={filter.id}>
                  <button
                    type="button"
                    className={`filter-pill${
                      activeTags.has(filter.id) ? ' active' : ''
                    }`}
                    onClick={() => toggleTag(filter.id)}
                    aria-pressed={activeTags.has(filter.id)}
                  >
                    {filter.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetFilters}
            >
              <IoReload aria-hidden="true" />
              Reset filters
            </button>
          </div>
        </aside>

        <div className="menu-main">
          <div className="menu-toolbar" role="toolbar" aria-label="Sorting">
            <div className="toolbar-left">
              <span className="result-count">{resultLabel}</span>
              {activeTagList.length > 0 ? (
                <div className="active-tags" aria-live="polite">
                  {activeTagList.map(tag => (
                    <span key={tag} className="active-tag">
                      {findFilterLabel(tag, dietaryFilters)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="toolbar-right">
              <label htmlFor="sort-menu" className="sort-label">
                Sort by
              </label>
              <div className="sort-select">
                <select
                  id="sort-menu"
                  value={activeSort}
                  onChange={event => setActiveSort(event.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <IoChevronDown aria-hidden="true" />
              </div>
            </div>
          </div>

          <div
            className={`menu-grid${isIsotopeReady ? ' is-loaded' : ''}`}
            ref={gridRef}
            aria-live="polite"
          >
            {items.map((item, index) => (
              <ProductCard
                key={item.id}
                item={item}
                index={index}
                formatTagLabel={formatTagLabel}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const createFilterFn = (
  activeCategory: string,
  activeTags: MenuDietaryFilter['id'][]
) => {
  return (element: Element) => {
    const node = element as HTMLElement;
    const category = node.getAttribute('data-category');
    const tags = (node.getAttribute('data-tags') ?? '')
      .split(',')
      .filter(Boolean) as MenuDietaryFilter['id'][];

    if (activeCategory !== 'all' && category !== activeCategory) {
      return false;
    }

    if (activeTags.length === 0) {
      return true;
    }

    return activeTags.every(tag => tags.includes(tag));
  };
};

const matchesFilters = ({
  item,
  activeCategory,
  activeTags,
}: {
  item: MenuItem;
  activeCategory: string;
  activeTags: MenuDietaryFilter['id'][];
}) => {
  if (activeCategory !== 'all' && item.category !== activeCategory) {
    return false;
  }

  if (activeTags.length === 0) {
    return true;
  }

  const itemTags = (item.tags ?? []) as MenuDietaryFilter['id'][];
  return activeTags.every(tag => itemTags.includes(tag));
};

const findFilterLabel = (
  tag: MenuDietaryFilter['id'],
  dietaryFilters: MenuDietaryFilter[]
) => dietaryFilters.find(filter => filter.id === tag)?.label ?? tag;

const formatTagLabel = (tag: string) => tag.replace('-', ' ');

export default MenuPage;
