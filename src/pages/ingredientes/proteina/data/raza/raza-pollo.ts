// ====================== POLLO ======================
export interface RazaPollo {
  id: string;
  nombre: string;
  nombreCientifico: string; // "Gallus gallus domesticus"
  origen: string;
  tipo: 'carne' | 'huevo' | 'doble-proposito';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    grasa: 'baja' | 'media';
    textura: 'muy fina' | 'fina' | 'media';
    colorCarne?: 'blanca' | 'oscura' | 'mixta';
    rendimientoPecho?: number; // %
    perdidaCoccion?: number;   // %
    etiqueta: 'magra' | 'equilibrada';
  };
  sistemaProductivo: 'convencional' | 'campero' | 'free-range' | 'organico';
  crecimiento: 'rapido' | 'medio' | 'lento';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para pollo
export const CONFIG_POLLO = {
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Sistema productivo', valor: 'sistemaProductivo' },
      { label: 'Crecimiento', valor: 'crecimiento' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarRendimiento: true,
    mostrarDescripcion: true,
    descripcion: (grasa: string) => {
      if (grasa === 'baja') return 'Carne muy magra, ideal para dietas saludables y deportistas.';
      return 'Carne equilibrada con buen sabor y textura suave.';
    }
  },
  kpis: [
    { label: 'Rendimiento Pecho', valor: 'rendimientoPecho', unidad: '%' },
    { label: 'Pérdida Cocción', valor: 'perdidaCoccion', unidad: '%' }
  ]
};

