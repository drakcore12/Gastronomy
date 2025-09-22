import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MAIN_CATEGORIES, PAGE_MAP } from '../constants';
import { PageKey } from '../types';

interface SimpleNavigationProps {
  currentPage: PageKey;
  onNavigate?: (page: PageKey) => void;
}

export default function SimpleNavigation({ currentPage, onNavigate }: SimpleNavigationProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  if (!onNavigate) return null;

  return (
    <nav className="flex items-center space-x-1">
      {MAIN_CATEGORIES.map((category) => {
        const Icon = category.icon;
        const isActive = currentPage === category.page;
        const hasSubcategories = category.subcategories.length > 0;
        const isHovered = hoveredCategory === category.id;

        return (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Botón principal */}
            <button
              type="button"
              onClick={() => onNavigate(category.page)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? `${category.color} shadow-sm` 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {category.name}
              {hasSubcategories && (
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
              )}
            </button>

            {/* Subcategorías en hover */}
            {hasSubcategories && isHovered && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    type="button"
                    onClick={() => onNavigate(subcategory.page)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-150"
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
