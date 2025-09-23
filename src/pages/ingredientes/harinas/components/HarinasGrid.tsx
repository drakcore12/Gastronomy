import React, { useState } from 'react';
import { Wheat, Zap, Info } from 'lucide-react';
import { type Harina } from '../data/harinas';

interface HarinasGridProps {
  harinas: Harina[];
}

export default function HarinasGrid({ harinas }: HarinasGridProps) {
  if (harinas.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Wheat className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No se encontraron harinas
            </h3>
            <p className="text-slate-600 mb-6">
              Intenta ajustar los filtros o usar términos de búsqueda diferentes.
            </p>
            <div className="bg-slate-50 rounded-lg p-6 max-w-md mx-auto">
              <h4 className="font-semibold text-slate-700 mb-2">💡 Sugerencias:</h4>
              <ul className="text-sm text-slate-600 space-y-1 text-left">
                <li>• Verifica la ortografía</li>
                <li>• Usa términos más generales</li>
                <li>• Ajusta el rango de proteína</li>
                <li>• Prueba diferentes familias</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {harinas.map((harina) => (
            <HarinaCard key={harina.id} harina={harina} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HarinaCard({ harina }: { harina: Harina }) {
  const [mostrarFicha, setMostrarFicha] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
      {/* Header con badges */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${harina.colorGradiente} flex items-center justify-center text-white`}>
          <Wheat className="h-6 w-6" />
        </div>
        <div className="flex flex-wrap gap-1">
          {harina.badges.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full font-semibold ${
                badge === 'GLUTEN' ? 'bg-red-100 text-red-700' :
                badge === 'SIN GLUTEN' ? 'bg-green-100 text-green-700' :
                'bg-orange-100 text-orange-700'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Información básica */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{harina.nombre}</h3>
      <p className="text-slate-500 text-sm mb-3 italic">{harina.nombreCientifico}</p>

      {/* Métricas clave */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{harina.proteina.promedio}%</div>
          <div className="text-xs text-slate-500">Proteína</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{harina.extraccion}%</div>
          <div className="text-xs text-slate-500">Extracción</div>
        </div>
      </div>

      {/* Usos ideales */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos ideales:</h4>
        <div className="flex flex-wrap gap-1">
          {harina.usosIdeales.slice(0, 3).map((uso, index) => (
            <span
              key={index}
              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
            >
              {uso}
            </span>
          ))}
        </div>
      </div>

      {/* Tips de formulación */}
      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <div className="flex items-start space-x-2">
          <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600">{harina.tips[0]}</p>
        </div>
      </div>

      {/* Botón para ficha técnica */}
      <button
        onClick={() => setMostrarFicha(!mostrarFicha)}
        className="w-full py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
      >
        {mostrarFicha ? 'Ocultar' : 'Ver'} Ficha Técnica
      </button>

      {/* Ficha técnica desplegable */}
      {mostrarFicha && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
          {/* Métricas técnicas */}
          <div>
            <h5 className="font-semibold text-slate-700 mb-2">Métricas Técnicas</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Proteína:</span>
                <span className="font-semibold">{harina.proteina.min}-{harina.proteina.max}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Absorción:</span>
                <span className="font-semibold capitalize">{harina.absorcion}</span>
              </div>
              {harina.fuerza && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fuerza (W):</span>
                    <span className="font-semibold">{harina.fuerza.w}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">P/L:</span>
                    <span className="font-semibold">{harina.fuerza.pl}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Cenizas:</span>
                <span className="font-semibold">{harina.cenizas}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Granulometría:</span>
                <span className="font-semibold capitalize">{harina.granulometria}</span>
              </div>
            </div>
          </div>

          {/* Comportamiento culinario */}
          <div>
            <h5 className="font-semibold text-slate-700 mb-2">Comportamiento Culinario</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Hidratación Pan:</span>
                <span className="font-semibold">{harina.hidratacionTipica.pan}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hidratación Pizza:</span>
                <span className="font-semibold">{harina.hidratacionTipica.pizza}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tolerancia Fermentación:</span>
                <span className="font-semibold capitalize">{harina.toleranciaFermentacion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estructura Migas:</span>
                <span className="font-semibold capitalize">{harina.estructuraMiga}</span>
              </div>
            </div>
          </div>

          {/* Recetas base */}
          <div>
            <h5 className="font-semibold text-slate-700 mb-2">Recetas Base</h5>
            <div className="space-y-1">
              {harina.recetasBase.map((receta, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{receta.nombre}</span>
                  <span className="font-semibold text-orange-600">{receta.hidratacion}% H2O</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seguridad */}
          <div>
            <h5 className="font-semibold text-slate-700 mb-2">Seguridad</h5>
            <div className="text-sm space-y-1">
              <div>
                <span className="text-slate-600">Alérgenos: </span>
                <span className="font-semibold">{harina.alergenos.join(', ') || 'Ninguno'}</span>
              </div>
              <div>
                <span className="text-slate-600">Almacenamiento: </span>
                <span className="font-semibold">{harina.almacenamiento.temperatura}</span>
              </div>
              <div>
                <span className="text-slate-600">Vida útil: </span>
                <span className="font-semibold">{harina.almacenamiento.vidaUtil}</span>
              </div>
            </div>
          </div>

          {/* Tips adicionales */}
          <div>
            <h5 className="font-semibold text-slate-700 mb-2">Tips de Formulación</h5>
            <div className="space-y-2">
              {harina.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
