import React, { useState } from 'react';
import { 
  ChefHat, 
  ArrowRight, 
  Search, 
  Carrot,
  Star,
  Clock,
  Filter,
  BookOpen,
  Zap,
  Leaf,
  Heart,
  Thermometer,
  Droplets
} from 'lucide-react';

export default function VerdurasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const verduras = [
    {
      id: 'zanahoria',
      name: 'Zanahoria',
      nameEn: 'Carrot',
      season: 'Otoño/Invierno',
      flavor: 'Dulce, Terroso',
      uses: ['Sopas', 'Salteados', 'Crudas', 'Purés'],
      cookingTime: '15-20 min',
      color: 'from-orange-500 to-orange-600',
      description: 'Raíz versátil rica en betacarotenos.',
      tips: 'Cocinar con un poco de grasa para absorber mejor los nutrientes',
      nutrients: ['Vitamina A', 'Fibra', 'Potasio']
    },
    {
      id: 'cebolla',
      name: 'Cebolla',
      nameEn: 'Onion',
      season: 'Todo el año',
      flavor: 'Picante, Dulce',
      uses: ['Sofritos', 'Sopas', 'Salteados', 'Crudas'],
      cookingTime: '10-15 min',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Base fundamental de la cocina.',
      tips: 'Cortar bajo agua fría para evitar llorar',
      nutrients: ['Vitamina C', 'Quercetina', 'Fibra']
    },
    {
      id: 'ajo',
      name: 'Ajo',
      nameEn: 'Garlic',
      season: 'Todo el año',
      flavor: 'Intenso, Picante',
      uses: ['Sofritos', 'Salsas', 'Marinados', 'Asados'],
      cookingTime: '5-10 min',
      color: 'from-white to-gray-200',
      description: 'Condimento esencial con propiedades medicinales.',
      tips: 'Machacar antes de usar para liberar alicina',
      nutrients: ['Alicina', 'Vitamina C', 'Manganeso']
    },
    {
      id: 'tomate',
      name: 'Tomate',
      nameEn: 'Tomato',
      season: 'Verano',
      flavor: 'Ácido, Dulce',
      uses: ['Salsas', 'Ensaladas', 'Sopas', 'Asados'],
      cookingTime: '10-15 min',
      color: 'from-red-500 to-red-600',
      description: 'Fruto versátil rico en licopeno.',
      tips: 'Cocinar aumenta la biodisponibilidad del licopeno',
      nutrients: ['Licopeno', 'Vitamina C', 'Potasio']
    },
    {
      id: 'pimiento',
      name: 'Pimiento',
      nameEn: 'Bell Pepper',
      season: 'Verano',
      flavor: 'Dulce, Crujiente',
      uses: ['Salteados', 'Asados', 'Crudos', 'Rellenos'],
      cookingTime: '8-12 min',
      color: 'from-green-500 to-green-600',
      description: 'Vegetal colorido rico en vitamina C.',
      tips: 'Asar para intensificar el sabor dulce',
      nutrients: ['Vitamina C', 'Vitamina A', 'Fibra']
    },
    {
      id: 'brocoli',
      name: 'Brócoli',
      nameEn: 'Broccoli',
      season: 'Otoño/Invierno',
      flavor: 'Terroso, Ligeramente Amargo',
      uses: ['Vapor', 'Salteados', 'Sopas', 'Crudos'],
      cookingTime: '5-8 min',
      color: 'from-green-600 to-green-700',
      description: 'Superalimento rico en antioxidantes.',
      tips: 'Cocinar al vapor para preservar nutrientes',
      nutrients: ['Vitamina K', 'Vitamina C', 'Folato']
    },
    {
      id: 'espinaca',
      name: 'Espinaca',
      nameEn: 'Spinach',
      season: 'Primavera/Otoño',
      flavor: 'Suave, Terroso',
      uses: ['Ensaladas', 'Sopas', 'Salteados', 'Smoothies'],
      cookingTime: '2-3 min',
      color: 'from-green-500 to-emerald-500',
      description: 'Hoja verde rica en hierro y folato.',
      tips: 'Cocinar reduce el volumen y concentra nutrientes',
      nutrients: ['Hierro', 'Folato', 'Vitamina K']
    },
    {
      id: 'calabaza',
      name: 'Calabaza',
      nameEn: 'Pumpkin',
      season: 'Otoño',
      flavor: 'Dulce, Terroso',
      uses: ['Sopas', 'Purés', 'Asados', 'Postres'],
      cookingTime: '20-30 min',
      color: 'from-orange-600 to-orange-700',
      description: 'Vegetal de temporada perfecto para platos dulces y salados.',
      tips: 'Asar realza su sabor natural dulce',
      nutrients: ['Vitamina A', 'Fibra', 'Potasio']
    }
  ];

  const seasons = ['all', 'Primavera', 'Verano', 'Otoño', 'Invierno', 'Todo el año'];

  const filteredVerduras = verduras.filter(verdura => {
    const matchesSearch = verdura.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verdura.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verdura.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verdura.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSeason = selectedSeason === 'all' || verdura.season === selectedSeason;
    
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-slate-900">Verduras</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/ingredientes" className="text-slate-600 hover:text-orange-600 transition-colors">Ingredientes</a>
              <a href="/tecnicas" className="text-slate-600 hover:text-orange-600 transition-colors">Técnicas</a>
              <a href="/recetas" className="text-slate-600 hover:text-orange-600 transition-colors">Recetas</a>
            </nav>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Explorar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              <Carrot className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Verduras <span className="text-orange-600">Frescas</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Descubre el mundo de las verduras frescas. Desde las raíces más dulces hasta las hojas más nutritivas, 
              aprende a seleccionar, preparar y cocinar verduras para obtener el máximo sabor y nutrición.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar verduras, sabores, temporadas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Season Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedSeason === season
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  {season === 'all' ? 'Todas' : season}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verduras Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Biblioteca de Verduras
            </h2>
            <p className="text-xl text-slate-600">
              {filteredVerduras.length} verduras encontradas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVerduras.map((verdura) => (
              <div key={verdura.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${verdura.color} flex items-center justify-center text-white mb-4`}>
                  <Carrot className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{verdura.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{verdura.nameEn}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Temporada:</span>
                    <span className="text-sm text-slate-500">{verdura.season}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Sabor:</span>
                    <span className="text-sm text-slate-500">{verdura.flavor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Tiempo:</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">{verdura.cookingTime}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{verdura.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos comunes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {verdura.uses.map((use, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Nutrientes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {verdura.nutrients.map((nutrient, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600">{verdura.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooking Methods Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Técnicas de Cocción para Verduras
            </h2>
            <p className="text-xl text-slate-600">
              Maximiza el sabor y preserva los nutrientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Droplets className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Al Vapor</h3>
              <p className="text-slate-600 mb-4">
                Preserva nutrientes y mantiene textura crujiente. Ideal para brócoli, zanahorias y espinacas.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Tiempo:</strong> 5-15 min
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Thermometer className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Asado</h3>
              <p className="text-slate-600 mb-4">
                Intensifica sabores naturales. Perfecto para tomates, pimientos y calabazas.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Tiempo:</strong> 20-45 min
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Salteado</h3>
              <p className="text-slate-600 mb-4">
                Cocción rápida que mantiene color y textura. Ideal para cebollas, ajo y hongos.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Tiempo:</strong> 3-8 min
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Crudas</h3>
              <p className="text-slate-600 mb-4">
                Máximo valor nutricional. Perfecto para ensaladas, zanahorias y pepinos.
              </p>
              <div className="text-sm text-slate-500">
                <strong>Tiempo:</strong> 0 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para cocinar con verduras?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Descubre recetas que celebran el sabor natural de las verduras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-50 transition-colors">
              Ver Recetas
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
              Explorar Técnicas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
