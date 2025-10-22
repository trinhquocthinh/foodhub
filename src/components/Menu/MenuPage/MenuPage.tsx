'use client';

import { useMemo, useState } from 'react';
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

  const activeTagList = useMemo<MenuDietaryFilter['id'][]>(
    () => Array.from(activeTags),
    [activeTags]
  );

  const menuSubtitle =
    "Filter, sort, and discover plates made to share or savor solo. Animations are powered by our kitchen's rhythm so everything stays lively.";

  const sortConfig = useMemo(
    () => sortOptions.find(option => option.id === activeSort),
    [activeSort, sortOptions]
  );

  // Filter and sort items
  const displayedItems = useMemo(() => {
    // First filter
    let filtered = items.filter(item =>
      matchesFilters({
        item,
        activeCategory,
        activeTags: activeTagList,
      })
    );

    // Then sort
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        let compareValue = 0;

        switch (sortConfig.sortBy) {
          case 'price':
            compareValue = a.price - b.price;
            break;
          case 'rating':
            compareValue = (a.rating ?? 0) - (b.rating ?? 0);
            break;
          case 'name':
            compareValue = a.name.localeCompare(b.name);
            break;
          case 'original':
          default:
            // Keep original order (based on items array index)
            compareValue = items.indexOf(a) - items.indexOf(b);
            break;
        }

        return sortConfig.sortAscending === false
          ? -compareValue
          : compareValue;
      });
    }

    return filtered;
  }, [items, activeCategory, activeTagList, sortConfig]);

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

  const resultLabel = `${displayedItems.length} ${
    displayedItems.length === 1 ? 'dish' : 'dishes'
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

          <div className="menu-grid" aria-live="polite">
            {displayedItems.map((item, index) => (
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
