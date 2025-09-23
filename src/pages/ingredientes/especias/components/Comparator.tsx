import React, { useState, useMemo } from 'react';
import { BarChart3, X, RotateCcw, Radar } from 'lucide-react';
import { Especia } from '../data/especias';

interface ComparatorProps {
  especias: Especia[];
}

interface ComparacionEspecia {
  especia: Especia;
}

export function Comparator({ especias }: ComparatorProps) {
  const [comparacion, setComparacion] = useState<ComparacionEspecia[]>([]);
  const [mostrarRadar, setMostrarRadar] = useState(true);

  const agregarEspecia = (especia: Especia) => {
    if (comparacion.length >= 3) return;
    if (comparacion.some(c => c.especia.id === especia.id)) return;
    
    setComparacion(prev => [...prev, { especia }]);
  };

  const removerEspecia = (id: string) => {
    setComparacion(prev => prev.filter(c => c.especia.id !== id));
  };

  const limpiarComparacion = () => {
    setComparacion([]);
  };

  const datosRadar = useMemo(() => {
    if (comparacion.length === 0) return null;

    return comparacion.map(c => ({
      nombre: c.especia.nombre,
      valores: c.especia.perfilSensorial,
      color: c.especia.colorGradiente
    }));
  }, [comparacion]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-bold text-slate-900">Comparador de Especias</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setMostrarRadar(!mostrarRadar)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {mostrarRadar ? 'Tabla' : 'Radar'}
          </button>
          <button
            onClick={limpiarComparacion}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Selector de especias */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-700 mb-3">
          Seleccionar Especias ({comparacion.length}/3)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {especias.map(especia => (
            <button
              key={especia.id}
              onClick={() => agregarEspecia(especia)}
              disabled={comparacion.length >= 3 || comparacion.some(c => c.especia.id === especia.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                comparacion.some(c => c.especia.id === especia.id)
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : comparacion.length >= 3
                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              <div className="font-semibold text-sm">{especia.nombre}</div>
              <div className="text-xs text-slate-500">{especia.intensidad}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparación */}
      {comparacion.length > 0 && (
        <div className="space-y-6">
          {mostrarRadar ? (
            <RadarChart datos={datosRadar} />
          ) : (
            <TablaComparacion 
              comparacion={comparacion} 
              removerEspecia={removerEspecia}
            />
          )}
        </div>
      )}
    </div>
  );
}

function TablaComparacion({ 
  comparacion, 
  removerEspecia 
}: { 
  comparacion: ComparacionEspecia[];
  removerEspecia: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Especia</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Origen</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Intensidad</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Clasificación</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Usos Ideales</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Propiedades</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700"></th>
          </tr>
        </thead>
        <tbody>
          {comparacion.map(({ especia }) => (
            <tr key={especia.id} className="border-b border-slate-100">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${especia.colorGradiente} flex items-center justify-center text-white text-sm font-bold`}>
                    {especia.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{especia.nombre}</div>
                    <div className="text-sm text-slate-500">{especia.nombreCientifico}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="font-semibold text-slate-900">{especia.origen}</div>
                <div className="text-sm text-slate-500">{especia.region}</div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  especia.intensidad === 'suave' ? 'bg-green-100 text-green-700' :
                  especia.intensidad === 'medio' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {especia.intensidad}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="font-semibold capitalize">{especia.clasificacionBotanica}</div>
                <div className="text-sm text-slate-500">{especia.color}</div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {especia.usosCulinarios.slice(0, 2).map((uso, index) => (
                    <span
                      key={index}
                      className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                    >
                      {uso}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">
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
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => removerEspecia(especia.id)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RadarChart({ datos }: { datos: any }) {
  if (!datos) return null;

  const categorias = [
    { key: 'picante', label: 'Picante' },
    { key: 'dulce', label: 'Dulce' },
    { key: 'citrico', label: 'Cítrico' },
    { key: 'amargo', label: 'Amargo' },
    { key: 'mentolado', label: 'Mentolado' },
    { key: 'ahumado', label: 'Ahumado' },
    { key: 'calido', label: 'Cálido' },
    { key: 'fresco', label: 'Fresco' }
  ];

  const colores = ['#f97316', '#3b82f6', '#10b981'];

  return (
    <div className="bg-slate-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
        Perfil Sensorial Comparativo
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datos.map((item: any, index: number) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-slate-900 mb-3 text-center">{item.nombre}</h5>
            <div className="space-y-2">
              {categorias.map(categoria => (
                <div key={categoria.key} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{categoria.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.valores[categoria.key] * 10}%`,
                          backgroundColor: colores[index % colores.length]
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {item.valores[categoria.key]}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
