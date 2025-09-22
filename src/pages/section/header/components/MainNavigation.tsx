import React from 'react';
import { PageKey, HeaderProps } from '../types';
import { PAGE_MAP } from '../constants';

interface MainNavigationProps {
  showCategories: boolean;
  onNavigate?: (page: PageKey) => void;
  currentPage: PageKey;
}

export function MainNavigation({ showCategories, onNavigate, currentPage }: MainNavigationProps) {
  if (!showCategories || !onNavigate) return null;

  return (
    <nav className="hidden md:flex items-center gap-2">
      {['ingredientes', 'recetas', 'tecnicas', 'herramientas', 'examen'].map((page) => {
        const info = PAGE_MAP[page as PageKey];
        const Icon = info.icon;
        const isActive = currentPage === page;
        
        return (
          <button
            key={page}
            type="button"
            onClick={() => onNavigate(page as PageKey)}
            className={`
              group relative px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-300 ease-out transform
              ${isActive 
                ? `${info.lightColor} text-slate-900 scale-105 shadow-sm` 
                : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50 hover:scale-105'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {info.name}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-orange-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
