import React, { useState } from 'react';
import { BookOpen, Map, Leaf, Clock } from 'lucide-react';

export function VisualGuides() {
  const [guiaActiva, setGuiaActiva] = useState<'anatomia' | 'rutas' | 'paletas'>('anatomia');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-bold text-slate-900">Guías Visuales</h3>
      </div>

      {/* Navegación de guías */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setGuiaActiva('anatomia')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            guiaActiva === 'anatomia'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Anatomía
        </button>
        <button
          onClick={() => setGuiaActiva('rutas')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            guiaActiva === 'rutas'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Rutas Históricas
        </button>
        <button
          onClick={() => setGuiaActiva('paletas')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            guiaActiva === 'paletas'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Paletas de Color
        </button>
      </div>

      {/* Contenido de las guías */}
      <div className="min-h-[400px]">
        {guiaActiva === 'anatomia' && <AnatomiaEspecias />}
        {guiaActiva === 'rutas' && <RutasHistoricas />}
        {guiaActiva === 'paletas' && <PaletasColor />}
      </div>
    </div>
  );
}

function AnatomiaEspecias() {
  const partes = [
    {
      tipo: 'Semillas',
      ejemplos: ['Comino', 'Coriandro', 'Mostaza', 'Cardamomo'],
      color: 'from-amber-200 to-amber-400',
      descripcion: 'Contienen aceites esenciales concentrados, mejor sabor al tostar'
    },
    {
      tipo: 'Cortezas',
      ejemplos: ['Canela', 'Cassia'],
      color: 'from-amber-600 to-amber-800',
      descripcion: 'Ricas en compuestos aromáticos, ideales para infusiones'
    },
    {
      tipo: 'Raíces',
      ejemplos: ['Jengibre', 'Cúrcuma', 'Galanga'],
      color: 'from-yellow-400 to-yellow-600',
      descripcion: 'Alto contenido de compuestos activos, mejor frescas'
    },
    {
      tipo: 'Flores',
      ejemplos: ['Clavo', 'Azafrán', 'Lavanda'],
      color: 'from-purple-400 to-purple-600',
      descripcion: 'Muy aromáticas, usar con moderación'
    },
    {
      tipo: 'Hojas',
      ejemplos: ['Laurel', 'Orégano', 'Tomillo'],
      color: 'from-green-400 to-green-600',
      descripcion: 'Sabores herbales, mejor secas para conservar'
    },
    {
      tipo: 'Frutos',
      ejemplos: ['Pimienta', 'Chile', 'Enebro'],
      color: 'from-red-400 to-red-600',
      descripcion: 'Variedad de sabores, desde dulces hasta picantes'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Anatomía de las Especias</h4>
        <p className="text-slate-600">Comprende las diferentes partes de las plantas que usamos como especias</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partes.map((parte, index) => (
          <div key={index} className="bg-slate-50 rounded-lg p-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${parte.color} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
              {parte.tipo.charAt(0)}
            </div>
            <h5 className="font-bold text-slate-900 mb-2 text-center">{parte.tipo}</h5>
            <div className="space-y-2 mb-4">
              {parte.ejemplos.map((ejemplo, i) => (
                <div key={i} className="text-sm text-slate-600 text-center">
                  {ejemplo}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 text-center">{parte.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Tips de uso */}
      <div className="bg-orange-50 rounded-lg p-6">
        <h5 className="font-semibold text-orange-900 mb-4">💡 Tips de Uso por Tipo</h5>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Semillas:</strong> Tostar antes de moler para intensificar sabor
          </div>
          <div>
            <strong>Cortezas:</strong> Usar en rama para infusiones, molida para hornear
          </div>
          <div>
            <strong>Raíces:</strong> Pelar solo la capa externa, rallar fresco
          </div>
          <div>
            <strong>Flores:</strong> Usar con moderación, muy aromáticas
          </div>
          <div>
            <strong>Hojas:</strong> Mejor sabor cuando están secas
          </div>
          <div>
            <strong>Frutos:</strong> Variedad de intensidades, probar antes de usar
          </div>
        </div>
      </div>
    </div>
  );
}

function RutasHistoricas() {
  const rutas = [
    {
      nombre: 'Ruta de la Seda',
      periodo: '130 a.C. - 1453 d.C.',
      regiones: ['China', 'Asia Central', 'Persia', 'Bizancio'],
      especias: ['Jengibre', 'Canela', 'Cardamomo', 'Clavo'],
      color: 'from-blue-200 to-blue-400',
      descripcion: 'Conectó Asia con Europa, transportando especias y seda'
    },
    {
      nombre: 'Ruta de las Especias',
      periodo: 'Siglos XV-XVII',
      regiones: ['India', 'Indonesia', 'África', 'Europa'],
      especias: ['Pimienta', 'Nuez moscada', 'Clavo', 'Canela'],
      color: 'from-green-200 to-green-400',
      descripcion: 'Ruta marítima que revolucionó el comercio mundial'
    },
    {
      nombre: 'Ruta del Incienso',
      periodo: '300 a.C. - 200 d.C.',
      regiones: ['Arabia', 'Egipto', 'Mediterráneo'],
      especias: ['Incienso', 'Mirra', 'Canela', 'Cardamomo'],
      color: 'from-amber-200 to-amber-400',
      descripcion: 'Ruta terrestre para especias aromáticas y resinas'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Rutas Históricas de las Especias</h4>
        <p className="text-slate-600">Descubre cómo las especias viajaron por el mundo</p>
      </div>

      <div className="space-y-6">
        {rutas.map((ruta, index) => (
          <div key={index} className={`p-6 rounded-lg border-2 ${ruta.color.replace('from-', 'border-').replace(' to-', '-')}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h5 className="text-xl font-bold text-slate-900">{ruta.nombre}</h5>
                <p className="text-slate-600">{ruta.periodo}</p>
              </div>
              <Map className="h-8 w-8 text-slate-400" />
            </div>
            
            <p className="text-slate-700 mb-4">{ruta.descripcion}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-semibold text-slate-900 mb-2">Regiones:</h6>
                <div className="flex flex-wrap gap-1">
                  {ruta.regiones.map((region, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-slate-900 mb-2">Especias:</h6>
                <div className="flex flex-wrap gap-1">
                  {ruta.especias.map((especia, i) => (
                    <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      {especia}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impacto histórico */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h5 className="font-semibold text-slate-900 mb-4">🌍 Impacto Histórico</h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Comercio:</strong> Las especias valían más que el oro
          </div>
          <div>
            <strong>Exploración:</strong> Motivaron los viajes de descubrimiento
          </div>
          <div>
            <strong>Cultura:</strong> Influenciaron cocinas de todo el mundo
          </div>
        </div>
      </div>
    </div>
  );
}

function PaletasColor() {
  const paletas = [
    {
      color: 'Amarillo',
      especias: ['Cúrcuma', 'Azafrán', 'Mostaza'],
      hex: '#fbbf24',
      usos: ['Colorante natural', 'Curries', 'Arroces']
    },
    {
      color: 'Rojo',
      especias: ['Pimentón', 'Chile', 'Pimienta rosa'],
      hex: '#ef4444',
      usos: ['Picante', 'Color', 'Marinados']
    },
    {
      color: 'Marrón',
      especias: ['Canela', 'Clavo', 'Nuez moscada'],
      hex: '#a16207',
      usos: ['Postres', 'Bebidas calientes', 'Pan']
    },
    {
      color: 'Verde',
      especias: ['Cardamomo', 'Hinojo', 'Enebro'],
      hex: '#22c55e',
      usos: ['Fresco', 'Digestivo', 'Bebidas']
    },
    {
      color: 'Negro',
      especias: ['Pimienta negra', 'Sésamo negro'],
      hex: '#1f2937',
      usos: ['Picante', 'Aromático', 'Universal']
    },
    {
      color: 'Blanco',
      especias: ['Pimienta blanca', 'Sésamo blanco'],
      hex: '#f9fafb',
      usos: ['Suave', 'Decorativo', 'Salsas claras']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Paletas de Color</h4>
        <p className="text-slate-600">Desde la cúrcuma amarilla hasta la pimienta negra</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paletas.map((paleta, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-slate-200">
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: paleta.hex }}
              />
              <div>
                <h5 className="font-bold text-slate-900">{paleta.color}</h5>
                <div className="text-sm text-slate-500">{paleta.hex}</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h6 className="font-semibold text-slate-700">Especias:</h6>
              <div className="flex flex-wrap gap-1">
                {paleta.especias.map((especia, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    {especia}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold text-slate-700 mb-2">Usos:</h6>
              <div className="text-sm text-slate-600">
                {paleta.usos.join(' • ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips de color */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h5 className="font-semibold text-slate-900 mb-4">🎨 Tips de Color en Cocina</h5>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Amarillo:</strong> Cúrcuma para arroces y curries dorados
          </div>
          <div>
            <strong>Rojo:</strong> Pimentón para salsas y marinados
          </div>
          <div>
            <strong>Marrón:</strong> Canela para postres y bebidas calientes
          </div>
          <div>
            <strong>Verde:</strong> Cardamomo para bebidas frescas
          </div>
          <div>
            <strong>Negro:</strong> Pimienta para contrastes visuales
          </div>
          <div>
            <strong>Blanco:</strong> Pimienta blanca para salsas claras
          </div>
        </div>
      </div>
    </div>
  );
}
