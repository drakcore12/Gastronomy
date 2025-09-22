// ====================== CORDERO / OVINO ======================
export interface RazaOvina {
  id: string;
  nombre: string;
  nombreCientifico: string; // "Ovis aries"
  origen: string;
  tipo: 'carne' | 'doble-proposito' | 'lana';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    claseEdad: 'lamb' | 'hogget' | 'mutton';
    fatScore: 1 | 2 | 3 | 4 | 5; // AUS/NZ simplificado
    textura: 'fina' | 'media' | 'fibrosa';
    etiqueta: 'magra' | 'equilibrada' | 'jugosa';
    alimentacion?: 'pastura' | 'feedlot' | 'mixto';
  };
  climaIdeal: 'templado' | 'frio' | 'continental' | 'mediterraneo' | 'alto-andino';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para cordero
export const CONFIG_CORDERO = {
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Clima ideal', valor: 'climaIdeal' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarFatScore: true,
    mostrarDescripcion: true,
    descripcion: (fatScore: number) => {
      if (fatScore <= 2) return 'Carne muy magra, ideal para dietas saludables.';
      if (fatScore <= 4) return 'Carne equilibrada con buen sabor y textura.';
      return 'Carne jugosa con excelente marmoleo y sabor intenso.';
    }
  },
  kpis: [
    { label: 'Fat Score', valor: 'fatScore', unidad: '/5' },
    { label: 'Clase Edad', valor: 'claseEdad', unidad: '' }
  ]
};

