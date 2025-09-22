import React from 'react';
import {
  ChefHat,
  BookOpen,
  Utensils,
  Users,
  Award,
  ArrowRight,
  Beef,
  Fish,
  Carrot,
  Apple,
  Wheat,
  Droplets
} from 'lucide-react';
import './index.css';
import { useNavigation } from '../../contexts/NavigationContext';

// Componente principal de gastronomía
export default function GastronomiaHome() {
  const { navigateTo } = useNavigation();

  // Datos para las características
  const features = [
    {
      icon: ChefHat,
      title: 'Técnicas Profesionales',
      description: 'Aprende métodos de cocina de chefs expertos con explicaciones detalladas y consejos prácticos.',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Biblioteca Completa',
      description: 'Accede a una extensa colección de ingredientes, recetas y técnicas organizadas por categorías.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Utensils,
      title: 'Cortes Detallados',
      description: 'Explora cortes de carne, pescado y aves con diagramas interactivos y recomendaciones de cocción.',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Conecta con otros entusiastas de la cocina y comparte tus experiencias culinarias.',
      color: 'bg-green-50 text-green-600'
    }
  ];

  // Categorías principales
  const categories = [
    {
      id: 'ingredientes',
      name: 'Ingredientes',
      description: 'Explora nuestra biblioteca completa de ingredientes',
      icon: Carrot,
      color: 'bg-green-50 text-green-600 border-green-200',
      count: '200+ ingredientes',
      page: 'ingredientes'
    },
    {
      id: 'recetas',
      name: 'Recetas',
      description: 'Descubre recetas deliciosas paso a paso',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      count: '150+ recetas',
      page: 'recetas'
    },
    {
      id: 'tecnicas',
      name: 'Técnicas',
      description: 'Domina las técnicas culinarias profesionales',
      icon: ChefHat,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      count: '50+ técnicas',
      page: 'tecnicas'
    },
    {
      id: 'herramientas',
      name: 'Herramientas',
      description: 'Conoce las herramientas esenciales de cocina',
      icon: Utensils,
      color: 'bg-gray-50 text-gray-600 border-gray-200',
      count: '30+ herramientas',
      page: 'herramientas'
    }
  ];

  // Estadísticas
  const stats = [
    { number: '500+', label: 'Ingredientes' },
    { number: '200+', label: 'Recetas' },
    { number: '50+', label: 'Técnicas' },
    { number: '10K+', label: 'Usuarios' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Domina el Arte de la
              <span className="text-orange-600"> Gastronomía</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Aprende técnicas profesionales, explora ingredientes únicos y crea recetas extraordinarias 
              con nuestra plataforma educativa de gastronomía.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigateTo('ingredientes')}
                className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200 transform hover:scale-105"
              >
                Explorar Ingredientes
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
              <button
                onClick={() => navigateTo('tecnicas')}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-orange-600 transition-colors"
              >
                Ver Técnicas <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              ¿Por qué elegir nuestra plataforma?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Herramientas profesionales para chefs y entusiastas de la cocina
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`rounded-lg p-3 w-fit ${feature.color} mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Explora por Categorías
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Navega por nuestro contenido organizado por temas
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigateTo(category.page as any)}
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

      {/* CTA Section */}
      <section className="bg-orange-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              ¿Listo para comenzar tu viaje culinario?
            </h2>
            <p className="mt-4 text-lg text-orange-100">
              Únete a miles de chefs y entusiastas que ya están aprendiendo con nosotros.
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigateTo('ingredientes')}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}