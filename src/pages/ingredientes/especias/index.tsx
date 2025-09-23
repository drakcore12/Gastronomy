import React, { useState, useMemo } from 'react';
import { 
  Flame,
  Map,
  Globe,
  ChefHat,
  Calculator,
  BarChart3,
  BookOpen,
  Eye
} from 'lucide-react';

// Importar componentes
import { SearchSection } from './components/SearchSection';
import { EspeciasGrid } from './components/EspeciasGrid';
import { EscaladoCalculator, ConversionCalculator, BalancePicanteCalculator } from './components/Calculators';
import { Comparator } from './components/Comparator';
import { VisualGuides } from './components/VisualGuides';
import { RecipeIntelligence } from './components/RecipeIntelligence';

// Importar datos
import { ESPECIAS, REGIONES } from './data/especias';
import type { Especia } from './data/especias';

export default function EspeciasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtros, setFiltros] = useState({
    clasificacion: 'todas',
    perfilSensorial: 'todas',
    intensidad: 'todas',
    region: 'todas',
    uso: 'todas',
    propiedad: 'todas'
  });

  // Estados para herramientas profesionales
  const [mostrarCalculadoras, setMostrarCalculadoras] = useState(false);
  const [mostrarComparador, setMostrarComparador] = useState(false);
  const [mostrarGuias, setMostrarGuias] = useState(false);
  const [mostrarRecetas, setMostrarRecetas] = useState(false);

  // Filtrado de especias
  const filteredEspecias = useMemo(() => {
    return ESPECIAS.filter(especia => {
      // Búsqueda por texto
      const matchesSearch = searchQuery === '' || 
        especia.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        especia.nombreCientifico.toLowerCase().includes(searchQuery.toLowerCase()) ||
        especia.sabor.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        especia.usosCulinarios.some(u => u.toLowerCase().includes(searchQuery.toLowerCase())) ||
        especia.propiedades.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtros específicos
      const matchesClasificacion = filtros.clasificacion === 'todas' || especia.clasificacionBotanica === filtros.clasificacion;
      const matchesIntensidad = filtros.intensidad === 'todas' || especia.intensidad === filtros.intensidad;
      const matchesRegion = filtros.region === 'todas' || especia.region === filtros.region;
      const matchesUso = filtros.uso === 'todas' || especia.usosCulinarios.includes(filtros.uso);
      const matchesPropiedad = filtros.propiedad === 'todas' || especia.propiedades.includes(filtros.propiedad);

      // Filtro por perfil sensorial
      const matchesPerfilSensorial = filtros.perfilSensorial === 'todas' || 
        especia.perfilSensorial[filtros.perfilSensorial as keyof typeof especia.perfilSensorial] >= 5;

      return matchesSearch && matchesClasificacion && matchesIntensidad && 
             matchesRegion && matchesUso && matchesPropiedad && matchesPerfilSensorial;
    });
  }, [searchQuery, filtros]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              <Flame className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Especias y <span className="text-orange-600">Condimentos</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Explora el mundo de las especias: aromas, sabores y usos culinarios. 
              Desde la pimienta negra hasta el clavo de olor, aprende a usar cada especia 
              para transformar tus platos en experiencias culinarias extraordinarias.
            </p>
            
            {/* CTAs por función y origen */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => setMostrarGuias(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
              >
                <Map className="h-5 w-5" />
                <span>Explorar por Origen</span>
              </button>
              <button 
                onClick={() => setMostrarRecetas(true)}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-orange-600 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
              >
                <ChefHat className="h-5 w-5" />
                <span>Explorar por Función</span>
              </button>
            </div>

            {/* Mapa de regiones */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {REGIONES.map(region => (
                <div 
                  key={region.id}
                  className={`p-4 rounded-lg bg-gradient-to-r ${region.color} text-center cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => setFiltros({...filtros, region: region.id})}
                >
                  <Globe className="h-6 w-6 mx-auto mb-2 text-white" />
                  <div className="text-sm font-semibold text-white">{region.nombre}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de búsqueda y filtros */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filtros={filtros}
            setFiltros={setFiltros}
            especias={ESPECIAS}
            onMostrarCalculadoras={() => setMostrarCalculadoras(true)}
            onMostrarComparador={() => setMostrarComparador(true)}
            onMostrarGuias={() => setMostrarGuias(true)}
            onMostrarRecetas={() => setMostrarRecetas(true)}
          />
        </div>
      </section>

      {/* Grid de especias */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Biblioteca de Especias
            </h2>
            <p className="text-xl text-slate-600">
              {filteredEspecias.length} especias encontradas
            </p>
          </div>
          
          <EspeciasGrid 
            especias={filteredEspecias}
            onComparar={(especia) => {
              setMostrarComparador(true);
              // Aquí podrías agregar lógica para pre-seleccionar la especia
            }}
            onVerRecetas={(especia) => {
              setMostrarRecetas(true);
              // Aquí podrías agregar lógica para filtrar recetas por especia
            }}
          />
        </div>
      </section>

      {/* Herramientas profesionales */}
      {(mostrarCalculadoras || mostrarComparador || mostrarGuias || mostrarRecetas) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Herramientas Profesionales
              </h2>
              <p className="text-xl text-slate-600">
                Calculadoras, comparadores y guías especializadas
              </p>
            </div>

            {/* Calculadoras */}
            {mostrarCalculadoras && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-orange-600" />
                  Calculadoras Prácticas
                </h3>
                <div className="grid lg:grid-cols-3 gap-6">
                  <EscaladoCalculator especias={ESPECIAS} />
                  <ConversionCalculator />
                  <BalancePicanteCalculator />
                </div>
              </div>
            )}

            {/* Comparador */}
            {mostrarComparador && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Comparador de Especias
                </h3>
                <Comparator especias={ESPECIAS} />
              </div>
            )}

            {/* Guías visuales */}
            {mostrarGuias && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-green-600" />
                  Guías Visuales
                </h3>
                <VisualGuides />
              </div>
            )}

            {/* Recetario inteligente */}
            {mostrarRecetas && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
                  Recetario Inteligente
                </h3>
                <RecipeIntelligence especias={ESPECIAS} />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
