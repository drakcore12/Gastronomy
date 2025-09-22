// ====================== PAVO ======================
export interface RazaPavo {
  id: string;
  nombre: string;
  nombreCientifico: string; // "Meleagris gallopavo"
  origen: string;
  tipo: 'carne';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    grasa: 'baja' | 'media';
    textura: 'fina' | 'media';
    rendimientoPecho?: number; // %
    perdidaCoccion?: number;   // %
    etiqueta: 'magra' | 'equilibrada';
  };
  sistemaProductivo: 'convencional' | 'free-range' | 'organico';
  crecimiento: 'medio' | 'lento';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para pavo
export const CONFIG_PAVO = {
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
      if (grasa === 'baja') return 'Carne muy magra, ideal para dietas saludables y ocasiones especiales.';
      return 'Carne equilibrada con buen sabor y textura suave.';
    }
  },
  kpis: [
    { label: 'Rendimiento Pecho', valor: 'rendimientoPecho', unidad: '%' },
    { label: 'Pérdida Cocción', valor: 'perdidaCoccion', unidad: '%' }
  ]
};

export const RAZAS_PAVO: RazaPavo[] = [
  {
    id: 'broad-breasted-white',
    nombre: 'Broad Breasted White',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      rendimientoPecho: 35,
      perdidaCoccion: 12,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'medio',
    consumoGlobal: 'alto',
    descripcion: 'Raza Broad Breasted White americana, la más utilizada comercialmente, excelente rendimiento de pechuga.',
    caracteristicas: [
      'Excelente rendimiento de pechuga',
      'Carne muy magra',
      'Crecimiento eficiente',
      'Alto rendimiento en canal',
      'Adaptabilidad productiva'
    ],
    crucesComunes: ['Broad Breasted White × Bronze'],
    imagen: '/images/raza/broad-breasted-white.jpg',
    color: 'bg-white',
    badges: ['Comercial', 'Pechuga', 'Magra']
  },
  {
    id: 'broad-breasted-bronze',
    nombre: 'Broad Breasted Bronze',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      rendimientoPecho: 33,
      perdidaCoccion: 14,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'convencional',
    crecimiento: 'medio',
    consumoGlobal: 'alto',
    descripcion: 'Raza Broad Breasted Bronze americana, muy popular por su apariencia tradicional y carne equilibrada.',
    caracteristicas: [
      'Apariencia tradicional',
      'Carne equilibrada',
      'Excelente sabor',
      'Buen rendimiento',
      'Aceptación comercial alta'
    ],
    crucesComunes: ['Broad Breasted Bronze × White'],
    imagen: '/images/raza/broad-breasted-bronze.jpg',
    color: 'bg-amber-600',
    badges: ['Tradicional', 'Equilibrada', 'Sabor']
  },
  {
    id: 'narrow-breasted-bronze',
    nombre: 'Narrow Breasted Bronze',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      rendimientoPecho: 28,
      perdidaCoccion: 16,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'medio',
    descripcion: 'Raza Narrow Breasted Bronze americana, ideal para producción free-range, carne equilibrada y sabrosa.',
    caracteristicas: [
      'Ideal para free-range',
      'Carne equilibrada',
      'Excelente sabor',
      'Crecimiento lento',
      'Adaptación a pastoreo'
    ],
    crucesComunes: ['Narrow Breasted Bronze × White'],
    imagen: '/images/raza/narrow-breasted-bronze.jpg',
    color: 'bg-amber-700',
    badges: ['Free-Range', 'Equilibrada', 'Pastoreo']
  },
  {
    id: 'royal-palm',
    nombre: 'Royal Palm',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      rendimientoPecho: 25,
      perdidaCoccion: 18,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Royal Palm americana, ornamental y de carne, ideal para producción artesanal y gourmet.',
    caracteristicas: [
      'Apariencia ornamental',
      'Carne magra',
      'Crecimiento lento',
      'Ideal para gourmet',
      'Producción artesanal'
    ],
    crucesComunes: ['Royal Palm × Bronze'],
    imagen: '/images/raza/royal-palm.jpg',
    color: 'bg-white',
    badges: ['Ornamental', 'Magra', 'Gourmet']
  },
  {
    id: 'bourbon-red',
    nombre: 'Bourbon Red',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      rendimientoPecho: 30,
      perdidaCoccion: 15,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Bourbon Red americana, raza patrimonial con excelente sabor y adaptación a pastoreo.',
    caracteristicas: [
      'Raza patrimonial',
      'Excelente sabor',
      'Adaptación a pastoreo',
      'Crecimiento lento',
      'Resistencia natural'
    ],
    crucesComunes: ['Bourbon Red × Bronze'],
    imagen: '/images/raza/bourbon-red.jpg',
    color: 'bg-red-600',
    badges: ['Patrimonial', 'Sabor', 'Pastoreo']
  },
  {
    id: 'narragansett',
    nombre: 'Narragansett',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      rendimientoPecho: 29,
      perdidaCoccion: 16,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Narragansett americana, raza patrimonial con excelente adaptación climática y sabor tradicional.',
    caracteristicas: [
      'Raza patrimonial',
      'Excelente adaptación climática',
      'Sabor tradicional',
      'Crecimiento lento',
      'Resistencia alta'
    ],
    crucesComunes: ['Narragansett × Bronze'],
    imagen: '/images/raza/narragansett.jpg',
    color: 'bg-gray-600',
    badges: ['Patrimonial', 'Climática', 'Tradicional']
  },
  {
    id: 'slate',
    nombre: 'Slate',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      rendimientoPecho: 27,
      perdidaCoccion: 17,
      etiqueta: 'magra'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Slate americana, raza patrimonial con plumaje gris pizarra y carne magra de excelente calidad.',
    caracteristicas: [
      'Plumaje gris pizarra',
      'Carne magra',
      'Excelente calidad',
      'Crecimiento lento',
      'Producción artesanal'
    ],
    crucesComunes: ['Slate × White'],
    imagen: '/images/raza/slate.jpg',
    color: 'bg-gray-400',
    badges: ['Gris', 'Magra', 'Artesanal']
  },
  {
    id: 'black',
    nombre: 'Black',
    nombreCientifico: 'Meleagris gallopavo',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      rendimientoPecho: 28,
      perdidaCoccion: 16,
      etiqueta: 'equilibrada'
    },
    sistemaProductivo: 'free-range',
    crecimiento: 'lento',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Black americana, raza patrimonial con plumaje negro y carne equilibrada de excelente sabor.',
    caracteristicas: [
      'Plumaje negro',
      'Carne equilibrada',
      'Excelente sabor',
      'Crecimiento lento',
      'Resistencia natural'
    ],
    crucesComunes: ['Black × Bronze'],
    imagen: '/images/raza/black.jpg',
    color: 'bg-black',
    badges: ['Negro', 'Equilibrada', 'Natural']
  }
];
