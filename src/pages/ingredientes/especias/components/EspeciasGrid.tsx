import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Star, 
  Clock, 
  Zap, 
  Heart, 
  ChevronDown, 
  ChevronUp,
  Eye,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { Especia } from '../data/especias';

interface EspeciasGridProps {
  especias: Especia[];
  onComparar: (especia: Especia) => void;
  onVerRecetas: (especia: Especia) => void;
}

export function EspeciasGrid({ especias, onComparar, onVerRecetas }: EspeciasGridProps) {
  const [especiaExpandida, setEspeciaExpandida] = useState<string | null>(null);

  const toggleExpansion = (id: string) => {
    setEspeciaExpandida(especiaExpandida === id ? null : id);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {especias.map(especia => (
        <EspeciaCard
          key={especia.id}
          especia={especia}
          expandida={especiaExpandida === especia.id}
          onToggleExpansion={() => toggleExpansion(especia.id)}
          onComparar={() => onComparar(especia)}
          onVerRecetas={() => onVerRecetas(especia)}
        />
      ))}
    </div>
  );
}

interface EspeciaCardProps {
  especia: Especia;
  expandida: boolean;
  onToggleExpansion: () => void;
  onComparar: () => void;
  onVerRecetas: () => void;
}

function EspeciaCard({ 
  especia, 
  expandida, 
  onToggleExpansion, 
  onComparar, 
  onVerRecetas 
}: EspeciaCardProps) {
  const getIntensidadColor = (intensidad: string) => {
    switch (intensidad) {
      case 'suave': return 'bg-green-100 text-green-700';
      case 'medio': return 'bg-yellow-100 text-yellow-700';
      case 'fuerte': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPerfilDominante = () => {
    const perfiles = especia.perfilSensorial;
    const maxValue = Math.max(...Object.values(perfiles));
    return Object.entries(perfiles).find(([_, value]) => value === maxValue)?.[0] || 'calido';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className={`h-24 bg-gradient-to-r ${especia.colorGradiente} p-4 relative`}>
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-bold">{especia.nombre}</h3>
            <p className="text-sm opacity-90">{especia.nombreCientifico}</p>
          </div>
          <div className="text-white text-right">
            <div className="text-xs opacity-75">Origen</div>
            <div className="text-sm font-semibold">{especia.origen}</div>
          </div>
        </div>
        
        {/* Badges flotantes */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            {especia.clasificacionBotanica}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getIntensidadColor(especia.intensidad)}`}>
            {especia.intensidad}
          </span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4">
        {/* Perfil sensorial visual */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">Perfil Dominante:</span>
            <span className="text-sm text-slate-500 capitalize">{getPerfilDominante()}</span>
          </div>
          <div className="flex space-x-1">
            {Object.entries(especia.perfilSensorial).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex-1">
                <div className="text-xs text-slate-500 mb-1 capitalize">{key}</div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usos principales */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos Ideales:</h4>
          <div className="flex flex-wrap gap-1">
            {especia.usosCulinarios.slice(0, 3).map((uso, index) => (
              <span
                key={index}
                className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
              >
                {uso}
              </span>
            ))}
            {especia.usosCulinarios.length > 3 && (
              <span className="text-xs text-slate-500">
                +{especia.usosCulinarios.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Propiedades */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Propiedades:</h4>
          <div className="flex flex-wrap gap-1">
            {especia.propiedades.slice(0, 2).map((prop, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {especia.descripcion}
        </p>

        {/* Tips */}
        <div className="bg-slate-50 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-600">{especia.tips[0]}</p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={onComparar}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Comparar</span>
          </button>
          <button
            onClick={onVerRecetas}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <BookOpen className="h-4 w-4" />
            <span>Recetas</span>
          </button>
        </div>

        {/* Botón de expansión */}
        <button
          onClick={onToggleExpansion}
          className="w-full flex items-center justify-center space-x-2 py-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <span className="text-sm font-semibold">
            {expandida ? 'Ver menos' : 'Ver detalles'}
          </span>
          {expandida ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Contenido expandido */}
      {expandida && (
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          {/* Perfil sensorial completo */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Perfil Sensorial Completo</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(especia.perfilSensorial).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 capitalize">{key}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-orange-500 h-1.5 rounded-full"
                        style={{ width: `${value * 10}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{value}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usos ideales con dosis */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Usos Ideales con Dosis</h4>
            <div className="space-y-2">
              {especia.usosIdeales.map((uso, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 text-sm">{uso.plato}</span>
                    <span className="text-xs text-orange-600 font-semibold">{uso.dosis}</span>
                  </div>
                  <p className="text-xs text-slate-600">{uso.tecnica}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibilidad */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Compatibilidad</h4>
            <div className="flex flex-wrap gap-1">
              {especia.compatibilidad.map((comp, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Mezclas tradicionales */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Mezclas Tradicionales</h4>
            <div className="space-y-2">
              {especia.mezclasTradicionales.map((mezcla, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 text-sm">{mezcla.nombre}</span>
                    <span className="text-xs text-slate-500">{mezcla.region}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {mezcla.especias.map((esp, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                      >
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Almacenamiento */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Almacenamiento</h4>
            <div className="bg-white rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Temperatura:</span>
                <span className="text-xs font-semibold text-slate-900">{especia.almacenamiento.temperatura}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Humedad:</span>
                <span className="text-xs font-semibold text-slate-900">{especia.almacenamiento.humedad}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Vida útil:</span>
                <span className="text-xs font-semibold text-slate-900">{especia.almacenamiento.vidaUtil}</span>
              </div>
            </div>
          </div>

          {/* Precauciones */}
          {especia.precauciones.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Precauciones</h4>
              <div className="bg-red-50 rounded-lg p-3">
                <ul className="space-y-1">
                  {especia.precauciones.map((prec, index) => (
                    <li key={index} className="text-xs text-red-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      {prec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tips adicionales */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Tips Adicionales</h4>
            <div className="space-y-2">
              {especia.tips.slice(1).map((tip, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-orange-800">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
