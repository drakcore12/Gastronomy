import React, { useState } from 'react';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { Especia, CLASIFICACIONES_BOTANICAS, USOS_CULINARIOS, PROPIEDADES, REGIONES } from '../data/especias';

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filtros: {
    clasificacion: string;
    perfilSensorial: string;
    intensidad: string;
    region: string;
    uso: string;
    propiedad: string;
  };
  setFiltros: (filtros: any) => void;
  especias: Especia[];
  onMostrarCalculadoras: () => void;
  onMostrarComparador: () => void;
  onMostrarGuias: () => void;
  onMostrarRecetas: () => void;
}

export function SearchSection({
  searchQuery,
  setSearchQuery,
  filtros,
  setFiltros,
  especias,
  onMostrarCalculadoras,
  onMostrarComparador,
  onMostrarGuias,
  onMostrarRecetas
}: SearchSectionProps) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const limpiarFiltros = () => {
    setFiltros({
      clasificacion: 'todas',
      perfilSensorial: 'todas',
      intensidad: 'todas',
      region: 'todas',
      uso: 'todas',
      propiedad: 'todas'
    });
  };

  const filtrosActivos = Object.values(filtros).filter(f => f !== 'todas').length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
      {/* Barra de búsqueda principal */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar especias, sabores, usos, propiedades..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Botón de filtros */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filtros Avanzados</span>
          {filtrosActivos > 0 && (
            <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
              {filtrosActivos}
            </span>
          )}
        </button>

        {filtrosActivos > 0 && (
          <button
            onClick={limpiarFiltros}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {/* Filtros expandibles */}
      {mostrarFiltros && (
        <div className="space-y-6">
          {/* Clasificación botánica */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Clasificación Botánica
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => setFiltros({...filtros, clasificacion: 'todas'})}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filtros.clasificacion === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              {CLASIFICACIONES_BOTANICAS.map(clas => (
                <button
                  key={clas.id}
                  onClick={() => setFiltros({...filtros, clasificacion: clas.id})}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filtros.clasificacion === clas.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {clas.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Perfil sensorial */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Perfil Sensorial
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => setFiltros({...filtros, perfilSensorial: 'todas'})}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filtros.perfilSensorial === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              {['picante', 'dulce', 'citrico', 'amargo', 'mentolado', 'ahumado', 'calido', 'fresco'].map(perfil => (
                <button
                  key={perfil}
                  onClick={() => setFiltros({...filtros, perfilSensorial: perfil})}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                    filtros.perfilSensorial === perfil
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {perfil}
                </button>
              ))}
            </div>
          </div>

          {/* Intensidad */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Intensidad
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setFiltros({...filtros, intensidad: 'todas'})}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filtros.intensidad === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              {['suave', 'medio', 'fuerte'].map(intensidad => (
                <button
                  key={intensidad}
                  onClick={() => setFiltros({...filtros, intensidad})}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors capitalize ${
                    filtros.intensidad === intensidad
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {intensidad}
                </button>
              ))}
            </div>
          </div>

          {/* Región */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Región de Origen
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <button
                onClick={() => setFiltros({...filtros, region: 'todas'})}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filtros.region === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              {REGIONES.map(region => (
                <button
                  key={region.id}
                  onClick={() => setFiltros({...filtros, region: region.id})}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filtros.region === region.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {region.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Uso culinario */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Uso Culinario
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => setFiltros({...filtros, uso: 'todas'})}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filtros.uso === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              {USOS_CULINARIOS.map(uso => (
                <button
                  key={uso}
                  onClick={() => setFiltros({...filtros, uso})}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filtros.uso === uso
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {uso}
                </button>
              ))}
            </div>
          </div>

          {/* Propiedades */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Propiedades
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => setFiltros({...filtros, propiedad: 'todas'})}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  filtros.propiedad === 'todas'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              {PROPIEDADES.map(prop => (
                <button
                  key={prop}
                  onClick={() => setFiltros({...filtros, propiedad: prop})}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    filtros.propiedad === prop
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {prop}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Herramientas profesionales */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Herramientas Profesionales</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={onMostrarCalculadoras}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm font-semibold">Calculadoras</span>
          </button>
          <button
            onClick={onMostrarComparador}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-semibold">Comparador</span>
          </button>
          <button
            onClick={onMostrarGuias}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="text-sm font-semibold">Guías</span>
          </button>
          <button
            onClick={onMostrarRecetas}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm font-semibold">Recetas</span>
          </button>
        </div>
      </div>
    </div>
  );
}
