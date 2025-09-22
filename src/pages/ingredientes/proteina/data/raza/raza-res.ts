export interface Raza {
  id: string;
  nombre: string;
  nombreCientifico: string;
  origen: string;
  tipo: 'carne' | 'leche' | 'doble-proposito';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    bms: string;
    etiqueta: 'magra' | 'magra especial' | 'equilibrada' | 'equilibrada-jugosa'  | 'marmoleada premium';
  };
  climaIdeal: 'templado' | 'tropical' | 'continental' | 'mediterraneo';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para res (bovino)
export const CONFIG_RES = {
  // Información adicional en el modal
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Clima ideal', valor: 'climaIdeal' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  // Perfil de carne en el modal
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarBMS: true,
    mostrarDescripcion: true,
    descripcion: (bms: string) => {
      const bmsNum = parseInt(bms.split('-')[0]);
      if (bmsNum <= 2) return 'Carne muy magra, ideal para dietas bajas en grasa.';
      if (bmsNum <= 5) return 'Carne equilibrada con buen marmoleo y jugosidad.';
      if (bmsNum <= 8) return 'Carne jugosa con excelente marmoleo.';
      return 'Carne premium con marmoleo excepcional, textura suave.';
    }
  },
  // KPIs específicos (ninguno para res)
  kpis: []
};

