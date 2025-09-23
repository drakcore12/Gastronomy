import React, { useState, useCallback, useMemo } from 'react';
import { Apple, ArrowRight, ChefHat, BookOpen, Zap, Banana, Cherry, Citrus, Circle, Grape, Triangle, Square } from 'lucide-react';
import { FRUTAS, type Fruta } from '../data/frutas';

type FrutaId = 'manzana' | 'platano' | 'fresa' | 'limon' | 'naranja' | 'uva' | 'pina' | 'mango';

interface HeroSliderProps {
  onSelectFruit?: (fruit: FrutaId) => void;
}

// Mapeo de iconos por tipo de fruta
const ICONOS_FRUTAS = {
  manzana: Apple,
  platano: Banana,
  fresa: Cherry,
  limon: Citrus,
  naranja: Circle,
  uva: Grape,
  pina: Triangle,
  mango: Square
};

// Función para obtener frutas en temporada
const getFrutasEnTemporada = (): Fruta[] => {
  const mesActual = new Date().getMonth() + 1; // getMonth() devuelve 0-11, necesitamos 1-12
  
  return FRUTAS.filter(fruta => 
    fruta.estacionalidad.includes(mesActual)
  );
};

// Función para agrupar frutas por tipo primario
const agruparFrutasPorTipo = (frutas: Fruta[]) => {
  const grupos: { [key: string]: Fruta[] } = {};
  
  frutas.forEach(fruta => {
    const tipo = fruta.primaria || fruta.nombre.toLowerCase();
    if (!grupos[tipo]) {
      grupos[tipo] = [];
    }
    grupos[tipo].push(fruta);
  });
  
  return grupos;
};

// Interfaz para los slides
interface SlideData {
  id: FrutaId;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  color: string;
  icono: React.ComponentType<{ className?: string }>;
  frutas: Fruta[];
}

// Función para crear slides dinámicos
const crearSlidesDeTemporada = (frutasEnTemporada: Fruta[]): SlideData[] => {
  const grupos = agruparFrutasPorTipo(frutasEnTemporada);
  const slides: SlideData[] = [];
  
  // Mapeo de tipos de fruta a IDs del slider
  const tipoToId: { [key: string]: FrutaId } = {
    'manzana': 'manzana',
    'platano': 'platano', 
    'fresa': 'fresa',
    'limon': 'limon',
    'naranja': 'naranja',
    'uva': 'uva',
    'pina': 'pina',
    'mango': 'mango'
  };
  
  Object.entries(grupos).forEach(([tipo, frutas]) => {
    const frutaRepresentativa = frutas[0]; // Tomar la primera como representativa
    const id = tipoToId[tipo] || 'manzana';
    const IconComponent = ICONOS_FRUTAS[id] || Apple;
    
    slides.push({
      id: id as FrutaId,
      titulo: frutaRepresentativa.nombre,
      subtitulo: `En Temporada - ${frutas.length} variedad${frutas.length > 1 ? 'es' : ''}`,
      descripcion: frutaRepresentativa.descripcion,
      color: frutaRepresentativa.color,
      icono: IconComponent,
      frutas: frutas // Incluir todas las variedades
    });
  });
  
  return slides;
};

export default function HeroSlider({ onSelectFruit }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Obtener frutas en temporada y crear slides dinámicamente
  const frutasEnTemporada = useMemo(() => getFrutasEnTemporada(), []);
  const FRUTAS_SLIDES = useMemo(() => crearSlidesDeTemporada(frutasEnTemporada), [frutasEnTemporada]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    const fruit = FRUTAS_SLIDES[index];
    onSelectFruit?.(fruit.id);
  }, [onSelectFruit, FRUTAS_SLIDES]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FRUTAS_SLIDES.length);
  }, [FRUTAS_SLIDES.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FRUTAS_SLIDES.length) % FRUTAS_SLIDES.length);
  }, [FRUTAS_SLIDES.length]);

  // Si no hay frutas en temporada, mostrar mensaje informativo
  if (FRUTAS_SLIDES.length === 0) {
    return (
      <section className="relative overflow-hidden">
        <div className="flex min-w-full items-center justify-center px-8 py-12 sm:px-16 lg:px-24 bg-gradient-to-br from-orange-700 via-amber-600 to-rose-600" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Frutas de Temporada
              <span className="block text-amber-300">No disponibles este mes</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-8">
              No hay frutas en temporada para el mes actual. Explora otras secciones o consulta la información de estacionalidad.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl bg-white text-orange-700">
                Ver todas las frutas
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* Información de temporada */}
      <div className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
        🍎 Frutas de {new Date().toLocaleString('es', { month: 'long' })} - {FRUTAS_SLIDES.length} tipo{FRUTAS_SLIDES.length > 1 ? 's' : ''}
      </div>

      {/* Slides */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {FRUTAS_SLIDES.map((slide, index) => {
          const IconComponent = slide.icono;
          return (
            <article
              key={slide.id}
              role="article"
              aria-roledescription="slide"
              aria-label={`${slide.titulo} - ${slide.subtitulo}`}
              className="relative flex min-w-full snap-start items-center px-8 py-12 sm:px-16 lg:px-24 bg-gradient-to-br from-orange-700 via-amber-600 to-rose-600"
              style={{ paddingTop: '100px', paddingBottom: '100px' }}
            >
              <div className="mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center text-center sm:text-left text-white">
                  <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {slide.titulo}
                    <span className="block text-amber-300">{slide.subtitulo}</span>
                  </h1>
                  <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/90">
                    {slide.descripcion}
                  </p>
                  
                  {/* Mostrar variedades disponibles si hay más de una */}
                  {slide.frutas && slide.frutas.length > 1 && (
                    <div className="mt-4">
                      <p className="text-sm text-white/80 mb-2">Variedades disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {slide.frutas.slice(0, 3).map((fruta: Fruta, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                            {fruta.nombre}
                          </span>
                        ))}
                        {slide.frutas.length > 3 && (
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                            +{slide.frutas.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                    <button
                      onClick={() => onSelectFruit?.(slide.id)}
                      className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl bg-white text-orange-700"
                    >
                      Explorar fruta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:scale-105 border-white/40 text-white hover:bg-white/10">
                      Ver técnicas
                    </button>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-center">
                  <div aria-hidden="true" className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-3xl"></div>
                  <div className="relative z-10 w-full max-w-[22rem] sm:max-w-md lg:max-w-lg">
                    <div className={`relative mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white/5 p-5 text-white shadow-inner`}>
                      <div className="flex items-center justify-center h-32">
                        <IconComponent className="h-16 w-16 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {FRUTAS_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Diapositiva anterior"
      >
        <ArrowRight className="h-5 w-5 rotate-180" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Siguiente diapositiva"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </section>
  );
}
