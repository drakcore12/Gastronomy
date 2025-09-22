import React from 'react';
import { Apple, Clock, Leaf, Zap, Heart, Thermometer, Droplets } from 'lucide-react';
import { Fruta } from '../data/frutas';

interface FrutasGridProps {
  filtered: Fruta[];
}

export default function FrutasGrid({ filtered }: FrutasGridProps) {
  if (filtered.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="text-center py-12">
          <Apple className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No se encontraron frutas</h3>
          <p className="text-slate-500">Intenta ajustar los filtros o términos de búsqueda.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((fruta) => (
          <div
            key={fruta.id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg hover:ring-orange-200"
          >
            {/* Header con gradiente */}
            <div className={`h-32 bg-gradient-to-br ${fruta.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Apple className="h-12 w-12 text-white/90" />
              </div>
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {fruta.clasificacionCulinaria}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{fruta.nombre}</h3>
                <p className="text-sm text-slate-500 italic">{fruta.nombreEn}</p>
                {fruta.primaria && (
                  <p className="text-xs text-slate-400 mb-2">Variedad de {fruta.primaria}</p>
                )}
                <p className="text-sm text-slate-600 mt-2">{fruta.descripcion}</p>
              </div>

              {/* Clasificación */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Culinaria:</span>
                  <span className="font-medium text-slate-700 capitalize">{fruta.clasificacionCulinaria}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Botánica:</span>
                  <span className="font-medium text-slate-700 capitalize">{fruta.clasificacionBotanica}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Origen:</span>
                  <span className="font-medium text-slate-700">{fruta.origen.join(', ')}</span>
                </div>
              </div>

              {/* Perfiles sensoriales */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">Perfiles:</h4>
                <div className="flex flex-wrap gap-1">
                  {fruta.perfiles.slice(0, 3).map((perfil, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700"
                    >
                      {perfil}
                    </span>
                  ))}
                </div>
              </div>

              {/* Técnicas */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">Técnicas:</h4>
                <div className="flex flex-wrap gap-1">
                  {fruta.tecnicas.slice(0, 3).map((tecnica, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700"
                    >
                      {tecnica}
                    </span>
                  ))}
                  {fruta.tecnicas.length > 3 && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      +{fruta.tecnicas.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Nutrición */}
              <div className="mb-4 rounded-lg bg-slate-50 p-3">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">Nutrición (100g):</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="h-3 w-3 text-orange-500" />
                    <span className="text-slate-600">{fruta.nutricion.kcal} kcal</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Leaf className="h-3 w-3 text-green-500" />
                    <span className="text-slate-600">{fruta.nutricion.fibra}g fibra</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-slate-600">{fruta.nutricion.vitaminaC}mg C</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-slate-600">Antioxidantes</span>
                  </div>
                </div>
              </div>

              {/* Estacionalidad */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-slate-700 mb-2">Temporada:</h4>
                <div className="flex flex-wrap gap-1">
                  {fruta.estacionalidad.map((mes) => {
                    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                    return (
                      <span
                        key={mes}
                        className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700"
                      >
                        {meses[mes - 1]}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-lg bg-orange-50 p-3">
                <div className="flex items-start space-x-2">
                  <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600">{fruta.tips}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
