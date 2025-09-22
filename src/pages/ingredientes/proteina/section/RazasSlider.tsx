import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Droplets, Thermometer, Globe, X, ExternalLink } from 'lucide-react';
import {
  RAZAS_RES,
  RAZAS_CERDO,
  RAZAS_CORDERO,
  RAZAS_CABRA,
  RAZAS_POLLO,
  RAZAS_PAVO,
  RAZAS_PESCADO,
  CONFIG_RES,
  CONFIG_CERDO,
  CONFIG_CORDERO,
  CONFIG_CABRA,
  CONFIG_POLLO,
  CONFIG_PAVO,
  CONFIG_PESCADO,
  type Raza,
  type RazaPorcina,
  type RazaOvina,
  type RazaCaprina,
  type RazaPollo,
  type RazaPavo,
  type RazaPez
} from '../data/raza';
import slides from '../data/slides';

interface RazasSliderProps {
  especie: string;
}

export default function RazasSlider({ especie }: RazasSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRaza, setSelectedRaza] = useState<any | null>(null);
  
  // Función para obtener las razas según la especie
  const getRazasForEspecie = (especie: string) => {
    switch (especie) {
      case 'res': return RAZAS_RES;
      case 'cerdo': return RAZAS_CERDO;
      case 'cordero': return RAZAS_CORDERO;
      case 'cabra': return RAZAS_CABRA;
      case 'pollo': return RAZAS_POLLO;
      case 'pavo': return RAZAS_PAVO;
      case 'pescado': return RAZAS_PESCADO;
      default: return RAZAS_RES;
    }
  };

  const getConfigForEspecie = (especie: string) => {
    switch (especie) {
      case 'res': return CONFIG_RES;
      case 'cerdo': return CONFIG_CERDO;
      case 'cordero': return CONFIG_CORDERO;
      case 'cabra': return CONFIG_CABRA;
      case 'pollo': return CONFIG_POLLO;
      case 'pavo': return CONFIG_PAVO;
      case 'pescado': return CONFIG_PESCADO;
      default: return CONFIG_RES;
    }
  };
  
  const razas = getRazasForEspecie(especie);
  const config = getConfigForEspecie(especie);

  // Función para obtener el tema según la especie
  const getThemeForEspecie = (especie: string) => {
    const slide = slides.find(s => s.key === especie) || slides[0];
    return slide.theme;
  };

  const theme = getThemeForEspecie(especie);

  // Manejar tecla Escape y botón Atrás del navegador para cerrar modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedRaza) {
        setSelectedRaza(null);
      }
    };

    const handlePopState = () => {
      if (selectedRaza) {
        setSelectedRaza(null);
      }
    };

    if (selectedRaza) {
      document.addEventListener('keydown', handleEscape);
      window.addEventListener('popstate', handlePopState);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      // Agregar entrada al historial para poder usar el botón Atrás
      window.history.pushState({ modalOpen: true }, '');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [selectedRaza]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % razas.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + razas.length) % razas.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getPopularidadColor = (popularidad: string) => {
    switch (popularidad) {
      case 'alta': return 'text-green-600 bg-green-100';
      case 'media': return 'text-yellow-600 bg-yellow-100';
      case 'baja': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerfilColor = (etiqueta: string) => {
    switch (etiqueta) {
      case 'marmoleada premium': return 'text-purple-600 bg-purple-100';
      case 'magra': return 'text-blue-600 bg-blue-100';
      case 'magra especial': return 'text-indigo-600 bg-indigo-100';
      case 'equilibrada': return 'text-green-600 bg-green-100';
      case 'equilibrada-jugosa': return 'text-orange-600 bg-orange-100';
      case 'jugosa': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'carne': return 'text-red-600 bg-red-100';
      case 'leche': return 'text-blue-600 bg-blue-100';
      case 'doble-proposito': return 'text-green-600 bg-green-100';
      case 'huevo': return 'text-yellow-600 bg-yellow-100';
      case 'lana': return 'text-purple-600 bg-purple-100';
      case 'acuicultura': return 'text-cyan-600 bg-cyan-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (razas.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Razas de {especie}
          </h2>
          <p className="text-slate-600">
            No hay razas disponibles para esta especie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`mx-auto max-w-7xl px-4 py-16 mb-8 ${theme.bg} rounded-3xl`} aria-labelledby="razas-heading">
        <div className="mb-12 text-center">
          <h2 id="razas-heading" className={`text-4xl font-bold ${theme.text} mb-4`}>
            Razas de {especie}
          </h2>
          <p className={`text-xl ${theme.textMuted} max-w-3xl mx-auto`}>
            Descubre las diferentes razas y sus características únicas que influyen en la calidad y sabor de la carne.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Navigation Buttons - Solo visibles en hover en desktop, siempre visibles en móvil */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm ${theme.text} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/30 transition-all duration-300 hover:scale-110`}
            aria-label="Raza anterior"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm ${theme.text} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-black/30 transition-all duration-300 hover:scale-110`}
            aria-label="Siguiente raza"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {razas.map((raza) => (
                <div key={raza.id} className="w-full flex-shrink-0">
                  <div 
                    className="relative h-80 sm:h-96 cursor-pointer group overflow-hidden"
                    style={{ backgroundColor: '#faf6f0' }}
                    onClick={() => setSelectedRaza(raza)}
                  >
                    {/* Imagen de fondo */}
                    {raza.imagen ? (
                      <img 
                        src={raza.imagen} 
                        alt={`Imagen de raza ${raza.nombre}`}
                        className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: 'center center' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback con color */}
                    <div 
                      className={`absolute inset-0 ${raza.color} ${raza.imagen ? 'hidden' : 'flex'}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent"></div>
                    </div>

                    {/* Overlay con información básica */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent sm:bg-gradient-to-t sm:from-black/70 sm:via-black/20 sm:to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                          <div className="flex-1">
                            <h3 className="text-2xl sm:text-4xl font-bold text-slate-800 sm:text-white mb-1 sm:mb-2">{raza.nombre}</h3>
                            <p className="text-sm sm:text-xl text-slate-700 sm:text-white/90">{raza.nombreCientifico}</p>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-2">
                            <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getTipoColor(raza.tipo)}`}>
                              {raza.tipo === 'doble-proposito' ? 'Doble Propósito' : 
                               raza.tipo === 'huevo' ? 'Huevo' :
                               raza.tipo === 'lana' ? 'Lana' :
                               raza.tipo === 'acuicultura' ? 'Acuicultura' :
                               raza.tipo}
                            </span>
                            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getPopularidadColor(raza.popularidad)}`}>
                              <Star className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                              {raza.popularidad}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3 sm:mb-4">
                          <div className="flex items-center gap-2 text-slate-700 sm:text-white/90">
                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-sm sm:text-lg font-medium">{raza.origen}</span>
                          </div>
                          <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium w-fit ${getPerfilColor(raza.perfilCarne.etiqueta)}`}>
                            <Droplets className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{raza.perfilCarne.etiqueta}</span>
                            {(raza.perfilCarne as any).bms && (
                              <span className="text-xs opacity-75">(BMS {(raza.perfilCarne as any).bms})</span>
                            )}
                            {(raza.perfilCarne as any).grasa && (
                              <span className="text-xs opacity-75">({(raza.perfilCarne as any).grasa})</span>
                            )}
                            {(raza.perfilCarne as any).grasaPorciento && (
                              <span className="text-xs opacity-75">({(raza.perfilCarne as any).grasaPorciento}% grasa)</span>
                            )}
                            {(raza.perfilCarne as any).imfPorciento && (
                              <span className="text-xs opacity-75">(IMF {(raza.perfilCarne as any).imfPorciento}%)</span>
                            )}
                          </div>
                        </div>


                        <p className="hidden sm:block text-white/90 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6 max-w-2xl line-clamp-2 sm:line-clamp-none">
                          {raza.descripcion}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex gap-2 flex-wrap">
                            {raza.badges.slice(0, 2).map((badge, index) => (
                              <span
                                key={index}
                                className="px-2 sm:px-3 py-1 bg-slate-800/90 sm:bg-white/20 backdrop-blur-sm text-white sm:text-white text-xs sm:text-sm font-medium rounded-full"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-slate-700 sm:text-white/90 group-hover:text-white transition-colors">
                            <span className="text-xs sm:text-sm font-medium">Ver detalles</span>
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3">
            {razas.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `${theme.accent.replace('text-', 'bg-')} scale-125 shadow-lg`
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                }`}
                aria-label={`Ir a la raza ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRaza && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedRaza(null)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-48 sm:h-64" style={{ backgroundColor: '#faf6f0' }}>
              {selectedRaza.imagen ? (
                <img 
                  src={selectedRaza.imagen} 
                  alt={`Imagen de raza ${selectedRaza.nombre}`}
                  className="w-full h-full object-contain object-center"
                  style={{ objectPosition: 'center center' }}
                />
              ) : (
                <div className={`w-full h-full ${selectedRaza.color}`}></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
                <button
                  onClick={() => setSelectedRaza(null)}
                  className="p-1.5 sm:p-2 rounded-full bg-slate-800/90 sm:bg-white/20 backdrop-blur-sm text-white hover:bg-slate-700/90 sm:hover:bg-white/30 transition-colors"
                >
                  <X className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">{selectedRaza.nombre}</h2>
                <p className="text-sm sm:text-xl text-white/90">{selectedRaza.nombreCientifico}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 overflow-y-auto max-h-[calc(95vh-12rem)] sm:max-h-[calc(90vh-16rem)]">
              {/* Información básica */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500">Origen</p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900">{selectedRaza.origen}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getTipoColor(selectedRaza.tipo)}`}>
                    {selectedRaza.tipo === 'doble-proposito' ? 'Doble Propósito' : 
                     selectedRaza.tipo === 'huevo' ? 'Huevo' :
                     selectedRaza.tipo === 'lana' ? 'Lana' :
                     selectedRaza.tipo === 'acuicultura' ? 'Acuicultura' :
                     selectedRaza.tipo}
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:col-span-2 md:col-span-1">
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getPopularidadColor(selectedRaza.popularidad)}`}>
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                    {selectedRaza.popularidad}
                  </div>
                </div>
              </div>

              {/* Perfil de carne */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">{config.perfilCarne.titulo}</h3>
                <div className="space-y-3">
                  <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${getPerfilColor(selectedRaza.perfilCarne.etiqueta)}`}>
                    <Droplets className="h-3 w-3 sm:h-4 sm:w-4" />
                    {selectedRaza.perfilCarne.etiqueta}
                  </div>
                  
                  {/* KPIs específicos para cada especie */}
                  {config.kpis.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {config.kpis.map((kpi, index) => {
                        const valor = (selectedRaza as any).perfilCarne[kpi.valor];
                        if (!valor) return null;
                        
                        return (
                          <div key={index} className="bg-slate-50 rounded-lg p-3 text-center">
                            <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
                            <div className="text-lg font-bold text-slate-900">
                              {valor}{kpi.unidad}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Información adicional específica por especie */}
                  <div className="space-y-2">
                    {(config.perfilCarne as any).mostrarBMS && (selectedRaza.perfilCarne as any).bms && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">BMS (Beef Marbling Standard):</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza.perfilCarne as any).bms}/12</span>
                      </div>
                    )}
                    {(config.perfilCarne as any).mostrarIMF && (selectedRaza as any).perfilCarne.imfPorciento && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">IMF (Grasa Intramuscular):</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza as any).perfilCarne.imfPorciento}%</span>
                      </div>
                    )}
                    {(config.perfilCarne as any).mostrarFatScore && (selectedRaza as any).perfilCarne.fatScore && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">Fat Score:</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza as any).perfilCarne.fatScore}/5</span>
                      </div>
                    )}
                    {(config.perfilCarne as any).mostrarIntensidad && (selectedRaza as any).perfilCarne.intensidadSabor && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">Intensidad de Sabor:</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza as any).perfilCarne.intensidadSabor}</span>
                      </div>
                    )}
                    {(config.perfilCarne as any).mostrarRendimiento && (selectedRaza as any).perfilCarne.rendimientoPecho && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">Rendimiento Pecho:</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza as any).perfilCarne.rendimientoPecho}%</span>
                      </div>
                    )}
                    {(config.perfilCarne as any).mostrarOmega3 && (selectedRaza as any).perfilCarne.omega3MgPor100g && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">Omega-3:</span>
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{(selectedRaza as any).perfilCarne.omega3MgPor100g} mg/100g</span>
                      </div>
                    )}
                  </div>

                  {/* Descripción contextual */}
                  {(config.perfilCarne as any).mostrarDescripcion && (
                    <div className="text-xs text-slate-500">
                      {(config.perfilCarne as any).descripcion(
                        (selectedRaza.perfilCarne as any).bms || 
                        (selectedRaza as any).perfilCarne.imfPorciento || 
                        (selectedRaza as any).perfilCarne.fatScore || 
                        (selectedRaza as any).perfilCarne.intensidadSabor || 
                        (selectedRaza as any).perfilCarne.grasa || 
                        (selectedRaza as any).perfilCarne.grasaPorciento || 
                        0
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Descripción</h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{selectedRaza.descripcion}</p>
              </div>

              {/* Características */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Características</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {selectedRaza.caracteristicas.map((caracteristica: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                      <span className="text-xs sm:text-sm text-slate-700">{caracteristica}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información adicional */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {config.infoAdicional.campos.map((campo, index) => {
                  const valor = (selectedRaza as any)[campo.valor];
                  const icono = campo.valor === 'climaIdeal' ? Thermometer : 
                              campo.valor === 'habitat' || campo.valor === 'sistemaProductivo' ? MapPin : Globe;
                  const IconoComponente = icono;
                  
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <IconoComponente className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500">{campo.label}</p>
                        <p className="text-sm sm:text-base font-semibold text-slate-900">
                          {campo.valor === 'habitat' && valor === 'granjas-controladas' && 'Granjas Controladas'}
                          {campo.valor === 'habitat' && valor === 'aire-libre' && 'Aire Libre'}
                          {campo.valor === 'habitat' && valor === 'mixto' && 'Sistema Mixto'}
                          {campo.valor !== 'habitat' && valor}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Badges */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Características destacadas</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedRaza.badges.map((badge: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cruces comunes */}
              {selectedRaza.crucesComunes && selectedRaza.crucesComunes.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Cruces comunes</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedRaza.crucesComunes.map((cruze: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-amber-100 text-amber-800 text-xs sm:text-sm font-medium rounded-full"
                      >
                        {cruze}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
