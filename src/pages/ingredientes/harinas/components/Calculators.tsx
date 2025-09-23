import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Droplets, Scale, Zap } from 'lucide-react';
import { Harina } from '../data/harinas';

interface BlendCalculatorProps {
  harinas: Harina[];
}

export function BlendCalculator({ harinas }: BlendCalculatorProps) {
  const [harinaA, setHarinaA] = useState<Harina | null>(null);
  const [harinaB, setHarinaB] = useState<Harina | null>(null);
  const [proteinaObjetivo, setProteinaObjetivo] = useState(12);
  const [cantidadTotal, setCantidadTotal] = useState(1000);

  const calculo = useMemo(() => {
    if (!harinaA || !harinaB) return null;

    const proteinaA = harinaA.proteina.promedio;
    const proteinaB = harinaB.proteina.promedio;
    const objetivo = proteinaObjetivo;

    // Fórmula: (objetivo - proteinaA) / (proteinaB - proteinaA)
    const proporcionB = (objetivo - proteinaA) / (proteinaB - proteinaA);
    const proporcionA = 1 - proporcionB;

    if (proporcionA < 0 || proporcionA > 1) {
      return { error: 'No se puede lograr esta proteína con estas harinas' };
    }

    const cantidadA = Math.round(cantidadTotal * proporcionA);
    const cantidadB = Math.round(cantidadTotal * proporcionB);

    return {
      cantidadA,
      cantidadB,
      proporcionA: Math.round(proporcionA * 100),
      proporcionB: Math.round(proporcionB * 100),
      proteinaFinal: Math.round((proteinaA * proporcionA + proteinaB * proporcionB) * 100) / 100
    };
  }, [harinaA, harinaB, proteinaObjetivo, cantidadTotal]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-bold text-slate-900">Calculadora de Blends</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Harina A
          </label>
          <select
            value={harinaA?.id || ''}
            onChange={(e) => setHarinaA(harinas.find(h => h.id === e.target.value) || null)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Seleccionar harina A</option>
            {harinas.map(harina => (
              <option key={harina.id} value={harina.id}>
                {harina.nombre} ({harina.proteina.promedio}% proteína)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Harina B
          </label>
          <select
            value={harinaB?.id || ''}
            onChange={(e) => setHarinaB(harinas.find(h => h.id === e.target.value) || null)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Seleccionar harina B</option>
            {harinas.map(harina => (
              <option key={harina.id} value={harina.id}>
                {harina.nombre} ({harina.proteina.promedio}% proteína)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Proteína Objetivo (%)
          </label>
          <input
            type="number"
            value={proteinaObjetivo}
            onChange={(e) => setProteinaObjetivo(Number(e.target.value))}
            min="5"
            max="25"
            step="0.1"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cantidad Total (g)
          </label>
          <input
            type="number"
            value={cantidadTotal}
            onChange={(e) => setCantidadTotal(Number(e.target.value))}
            min="100"
            max="5000"
            step="50"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {calculo && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          {calculo.error ? (
            <div className="text-red-600 font-semibold">{calculo.error}</div>
          ) : (
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {calculo.proteinaFinal}% Proteína Final
                </div>
                <div className="text-sm text-slate-600">
                  Mezcla: {calculo.proporcionA}% A + {calculo.proporcionB}% B
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-semibold text-slate-700">{harinaA?.nombre}</div>
                  <div className="text-2xl font-bold text-orange-600">{calculo.cantidadA}g</div>
                  <div className="text-sm text-slate-500">{calculo.proporcionA}%</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-semibold text-slate-700">{harinaB?.nombre}</div>
                  <div className="text-2xl font-bold text-orange-600">{calculo.cantidadB}g</div>
                  <div className="text-sm text-slate-500">{calculo.proporcionB}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function HidratacionCalculator({ harinas }: BlendCalculatorProps) {
  const [harinaSeleccionada, setHarinaSeleccionada] = useState<Harina | null>(null);
  const [tecnica, setTecnica] = useState<'pan' | 'pizza' | 'pasteleria' | 'pasta'>('pan');
  const [cantidadHarina, setCantidadHarina] = useState(1000);
  const [factorAjuste, setFactorAjuste] = useState(1);

  const calculo = useMemo(() => {
    if (!harinaSeleccionada) return null;

    const hidratacionBase = harinaSeleccionada.hidratacionTipica[tecnica];
    const hidratacionAjustada = hidratacionBase * factorAjuste;
    const cantidadAgua = Math.round(cantidadHarina * hidratacionAjustada / 100);

    return {
      hidratacionBase,
      hidratacionAjustada,
      cantidadAgua,
      cantidadTotal: cantidadHarina + cantidadAgua
    };
  }, [harinaSeleccionada, tecnica, cantidadHarina, factorAjuste]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Droplets className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-900">Calculadora de Hidratación</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Harina
          </label>
          <select
            value={harinaSeleccionada?.id || ''}
            onChange={(e) => setHarinaSeleccionada(harinas.find(h => h.id === e.target.value) || null)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Seleccionar harina</option>
            {harinas.map(harina => (
              <option key={harina.id} value={harina.id}>
                {harina.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Técnica
          </label>
          <select
            value={tecnica}
            onChange={(e) => setTecnica(e.target.value as any)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="pan">Pan</option>
            <option value="pizza">Pizza</option>
            <option value="pasteleria">Pastelería</option>
            <option value="pasta">Pasta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cantidad de Harina (g)
          </label>
          <input
            type="number"
            value={cantidadHarina}
            onChange={(e) => setCantidadHarina(Number(e.target.value))}
            min="100"
            max="5000"
            step="50"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Factor de Ajuste
          </label>
          <input
            type="number"
            value={factorAjuste}
            onChange={(e) => setFactorAjuste(Number(e.target.value))}
            min="0.5"
            max="2"
            step="0.1"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <div className="text-xs text-slate-500 mt-1">
            1.0 = estándar, 1.2 = más húmedo, 0.8 = más seco
          </div>
        </div>
      </div>

      {calculo && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {calculo.hidratacionAjustada.toFixed(1)}% Hidratación
            </div>
            <div className="text-sm text-slate-600">
              Base: {calculo.hidratacionBase}% | Ajustado: {calculo.hidratacionAjustada.toFixed(1)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-slate-700">Harina</div>
              <div className="text-2xl font-bold text-blue-600">{cantidadHarina}g</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="font-semibold text-slate-700">Agua</div>
              <div className="text-2xl font-bold text-blue-600">{calculo.cantidadAgua}g</div>
            </div>
          </div>
          
          <div className="text-center mt-4 p-3 bg-white rounded-lg">
            <div className="font-semibold text-slate-700">Masa Total</div>
            <div className="text-2xl font-bold text-blue-600">{calculo.cantidadTotal}g</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GlutenFreeBinderHelper() {
  const [tipoMezcla, setTipoMezcla] = useState<'pan' | 'pasteleria' | 'fritura'>('pan');
  const [cantidadHarina, setCantidadHarina] = useState(1000);

  const calculo = useMemo(() => {
    const ratios = {
      pan: { xantana: 0.8, psyllium: 2.0, gomaGuar: 0.5 },
      pasteleria: { xantana: 0.3, psyllium: 1.0, gomaGuar: 0.2 },
      fritura: { xantana: 0.5, psyllium: 1.5, gomaGuar: 0.3 }
    };

    const ratio = ratios[tipoMezcla];
    const xantana = Math.round(cantidadHarina * ratio.xantana / 100);
    const psyllium = Math.round(cantidadHarina * ratio.psyllium / 100);
    const gomaGuar = Math.round(cantidadHarina * ratio.gomaGuar / 100);

    return { xantana, psyllium, gomaGuar };
  }, [tipoMezcla, cantidadHarina]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <Zap className="h-6 w-6 text-green-600" />
        <h3 className="text-xl font-bold text-slate-900">Ayudante de Binders Sin Gluten</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tipo de Mezcla
          </label>
          <select
            value={tipoMezcla}
            onChange={(e) => setTipoMezcla(e.target.value as any)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="pan">Pan</option>
            <option value="pasteleria">Pastelería</option>
            <option value="fritura">Fritura</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Cantidad de Harina (g)
          </label>
          <input
            type="number"
            value={cantidadHarina}
            onChange={(e) => setCantidadHarina(Number(e.target.value))}
            min="100"
            max="5000"
            step="50"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="text-center mb-4">
          <div className="text-lg font-bold text-green-600 mb-2">
            Cantidades Recomendadas
          </div>
          <div className="text-sm text-slate-600">
            Para {cantidadHarina}g de harina sin gluten
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-slate-700">Xantana</div>
            <div className="text-xl font-bold text-green-600">{calculo.xantana}g</div>
            <div className="text-xs text-slate-500">Estructura</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-slate-700">Psyllium</div>
            <div className="text-xl font-bold text-green-600">{calculo.psyllium}g</div>
            <div className="text-xs text-slate-500">Elasticidad</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-slate-700">Goma Guar</div>
            <div className="text-xl font-bold text-green-600">{calculo.gomaGuar}g</div>
            <div className="text-xs text-slate-500">Hidratación</div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-lg">
          <strong>Tips:</strong> Mezcla los binders con la harina antes de añadir líquidos. 
          Ajusta según la humedad del ambiente y la textura deseada.
        </div>
      </div>
    </div>
  );
}
