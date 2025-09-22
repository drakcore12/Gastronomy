import React, { useState } from 'react';
import { 
  ChefHat, 
  ArrowRight, 
  Search, 
  Wheat,
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

export default function HarinasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const harinas = [
    {
      id: 'trigo',
      name: 'Harina de Trigo',
      nameEn: 'Wheat Flour',
      type: 'Cereales',
      protein: 'Alto',
      uses: ['Pan', 'Pasta', 'Pasteles', 'Galletas'],
      color: 'from-amber-300 to-amber-400',
      description: 'La harina más versátil para panadería y repostería.',
      tips: 'Tamizar antes de usar para evitar grumos',
      gluten: 'Sí'
    },
    {
      id: 'avena',
      name: 'Harina de Avena',
      nameEn: 'Oat Flour',
      type: 'Cereales',
      protein: 'Medio',
      uses: ['Pan', 'Galletas', 'Muffins', 'Pancakes'],
      color: 'from-yellow-400 to-yellow-500',
      description: 'Harina nutritiva con sabor a nuez.',
      tips: 'Mezclar con harina de trigo para mejor textura',
      gluten: 'No'
    },
    {
      id: 'arroz',
      name: 'Harina de Arroz',
      nameEn: 'Rice Flour',
      type: 'Cereales',
      protein: 'Bajo',
      uses: ['Tempura', 'Fideos', 'Postres', 'Sin gluten'],
      color: 'from-white to-gray-100',
      description: 'Harina sin gluten ideal para cocina asiática.',
      tips: 'Usar para rebozados crujientes',
      gluten: 'No'
    },
    {
      id: 'maiz',
      name: 'Harina de Maíz',
      nameEn: 'Corn Flour',
      type: 'Cereales',
      protein: 'Medio',
      uses: ['Tortillas', 'Arepas', 'Polenta', 'Pan'],
      color: 'from-yellow-500 to-yellow-600',
      description: 'Harina tradicional de América Latina.',
      tips: 'Mezclar con agua caliente para activar',
      gluten: 'No'
    },
    {
      id: 'almendras',
      name: 'Harina de Almendras',
      nameEn: 'Almond Flour',
      type: 'Frutos Secos',
      protein: 'Alto',
      uses: ['Macarons', 'Tartas', 'Sin gluten', 'Keto'],
      color: 'from-amber-200 to-amber-300',
      description: 'Harina rica en proteínas y grasas saludables.',
      tips: 'Refrigerar para mantener frescura',
      gluten: 'No'
    },
    {
      id: 'coco',
      name: 'Harina de Coco',
      nameEn: 'Coconut Flour',
      type: 'Frutos Secos',
      protein: 'Alto',
      uses: ['Postres', 'Sin gluten', 'Keto', 'Paleo'],
      color: 'from-yellow-200 to-yellow-300',
      description: 'Harina muy absorbente con sabor tropical.',
      tips: 'Usar menos cantidad que otras harinas',
      gluten: 'No'
    },
    {
      id: 'quinoa',
      name: 'Harina de Quinoa',
      nameEn: 'Quinoa Flour',
      type: 'Pseudo-cereales',
      protein: 'Alto',
      uses: ['Pan', 'Pasta', 'Sin gluten', 'Nutritivo'],
      color: 'from-green-300 to-green-400',
      description: 'Harina completa con todos los aminoácidos.',
      tips: 'Tostar antes de moler para mejor sabor',
      gluten: 'No'
    }
  ];

  const types = ['all', 'Cereales', 'Frutos Secos', 'Pseudo-cereales'];

  const filteredHarinas = harinas.filter(harina => {
    const matchesSearch = harina.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         harina.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         harina.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || harina.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold text-slate-900">Harinas</span>
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
              <Wheat className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Harinas y <span className="text-orange-600">Cereales</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Descubre el mundo de las harinas. Desde la tradicional harina de trigo hasta alternativas sin gluten, 
              aprende a elegir y usar cada tipo de harina para obtener los mejores resultados en tus preparaciones.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar harinas, tipos, usos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedType === type
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-orange-50'
                  }`}
                >
                  {type === 'all' ? 'Todas' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Harinas Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Biblioteca de Harinas
            </h2>
            <p className="text-xl text-slate-600">
              {filteredHarinas.length} harinas encontradas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredHarinas.map((harina) => (
              <div key={harina.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${harina.color} flex items-center justify-center text-white mb-4`}>
                  <Wheat className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{harina.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{harina.nameEn}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Tipo:</span>
                    <span className="text-sm text-slate-500">{harina.type}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Proteína:</span>
                    <span className="text-sm text-slate-500">{harina.protein}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Gluten:</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      harina.gluten === 'Sí' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {harina.gluten}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{harina.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos comunes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {harina.uses.map((use, index) => (
                      <span
                        key={index}
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600">{harina.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para hornear con harinas?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Descubre recetas que aprovechan cada tipo de harina
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
