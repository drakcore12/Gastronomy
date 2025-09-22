import React, { useMemo, useState, useCallback } from 'react';
import { FRUTAS, TECNICAS_FRUTAS, type Fruta } from './data/frutas';
import HeroSlider from './section/HeroSlider';
import { SearchSection, FrutasGrid, MethodsSection } from './section';

// FrutaId = UI identifier
type FrutaId = 'manzana' | 'platano' | 'fresa' | 'limon' | 'naranja' | 'uva' | 'pina' | 'mango';

// mapear frutaId -> valor del dataset
function idToFruta(id: FrutaId): Fruta['id'] {
  return id;
}

export default function FrutasPage() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedFruit, setSelectedFruit] = useState<FrutaId>('manzana'); // default manzana

  // Vincular slider/CTA con la fruta seleccionada
  const handleSelectFruit = useCallback((f: FrutaId) => {
    setSelectedFruit((prev) => (prev === f ? prev : f));
    setActiveTags([]); // limpiar tags al cambiar fruta
  }, []);

  // Dataset por fruta seleccionada
  const baseByFruit = useMemo(() => {
    const fruitId = idToFruta(selectedFruit);
    return (FRUTAS ?? []).filter((f) => f.id === fruitId);
  }, [selectedFruit]);

  // Tags únicos (técnicas) ordenados
  const TAGS = useMemo(() => {
    const all = FRUTAS.flatMap((f) => f.tecnicas ?? []);
    return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
  }, []);

  // Normalizador robusto para búsqueda que maneja tildes, mayúsculas y espacios
  const norm = (s: string) => {
    return s
      .toLowerCase()
      .normalize('NFD') // Descompone caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina marcas diacríticas (tildes)
      .replace(/\s+/g, ' ') // Normaliza espacios múltiples a uno solo
      .trim();
  };

  // Filtro final con búsqueda flexible
  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return FRUTAS.filter((f) => {
      const corpus = [
        f.nombre ?? '',
        f.nombreEn ?? '',
        f.descripcion ?? '',
        f.clasificacionCulinaria ?? '',
        f.clasificacionBotanica ?? '',
        f.perfiles?.join(' ') ?? '',
        f.tecnicas?.join(' ') ?? '',
        f.preparaciones?.join(' ') ?? '',
        f.origen?.join(' ') ?? '',
        f.tips ?? ''
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

      const tecnicas = f.tecnicas ?? [];
      const matchesTags = activeTags.length
        ? activeTags.every((t) => tecnicas.includes(t))
        : true;

      return matchesQ && matchesTags;
    });
  }, [query, activeTags]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Slider (vinculado) */}
      <HeroSlider onSelectFruit={handleSelectFruit} />

      {/* Main Content */}
      <main id="main-content" role="main">
        <SearchSection
          query={query}
          setQuery={setQuery}
          filteredLength={filtered.length}
          TAGS={TAGS}
          activeTags={activeTags}
          toggleTag={toggleTag}
          clearFilters={() => setActiveTags([])}
        />

        <FrutasGrid filtered={filtered} />

        <MethodsSection />
      </main>
    </div>
  );
}
