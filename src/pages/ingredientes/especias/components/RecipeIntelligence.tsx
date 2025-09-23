import React, { useState, useMemo } from 'react';
import { ChefHat, Clock, Users, Zap, BookOpen } from 'lucide-react';
import { Especia } from '../data/especias';

interface Receta {
  id: string;
  nombre: string;
  categoria: string;
  dificultad: 'fácil' | 'medio' | 'difícil';
  tiempo: string;
  porciones: number;
  especias: {
    especia: string;
    cantidad: string;
    momento: string;
  }[];
  ingredientes: string[];
  instrucciones: string[];
  tips: string[];
}

interface RecipeIntelligenceProps {
  especias: Especia[];
}

export function RecipeIntelligence({ especias }: RecipeIntelligenceProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [especiaFiltro, setEspeciaFiltro] = useState('todas');
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null);

  const categorias = [
    { id: 'todas', nombre: 'Todas' },
    { id: 'carnes', nombre: 'Carnes' },
    { id: 'curries', nombre: 'Curries' },
    { id: 'panaderia', nombre: 'Panadería' },
    { id: 'postres', nombre: 'Postres' },
    { id: 'bebidas', nombre: 'Bebidas' }
  ];

  const recetas: Receta[] = [
    {
      id: 'curry-pollo',
      nombre: 'Curry de Pollo Masala',
      categoria: 'curries',
      dificultad: 'medio',
      tiempo: '45 min',
      porciones: 4,
      especias: [
        { especia: 'Cúrcuma', cantidad: '2 cucharaditas', momento: 'Al inicio con cebolla' },
        { especia: 'Comino', cantidad: '1 cucharadita', momento: 'Tostar antes de agregar' },
        { especia: 'Coriandro', cantidad: '1 cucharadita', momento: 'Tostar con comino' },
        { especia: 'Cardamomo', cantidad: '3 vainas', momento: 'Entero, retirar al final' },
        { especia: 'Chile', cantidad: '1 cucharadita', momento: 'Al final para ajustar picante' }
      ],
      ingredientes: [
        '1 kg de pollo en trozos',
        '2 cebollas medianas',
        '3 dientes de ajo',
        '2 cm de jengibre fresco',
        '400ml de leche de coco',
        '2 tomates maduros',
        'Aceite de coco',
        'Sal al gusto'
      ],
      instrucciones: [
        'Sofreír la cebolla hasta dorar',
        'Agregar ajo, jengibre y especias tostadas',
        'Incorporar el pollo y sellar',
        'Añadir tomates y cocinar 10 min',
        'Agregar leche de coco y cocinar 20 min',
        'Ajustar sal y picante al final'
      ],
      tips: [
        'Tostar las especias en seco antes de usar',
        'Usar leche de coco completa para mejor textura',
        'Dejar reposar 10 min antes de servir'
      ]
    },
    {
      id: 'pan-jengibre',
      nombre: 'Pan de Jengibre',
      categoria: 'panaderia',
      dificultad: 'fácil',
      tiempo: '2 horas',
      porciones: 8,
      especias: [
        { especia: 'Jengibre', cantidad: '2 cucharaditas', momento: 'Con la harina' },
        { especia: 'Canela', cantidad: '1 cucharadita', momento: 'Con la harina' },
        { especia: 'Clavo', cantidad: '1/4 cucharadita', momento: 'Con la harina' },
        { especia: 'Nuez moscada', cantidad: '1/4 cucharadita', momento: 'Con la harina' }
      ],
      ingredientes: [
        '300g de harina',
        '150g de azúcar moreno',
        '100g de mantequilla',
        '2 huevos',
        '1 cucharadita de bicarbonato',
        '150ml de leche',
        '2 cucharadas de melaza'
      ],
      instrucciones: [
        'Precalentar horno a 180°C',
        'Mezclar harina, especias y bicarbonato',
        'Batir mantequilla con azúcar',
        'Incorporar huevos y melaza',
        'Alternar harina y leche',
        'Hornear 45-50 min'
      ],
      tips: [
        'Rallar jengibre fresco para mejor sabor',
        'No sobremezclar la masa',
        'Probar con palillo antes de sacar'
      ]
    },
    {
      id: 'chai-masala',
      nombre: 'Chai Masala',
      categoria: 'bebidas',
      dificultad: 'fácil',
      tiempo: '15 min',
      porciones: 4,
      especias: [
        { especia: 'Cardamomo', cantidad: '6 vainas', momento: 'Aplastar ligeramente' },
        { especia: 'Canela', cantidad: '1 rama', momento: 'Entera para infusión' },
        { especia: 'Clavo', cantidad: '4 unidades', momento: 'Entero para infusión' },
        { especia: 'Jengibre', cantidad: '2 cm', momento: 'Rallar fresco' },
        { especia: 'Pimienta negra', cantidad: '6 granos', momento: 'Aplastar ligeramente' }
      ],
      ingredientes: [
        '4 tazas de agua',
        '2 tazas de leche',
        '4 cucharadas de té negro',
        '2 cucharadas de azúcar',
        '1 cucharadita de miel'
      ],
      instrucciones: [
        'Hervir agua con todas las especias',
        'Agregar té y hervir 2 min',
        'Añadir leche y hervir 5 min',
        'Colar y endulzar',
        'Servir caliente'
      ],
      tips: [
        'Aplastar especias para liberar aromas',
        'No hervir demasiado para evitar amargor',
        'Ajustar dulzor al gusto'
      ]
    },
    {
      id: 'filete-pimienta',
      nombre: 'Filete a la Pimienta',
      categoria: 'carnes',
      dificultad: 'medio',
      tiempo: '30 min',
      porciones: 2,
      especias: [
        { especia: 'Pimienta negra', cantidad: '2 cucharaditas', momento: 'Moler al momento' },
        { especia: 'Tomillo', cantidad: '1 cucharadita', momento: 'Con la pimienta' },
        { especia: 'Ajo', cantidad: '2 dientes', momento: 'Picado fino' }
      ],
      ingredientes: [
        '2 filetes de res (200g c/u)',
        '2 cucharadas de aceite de oliva',
        '2 cucharadas de brandy',
        '100ml de crema',
        'Sal al gusto'
      ],
      instrucciones: [
        'Sazonar filetes con sal y pimienta',
        'Sellar en sartén caliente 3 min por lado',
        'Retirar y reservar',
        'Sofreír ajo en la misma sartén',
        'Flamear con brandy',
        'Agregar crema y reducir',
        'Servir filetes con salsa'
      ],
      tips: [
        'Moler pimienta justo antes de usar',
        'Sartén muy caliente para sellar',
        'No cocinar demasiado la crema'
      ]
    }
  ];

  const recetasFiltradas = useMemo(() => {
    return recetas.filter(receta => {
      const categoriaMatch = categoriaSeleccionada === 'todas' || receta.categoria === categoriaSeleccionada;
      const especiaMatch = especiaFiltro === 'todas' || 
        receta.especias.some(e => e.especia.toLowerCase().includes(especiaFiltro.toLowerCase()));
      return categoriaMatch && especiaMatch;
    });
  }, [categoriaSeleccionada, especiaFiltro]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <ChefHat className="h-6 w-6 text-orange-600" />
        <h3 className="text-xl font-bold text-slate-900">Recetario Inteligente</h3>
      </div>

      {/* Filtros */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Categoría
          </label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Especia Principal
          </label>
          <select
            value={especiaFiltro}
            onChange={(e) => setEspeciaFiltro(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="todas">Todas las especias</option>
            {especias.map(especia => (
              <option key={especia.id} value={especia.nombre}>{especia.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de recetas */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {recetasFiltradas.map(receta => (
          <div
            key={receta.id}
            onClick={() => setRecetaSeleccionada(receta)}
            className="p-4 border border-slate-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-slate-900">{receta.nombre}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                receta.dificultad === 'fácil' ? 'bg-green-100 text-green-700' :
                receta.dificultad === 'medio' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {receta.dificultad}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{receta.tiempo}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{receta.porciones} porciones</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {receta.especias.slice(0, 3).map((esp, i) => (
                <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {esp.especia}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detalle de receta */}
      {recetaSeleccionada && (
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-2xl font-bold text-slate-900">{recetaSeleccionada.nombre}</h4>
              <div className="flex items-center space-x-4 text-slate-600 mt-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{recetaSeleccionada.tiempo}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{recetaSeleccionada.porciones} porciones</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setRecetaSeleccionada(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Especias */}
            <div>
              <h5 className="font-semibold text-slate-900 mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Especias y Momentos
              </h5>
              <div className="space-y-2">
                {recetaSeleccionada.especias.map((esp, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-slate-900">{esp.especia}</span>
                      <div className="text-sm text-slate-600">{esp.cantidad}</div>
                    </div>
                    <div className="text-xs text-slate-500 text-right">
                      {esp.momento}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredientes */}
            <div>
              <h5 className="font-semibold text-slate-900 mb-3 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Ingredientes
              </h5>
              <ul className="space-y-1">
                {recetaSeleccionada.ingredientes.map((ing, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-6">
            <h5 className="font-semibold text-slate-900 mb-3">Instrucciones</h5>
            <ol className="space-y-2">
              {recetaSeleccionada.instrucciones.map((inst, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-orange-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{inst}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {recetaSeleccionada.tips.length > 0 && (
            <div className="mt-6 bg-orange-50 rounded-lg p-4">
              <h5 className="font-semibold text-orange-900 mb-2">💡 Tips del Chef</h5>
              <ul className="space-y-1">
                {recetaSeleccionada.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-orange-800 flex items-start">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