export const RAZAS_POLLO: RazaPollo[] = [
  {
    id: 'cobb-500',
    nombre: 'Cobb 500',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      colorCarne: 'blanca',
      rendimientoPecho: 20,  // %
      perdidaCoccion: 18,    // %
      etiqueta: 'magra'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'rapido',
    consumoGlobal: 'alto',
    descripcion: 'El híbrido de engorde más usado en el mundo, destaca por su máxima eficiencia alimentaria y bajo costo de producción.',
    caracteristicas: [
      'Conversión alimenticia líder',
      'Crecimiento muy rápido',
      'Alto rendimiento de pechuga',
      'Carne magra',
      'Estándar global en pollos de engorde'
    ],
    crucesComunes: [],
    imagen: '/images/raza/pollo/cobb-500.jpg',
    color: 'bg-white',
    badges: ['Industrial', 'Eficiente', 'Magra']
  },
  {
    id: 'ross-308',
    nombre: 'Ross 308',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Reino Unido',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      colorCarne: 'blanca',
      rendimientoPecho: 19,
      perdidaCoccion: 19,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'rapido',
    consumoGlobal: 'alto',
    descripcion: 'Competidor directo del Cobb, popular por su equilibrio entre robustez, rendimiento y calidad de carne.',
    caracteristicas: [
      'Crecimiento rápido',
      'Excelente conversión alimentaria',
      'Alto rendimiento muscular',
      'Robustez sanitaria'
    ],
    crucesComunes: [],
    imagen: '/images/raza/pollo/ross-308.jpg',
    color: 'bg-yellow-100',
    badges: ['Industrial', 'Rápido', 'Magra']
  },
  {
    id: 'hubbard',
    nombre: 'Hubbard',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Francia',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      colorCarne: 'blanca',
      rendimientoPecho: 18,
      perdidaCoccion: 20,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'rapido',
    consumoGlobal: 'medio',
    descripcion: 'Genética francesa conocida por su robustez, adaptabilidad y buena calidad de carne.',
    caracteristicas: [
      'Alta adaptabilidad',
      'Robustez en climas difíciles',
      'Conversión eficiente',
      'Versatilidad en sistemas productivos'
    ],
    crucesComunes: [],
    imagen: '/images/raza/pollo/hubbard.jpg',
    color: 'bg-red-100',
    badges: ['Robusto', 'Versátil']
  },
  {
    id: 'cornish-cross',
    nombre: 'Cornish Cross',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      colorCarne: 'blanca',
      rendimientoPecho: 18,
      perdidaCoccion: 20,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'rapido',
    consumoGlobal: 'alto',
    descripcion: 'El híbrido histórico base del pollo moderno, usado en producción intensiva y también en sistemas alternativos.',
    caracteristicas: [
      'Buen sabor de carne',
      'Crecimiento rápido',
      'Adaptación a free-range',
      'Carne equilibrada'
    ],
    crucesComunes: ['Cornish × Plymouth Rock'],
    imagen: '/images/raza/pollo/cornish-cross.jpg',
    color: 'bg-yellow-200',
    badges: ['Tradicional', 'Equilibrada']
  },
  {
    id: 'red-ranger',
    nombre: 'Red Ranger',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      colorCarne: 'mixta',
      rendimientoPecho: 17,
      perdidaCoccion: 21,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'medio',
    consumoGlobal: 'medio',
    descripcion: 'Pollo alternativo criado en sistemas orgánicos y de pastoreo, carne más sabrosa pero menor rendimiento.',
    caracteristicas: [
      'Especial para sistemas orgánicos',
      'Buen comportamiento en pastoreo',
      'Carne equilibrada',
      'Crecimiento moderado'
    ],
    crucesComunes: [],
    imagen: '/images/raza/pollo/red-ranger.jpg',
    color: 'bg-red-200',
    badges: ['Orgánico', 'Pastoreo']
  },
  {
    id: 'sasso',
    nombre: 'Sasso',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Francia',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      colorCarne: 'mixta',
      rendimientoPecho: 16,
      perdidaCoccion: 22,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'campero',
    crecimiento: 'medio',
    consumoGlobal: 'medio',
    descripcion: 'Genética francesa usada en pollos Label Rouge, carne de excelente sabor con crecimiento más lento.',
    caracteristicas: [
      'Excelente sabor',
      'Adaptación a crianza campera',
      'Carne equilibrada',
      'Crecimiento moderado'
    ],
    crucesComunes: [],
    imagen: '/images/raza/pollo/sasso.jpg',
    color: 'bg-orange-200',
    badges: ['Campero', 'Sabor']
  },
  {
    id: 'leghorn',
    nombre: 'Leghorn',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Italia',
    tipo: 'huevo',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'muy fina',
      colorCarne: 'blanca',
      rendimientoPecho: 15,
      perdidaCoccion: 23,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'medio',
    consumoGlobal: 'alto',
    descripcion: 'Principal raza ponedora blanca del mundo, muy ligera y eficiente para producción de huevos.',
    caracteristicas: [
      'Muy alta postura (280-320 huevos/año)',
      'Excelente conversión en huevos',
      'Temperamento activo',
      'Gran longevidad productiva'
    ],
    crucesComunes: ['Leghorn × Rhode Island Red'],
    imagen: '/images/raza/pollo/leghorn.jpg',
    color: 'bg-white',
    badges: ['Huevos', 'Eficiente']
  },
  {
    id: 'rhode-island-red',
    nombre: 'Rhode Island Red',
    nombreCientifico: 'Gallus gallus domesticus',
    origen: 'Estados Unidos',
    tipo: 'doble-proposito',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      colorCarne: 'oscura',
      rendimientoPecho: 16,
      perdidaCoccion: 22,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'medio',
    descripcion: 'Raza doble propósito muy resistente, popular en granjas familiares por su carne sabrosa y buena postura.',
    caracteristicas: [
      'Rústica y resistente',
      'Carne sabrosa',
      'Producción de huevos (200-250/año)',
      'Adaptabilidad a campo'
    ],
    crucesComunes: ['Rhode Island Red × Leghorn'],
    imagen: '/images/raza/pollo/rhode-island-red.jpg',
    color: 'bg-red-600',
    badges: ['Doble Propósito', 'Resistente']
  }
];
