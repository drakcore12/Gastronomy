// ====================== CABRA / CAPRINO ======================
export interface RazaCaprina {
  id: string;
  nombre: string;
  nombreCientifico: string; // "Capra aegagrus hircus"
  origen: string;
  tipo: 'carne' | 'leche' | 'doble-proposito';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    grasa: 'baja' | 'media';
    textura: 'fina' | 'media' | 'fibrosa';
    intensidadSabor: 'suave' | 'media' | 'intensa';
    etiqueta: 'magra' | 'equilibrada';
  };
  climaIdeal: 'arido' | 'semiarido' | 'mediterraneo' | 'templado' | 'alto-andino';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para cabra
export const CONFIG_CABRA = {
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Clima ideal', valor: 'climaIdeal' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarIntensidad: true,
    mostrarDescripcion: true,
    descripcion: (intensidad: string) => {
      if (intensidad === 'suave') return 'Carne de sabor suave y delicado, ideal para paladares sensibles.';
      if (intensidad === 'media') return 'Carne equilibrada con sabor característico y textura agradable.';
      return 'Carne de sabor intenso y marcado, muy apreciada por su carácter.';
    }
  },
  kpis: [
    { label: 'Grasa', valor: 'grasa', unidad: '' },
    { label: 'Intensidad', valor: 'intensidadSabor', unidad: '' }
  ]
};

export const RAZAS_CABRA: RazaCaprina[] = [
  {
    id: 'boer',
    nombre: 'Boer',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Sudáfrica',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      intensidadSabor: 'media',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'arido',
    consumoGlobal: 'alto',
    descripcion: 'Raza Boer sudafricana, la más popular para producción de carne de cabra, excelente conformación y sabor suave.',
    caracteristicas: [
      'Excelente conformación',
      'Carne tierna y sabrosa',
      'Crecimiento rápido',
      'Alto rendimiento en canal',
      'Resistencia al calor'
    ],
    crucesComunes: ['Boer × Nubia', 'Boer × Saanen'],
    imagen: '/images/raza/boer.jpg',
    color: 'bg-orange-200',
    badges: ['Premium', 'Conformación', 'Tierna']
  },
  {
    id: 'kiko',
    nombre: 'Kiko',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Nueva Zelanda',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      intensidadSabor: 'suave',
      etiqueta: 'magra'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'alto',
    descripcion: 'Raza Kiko neozelandesa, muy resistente y eficiente, ideal para producción de carne magra en pastoreo.',
    caracteristicas: [
      'Muy resistente',
      'Carne magra',
      'Excelente pastoreo',
      'Bajo mantenimiento',
      'Alta prolificidad'
    ],
    crucesComunes: ['Kiko × Boer', 'Kiko × Nubia'],
    imagen: '/images/raza/kiko.jpg',
    color: 'bg-gray-200',
    badges: ['Resistente', 'Magra', 'Pastoreo']
  },
  {
    id: 'nubia',
    nombre: 'Nubia',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Egipto',
    tipo: 'doble-proposito',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'media',
      textura: 'media',
      intensidadSabor: 'intensa',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'arido',
    consumoGlobal: 'medio',
    descripcion: 'Raza Nubia egipcia, doble propósito (leche y carne), conocida por su sabor intenso y orejas largas.',
    caracteristicas: [
      'Doble propósito',
      'Sabor intenso',
      'Orejas largas características',
      'Buena producción de leche',
      'Adaptación árida'
    ],
    crucesComunes: ['Nubia × Boer', 'Nubia × Saanen'],
    imagen: '/images/raza/nubia.jpg',
    color: 'bg-brown-200',
    badges: ['Doble Propósito', 'Intenso', 'Árida']
  },
  {
    id: 'saanen',
    nombre: 'Saanen',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Suiza',
    tipo: 'leche',
    popularidad: 'alta',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      intensidadSabor: 'suave',
      etiqueta: 'magra'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Saanen suiza, especializada en producción de leche, carne secundaria pero de buena calidad.',
    caracteristicas: [
      'Alta producción de leche',
      'Carne magra',
      'Temperamento dócil',
      'Adaptación templada',
      'Longevidad alta'
    ],
    crucesComunes: ['Saanen × Boer', 'Saanen × Nubia'],
    imagen: '/images/raza/saanen.jpg',
    color: 'bg-white',
    badges: ['Leche', 'Dócil', 'Templada']
  },
  {
    id: 'alpine',
    nombre: 'Alpine',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Francia',
    tipo: 'leche',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fina',
      intensidadSabor: 'suave',
      etiqueta: 'magra'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Alpine francesa, excelente productora de leche, carne magra y de sabor suave.',
    caracteristicas: [
      'Excelente producción de leche',
      'Carne magra',
      'Muy resistente',
      'Adaptación montañosa',
      'Buena prolificidad'
    ],
    crucesComunes: ['Alpine × Saanen', 'Alpine × Boer'],
    imagen: '/images/raza/alpine.jpg',
    color: 'bg-gray-300',
    badges: ['Leche', 'Montañosa', 'Resistente']
  },
  {
    id: 'angora',
    nombre: 'Angora',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Turquía',
    tipo: 'doble-proposito',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'baja',
      textura: 'fibrosa',
      intensidadSabor: 'intensa',
      etiqueta: 'magra'
    },
    climaIdeal: 'semiarido',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Angora turca, especializada en producción de mohair, carne fibrosa pero sabrosa.',
    caracteristicas: [
      'Producción de mohair',
      'Carne fibrosa',
      'Sabor intenso',
      'Muy resistente',
      'Adaptación árida'
    ],
    crucesComunes: ['Angora × Boer'],
    imagen: '/images/raza/angora.jpg',
    color: 'bg-white',
    badges: ['Mohair', 'Fibrosa', 'Árida']
  },
  {
    id: 'spanish',
    nombre: 'Spanish',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'España',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      grasa: 'baja',
      textura: 'media',
      intensidadSabor: 'intensa',
      etiqueta: 'magra'
    },
    climaIdeal: 'mediterraneo',
    consumoGlobal: 'medio',
    descripcion: 'Raza Spanish española, muy resistente y adaptada a pastoreo extensivo, carne magra y sabrosa.',
    caracteristicas: [
      'Muy resistente',
      'Excelente pastoreo',
      'Carne magra',
      'Sabor intenso',
      'Adaptación mediterránea'
    ],
    crucesComunes: ['Spanish × Boer', 'Spanish × Kiko'],
    imagen: '/images/raza/spanish.jpg',
    color: 'bg-brown-300',
    badges: ['Resistente', 'Pastoreo', 'Mediterránea']
  },
  {
    id: 'myotonic',
    nombre: 'Myotonic (Fainting)',
    nombreCientifico: 'Capra aegagrus hircus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      grasa: 'media',
      textura: 'fina',
      intensidadSabor: 'media',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Myotonic americana, conocida por su condición genética única, carne equilibrada y tierna.',
    caracteristicas: [
      'Condición myotónica única',
      'Carne tierna',
      'Temperamento dócil',
      'Fácil manejo',
      'Buena conformación'
    ],
    crucesComunes: ['Myotonic × Boer'],
    imagen: '/images/raza/myotonic.jpg',
    color: 'bg-gray-400',
    badges: ['Única', 'Tierna', 'Dócil']
  }
];
