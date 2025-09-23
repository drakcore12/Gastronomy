import React, { useState } from 'react';
import { BookOpen, Eye, Info } from 'lucide-react';

export function VisualGuides() {
  const [guiaActiva, setGuiaActiva] = useState<'anatomia' | 'molienda' | 'alternativas'>('anatomia');

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
          Anatomía del Grano
        </button>
        <button
          onClick={() => setGuiaActiva('molienda')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            guiaActiva === 'molienda'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Proceso de Molienda
        </button>
        <button
          onClick={() => setGuiaActiva('alternativas')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            guiaActiva === 'alternativas'
              ? 'bg-orange-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Alternativas Sin Gluten
        </button>
      </div>

      {/* Contenido de las guías */}
      <div className="min-h-[400px]">
        {guiaActiva === 'anatomia' && <AnatomiaGrano />}
        {guiaActiva === 'molienda' && <ProcesoMolienda />}
        {guiaActiva === 'alternativas' && <AlternativasSinGluten />}
      </div>
    </div>
  );
}

function AnatomiaGrano() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Anatomía del Grano de Trigo</h4>
        <p className="text-slate-600">Comprende cómo cada parte del grano afecta las propiedades de la harina</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Diagrama visual */}
        <div className="bg-slate-50 rounded-lg p-6">
          <div className="relative h-64 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg overflow-hidden">
            {/* Germen */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600">
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700">
                Germen
              </div>
            </div>
            
            {/* Endospermo */}
            <div className="absolute top-12 left-4 right-4 bottom-12 bg-white/80 rounded-lg border-2 border-amber-300">
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700">
                Endospermo
              </div>
            </div>
            
            {/* Salvado */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-amber-600 rounded-t-lg">
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700">
                Salvado
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-600 rounded-b-lg">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700">
                Salvado
              </div>
            </div>
            <div className="absolute top-0 left-0 w-4 bottom-0 bg-amber-600 rounded-l-lg">
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-xs font-semibold text-slate-700">
                Salvado
              </div>
            </div>
            <div className="absolute top-0 right-0 w-4 bottom-0 bg-amber-600 rounded-r-lg">
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-xs font-semibold text-slate-700">
                Salvado
              </div>
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">🌱 Germen (2-3%)</h5>
            <p className="text-sm text-blue-800">
              Rico en vitaminas, minerales y aceites. Se elimina en harinas refinadas para evitar rancidez.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-amber-200 rounded-lg">
            <h5 className="font-semibold text-amber-900 mb-2">⚪ Endospermo (80-85%)</h5>
            <p className="text-sm text-amber-800">
              Contiene almidón y proteínas (gluten). Es la parte principal de la harina blanca.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <h5 className="font-semibold text-amber-900 mb-2">🌾 Salvado (12-15%)</h5>
            <p className="text-sm text-amber-800">
              Fibra, minerales y vitaminas. Aumenta el contenido de cenizas y reduce la extensibilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Efectos en la harina */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h5 className="font-semibold text-slate-900 mb-4">Efectos en las Propiedades de la Harina</h5>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">Cenizas ↑</div>
            <div className="text-sm text-slate-600">Más salvado = más cenizas</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">Extensibilidad ↓</div>
            <div className="text-sm text-slate-600">Salvado corta las hebras de gluten</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">Sabor ↑</div>
            <div className="text-sm text-slate-600">Más complejo y terroso</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcesoMolienda() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Proceso de Molienda y Extracción</h4>
        <p className="text-slate-600">Cómo el proceso de molienda afecta el color, sabor y propiedades técnicas</p>
      </div>

      {/* Proceso paso a paso */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-orange-600 font-bold">1</span>
          </div>
          <h5 className="font-semibold text-slate-900 mb-2">Limpieza</h5>
          <p className="text-sm text-slate-600">Eliminación de impurezas y granos defectuosos</p>
        </div>

        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-orange-600 font-bold">2</span>
          </div>
          <h5 className="font-semibold text-slate-900 mb-2">Acondicionamiento</h5>
          <p className="text-sm text-slate-600">Humedad controlada para facilitar la molienda</p>
        </div>

        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-orange-600 font-bold">3</span>
          </div>
          <h5 className="font-semibold text-slate-900 mb-2">Molienda</h5>
          <p className="text-sm text-slate-600">Rodillos que separan endospermo del salvado</p>
        </div>

        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-orange-600 font-bold">4</span>
          </div>
          <h5 className="font-semibold text-slate-900 mb-2">Clasificación</h5>
          <p className="text-sm text-slate-600">Separación por granulometría y pureza</p>
        </div>
      </div>

      {/* Niveles de extracción */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h5 className="font-semibold text-slate-900 mb-4">Niveles de Extracción</h5>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <div className="font-semibold text-slate-900">Harina Blanca (70-75%)</div>
              <div className="text-sm text-slate-600">Solo endospermo, color claro, sabor neutro</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">70-75%</div>
              <div className="text-sm text-slate-500">Extracción</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <div className="font-semibold text-slate-900">Harina Semi-integral (80-85%)</div>
              <div className="text-sm text-slate-600">Incluye parte del salvado, color cremoso</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">80-85%</div>
              <div className="text-sm text-slate-500">Extracción</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <div className="font-semibold text-slate-900">Harina Integral (95-100%)</div>
              <div className="text-sm text-slate-600">Todo el grano, color oscuro, sabor intenso</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">95-100%</div>
              <div className="text-sm text-slate-500">Extracción</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlternativasSinGluten() {
  const alternativas = [
    {
      funcion: 'Estructura',
      harinas: ['Harina de arroz', 'Harina de maíz', 'Harina de quinoa'],
      color: 'blue',
      descripcion: 'Proporcionan volumen y textura base'
    },
    {
      funcion: 'Crocante',
      harinas: ['Harina de arroz', 'Almidón de tapioca', 'Harina de maíz'],
      color: 'green',
      descripcion: 'Ideal para frituras y texturas crujientes'
    },
    {
      funcion: 'Color',
      harinas: ['Harina de almendras', 'Harina de coco', 'Harina de quinoa'],
      color: 'amber',
      descripcion: 'Añaden color y sabor característico'
    },
    {
      funcion: 'Sabor',
      harinas: ['Harina de almendras', 'Harina de coco', 'Harina de garbanzo'],
      color: 'purple',
      descripcion: 'Contribuyen con sabores distintivos'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Mapa de Alternativas Sin Gluten</h4>
        <p className="text-slate-600">Organizadas por función culinaria para facilitar la formulación</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {alternativas.map((alt, index) => (
          <div key={index} className={`p-6 rounded-lg border-2 ${
            alt.color === 'blue' ? 'border-blue-200 bg-blue-50' :
            alt.color === 'green' ? 'border-green-200 bg-green-50' :
            alt.color === 'amber' ? 'border-amber-200 bg-amber-50' :
            'border-purple-200 bg-purple-50'
          }`}>
            <h5 className={`text-lg font-bold mb-3 ${
              alt.color === 'blue' ? 'text-blue-900' :
              alt.color === 'green' ? 'text-green-900' :
              alt.color === 'amber' ? 'text-amber-900' :
              'text-purple-900'
            }`}>
              {alt.funcion}
            </h5>
            <p className={`text-sm mb-4 ${
              alt.color === 'blue' ? 'text-blue-800' :
              alt.color === 'green' ? 'text-green-800' :
              alt.color === 'amber' ? 'text-amber-800' :
              'text-purple-800'
            }`}>
              {alt.descripcion}
            </p>
            <div className="space-y-2">
              {alt.harinas.map((harina, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    alt.color === 'blue' ? 'bg-blue-500' :
                    alt.color === 'green' ? 'bg-green-500' :
                    alt.color === 'amber' ? 'bg-amber-500' :
                    'bg-purple-500'
                  }`} />
                  <span className="text-sm font-medium text-slate-700">{harina}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips de formulación */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h5 className="font-semibold text-slate-900 mb-4">💡 Tips de Formulación Sin Gluten</h5>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                <strong>Mezcla base:</strong> 40% arroz + 30% maíz + 20% tapioca + 10% quinoa
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                <strong>Para frituras:</strong> 70% arroz + 30% maíz para máxima crocancia
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                <strong>Para pan:</strong> Añade 2-3% xantana para mejor estructura
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                <strong>Para pastelería:</strong> 50% almendras + 50% arroz para sabor
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
