import React, { useMemo } from 'react';
import './Header.css';
import { HeaderProps, PageKey } from './types';
import { PAGE_MAP, MAIN_CATEGORIES } from './constants';
import { useHeaderState, useHeaderNavigation } from './hooks';
import {
  MobileMenuButton,
  MobileMenuContent,
  PageIndicator,
  Logo
} from './components';

export default function Header({
  currentPage = 'home',
  onBack,
  showBackButton = false,
  onNavigate,
  showCategories = false,
  className = ''
}: HeaderProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen, isScrolled, isTransitioning } =
    useHeaderState(currentPage);
  
  // Usar el hook centralizado de navegación
  const { handleLinkClick, getPageHref, isPageActive } = useHeaderNavigation();
  
  const pageInfo = useMemo(() => PAGE_MAP[currentPage], [currentPage]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-700 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Saltar al contenido principal
      </a>

      {/* Header Principal */}
      <header
        className={`
          sticky top-0 z-30 border-b border-slate-200 
          transition-all duration-300 ease-out
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/80 backdrop-blur-sm'
          } 
          ${className}
        `}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo isScrolled={isScrolled} onNavigate={onNavigate} />

            {/* Navegación principal */}
            <div className="flex items-center gap-4">
              {/* Categorías principales */}
              {onNavigate && (
                <div className="hidden md:flex items-center gap-2">
                  {MAIN_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isActive = isPageActive(category.page);
                    const href = getPageHref(category.page);
                    
                    return (
                      <a
                        key={category.id}
                        href={href}
                        onClick={(e) => handleLinkClick(category.page, e)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200
                          ${isActive 
                            ? `${category.color} shadow-sm` 
                            : 'text-slate-600 hover:text-[#ff751f] hover:bg-[#fff5f0]'
                          }
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Botón de menú móvil */}
              {onNavigate && (
                <MobileMenuButton
                  isOpen={isMobileMenuOpen}
                  onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              )}

            </div>
          </div>
        </div>
      </header>

      {/* Secundario: subcategorías + estado de página - Solo Desktop */}
      <div className={`
        hidden md:block bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 
        transition-all duration-500 ease-out overflow-hidden
        ${isTransitioning ? 'opacity-50' : 'opacity-100'}
      `}>
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Indicador de página actual */}
            <PageIndicator 
              pageInfo={pageInfo}
              isTransitioning={isTransitioning}
            />

            {/* Subcategorías con transición - Lado derecho */}
            {onNavigate && (
              <div className="flex items-center gap-2 min-h-[40px]">
                {(() => {
                  console.log('Renderizando subcategorías, onNavigate:', !!onNavigate);
                  // Encontrar la categoría actual y mostrar sus subcategorías
                  let currentCategory = MAIN_CATEGORIES.find(cat => cat.page === currentPage);
                  
                  // Si no encontramos la categoría directamente, buscar por subcategorías
                  if (!currentCategory) {
                    currentCategory = MAIN_CATEGORIES.find(cat => 
                      cat.subcategories?.some(sub => sub.page === currentPage)
                    );
                  }
                  
                  console.log('currentPage:', currentPage);
                  console.log('currentCategory encontrada:', currentCategory);
                  
                  if (!currentCategory || !currentCategory.subcategories || currentCategory.subcategories.length === 0) {
                    return (
                      <div className="text-slate-500 text-sm">
                        Selecciona una categoría para ver sus subcategorías
                      </div>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2 animate-fade-in">
                      {currentCategory.subcategories.map((subcat, index) => {
                        const isActive = isPageActive(subcat.page);
                        const subcatInfo = PAGE_MAP[subcat.page];
                        const SubcatIcon = subcatInfo.icon;
                        const href = getPageHref(subcat.page);
                        
                        console.log('Renderizando botón para subcategoría:', subcat.page);
                        return (
                          <a
                            key={subcat.id}
                            href={href}
                            onClick={(e) => handleLinkClick(subcat.page, e)}
                            className={`
                              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                              transition-all duration-300 transform
                              ${isActive 
                                ? 'bg-[#fff5f0] text-[#ff751f] shadow-sm scale-105' 
                                : 'text-slate-600 hover:scale-105 hover:text-[#ff751f] hover:bg-[#fff5f0]'
                              }
                            `}
                            style={{
                              animationDelay: `${index * 100}ms`
                            }}
                          >
                            <SubcatIcon className="h-4 w-4" />
                            {subcat.name}
                          </a>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil con doble despliegue */}
      {onNavigate && (
        <div className={`
          md:hidden bg-white border-b border-slate-200 overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="mx-auto max-w-7xl px-4 py-4">
            <MobileMenuContent 
              currentPage={currentPage}
              onNavigate={onNavigate}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}