import React, { useState, useCallback } from 'react';
import { Apple, ArrowRight, ChefHat, BookOpen, Zap } from 'lucide-react';

type FrutaId = 'manzana' | 'platano' | 'fresa' | 'limon' | 'naranja' | 'uva' | 'pina' | 'mango';

interface HeroSliderProps {
  onSelectFruit?: (fruit: FrutaId) => void;
}

const FRUTAS_SLIDES = [
  {
    id: 'manzana' as FrutaId,
    titulo: 'Manzana',
    subtitulo: 'Versatilidad Dulce',
    descripcion: 'La fruta más versátil de la cocina. Perfecta para dulces y salados.',
    color: 'from-red-500 to-pink-500',
    icono: Apple
  },
  {
    id: 'platano' as FrutaId,
    titulo: 'Plátano',
    subtitulo: 'Energía Natural',
    descripcion: 'Rica en potasio y perfecta para smoothies y postres.',
    color: 'from-yellow-400 to-yellow-500',
    icono: Apple
  },
  {
    id: 'fresa' as FrutaId,
    titulo: 'Fresa',
    subtitulo: 'Delicadeza Roja',
    descripcion: 'Baya aromática ideal para postres y decoraciones.',
    color: 'from-red-400 to-red-500',
    icono: Apple
  },
  {
    id: 'limon' as FrutaId,
    titulo: 'Limón',
    subtitulo: 'Acidez Perfecta',
    descripcion: 'Cítrico esencial para realzar y equilibrar sabores.',
    color: 'from-yellow-300 to-yellow-400',
    icono: Apple
  }
];

export default function HeroSlider({ onSelectFruit }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
    const fruit = FRUTAS_SLIDES[index];
    onSelectFruit?.(fruit.id);
  }, [onSelectFruit]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % FRUTAS_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + FRUTAS_SLIDES.length) % FRUTAS_SLIDES.length);
  }, []);

  return (
    <section className="relative overflow-hidden">
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
