import React, { useState } from 'react';
import { 
  ChefHat, 
  ArrowRight, 
  Search, 
  Flame,
  Star,
  Clock,
  Filter,
  BookOpen,
  Zap,
  Leaf,
  Heart
} from 'lucide-react';

export default function EspeciasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('all');

  const especias = [
    {
      id: 'pimienta',
      name: 'Pimienta Negra',
      nameEn: 'Black Pepper',
      origin: 'India',
      flavor: 'Picante, Terroso',
      uses: ['Carnes', 'Sopas', 'Salsas', 'Marinados'],
      intensity: 4,
      color: 'from-slate-700 to-slate-900',
      description: 'La reina de las especias, esencial en cualquier cocina.',
      tips: 'Moler justo antes de usar para máximo sabor'
    },
    {
      id: 'comino',
      name: 'Comino',
      nameEn: 'Cumin',
      origin: 'Medio Oriente',
      flavor: 'Tierra, Caliente',
      uses: ['Curries', 'Tacos', 'Hummus', 'Chili'],
      intensity: 3,
      color: 'from-amber-600 to-orange-600',
      description: 'Esencia de la cocina mexicana e india.',
      tips: 'Tostar ligeramente antes de moler para intensificar el sabor'
    },
    {
      id: 'oregano',
      name: 'Orégano',
      nameEn: 'Oregano',
      origin: 'Mediterráneo',
      flavor: 'Herbal, Ligeramente Amargo',
      uses: ['Pizza', 'Pasta', 'Tomates', 'Aceites'],
      intensity: 2,
      color: 'from-green-600 to-emerald-600',
      description: 'Hierba mediterránea por excelencia.',
      tips: 'Mejor sabor cuando se usa seco'
    },
    {
      id: 'tomillo',
      name: 'Tomillo',
      nameEn: 'Thyme',
      origin: 'Mediterráneo',
      flavor: 'Herbal, Ligeramente Picante',
      uses: ['Aves', 'Vegetales', 'Sopas', 'Marinados'],
      intensity: 2,
      color: 'from-green-500 to-teal-500',
      description: 'Hierba versátil para carnes y vegetales.',
      tips: 'Agregar al final de la cocción para preservar el sabor'
    },
    {
      id: 'romero',
      name: 'Romero',
      nameEn: 'Rosemary',
      origin: 'Mediterráneo',
      flavor: 'Pine, Terroso',
      uses: ['Cordero', 'Pollo', 'Papas', 'Pan'],
      intensity: 3,
      color: 'from-green-700 to-green-800',
      description: 'Hierba robusta perfecta para carnes asadas.',
      tips: 'Usar con moderación, puede dominar otros sabores'
    },
    {
      id: 'laurel',
      name: 'Hoja de Laurel',
      nameEn: 'Bay Leaf',
      origin: 'Mediterráneo',
      flavor: 'Herbal, Ligeramente Amargo',
      uses: ['Sopas', 'Estofados', 'Arroces', 'Marinados'],
      intensity: 2,
      color: 'from-green-600 to-green-700',
      description: 'Esencial para sopas y estofados.',
      tips: 'Remover antes de servir, no es comestible'
    },
    {
      id: 'canela',
      name: 'Canela',
      nameEn: 'Cinnamon',
      origin: 'Sri Lanka',
      flavor: 'Dulce, Caliente',
      uses: ['Postres', 'Café', 'Curries', 'Pan'],
      intensity: 3,
      color: 'from-amber-700 to-amber-800',
      description: 'Especia dulce perfecta para postres y bebidas.',
      tips: 'Usar en rama para infusiones, molida para hornear'
    },
    {
      id: 'clavo',
      name: 'Clavo de Olor',
      nameEn: 'Cloves',
      origin: 'Indonesia',
      flavor: 'Intenso, Picante',
      uses: ['Postres', 'Jamón', 'Mulled Wine', 'Curries'],
      intensity: 4,
      color: 'from-amber-800 to-amber-900',
      description: 'Especia intensa con sabor único.',
      tips: 'Usar con moderación, muy potente'
    }
  ];

  const origins = ['all', 'India', 'Medio Oriente', 'Mediterráneo', 'Sri Lanka', 'Indonesia'];

  const filteredEspecias = especias.filter(especia => {
    const matchesSearch = especia.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         especia.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         especia.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         especia.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesOrigin = selectedOrigin === 'all' || especia.origin === selectedOrigin;
    
    return matchesSearch && matchesOrigin;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-slate-900">Especias</span>
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
              <Flame className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Especias y <span className="text-orange-600">Condimentos</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Descubre el mundo mágico de las especias. Desde la pimienta negra hasta el clavo de olor, 
              aprende a usar cada especia para transformar tus platos en experiencias culinarias extraordinarias.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar especias, sabores, usos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Origin Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {origins.map((origin) => (
                <button
                  key={origin}
                  onClick={() => setSelectedOrigin(origin)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedOrigin === origin
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  {origin === 'all' ? 'Todas' : origin}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Especias Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Biblioteca de Especias
            </h2>
            <p className="text-xl text-slate-600">
              {filteredEspecias.length} especias encontradas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEspecias.map((especia) => (
              <div key={especia.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${especia.color} flex items-center justify-center text-white mb-4`}>
                  <Flame className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{especia.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{especia.nameEn}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Origen:</span>
                    <span className="text-sm text-slate-500">{especia.origin}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Sabor:</span>
                    <span className="text-sm text-slate-500">{especia.flavor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Intensidad:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < especia.intensity ? 'text-orange-500 fill-current' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{especia.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos comunes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {especia.uses.map((use, index) => (
                      <span
                        key={index}
                        className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600">{especia.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Consejos para Usar Especias
            </h2>
            <p className="text-xl text-slate-600">
              Maximiza el sabor y aroma de tus especias
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tiempo de Agregado</h3>
              <p className="text-slate-600">
                Las especias enteras se agregan al inicio, las molidas al final para preservar su sabor.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tostar para Intensificar</h3>
              <p className="text-slate-600">
                Tostar especias enteras en una sartén seca antes de moler intensifica su sabor.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Almacenamiento</h3>
              <p className="text-slate-600">
                Guarda las especias en recipientes herméticos, lejos del calor y la luz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para experimentar con especias?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Descubre recetas que destacan el sabor de cada especia
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
