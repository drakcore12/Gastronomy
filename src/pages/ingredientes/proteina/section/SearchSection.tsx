import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { type Cut } from '../data/cuts';

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
  cuts: Cut[];
  onFiltersChange: (filters: {
    metodos: string[];
    especies: string[];
    primals: string[];
    grasa: string[];
    proteina: string[];
  }) => void;
}

interface DropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  steps: string[];
  colors: string[];
}

function FilterDropdown({ label, options, selected, onToggle, onClear, isOpen, onToggleOpen }: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          {selected.length > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              {selected.length}
            </span>
          )}
        </div>
        <ChevronDownIcon 
          className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {selected.length > 0 && (
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">
                  {selected.length} seleccionado{selected.length !== 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={onClear}
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  Limpiar
                </button>
              </div>
            )}
            <div className="space-y-1">
              {options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <label
                    key={option}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(option)}
                      className="h-4 w-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <span className={`text-sm ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RangeSlider({ label, value, onChange, min, max, steps, colors, onClear }: RangeSliderProps & { onClear?: () => void }) {
  const allSteps = ['Sin filtro', ...steps];
  const allColors = ['bg-slate-100 text-slate-600', ...colors];
  const currentStep = allSteps[value];
  const currentColor = allColors[value];
  const isAtMin = value === min;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentColor}`}>
            {currentStep}
          </span>
          {!isAtMin && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Resetear a sin filtro"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #64748b 0%, #ef4444 25%, #f59e0b 62.5%, #22c55e 100%)`
          }}
        />
        
        {/* Marcas de los pasos */}
        <div className="flex justify-between mt-1">
          {allSteps.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => onChange(index)}
              className={`text-xs transition-colors ${
                index === value 
                  ? 'text-slate-900 font-medium' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchSection({
  query,
  setQuery,
  filteredLength,
  cuts,
  onFiltersChange
}: SearchSectionProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    metodos: [] as string[],
    especies: [] as string[],
    primals: [] as string[],
    grasa: 0, // 0 = sin filtro, 1 = baja, 2 = media, 3 = alta
    proteina: 0, // 0 = sin filtro, 1 = baja, 2 = media, 3 = alta
  });

  // Extraer opciones únicas de los cortes
  const filterOptions = useMemo(() => {
    const metodos = Array.from(new Set(cuts.flatMap(c => c.metodos || []))).sort();
    const especies = Array.from(new Set(cuts.map(c => c.especie).filter(Boolean))).sort();
    const primals = Array.from(new Set(cuts.map(c => c.primal?.es).filter(Boolean))).sort() as string[];

    return { metodos, especies, primals };
  }, [cuts]);

  const handleFilterToggle = (category: keyof typeof filters, value: string) => {
    if (category === 'grasa' || category === 'proteina') return;
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value]
      };
      onFiltersChange({
        ...newFilters,
        grasa: ['baja', 'media', 'alta'].slice(0, newFilters.grasa),
        proteina: ['baja', 'media', 'alta'].slice(0, newFilters.proteina),
      });
      return newFilters;
    });
  };

  const handleFilterClear = (category: keyof typeof filters) => {
    if (category === 'grasa' || category === 'proteina') return;
    
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: []
      };
      onFiltersChange({
        ...newFilters,
        grasa: ['baja', 'media', 'alta'].slice(0, newFilters.grasa),
        proteina: ['baja', 'media', 'alta'].slice(0, newFilters.proteina),
      });
      return newFilters;
    });
  };

  const handleRangeChange = (category: 'grasa' | 'proteina', value: number) => {
    setFilters(prev => {
      const newFilters = { ...prev, [category]: value };
      onFiltersChange({
        ...newFilters,
        grasa: newFilters.grasa > 0 ? ['baja', 'media', 'alta'].slice(0, newFilters.grasa) : [],
        proteina: newFilters.proteina > 0 ? ['baja', 'media', 'alta'].slice(0, newFilters.proteina) : [],
      });
      return newFilters;
    });
  };

  const handleRangeClear = (category: 'grasa' | 'proteina') => {
    setFilters(prev => {
      const newFilters = { ...prev, [category]: 0 }; // Reset to no filter
      onFiltersChange({
        ...newFilters,
        grasa: newFilters.grasa > 0 ? ['baja', 'media', 'alta'].slice(0, newFilters.grasa) : [],
        proteina: newFilters.proteina > 0 ? ['baja', 'media', 'alta'].slice(0, newFilters.proteina) : [],
      });
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      metodos: [],
      especies: [],
      primals: [],
      grasa: 0,
      proteina: 0,
    };
    setFilters(emptyFilters);
    onFiltersChange({
      ...emptyFilters,
      grasa: [],
      proteina: [],
    });
  };

  const totalActiveFilters = 
    filters.metodos.length + 
    filters.especies.length + 
    filters.primals.length + 
    (filters.grasa > 0 ? 1 : 0) + 
    (filters.proteina > 0 ? 1 : 0);

  return (
    <section id="cortes" className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="cortes-heading">
      {/* Header con búsqueda */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 id="cortes-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Cortes de Carne{' '}
          <span className="text-sm font-normal text-slate-500" aria-label={`${filteredLength} cortes disponibles`}>
            ({filteredLength})
          </span>
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <label htmlFor="buscar-corte" className="sr-only">
              Buscar cortes de carne
            </label>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              id="buscar-corte"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar corte, alias, primal o descripción…"
              className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-900 outline-none ring-amber-500 placeholder:text-slate-400 focus:ring-2"
              autoComplete="off"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Busca por nombre del corte, alias, primal o descripción. Los resultados se filtrarán automáticamente.
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || totalActiveFilters > 0
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros</span>
            {totalActiveFilters > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
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
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                <XMarkIcon className="h-4 w-4" />
                Limpiar todo ({totalActiveFilters})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Columna izquierda - Filtros de selección múltiple */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Filtros de Selección</h4>
              
              {/* Métodos de cocción */}
              <FilterDropdown
                label="Métodos de cocción"
                options={filterOptions.metodos}
                selected={filters.metodos}
                onToggle={(value) => handleFilterToggle('metodos', value)}
                onClear={() => handleFilterClear('metodos')}
                isOpen={openDropdown === 'metodos'}
                onToggleOpen={() => setOpenDropdown(openDropdown === 'metodos' ? null : 'metodos')}
              />

              {/* Primals */}
              <FilterDropdown
                label="Cortes primarios"
                options={filterOptions.primals}
                selected={filters.primals}
                onToggle={(value) => handleFilterToggle('primals', value)}
                onClear={() => handleFilterClear('primals')}
                isOpen={openDropdown === 'primals'}
                onToggleOpen={() => setOpenDropdown(openDropdown === 'primals' ? null : 'primals')}
              />
            </div>

            {/* Columna derecha - Sliders interactivos */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Niveles de Contenido</h4>
              
              {/* Grasa */}
              <RangeSlider
                label="Contenido de grasa"
                value={filters.grasa}
                onChange={(value) => handleRangeChange('grasa', value)}
                onClear={() => handleRangeClear('grasa')}
                min={0}
                max={3}
                steps={['Baja', 'Media', 'Alta']}
                colors={['bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800']}
              />

              {/* Proteína */}
              <RangeSlider
                label="Contenido de proteína"
                value={filters.proteina}
                onChange={(value) => handleRangeChange('proteina', value)}
                onClear={() => handleRangeClear('proteina')}
                min={0}
                max={3}
                steps={['Baja', 'Media', 'Alta']}
                colors={['bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800']}
              />
            </div>
          </div>

          {/* Resumen de filtros activos */}
          {totalActiveFilters > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {/* Métodos */}
                {filters.metodos.map((value) => (
                  <span
                    key={`metodos-${value}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => handleFilterToggle('metodos', value)}
                      className="hover:text-amber-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {/* Especies */}
                {filters.especies.map((value) => (
                  <span
                    key={`especies-${value}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => handleFilterToggle('especies', value)}
                      className="hover:text-amber-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {/* Primals */}
                {filters.primals.map((value) => (
                  <span
                    key={`primals-${value}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => handleFilterToggle('primals', value)}
                      className="hover:text-amber-900"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {/* Grasa */}
                {filters.grasa > 0 && (
                  <span
                    key="grasa"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
                  >
                    Grasa: {['baja', 'media', 'alta'][filters.grasa - 1]}
                    <button
                      type="button"
                      onClick={() => handleRangeClear('grasa')}
                      className="hover:opacity-70"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {/* Proteína */}
                {filters.proteina > 0 && (
                  <span
                    key="proteina"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                  >
                    Proteína: {['baja', 'media', 'alta'][filters.proteina - 1]}
                    <button
                      type="button"
                      onClick={() => handleRangeClear('proteina')}
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
