import React, { useState, useMemo } from 'react';
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
  Droplets,
  Calculator,
  BarChart3,
  Eye,
  Info,
  AlertTriangle
} from 'lucide-react';
import { HARINAS, FAMILIAS, USOS_CULINARIOS, TECNICAS, type Harina } from './data/harinas';
import { BlendCalculator, HidratacionCalculator, GlutenFreeBinderHelper } from './components/Calculators';
import { Comparator } from './components/Comparator';
import { VisualGuides } from './components/VisualGuides';
import SearchSection from './components/SearchSection';
import HarinasGrid from './components/HarinasGrid';

export default function HarinasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamilia, setSelectedFamilia] = useState('all');
  const [selectedUso, setSelectedUso] = useState('all');
  const [proteinaRange, setProteinaRange] = useState<[number, number]>([0, 25]);
  const [sinGluten, setSinGluten] = useState(false);
  const [integral, setIntegral] = useState(false);
  const [organica, setOrganica] = useState(false);
  const [mostrarCalculadoras, setMostrarCalculadoras] = useState(false);
  const [mostrarComparador, setMostrarComparador] = useState(false);
  const [mostrarGuias, setMostrarGuias] = useState(false);

  const filteredHarinas = useMemo(() => {
    return HARINAS.filter(harina => {
      const matchesSearch = harina.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           harina.nombreCientifico.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           harina.usosIdeales.some(uso => uso.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           harina.alias.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFamilia = selectedFamilia === 'all' || harina.familia === selectedFamilia;
      const matchesUso = selectedUso === 'all' || harina.usosIdeales.some(uso => uso === selectedUso);
      const matchesProteina = harina.proteina.promedio >= proteinaRange[0] && harina.proteina.promedio <= proteinaRange[1];
      const matchesSinGluten = !sinGluten || !harina.gluten;
      const matchesIntegral = !integral || harina.extraccion >= 90;
      const matchesOrganica = !organica || harina.nombre.toLowerCase().includes('orgánica');
      
      return matchesSearch && matchesFamilia && matchesUso && matchesProteina && 
             matchesSinGluten && matchesIntegral && matchesOrganica;
    });
  }, [searchQuery, selectedFamilia, selectedUso, proteinaRange, sinGluten, integral, organica]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              <Wheat className="inline-block h-12 w-12 text-orange-600 mr-4" />
              Harinas y <span className="text-orange-600">Cereales</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Herramienta profesional para estudiantes de gastronomía y chefs. 
              Descubre métricas técnicas, calculadoras prácticas y guías visuales para dominar el arte de las harinas.
            </p>
            
            {/* Mapa de categorías */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-4xl mx-auto">
              {FAMILIAS.map((familia) => (
                <button
                  key={familia.id}
                  onClick={() => setSelectedFamilia(familia.id)}
                  className={`p-4 rounded-xl transition-all ${
                    selectedFamilia === familia.id
                      ? 'bg-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white text-slate-700 hover:bg-orange-50 hover:scale-105'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${familia.color} mx-auto mb-2`} />
                  <div className="text-sm font-semibold">{familia.nombre}</div>
                </button>
              ))}
            </div>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => setSelectedUso('Pan')}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                <BookOpen className="h-5 w-5 inline mr-2" />
                Explorar por Uso
              </button>
              <button 
                onClick={() => setProteinaRange([12, 25])}
                className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                <BarChart3 className="h-5 w-5 inline mr-2" />
                Explorar por Proteína
              </button>
            </div>

            {/* Tooltip de seguridad */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-amber-800">Información de Seguridad</span>
              </div>
              <p className="text-sm text-amber-700">
                Alérgenos: Gluten, frutos secos. Contaminación cruzada posible. 
                Consulta siempre las etiquetas y certificaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" role="main">
        {/* Search Section */}
        <SearchSection
          query={searchQuery}
          setQuery={setSearchQuery}
          filteredLength={filteredHarinas.length}
          harinas={HARINAS}
          selectedFamilia={selectedFamilia}
          setSelectedFamilia={setSelectedFamilia}
          selectedUso={selectedUso}
          setSelectedUso={setSelectedUso}
          proteinaRange={proteinaRange}
          setProteinaRange={setProteinaRange}
          sinGluten={sinGluten}
          setSinGluten={setSinGluten}
          mostrarComparador={mostrarComparador}
          setMostrarComparador={setMostrarComparador}
        />

        {/* Herramientas profesionales */}
        {(mostrarCalculadoras || mostrarComparador || mostrarGuias) && (
          <section className="py-12 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Herramientas Profesionales</h2>
                <p className="text-slate-600">Calculadoras, comparador y guías para chefs y estudiantes</p>
              </div>

              <div className="space-y-8">
                {mostrarCalculadoras && (
                  <div className="grid lg:grid-cols-3 gap-6">
                    <BlendCalculator harinas={HARINAS} />
                    <HidratacionCalculator harinas={HARINAS} />
                    <GlutenFreeBinderHelper />
                  </div>
                )}

                {mostrarComparador && (
                  <Comparator harinas={HARINAS} />
                )}

                {mostrarGuias && (
                  <VisualGuides />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Grid de harinas */}
        <HarinasGrid harinas={filteredHarinas} />
      </main>
    </div>
  );
}

