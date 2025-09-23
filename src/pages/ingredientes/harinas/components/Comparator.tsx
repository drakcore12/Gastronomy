import React, { useState, useMemo } from 'react';
import { BarChart3, X, RotateCcw } from 'lucide-react';
import { Harina } from '../data/harinas';

interface ComparatorProps {
  harinas: Harina[];
}

interface ComparacionHarina {
  harina: Harina;
  cantidad: number;
}

export function Comparator({ harinas }: ComparatorProps) {
  const [comparacion, setComparacion] = useState<ComparacionHarina[]>([]);
  const [mostrarRadar, setMostrarRadar] = useState(false);

  const agregarHarina = (harina: Harina) => {
    if (comparacion.length >= 3) return;
    if (comparacion.some(c => c.harina.id === harina.id)) return;
    
    setComparacion(prev => [...prev, { harina, cantidad: 1000 }]);
  };

  const removerHarina = (id: string) => {
    setComparacion(prev => prev.filter(c => c.harina.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    setComparacion(prev => 
      prev.map(c => c.harina.id === id ? { ...c, cantidad } : c)
    );
  };

  const limpiarComparacion = () => {
    setComparacion([]);
  };

  const datosRadar = useMemo(() => {
    if (comparacion.length === 0) return null;

    const maxValores = {
      proteina: Math.max(...comparacion.map(c => c.harina.proteina.promedio)),
      absorcion: Math.max(...comparacion.map(c => 
        c.harina.absorcion === 'baja' ? 1 : c.harina.absorcion === 'media' ? 2 : 3
      )),
      crocancia: Math.max(...comparacion.map(c => 
        c.harina.crocancia === 'baja' ? 1 : c.harina.crocancia === 'media' ? 2 : 3
      )),
      tolerancia: Math.max(...comparacion.map(c => 
        c.harina.toleranciaFermentacion === 'baja' ? 1 : 2
      )),
      extraccion: Math.max(...comparacion.map(c => c.harina.extraccion))
    };

    return comparacion.map(c => ({
      nombre: c.harina.nombre,
      valores: {
        proteina: (c.harina.proteina.promedio / maxValores.proteina) * 100,
        absorcion: ((c.harina.absorcion === 'baja' ? 1 : c.harina.absorcion === 'media' ? 2 : 3) / maxValores.absorcion) * 100,
        crocancia: ((c.harina.crocancia === 'baja' ? 1 : c.harina.crocancia === 'media' ? 2 : 3) / maxValores.crocancia) * 100,
        tolerancia: ((c.harina.toleranciaFermentacion === 'baja' ? 1 : 2) / maxValores.tolerancia) * 100,
        extraccion: (c.harina.extraccion / maxValores.extraccion) * 100
      }
    }));
  }, [comparacion]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-bold text-slate-900">Comparador Chef Mode</h3>
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

      {/* Selector de harinas */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-700 mb-3">
          Seleccionar Harinas ({comparacion.length}/3)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {harinas.map(harina => (
            <button
              key={harina.id}
              onClick={() => agregarHarina(harina)}
              disabled={comparacion.length >= 3 || comparacion.some(c => c.harina.id === harina.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                comparacion.some(c => c.harina.id === harina.id)
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : comparacion.length >= 3
                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              <div className="font-semibold text-sm">{harina.nombre}</div>
              <div className="text-xs text-slate-500">{harina.proteina.promedio}% proteína</div>
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
              actualizarCantidad={actualizarCantidad}
              removerHarina={removerHarina}
            />
          )}
        </div>
      )}
    </div>
  );
}

function TablaComparacion({ 
  comparacion, 
  actualizarCantidad, 
  removerHarina 
}: { 
  comparacion: ComparacionHarina[];
  actualizarCantidad: (id: string, cantidad: number) => void;
  removerHarina: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Harina</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Cantidad (g)</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Proteína (%)</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Absorción</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Fuerza (W)</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Extracción (%)</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">Usos Ideales</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700"></th>
          </tr>
        </thead>
        <tbody>
          {comparacion.map(({ harina, cantidad }) => (
            <tr key={harina.id} className="border-b border-slate-100">
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${harina.colorGradiente} flex items-center justify-center text-white text-sm font-bold`}>
                    {harina.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{harina.nombre}</div>
                    <div className="text-sm text-slate-500">{harina.familia}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => actualizarCantidad(harina.id, Number(e.target.value))}
                  min="100"
                  max="5000"
                  step="50"
                  className="w-20 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </td>
              <td className="py-3 px-4">
                <div className="font-semibold text-slate-900">{harina.proteina.promedio}%</div>
                <div className="text-sm text-slate-500">
                  {harina.proteina.min}-{harina.proteina.max}%
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  harina.absorcion === 'baja' ? 'bg-blue-100 text-blue-700' :
                  harina.absorcion === 'media' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {harina.absorcion}
                </span>
              </td>
              <td className="py-3 px-4">
                {harina.fuerza ? (
                  <div>
                    <div className="font-semibold">{harina.fuerza.w}</div>
                    <div className="text-sm text-slate-500">P/L: {harina.fuerza.pl}</div>
                  </div>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="font-semibold">{harina.extraccion}%</div>
                <div className="text-sm text-slate-500">Cenizas: {harina.cenizas}%</div>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {harina.usosIdeales.slice(0, 2).map((uso, index) => (
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
                <button
                  onClick={() => removerHarina(harina.id)}
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
    { key: 'proteina', label: 'Proteína' },
    { key: 'absorcion', label: 'Absorción' },
    { key: 'crocancia', label: 'Crocancia' },
    { key: 'tolerancia', label: 'Tolerancia' },
    { key: 'extraccion', label: 'Extracción' }
  ];

  const colores = ['#f97316', '#3b82f6', '#10b981'];

  return (
    <div className="bg-slate-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-slate-700 mb-4 text-center">
        Comparación Visual de Atributos
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
                          width: `${item.valores[categoria.key]}%`,
                          backgroundColor: colores[index % colores.length]
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      {Math.round(item.valores[categoria.key])}%
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
