import React, { useState, useMemo } from 'react';
import { Calculator, Scale, RotateCcw, Zap } from 'lucide-react';
import { Especia } from '../data/especias';

interface EscaladoCalculatorProps {
  especias: Especia[];
}

export function EscaladoCalculator({ especias }: EscaladoCalculatorProps) {
  const [especiaSeleccionada, setEspeciaSeleccionada] = useState<Especia | null>(null);
  const [dosisOriginal, setDosisOriginal] = useState(1);
  const [porcionesOriginales, setPorcionesOriginales] = useState(4);
  const [porcionesNuevas, setPorcionesNuevas] = useState(8);
  const [unidad, setUnidad] = useState<'gramos' | 'cucharaditas' | 'cucharadas'>('gramos');

  const calculo = useMemo(() => {
    if (!especiaSeleccionada) return null;

    const factorEscalado = porcionesNuevas / porcionesOriginales;
    const dosisNueva = dosisOriginal * factorEscalado;

    // Conversiones aproximadas
    const conversiones = {
      gramos: { cucharaditas: 0.2, cucharadas: 0.07 },
      cucharaditas: { gramos: 5, cucharadas: 0.33 },
      cucharadas: { gramos: 15, cucharaditas: 3 }
    };

    const dosisEnGramos = unidad === 'gramos' ? dosisNueva : 
                         unidad === 'cucharaditas' ? dosisNueva * conversiones.cucharaditas.gramos :
                         dosisNueva * conversiones.cucharadas.gramos;

    return {
      factorEscalado,
      dosisNueva,
      dosisEnGramos,
      dosisEnCucharaditas: dosisEnGramos * conversiones.gramos.cucharaditas,
      dosisEnCucharadas: dosisEnGramos * conversiones.gramos.cucharadas
    };
  }, [especiaSeleccionada, dosisOriginal, porcionesOriginales, porcionesNuevas, unidad]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-bold text-slate-900">Calculadora de Escalado</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Especia
          </label>
          <select
            value={especiaSeleccionada?.id || ''}
            onChange={(e) => setEspeciaSeleccionada(especias.find(e => e.id === e.target.value) || null)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Seleccionar especia</option>
            {especias.map(especia => (
              <option key={especia.id} value={especia.id}>
                {especia.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Unidad
          </label>
          <select
            value={unidad}
            onChange={(e) => setUnidad(e.target.value as any)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="gramos">Gramos</option>
            <option value="cucharaditas">Cucharaditas</option>
            <option value="cucharadas">Cucharadas</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Dosis Original
          </label>
          <input
            type="number"
            value={dosisOriginal}
            onChange={(e) => setDosisOriginal(Number(e.target.value))}
            min="0.1"
            max="100"
            step="0.1"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Porciones Originales
          </label>
          <input
            type="number"
            value={porcionesOriginales}
            onChange={(e) => setPorcionesOriginales(Number(e.target.value))}
            min="1"
            max="50"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Porciones Nuevas
          </label>
          <input
            type="number"
            value={porcionesNuevas}
            onChange={(e) => setPorcionesNuevas(Number(e.target.value))}
            min="1"
            max="100"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {calculo && (
        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              Factor de Escalado: {calculo.factorEscalado.toFixed(2)}x
            </div>
            <div className="text-sm text-slate-600">
              De {porcionesOriginales} a {porcionesNuevas} porciones
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-slate-700">Gramos</div>
              <div className="text-xl font-bold text-orange-600">{calculo.dosisEnGramos.toFixed(1)}g</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-slate-700">Cucharaditas</div>
              <div className="text-xl font-bold text-orange-600">{calculo.dosisEnCucharaditas.toFixed(1)}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-slate-700">Cucharadas</div>
              <div className="text-xl font-bold text-orange-600">{calculo.dosisEnCucharadas.toFixed(1)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ConversionCalculator() {
  const [especiaSeleccionada, setEspeciaSeleccionada] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [unidadOrigen, setUnidadOrigen] = useState<'fresco' | 'seco'>('fresco');
  const [unidadDestino, setUnidadDestino] = useState<'fresco' | 'seco'>('seco');

  const calculo = useMemo(() => {
    if (!especiaSeleccionada || unidadOrigen === unidadDestino) return null;

    // Factores de conversión aproximados (fresco a seco)
    const factores = {
      'jengibre': 3, // 3g fresco = 1g seco
      'curcuma': 2.5,
      'ajo': 4,
      'cebolla': 6,
      'tomillo': 2,
      'oregano': 2,
      'romero': 2,
      'laurel': 1.5
    };

    const factor = factores[especiaSeleccionada as keyof typeof factores] || 3;
    
    if (unidadOrigen === 'fresco' && unidadDestino === 'seco') {
      return {
        cantidad: cantidad / factor,
        mensaje: `${cantidad}g fresco = ${(cantidad / factor).toFixed(1)}g seco`
      };
    } else {
      return {
        cantidad: cantidad * factor,
        mensaje: `${cantidad}g seco = ${(cantidad * factor).toFixed(1)}g fresco`
      };
    }
  }, [especiaSeleccionada, cantidad, unidadOrigen, unidadDestino]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Scale className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-900">Conversión Fresco/Seco</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Especia/Hierba
          </label>
          <select
            value={especiaSeleccionada}
            onChange={(e) => setEspeciaSeleccionada(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Seleccionar especia</option>
            <option value="jengibre">Jengibre</option>
            <option value="curcuma">Cúrcuma</option>
            <option value="ajo">Ajo</option>
            <option value="cebolla">Cebolla</option>
            <option value="tomillo">Tomillo</option>
            <option value="oregano">Orégano</option>
            <option value="romero">Romero</option>
            <option value="laurel">Laurel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cantidad (g)
          </label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            min="0.1"
            max="1000"
            step="0.1"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            De
          </label>
          <select
            value={unidadOrigen}
            onChange={(e) => setUnidadOrigen(e.target.value as any)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="fresco">Fresco</option>
            <option value="seco">Seco</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            A
          </label>
          <select
            value={unidadDestino}
            onChange={(e) => setUnidadDestino(e.target.value as any)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="fresco">Fresco</option>
            <option value="seco">Seco</option>
          </select>
        </div>
      </div>

      {calculo && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {calculo.cantidad.toFixed(1)}g
            </div>
            <div className="text-sm text-slate-600">{calculo.mensaje}</div>
          </div>
          
          <div className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-lg">
            <strong>Nota:</strong> Los factores de conversión son aproximados. 
            El sabor puede variar según la frescura y calidad de la especia.
          </div>
        </div>
      )}
    </div>
  );
}

export function BalancePicanteCalculator() {
  const [nivelActual, setNivelActual] = useState(5);
  const [nivelDeseado, setNivelDeseado] = useState(3);
  const [especiaPicante, setEspeciaPicante] = useState('chile');

  const calculo = useMemo(() => {
    if (nivelActual <= nivelDeseado) return null;

    const factorReduccion = nivelDeseado / nivelActual;
    const sugerencias = {
      chile: ['Pimentón dulce', 'Azúcar', 'Leche de coco', 'Mantequilla'],
      pimienta: ['Nuez moscada', 'Canela', 'Cardamomo', 'Vainilla'],
      jengibre: ['Miel', 'Azúcar', 'Leche', 'Yogur']
    };

    return {
      factorReduccion,
      sugerencias: sugerencias[especiaPicante as keyof typeof sugerencias] || sugerencias.chile,
      nivelReduccion: Math.round((1 - factorReduccion) * 100)
    };
  }, [nivelActual, nivelDeseado, especiaPicante]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="h-6 w-6 text-red-600" />
        <h3 className="text-xl font-bold text-slate-900">Balance de Picante</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Especia Picante
          </label>
          <select
            value={especiaPicante}
            onChange={(e) => setEspeciaPicante(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="chile">Chile</option>
            <option value="pimienta">Pimienta</option>
            <option value="jengibre">Jengibre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nivel Actual (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={nivelActual}
            onChange={(e) => setNivelActual(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-slate-600">{nivelActual}</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nivel Deseado (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={nivelDeseado}
            onChange={(e) => setNivelDeseado(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-slate-600">{nivelDeseado}</div>
        </div>
      </div>

      {calculo && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-red-600 mb-2">
              Reducir {calculo.nivelReduccion}%
            </div>
            <div className="text-sm text-slate-600">
              Factor de reducción: {calculo.factorReduccion.toFixed(2)}x
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-slate-700 mb-2">Ingredientes para Suavizar:</h4>
            <div className="grid grid-cols-2 gap-2">
              {calculo.sugerencias.map((ingrediente, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">{ingrediente}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-lg">
            <strong>Tip:</strong> Agregar gradualmente los ingredientes suavizantes 
            y probar hasta alcanzar el nivel deseado.
          </div>
        </div>
      )}
    </div>
  );
}
