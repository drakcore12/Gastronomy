import React, { useState } from 'react';
import { PageKey } from '../types';
import { MAIN_CATEGORIES } from '../constants';

interface CategoryMenuProps {
  onNavigate?: (page: PageKey) => void;
  currentPage?: PageKey;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function CategoryMenu({
  onNavigate,
  currentPage,
  isMobile = false,
  isOpen = false,
  onToggle
}: CategoryMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  if (!onNavigate) return null;

  // Solo mostrar subcategorías de ingredientes
  const ingredientesCategory = MAIN_CATEGORIES.find(cat => cat.id === 'ingredientes');
  if (!ingredientesCategory || !ingredientesCategory.subcategories) return null;

  const containerClasses = isMobile 
    ? `grid grid-cols-2 gap-2 transition-all duration-500 ease-out origin-top ${
        isOpen ? 'max-h-96 opacity-100 scale-y-100 mt-2' : 'max-h-0 opacity-0 scale-y-0 overflow-hidden'
      }`
    : 'flex items-center gap-1.5';

  return (
    <div className={containerClasses}>
      {ingredientesCategory.subcategories.map((subcat, index) => {
        const isActive = currentPage === subcat.page;
        const isHovered = hoveredCategory === subcat.id;
        
        return (
          <button
            key={subcat.id}
            onClick={() => {
              onNavigate(subcat.page);
              if (isMobile && onToggle) {
                setTimeout(() => onToggle(), 150);
              }
            }}
            onMouseEnter={() => setHoveredCategory(subcat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`
              group relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium
              rounded-lg border border-transparent
              transition-all duration-300 ease-out
              transform hover:scale-105 hover:shadow-md
              ${isActive 
                ? 'bg-blue-50 text-blue-600 shadow-sm scale-105' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 hover:border-blue-300'
              }
              ${isMobile ? 'w-full justify-start' : ''}
              ${isOpen && isMobile ? `animate-fade-in-up animation-delay-${index * 50}` : ''}
            `}
            style={{
              animationDelay: isMobile ? `${index * 50}ms` : '0ms'
            }}
            title={`Ver ${subcat.name}`}
            type="button"
          >
            <span className={`${isMobile ? 'block' : 'hidden sm:inline'} transition-all duration-300`}>
              {subcat.name}
            </span>
            
            {/* Indicador de activo */}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-current rounded-full animate-pulse" />
            )}
            
            {/* Tooltip en desktop */}
            {!isMobile && (
              <span className={`
                absolute -bottom-8 left-1/2 transform -translate-x-1/2
                px-2 py-1 text-xs text-white bg-slate-800 rounded
                opacity-0 group-hover:opacity-100 pointer-events-none
                transition-all duration-300 whitespace-nowrap
                ${isHovered ? 'translate-y-0' : 'translate-y-1'}
              `}>
                Ver {subcat.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}