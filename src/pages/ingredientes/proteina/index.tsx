import React, { useMemo, useState, useCallback } from 'react';
import { ALL_CUTS, type Cut } from './data/cuts';
import HeroSlider from './section/heroslider';
import StructuredData from '../../../components/StructuredData';
import { CutsGrid, MethodsSection, RazasSlider } from './section';
import SearchSection from './section/SearchSection';

// GraphicId = SpeciesId (UI)
type SpeciesId =
  | 'cow'
  | 'pig'
  | 'chicken'
  | 'lamb'
  | 'turkey'
  | 'goat'
  | 'fish';

// mapear graphicId -> valor `especie` del dataset
function idToEspecie(id: SpeciesId): Cut['especie'] {
  switch (id) {
    case 'cow':
      return 'res';
    case 'pig':
      return 'cerdo';
    case 'chicken':
      return 'pollo';
    case 'lamb':
      return 'cordero';
    case 'turkey':
      return 'pavo';
    case 'goat':
      return 'cabra';
    case 'fish':
      return 'pescado';
    default: {
      // Protección por si el union cambia en el futuro
      const _exhaustive: never = id as never;
      return 'res';
    }
  }
}

export default function Proteina() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [species, setSpecies] = useState<SpeciesId>('cow'); // default res
  const [advancedFilters, setAdvancedFilters] = useState({
    metodos: [] as string[],
    especies: [] as string[],
    primals: [] as string[],
    grasa: [] as string[],
    proteina: [] as string[],
  });

  // Vincular slider/CTA con la especie seleccionada
  const handleSelectGraphic = useCallback((g: SpeciesId) => {
    setSpecies((prev) => (prev === g ? prev : g));
    setActiveTags([]); // limpiar tags al cambiar especie
  }, []);

  // Dataset por especie (si falta especie en un corte, cae a 'res')
  const baseBySpecies = useMemo(() => {
    const esp = idToEspecie(species);
    return (ALL_CUTS ?? []).filter((c) => (c.especie ?? 'res') === esp);
  }, [species]);

  // Tags únicos (métodos) ordenados
  const TAGS = useMemo(() => {
    const all = baseBySpecies.flatMap((c) => c.metodos ?? []);
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, [baseBySpecies]);

  // Normalizador robusto para búsqueda que maneja tildes, mayúsculas y espacios
  const norm = (s: string) => {
    return s
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina marcas diacríticas (tildes)
      .replace(/\s+/g, ' ') // Normaliza espacios múltiples a uno solo
      .trim();
  };

  // Filtro final con búsqueda flexible y filtros avanzados
  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return baseBySpecies.filter((c) => {
      const alias = (c.alias ?? []).join(' ');
      const primal = c.primal ? `${c.primal.es} ${c.primal.en}` : '';
      const corpus = [
        c.nombre ?? '',
        c.perfil ?? '',
        c.descripcion ?? '',
        alias,
        primal,
        c.grasa ?? '',
        c.proteina ?? '',
      ].join(' ');
      
      // Búsqueda flexible: divide la consulta en palabras y busca cada una
      const matchesQ = q ? (() => {
        const queryWords = q.split(/\s+/).filter(word => word.length > 0);
        const normalizedCorpus = norm(corpus);
        
        // Si no hay palabras, mostrar todo
        if (queryWords.length === 0) return true;
        
        // Buscar que todas las palabras estén presentes (búsqueda AND)
        return queryWords.every(word => normalizedCorpus.includes(word));
      })() : true;

      const methods = c.metodos ?? [];
      const matchesTags = activeTags.length
        ? activeTags.every((t) => methods.includes(t))
        : true;

      // Filtros avanzados
      const matchesAdvancedFilters = (() => {
        // Métodos de cocción
        const matchesMetodos = advancedFilters.metodos.length === 0 || 
          advancedFilters.metodos.some(metodo => methods.includes(metodo));
        
        // Especies
        const matchesEspecies = advancedFilters.especies.length === 0 || 
          advancedFilters.especies.includes(c.especie ?? 'res');
        
        // Primals
        const matchesPrimals = advancedFilters.primals.length === 0 || 
          (c.primal && advancedFilters.primals.includes(c.primal.es));
        
        // Grasa - filtra según el nivel seleccionado
        const matchesGrasa = advancedFilters.grasa.length === 0 || 
          (c.grasa && (() => {
            const grasaLevels = ['baja', 'media', 'alta'];
            const corteLevel = grasaLevels.indexOf(c.grasa);
            const filtroLevel = grasaLevels.indexOf(advancedFilters.grasa[advancedFilters.grasa.length - 1]);
            return corteLevel <= filtroLevel;
          })());
        
        // Proteína - filtra según el nivel seleccionado
        const matchesProteina = advancedFilters.proteina.length === 0 || 
          (c.proteina && (() => {
            const proteinaLevels = ['baja', 'media', 'alta'];
            const corteLevel = proteinaLevels.indexOf(c.proteina);
            const filtroLevel = proteinaLevels.indexOf(advancedFilters.proteina[advancedFilters.proteina.length - 1]);
            return corteLevel <= filtroLevel;
          })());

        return matchesMetodos && matchesEspecies && matchesPrimals && matchesGrasa && matchesProteina;
      })();

      return matchesQ && matchesTags && matchesAdvancedFilters;
    });
  }, [query, activeTags, baseBySpecies, advancedFilters]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Slider (vinculado) */}
      <HeroSlider onSelectGraphic={handleSelectGraphic} />

      {/* Main Content */}
      <main id="main-content" role="main">
        <SearchSection
          query={query}
          setQuery={setQuery}
          filteredLength={filtered.length}
          cuts={baseBySpecies}
          onFiltersChange={setAdvancedFilters}
        />

        <CutsGrid filtered={filtered} />


      {/* Razas Slider */}
      <RazasSlider especie={idToEspecie(species) || 'res'} />


        <MethodsSection />
      </main>

      {/* Structured Data for SEO */}
      <StructuredData cuts={filtered} currentSpecies={species} />
    </div>
  );
}
