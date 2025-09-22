import React from 'react';
import { Search } from 'lucide-react';

interface SearchSectionProps {
  query: string;
  setQuery: (query: string) => void;
  filteredLength: number;
  TAGS: string[];
  activeTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

export default function SearchSection({
  query,
  setQuery,
  filteredLength,
  TAGS,
  activeTags,
  toggleTag,
  clearFilters
}: SearchSectionProps) {
  return (
    <section id="frutas" className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="frutas-heading">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 id="frutas-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Catálogo de Frutas{' '}
          <span className="text-sm font-normal text-slate-500" aria-label={`${filteredLength} frutas disponibles`}>
            ({filteredLength})
          </span>
        </h2>

        <div className="relative w-full sm:w-80">
          <label htmlFor="buscar-fruta" className="sr-only">
            Buscar frutas
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="buscar-fruta"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar fruta, técnica, preparación…"
            className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-900 outline-none ring-orange-500 placeholder:text-slate-400 focus:ring-2"
            autoComplete="off"
            aria-describedby="search-help"
          />
          <div id="search-help" className="sr-only">
            Busca por nombre de fruta, técnica, preparación o descripción. Los resultados se filtrarán automáticamente.
          </div>
        </div>
      </div>

      {/* Filtro por técnicas */}
      <div
        className="mb-4 flex flex-wrap gap-2"
        id="tecnicas"
        role="toolbar"
        aria-label="Filtrar por técnicas culinarias"
      >
        <span className="sr-only">Filtros activos: {activeTags.length > 0 ? activeTags.join(', ') : 'ninguno'}</span>
        {TAGS.map((t) => {
          const active = activeTags.includes(t);
          return (
            <button
              key={`tag-${t}`}
              type="button"
              onClick={() => toggleTag(t)}
              aria-pressed={active}
              className={
                'rounded-full border px-3 py-1 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-orange-500 ' +
                (active
                  ? 'border-orange-600 bg-orange-100 text-orange-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50')
              }
            >
              {t}
            </button>
          );
        })}
        {activeTags.length > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Limpiar todos los filtros"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </section>
  );
}
