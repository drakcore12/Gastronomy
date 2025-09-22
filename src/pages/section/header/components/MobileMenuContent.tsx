import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { MAIN_CATEGORIES } from '../constants';
import { PAGE_MAP } from '../constants';
import { PageKey } from '../types';
import { useHeaderNavigation } from '../hooks';

interface MobileMenuContentProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  onClose: () => void;
}

export function MobileMenuContent({ currentPage, onNavigate, onClose }: MobileMenuContentProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { handleLinkClick, getPageHref, isPageActive } = useHeaderNavigation();

  // Encontrar la categoría actual
  let currentCategory = MAIN_CATEGORIES.find(cat => cat.page === currentPage);
  if (!currentCategory) {
    currentCategory = MAIN_CATEGORIES.find(cat => 
      cat.subcategories?.some(sub => sub.page === currentPage)
    );
  }

  // Si estamos en una subcategoría, expandir automáticamente su categoría padre
  React.useEffect(() => {
    if (currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0) {
      setExpandedCategory(currentCategory.id);
    }
  }, [currentCategory]);

  const handleCategoryClick = (categoryId: string, categoryPage: PageKey) => {
    const category = MAIN_CATEGORIES.find(cat => cat.id === categoryId);
    
    if (category?.subcategories && category.subcategories.length > 0) {
      // Si tiene subcategorías, expandir/contraer
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    } else {
      // Si no tiene subcategorías, navegar directamente
      onNavigate(categoryPage);
      onClose();
    }
  };

  const handleSubcategoryClick = (subcategoryPage: PageKey) => {
    onNavigate(subcategoryPage);
    onClose();
  };

  return (
    <div className="space-y-2">
      {/* Botón de cerrar */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Menú</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Categorías principales */}
      {MAIN_CATEGORIES.map((category) => {
        const Icon = category.icon;
        const isActive = currentPage === category.page;
        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
        const isExpanded = expandedCategory === category.id;
        
        return (
          <div key={category.id} className="border-b border-slate-100 last:border-b-0">
            <a
              href={getPageHref(category.page)}
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category.id, category.page);
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg text-left
                transition-all duration-200 group
                ${isActive 
                  ? `${category.color} shadow-sm` 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{category.name}</div>
                  {(category as any).description && (
                    <div className="text-sm text-slate-500">{(category as any).description}</div>
                  )}
                </div>
              </div>
              
              {hasSubcategories && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    {category.subcategories?.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  )}
                </div>
              )}
            </a>

            {/* Subcategorías desplegables */}
            {hasSubcategories && (
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="pl-8 pr-4 py-2 space-y-1">
                  {category.subcategories?.map((subcat, index) => {
                    const isSubActive = currentPage === subcat.page;
                    const subcatInfo = PAGE_MAP[subcat.page];
                    const SubcatIcon = subcatInfo.icon;
                    
                    return (
                      <a
                        key={subcat.id}
                        href={getPageHref(subcat.page)}
                        onClick={(e) => handleLinkClick(subcat.page, e)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                          transition-all duration-200 transform
                          ${isSubActive 
                            ? 'bg-blue-100 text-blue-700 shadow-sm scale-105' 
                            : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                          }
                        `}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        <SubcatIcon className="h-4 w-4 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{subcat.name}</div>
                          {(subcat as any).description && (
                            <div className="text-xs text-slate-500">{(subcat as any).description}</div>
                          )}
                        </div>
                        {isSubActive && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