export const RAZAS_CORDERO: RazaOvina[] = [
  {
    id: 'suffolk',
    nombre: 'Suffolk',
    nombreCientifico: 'Ovis aries',
    origen: 'Inglaterra',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 3,
      textura: 'fina',
      etiqueta: 'equilibrada',
      alimentacion: 'pastura'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'alto',
    descripcion: 'Raza Suffolk inglesa, la más popular para producción de carne de cordero, excelente conformación y sabor.',
    caracteristicas: [
      'Excelente conformación',
      'Carne tierna y sabrosa',
      'Crecimiento rápido',
      'Alto rendimiento en canal',
      'Adaptabilidad climática'
    ],
    crucesComunes: ['Suffolk × Romney', 'Suffolk × Corriedale'],
    imagen: '/images/raza/suffolk.jpg',
    color: 'bg-slate-600',
    badges: ['Premium', 'Conformación', 'Tierna']
  },
  {
    id: 'dorper',
    nombre: 'Dorper',
    nombreCientifico: 'Ovis aries',
    origen: 'Sudáfrica',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 2,
      textura: 'fina',
      etiqueta: 'magra',
      alimentacion: 'mixto'
    },
    climaIdeal: 'continental',
    consumoGlobal: 'alto',
    descripcion: 'Raza Dorper sudafricana, sin lana y muy resistente, ideal para climas áridos y producción de carne magra.',
    caracteristicas: [
      'Sin lana (pelo corto)',
      'Muy resistente',
      'Carne magra',
      'Excelente adaptación',
      'Bajo mantenimiento'
    ],
    crucesComunes: ['Dorper × Katahdin', 'Dorper × Pelibuey'],
    imagen: '/images/raza/dorper.jpg',
    color: 'bg-white',
    badges: ['Resistente', 'Magra', 'Árida']
  },
  {
    id: 'texel',
    nombre: 'Texel',
    nombreCientifico: 'Ovis aries',
    origen: 'Holanda',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 2,
      textura: 'fina',
      etiqueta: 'magra',
      alimentacion: 'pastura'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'alto',
    descripcion: 'Raza Texel holandesa, excelente para producción de carne magra con muy buena conformación muscular.',
    caracteristicas: [
      'Excelente musculatura',
      'Carne muy magra',
      'Alto rendimiento',
      'Buena prolificidad',
      'Resistencia a parásitos'
    ],
    crucesComunes: ['Texel × Romney', 'Texel × Suffolk'],
    imagen: '/images/raza/texel.jpg',
    color: 'bg-gray-100',
    badges: ['Muscular', 'Magra', 'Rendimiento']
  },
  {
    id: 'romney',
    nombre: 'Romney',
    nombreCientifico: 'Ovis aries',
    origen: 'Inglaterra',
    tipo: 'doble-proposito',
    popularidad: 'media',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 3,
      textura: 'media',
      etiqueta: 'equilibrada',
      alimentacion: 'pastura'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'medio',
    descripcion: 'Raza Romney inglesa, doble propósito (lana y carne), muy resistente y adaptada a pastoreo.',
    caracteristicas: [
      'Doble propósito',
      'Muy resistente',
      'Excelente pastoreo',
      'Lana de calidad',
      'Adaptabilidad alta'
    ],
    crucesComunes: ['Romney × Suffolk', 'Romney × Texel'],
    imagen: '/images/raza/romney.jpg',
    color: 'bg-gray-300',
    badges: ['Doble Propósito', 'Resistente', 'Pastoreo']
  },
  {
    id: 'corriedale',
    nombre: 'Corriedale',
    nombreCientifico: 'Ovis aries',
    origen: 'Nueva Zelanda',
    tipo: 'doble-proposito',
    popularidad: 'media',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 3,
      textura: 'media',
      etiqueta: 'equilibrada',
      alimentacion: 'pastura'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'medio',
    descripcion: 'Raza Corriedale neozelandesa, cruce entre Merino y Lincoln, excelente para lana y carne.',
    caracteristicas: [
      'Doble propósito',
      'Lana fina',
      'Carne equilibrada',
      'Buena prolificidad',
      'Adaptabilidad climática'
    ],
    crucesComunes: ['Corriedale × Suffolk', 'Corriedale × Texel'],
    imagen: '/images/raza/corriedale.jpg',
    color: 'bg-gray-400',
    badges: ['Doble Propósito', 'Lana Fina', 'Equilibrada']
  },
  {
    id: 'merino',
    nombre: 'Merino',
    nombreCientifico: 'Ovis aries',
    origen: 'España',
    tipo: 'lana',
    popularidad: 'alta',
    perfilCarne: {
      claseEdad: 'mutton',
      fatScore: 2,
      textura: 'fibrosa',
      etiqueta: 'magra',
      alimentacion: 'pastura'
    },
    climaIdeal: 'mediterraneo',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Merino española, especializada en producción de lana fina, carne secundaria pero de calidad.',
    caracteristicas: [
      'Lana ultra fina',
      'Carne magra',
      'Muy resistente',
      'Adaptación árida',
      'Longevidad alta'
    ],
    crucesComunes: ['Merino × Romney', 'Merino × Corriedale'],
    imagen: '/images/raza/merino.jpg',
    color: 'bg-gray-200',
    badges: ['Lana Fina', 'Resistente', 'Árida']
  },
  {
    id: 'katahdin',
    nombre: 'Katahdin',
    nombreCientifico: 'Ovis aries',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 2,
      textura: 'fina',
      etiqueta: 'magra',
      alimentacion: 'mixto'
    },
    climaIdeal: 'continental',
    consumoGlobal: 'medio',
    descripcion: 'Raza Katahdin americana, sin lana y resistente, ideal para producción de carne en climas variados.',
    caracteristicas: [
      'Sin lana',
      'Muy resistente',
      'Carne magra',
      'Bajo mantenimiento',
      'Buena prolificidad'
    ],
    crucesComunes: ['Katahdin × Dorper', 'Katahdin × Suffolk'],
    imagen: '/images/raza/katahdin.jpg',
    color: 'bg-gray-100',
    badges: ['Sin Lana', 'Resistente', 'Magra']
  },
  {
    id: 'pelibuey',
    nombre: 'Pelibuey',
    nombreCientifico: 'Ovis aries',
    origen: 'México',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      claseEdad: 'lamb',
      fatScore: 2,
      textura: 'fina',
      etiqueta: 'magra',
      alimentacion: 'pastura'
    },
    climaIdeal: 'alto-andino',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Pelibuey mexicana, adaptada a climas tropicales y de altura, carne magra y resistente.',
    caracteristicas: [
      'Adaptación tropical',
      'Carne magra',
      'Muy resistente',
      'Bajo mantenimiento',
      'Crecimiento lento'
    ],
    crucesComunes: ['Pelibuey × Dorper', 'Pelibuey × Katahdin'],
    imagen: '/images/raza/pelibuey.jpg',
    color: 'bg-yellow-100',
    badges: ['Tropical', 'Resistente', 'Magra']
  }
];
