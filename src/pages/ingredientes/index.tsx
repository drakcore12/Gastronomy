import React from 'react';
import { 
  ArrowRight, 
  Beef, 
  Carrot, 
  Apple, 
  Award, 
  Wheat, 
  Droplets,
  Search,
  Filter
} from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

export default function IngredientesHome() {
  const { navigateTo } = useNavigation();
  const categories = [
    {
      id: 'proteina',
      name: 'Proteínas',
      description: 'Carnes, pescados y aves con cortes detallados',
      icon: Beef,
      color: 'bg-red-50 text-red-600 border-red-200',
      href: '/ingredientes/proteina',
      count: '75+ cortes'
    },
    {
      id: 'verduras',
      name: 'Verduras',
      description: 'Vegetales frescos y de temporada',
      icon: Carrot,
      color: 'bg-green-50 text-green-600 border-green-200',
      href: '/ingredientes/verduras',
      count: '50+ variedades'
    },
    {
      id: 'frutas',
      name: 'Frutas',
      description: 'Frutas frescas y tropicales',
      icon: Apple,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      href: '/ingredientes/frutas',
      count: '40+ tipos'
    },
    {
      id: 'especias',
      name: 'Especias',
      description: 'Hierbas y condimentos del mundo',
      icon: Award,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      href: '/ingredientes/especias',
      count: '60+ especias'
    },
    {
      id: 'harinas',
      name: 'Harinas',
      description: 'Cereales, granos y harinas',
      icon: Wheat,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      href: '/ingredientes/harinas',
      count: '25+ variedades'
    },
    {
      id: 'aceites',
      name: 'Aceites',
      description: 'Grasas y aceites para cocinar',
      icon: Droplets,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      href: '/ingredientes/aceites',
      count: '15+ tipos'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Biblioteca de
              <span className="text-orange-600"> Ingredientes</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
              Explora nuestra colección completa de ingredientes con información detallada, 
              técnicas de preparación y consejos de expertos.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar ingredientes..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Explora por Categorías
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Navega por nuestros ingredientes organizados por tipo
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                key={category.id}
                    onClick={() => {
                      if (category.id === 'proteina') {
                        navigateTo('proteina');
                      } else {
                        // Para otras categorías, mostrar mensaje o redirigir
                        alert(`Próximamente: ${category.name}`);
                      }
                    }}
                className="group relative rounded-2xl border-2 p-6 bg-white hover:shadow-lg transition-all duration-200 hover:scale-105 text-left w-full"
              >
                <div className={`rounded-lg p-4 ${category.color} mb-4`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-600 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-600">
                      {category.count}
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section - Proteínas */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Destacado: Proteínas</h3>
                <p className="text-slate-600 mt-2">
                  Nuestra sección más completa con cortes detallados y técnicas profesionales
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <span className="text-sm text-slate-500">75+ cortes disponibles</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-sm text-slate-600">Especies</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">15+</div>
                <div className="text-sm text-slate-600">Técnicas</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">50+</div>
                <div className="text-sm text-slate-600">Recetas</div>
              </div>
            </div>
            
            <button
              onClick={() => navigateTo('proteina')}
              className="inline-flex items-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors"
            >
              Explorar Proteínas
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