export const RAZAS_RES: Raza[] = [
  {
    id: 'angus',
    nombre: 'Angus',
    nombreCientifico: 'Bos taurus',
    origen: 'Escocia',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      bms: '4-6',
      etiqueta: 'equilibrada-jugosa'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'alto',
    descripcion: 'Raza Angus, originaria de Escocia. Muy apreciada por su carne marmoleada y tierna, estándar en cortes premium de exportación.',
    caracteristicas: [
      'Carne marmoleada excepcional',
      'Ternura superior',
      'Sabor intenso y equilibrado',
      'Alto rendimiento en canal',
      'Adaptabilidad climática'
    ],
    crucesComunes: ['Brangus', 'Braford'],
    imagen: '/images/raza/res/angus.jpg',
    color: 'bg-slate-900',
    badges: ['Premium', 'Exportación', 'Marmoleada']
  },
  {
    id: 'hereford',
    nombre: 'Hereford',
    nombreCientifico: 'Bos taurus',
    origen: 'Inglaterra',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      bms: '3-5',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'alto',
    descripcion: 'Raza Hereford, originaria de Inglaterra. Conocida por su carne tierna y jugosa, muy popular en Sudamérica y Estados Unidos.',
    caracteristicas: [
      'Carne tierna y jugosa',
      'Excelente sabor',
      'Buen rendimiento en canal',
      'Resistencia a enfermedades',
      'Fácil manejo'
    ],
    crucesComunes: ['Braford', 'Santa Gertrudis'],
    imagen: '/images/raza/res/hereford.jpg',
    color: 'bg-red-600',
    badges: ['Popular', 'Jugosa', 'Resistente']
  },
  {
    id: 'charolais',
    nombre: 'Charolais',
    nombreCientifico: 'Bos taurus',
    origen: 'Francia',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      bms: '1-3',
      etiqueta: 'magra'
    },
    climaIdeal: 'continental',
    consumoGlobal: 'medio',
    descripcion: 'Raza Charolais francesa, reconocida por su carne magra y rendidora. Excelente para producción de carne de calidad.',
    caracteristicas: [
      'Carne magra de calidad',
      'Alto rendimiento en canal',
      'Crecimiento rápido',
      'Buenas cualidades maternas',
      'Adaptabilidad a diferentes climas'
    ],
    crucesComunes: ['Charolais × Angus'],
    imagen: '/images/raza/res/charolais.jpg',
    color: 'bg-amber-100',
    badges: ['Magra', 'Rendidora', 'Francesa']
  },
  {
    id: 'simmental',
    nombre: 'Simmental',
    nombreCientifico: 'Bos taurus',
    origen: 'Suiza',
    tipo: 'doble-proposito',
    popularidad: 'alta',
    perfilCarne: {
      bms: '3-5',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'continental',
    consumoGlobal: 'alto',
    descripcion: 'Raza Simmental suiza, de doble propósito. Combina excelente producción de leche con carne de calidad y buena infiltración de grasa.',
    caracteristicas: [
      'Doble propósito (leche y carne)',
      'Buena infiltración de grasa',
      'Excelente producción de leche',
      'Carne de calidad',
      'Resistencia y rusticidad'
    ],
    crucesComunes: ['Simmental × Angus'],
    imagen: '/images/raza/res/simmental.jpg',
    color: 'bg-yellow-400',
    badges: ['Doble Propósito', 'Lechera', 'Rusticidad']
  },
  {
    id: 'limousin',
    nombre: 'Limousin',
    nombreCientifico: 'Bos taurus',
    origen: 'Francia',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      bms: '1-3',
      etiqueta: 'magra'
    },
    climaIdeal: 'continental',
    consumoGlobal: 'medio',
    descripcion: 'Raza Limousin francesa, conocida por su carne magra y sabrosa. Alto rendimiento en canal con excelente calidad.',
    caracteristicas: [
      'Carne magra y sabrosa',
      'Alto rendimiento en canal',
      'Excelente conformación',
      'Buenas cualidades maternas',
      'Adaptabilidad climática'
    ],
    crucesComunes: ['Limousin × Angus'],
    imagen: '/images/raza/res/limousin.jpg',
    color: 'bg-orange-300',
    badges: ['Magra', 'Sabrosa', 'Rendidora']
  },
  {
    id: 'shorthorn',
    nombre: 'Shorthorn',
    nombreCientifico: 'Bos taurus',
    origen: 'Reino Unido',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      bms: '3-5',
      etiqueta: 'equilibrada'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'medio',
    descripcion: 'Raza Shorthorn británica, de carne de calidad. Criada tradicionalmente en Reino Unido y Argentina.',
    caracteristicas: [
      'Carne de calidad superior',
      'Ternura excepcional',
      'Buen rendimiento en canal',
      'Resistencia a enfermedades',
      'Fácil manejo'
    ],
    crucesComunes: ['Santa Gertrudis'],
    imagen: '/images/raza/res/shorthorn.jpg',
    color: 'bg-red-300',
    badges: ['Calidad', 'Tierna', 'Británica']
  },
  {
    id: 'brahman',
    nombre: 'Brahman',
    nombreCientifico: 'Bos indicus',
    origen: 'India',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      bms: '0-2',
      etiqueta: 'magra'
    },
    climaIdeal: 'tropical',
    consumoGlobal: 'alto',
    descripcion: 'Raza Brahman cebuina, originaria de India. Muy resistente al calor, carne menos marmoleada pero muy consumida en regiones tropicales.',
    caracteristicas: [
      'Resistencia al calor',
      'Carne magra',
      'Alta rusticidad',
      'Resistencia a parásitos',
      'Adaptabilidad tropical'
    ],
    crucesComunes: ['Brangus', 'Braford', 'Santa Gertrudis'],
    imagen: '/images/raza/res/brahman.jpg',
    color: 'bg-gray-600',
    badges: ['Tropical', 'Rusticidad', 'Resistente']
  },
  {
    id: 'nelore',
    nombre: 'Nelore',
    nombreCientifico: 'Bos indicus',
    origen: 'Brasil',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      bms: '0-2',
      etiqueta: 'magra'
    },
    climaIdeal: 'tropical',
    consumoGlobal: 'alto',
    descripcion: 'Raza Nelore brasileña, muy popular en Latinoamérica. Carne magra de excelente calidad, usada en exportación.',
    caracteristicas: [
      'Carne magra de calidad',
      'Excelente para exportación',
      'Alta rusticidad',
      'Resistencia al calor',
      'Buen rendimiento en canal'
    ],
    crucesComunes: ['Nelore × Angus'],
    imagen: '/images/raza/res/nelore.jpg',
    color: 'bg-green-600',
    badges: ['Exportación', 'Magra', 'Brasileña']
  },
  {
    id: 'wagyu',
    nombre: 'Wagyu',
    nombreCientifico: 'Bos taurus',
    origen: 'Japón',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      bms: '8-12',
      etiqueta: 'marmoleada premium'
    },
    climaIdeal: 'templado',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Wagyu japonesa, extremadamente marmoleada. Usada para Kobe Beef, considerada la carne más premium del mundo.',
    caracteristicas: [
      'Marmoleado excepcional',
      'Sabor único e intenso',
      'Textura suave como mantequilla',
      'Alto contenido de grasa intramuscular',
      'Denominación de origen'
    ],
    crucesComunes: ['Wagyu × Angus'],
    imagen: '/images/raza/res/wagyu.jpg',
    color: 'bg-red-800',
    badges: ['Premium', 'Kobe', 'Japonesa']
  },
  {
    id: 'piedmontese',
    nombre: 'Piedmontese',
    nombreCientifico: 'Bos taurus',
    origen: 'Italia',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      bms: '0-1',
      etiqueta: 'magra especial'
    },
    climaIdeal: 'mediterraneo',
    consumoGlobal: 'bajo',
    descripcion: 'Raza Piedmontese italiana, carne muy magra con fibras finas. Baja en grasa pero de excelente calidad.',
    caracteristicas: [
      'Carne muy magra',
      'Fibras finas',
      'Bajo contenido de grasa',
      'Excelente sabor',
      'Denominación de origen'
    ],
    crucesComunes: ['Piedmontese × Angus'],
    imagen: '/images/raza/res/piedmontese.jpg',
    color: 'bg-blue-600',
    badges: ['Magra', 'Italiana', 'Fibras Finas']
  }
];
