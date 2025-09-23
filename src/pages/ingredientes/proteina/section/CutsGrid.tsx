import React, { useState, useMemo } from 'react';
import { type Cut } from '../data/cuts';
import slides from '../data/slides';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CutsGridProps {
  filtered: Cut[];
}

// Función para obtener colores de tips basados en la especie usando slides.ts
function getTipColors(especie: string) {
  const especieMap: { [key: string]: string } = {
    'res': 'res',
    'cerdo': 'cerdo', 
    'pollo': 'pollo',
    'cordero': 'cordero',
    'pavo': 'pavo',
    'cabra': 'cabra',
    'pescado': 'pescado'
  };
  
  const slideKey = especieMap[especie] || 'res';
  const slide = slides.find((s: any) => s.key === slideKey) || slides[0];
  const theme = slide.theme;
  
  // Extraer colores del gradiente del tema
  const bgMatch = theme.bg.match(/from-(\w+)-(\d+)/);
  const viaMatch = theme.bg.match(/via-(\w+)-(\d+)/);
  const toMatch = theme.bg.match(/to-(\w+)-(\d+)/);
  
  const fromColor = bgMatch ? `${bgMatch[1]}-${bgMatch[2]}` : 'red-700';
  const viaColor = viaMatch ? `${viaMatch[1]}-${viaMatch[2]}` : 'red-600';
  const toColor = toMatch ? `${toMatch[1]}-${toMatch[2]}` : 'amber-600';
  
  // Mapear colores de Tailwind a hex para el gradiente
  const colorMap: { [key: string]: string } = {
    'red-700': '#b91c1c',
    'red-600': '#dc2626',
    'amber-600': '#d97706',
    'pink-600': '#db2777',
    'rose-500': '#f43f5e',
    'amber-400': '#fbbf24',
    'yellow-500': '#eab308',
    'orange-500': '#f97316',
    'sky-600': '#0284c7',
    'cyan-500': '#06b6d4',
    'teal-500': '#14b8a6',
    'emerald-700': '#047857',
    'emerald-600': '#059669',
    'lime-500': '#84cc16',
    'orange-700': '#c2410c',
    'purple-700': '#7c3aed',
    'violet-600': '#7c3aed',
    'fuchsia-500': '#d946ef'
  };
  
  const fromHex = colorMap[fromColor] || '#b91c1c';
  const viaHex = colorMap[viaColor] || '#dc2626';
  const toHex = colorMap[toColor] || '#d97706';
  
  return {
    bgGradient: `linear-gradient(135deg, ${fromHex}80, ${viaHex}70, ${toHex}60)`,
    shadow: `0 4px 6px -1px ${fromHex}50, 0 2px 4px -1px ${fromHex}40`,
    textColor: theme.text,
    titleColor: theme.text,
    icon: '💡'
  };
}

export default function CutsGrid({ filtered }: CutsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Calcular paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  // Resetear página cuando cambien los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  if (filtered.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div role="status" aria-live="polite">
          <p className="text-sm text-slate-500">
            No hay resultados con los filtros actuales.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="mx-auto max-w-6xl px-4 py-10"
    >
      {/* Información de paginación */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filtered.length)} de {filtered.length} cortes
        </div>
        <div className="text-sm text-slate-500">
          Página {currentPage} de {totalPages}
        </div>
      </div>

      <div 
        className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        role="grid"
        aria-label={`Lista de ${currentItems.length} cortes de carne`}
      >
      {currentItems.map((c) => (
        <article
          key={c.id}
          className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          role="gridcell"
        >
          {/* Header con nombre y especie */}
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {c.nombre}
            </h3>
            <span 
              className="rounded-md bg-red-700/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-800"
              aria-label={`Especie: ${c.especie ?? 'res'}`}
            >
              {(c.especie ?? 'res').toUpperCase()}
            </span>
          </div>

          {/* Alias */}
          {(c.alias?.length ?? 0) > 0 && (
            <p className="mb-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Alias:</span>{' '}
              {(c.alias ?? []).join(', ')}
            </p>
          )}

          {/* Primal */}
          {c.primal && (
            <p className="mb-2 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Primal:</span>{' '}
              {c.primal.es} <span className="text-slate-400" aria-hidden="true">/</span>{' '}
              {c.primal.en}
              {c.primal.numero && (
                <>
                  <span className="text-slate-400" aria-hidden="true">/</span>{' '}
                  {c.primal.numero}
                </>
              )}
            </p>
          )}

          {/* Información nutricional */}
          <div className="mb-3 flex gap-3">
            {c.grasa && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-medium text-slate-500">Grasa:</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  c.grasa === 'baja' ? 'bg-red-100 text-red-700' :
                  c.grasa === 'media' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {c.grasa.toUpperCase()}
                </span>
              </div>
            )}
            {c.proteina && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-medium text-slate-500">Proteína:</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  c.proteina === 'alta' ? 'bg-green-100 text-green-700' :
                  c.proteina === 'media' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {c.proteina.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Perfil */}
          {c.perfil && (
            <p className="mb-2 text-xs text-slate-600 italic">
              <span className="font-medium text-slate-700">Perfil:</span> {c.perfil}
            </p>
          )}

          {/* Descripción */}
          {c.descripcion && (
            <p className="mb-3 text-sm text-slate-700 leading-relaxed">{c.descripcion}</p>
          )}

          {/* Métodos de cocción */}
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-slate-600 mb-2">Métodos de cocción:</h4>
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Métodos de cocción">
              {(c.metodos ?? []).map((m: string) => (
                <span
                  key={`${c.id}-${m}`}
                  className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-800"
                  role="listitem"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          {c.tips && (() => {
            const tipColors = getTipColors(c.especie || 'res');
            return (
              <div 
                className="mt-3 p-3 rounded-lg"
                style={{ 
                  background: tipColors.bgGradient,
                  boxShadow: tipColors.shadow
                }}
              >
                <h4 className={`text-xs font-semibold ${tipColors.titleColor} mb-1`}>
                  {tipColors.icon} Tip:
                </h4>
                <p className={`text-xs ${tipColors.textColor} leading-relaxed`}>
                  {c.tips}
                </p>
              </div>
            );
          })()}
        </article>
      ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center">
          <nav className="flex items-center gap-2" aria-label="Paginación">
            {/* Botón Anterior */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 1
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1">
              {/* Mostrar páginas */}
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                // Ajustar si estamos cerca del final
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                // Primera página y puntos si es necesario
                if (startPage > 1) {
                  pages.push(
                    <button
                      key={1}
                      onClick={() => goToPage(1)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <span key="dots1" className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                }

                // Páginas visibles
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        i === currentPage
                          ? 'bg-amber-500 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      aria-current={i === currentPage ? 'page' : undefined}
                    >
                      {i}
                    </button>
                  );
                }

                // Última página y puntos si es necesario
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="dots2" className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Página siguiente"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
