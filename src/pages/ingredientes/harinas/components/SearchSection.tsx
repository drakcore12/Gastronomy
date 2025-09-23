import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { type Harina, FAMILIAS, USOS_CULINARIOS } from '../data/harinas';

// Iconos SVG simples
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface SearchSectionProps {
  query: string;
  setQuery: (query: string) => void;
  filteredLength: number;
  harinas: Harina[];
  selectedFamilia: string;
  setSelectedFamilia: (familia: string) => void;
  selectedUso: string;
  setSelectedUso: (uso: string) => void;
  proteinaRange: [number, number];
  setProteinaRange: (range: [number, number]) => void;
  sinGluten: boolean;
  setSinGluten: (value: boolean) => void;
  mostrarComparador: boolean;
  setMostrarComparador: (value: boolean) => void;
}

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

function FilterDropdown({ label, options, selected, onSelect, isOpen, onToggleOpen }: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <ChevronDownIcon 
          className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="space-y-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    onToggleOpen();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 transition-colors ${
                    selected === option ? 'bg-orange-50 text-orange-700 font-medium' : 'text-slate-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchSection({
  query,
  setQuery,
  filteredLength,
  harinas,
  selectedFamilia,
  setSelectedFamilia,
  selectedUso,
  setSelectedUso,
  proteinaRange,
  setProteinaRange,
  sinGluten,
  setSinGluten,
  mostrarComparador,
  setMostrarComparador
}: SearchSectionProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Extraer opciones únicas de las harinas
  const filterOptions = useMemo(() => {
    const usos = Array.from(new Set(harinas.flatMap(h => h.usosIdeales))).sort();
    return { usos };
  }, [harinas]);

  const totalActiveFilters = 
    (selectedFamilia !== 'all' ? 1 : 0) + 
    (selectedUso !== 'all' ? 1 : 0) + 
    (proteinaRange[0] > 0 || proteinaRange[1] < 25 ? 1 : 0) + 
    (sinGluten ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedFamilia('all');
    setSelectedUso('all');
    setProteinaRange([0, 25]);
    setSinGluten(false);
  };

  return (
    <section id="harinas" className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="harinas-heading">
      {/* Header con búsqueda */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 id="harinas-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Biblioteca de Harinas{' '}
          <span className="text-sm font-normal text-slate-500" aria-label={`${filteredLength} harinas disponibles`}>
            ({filteredLength})
          </span>
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <label htmlFor="buscar-harina" className="sr-only">
              Buscar harinas
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="buscar-harina"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar harina, uso, alias o descripción…"
              className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-900 outline-none ring-orange-500 placeholder:text-slate-400 focus:ring-2"
              autoComplete="off"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Busca por nombre de la harina, uso, alias o descripción. Los resultados se filtrarán automáticamente.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || totalActiveFilters > 0
                ? 'bg-orange-50 border-orange-200 text-orange-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros</span>
            {totalActiveFilters > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {totalActiveFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Filtros Avanzados</h3>
            {totalActiveFilters > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                <XMarkIcon className="h-4 w-4" />
                Limpiar todo ({totalActiveFilters})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda - Filtros de selección */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Filtros de Selección</h4>
              
              {/* Familia */}
              <FilterDropdown
                label="Familia"
                options={['Todas las familias', ...FAMILIAS.map(f => f.nombre)]}
                selected={selectedFamilia === 'all' ? 'Todas las familias' : FAMILIAS.find(f => f.id === selectedFamilia)?.nombre || 'Todas las familias'}
                onSelect={(value) => {
                  if (value === 'Todas las familias') {
                    setSelectedFamilia('all');
                  } else {
                    const familia = FAMILIAS.find(f => f.nombre === value);
                    if (familia) setSelectedFamilia(familia.id);
                  }
                }}
                isOpen={openDropdown === 'familia'}
                onToggleOpen={() => setOpenDropdown(openDropdown === 'familia' ? null : 'familia')}
              />

              {/* Uso culinario */}
              <FilterDropdown
                label="Uso culinario"
                options={['Todos los usos', ...filterOptions.usos]}
                selected={selectedUso === 'all' ? 'Todos los usos' : selectedUso}
                onSelect={(value) => {
                  if (value === 'Todos los usos') {
                    setSelectedUso('all');
                  } else {
                    setSelectedUso(value);
                  }
                }}
                isOpen={openDropdown === 'uso'}
                onToggleOpen={() => setOpenDropdown(openDropdown === 'uso' ? null : 'uso')}
              />
            </div>

            {/* Columna derecha - Filtros especiales */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Filtros Especiales</h4>
              
              {/* Rango de proteína */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700">
                    Proteína: {proteinaRange[0]}% - {proteinaRange[1]}%
                  </label>
                  {(proteinaRange[0] > 0 || proteinaRange[1] < 25) && (
                    <button
                      type="button"
                      onClick={() => setProteinaRange([0, 25])}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                      title="Resetear rango de proteína"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={proteinaRange[0]}
                    onChange={(e) => setProteinaRange([Number(e.target.value), proteinaRange[1]])}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={proteinaRange[1]}
                    onChange={(e) => setProteinaRange([proteinaRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Sin gluten */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Solo sin gluten</label>
                <button
                  type="button"
                  onClick={() => setSinGluten(!sinGluten)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    sinGluten ? 'bg-green-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      sinGluten ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Comparador */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Mostrar comparador</label>
                <button
                  type="button"
                  onClick={() => setMostrarComparador(!mostrarComparador)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mostrarComparador ? 'bg-orange-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mostrarComparador ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Resumen de filtros activos */}
          {totalActiveFilters > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {/* Familia */}
                {selectedFamilia !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {FAMILIAS.find(f => f.id === selectedFamilia)?.nombre}
                    <button
                      type="button"
                      onClick={() => setSelectedFamilia('all')}
                      className="hover:text-orange-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {/* Uso */}
                {selectedUso !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    {selectedUso}
                    <button
                      type="button"
                      onClick={() => setSelectedUso('all')}
                      className="hover:text-orange-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {/* Proteína */}
                {(proteinaRange[0] > 0 || proteinaRange[1] < 25) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Proteína: {proteinaRange[0]}%-{proteinaRange[1]}%
                    <button
                      type="button"
                      onClick={() => setProteinaRange([0, 25])}
                      className="hover:opacity-70"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {/* Sin gluten */}
                {sinGluten && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Sin Gluten
                    <button
                      type="button"
                      onClick={() => setSinGluten(false)}
                      className="hover:opacity-70"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
