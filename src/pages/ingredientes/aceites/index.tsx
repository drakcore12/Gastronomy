import React, { useState } from 'react';
import { 
  ChefHat, 
  ArrowRight, 
  Search, 
  Droplets,
  Star,
  Clock,
  Filter,
  BookOpen,
  Zap,
  Leaf,
  Heart,
  Thermometer,
  Flame
} from 'lucide-react';

export default function AceitesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const aceites = [
    {
      id: 'oliva',
      name: 'Aceite de Oliva',
      nameEn: 'Olive Oil',
      type: 'Vegetal',
      smokePoint: '160-190°C',
      uses: ['Aderezos', 'Sofritos', 'Asados', 'Crudo'],
      color: 'from-green-600 to-green-700',
      description: 'El rey de los aceites, rico en ácidos grasos monoinsaturados.',
      tips: 'Extra virgen para crudo, refinado para cocinar',
      health: 'Alto'
    },
    {
      id: 'girasol',
      name: 'Aceite de Girasol',
      nameEn: 'Sunflower Oil',
      type: 'Vegetal',
      smokePoint: '225-230°C',
      uses: ['Frituras', 'Horneado', 'Salteados', 'Mayonesa'],
      color: 'from-yellow-400 to-yellow-500',
      description: 'Aceite neutro perfecto para frituras y horneado.',
      tips: 'Alto punto de humo, ideal para cocción a alta temperatura',
      health: 'Medio'
    },
    {
      id: 'coco',
      name: 'Aceite de Coco',
      nameEn: 'Coconut Oil',
      type: 'Vegetal',
      smokePoint: '175-200°C',
      uses: ['Horneado', 'Curries', 'Smoothies', 'Cosmética'],
      color: 'from-yellow-200 to-yellow-300',
      description: 'Aceite sólido a temperatura ambiente con sabor tropical.',
      tips: 'Sólido a temperatura ambiente, líquido al calentar',
      health: 'Medio'
    },
    {
      id: 'sesamo',
      name: 'Aceite de Sésamo',
      nameEn: 'Sesame Oil',
      type: 'Vegetal',
      smokePoint: '175-210°C',
      uses: ['Cocina Asiática', 'Aderezos', 'Marinados', 'Aromatizante'],
      color: 'from-amber-600 to-amber-700',
      description: 'Aceite aromático esencial en la cocina asiática.',
      tips: 'Usar poca cantidad, muy aromático',
      health: 'Alto'
    },
    {
      id: 'aguacate',
      name: 'Aceite de Aguacate',
      nameEn: 'Avocado Oil',
      type: 'Vegetal',
      smokePoint: '250-270°C',
      uses: ['Frituras', 'Asados', 'Aderezos', 'Crudo'],
      color: 'from-green-500 to-green-600',
      description: 'Aceite premium con alto punto de humo.',
      tips: 'Uno de los aceites más estables para cocinar',
      health: 'Alto'
    },
    {
      id: 'canola',
      name: 'Aceite de Canola',
      nameEn: 'Canola Oil',
      type: 'Vegetal',
      smokePoint: '200-230°C',
      uses: ['Horneado', 'Frituras', 'Salteados', 'Aderezos'],
      color: 'from-yellow-300 to-yellow-400',
      description: 'Aceite neutro y económico para uso general.',
      tips: 'Buen balance entre precio y calidad',
      health: 'Medio'
    },
    {
      id: 'mantequilla',
      name: 'Mantequilla',
      nameEn: 'Butter',
      type: 'Animal',
      smokePoint: '150-175°C',
      uses: ['Horneado', 'Sofritos', 'Salsas', 'Pan'],
      color: 'from-yellow-200 to-yellow-300',
      description: 'Grasa animal tradicional con sabor único.',
      tips: 'Clarificar para aumentar punto de humo',
      health: 'Medio'
    }
  ];

  const types = ['all', 'Vegetal', 'Animal'];

  const filteredAceites = aceites.filter(aceite => {
    const matchesSearch = aceite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         aceite.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         aceite.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || aceite.type === selectedType;
    
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
              <span className="text-2xl font-bold text-slate-900">Aceites</span>
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
              <Droplets className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Aceites y <span className="text-orange-600">Grasas</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Descubre el mundo de los aceites y grasas. Desde el clásico aceite de oliva hasta alternativas modernas, 
              aprende a elegir el aceite correcto para cada técnica de cocción y obtener los mejores resultados.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar aceites, tipos, usos..."
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
                  {type === 'all' ? 'Todos' : type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aceites Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Biblioteca de Aceites
            </h2>
            <p className="text-xl text-slate-600">
              {filteredAceites.length} aceites encontrados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAceites.map((aceite) => (
              <div key={aceite.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${aceite.color} flex items-center justify-center text-white mb-4`}>
                  <Droplets className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{aceite.name}</h3>
                <p className="text-slate-500 text-sm mb-3">{aceite.nameEn}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Tipo:</span>
                    <span className="text-sm text-slate-500">{aceite.type}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600">Punto de Humo:</span>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">{aceite.smokePoint}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600">Salud:</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      aceite.health === 'Alto' 
                        ? 'bg-green-100 text-green-700' 
                        : aceite.health === 'Medio'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {aceite.health}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{aceite.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Usos comunes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {aceite.uses.map((use, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600">{aceite.tips}</p>
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
            ¿Listo para cocinar con aceites?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Descubre técnicas que aprovechan cada tipo de aceite
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
