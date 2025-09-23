export interface Harina {
  id: string;
  nombre: string;
  nombreCientifico: string;
  familia: 'trigo' | 'cereales-gf' | 'pseudocereales' | 'tuberculos' | 'leguminosas' | 'frutos-secos';
  gluten: boolean;
  badges: string[];
  
  // Métricas técnicas
  proteina: {
    min: number;
    max: number;
    promedio: number;
  };
  fuerza?: {
    w: number;
    pl: number;
  };
  absorcion: 'baja' | 'media' | 'alta';
  extraccion: number; // %
  cenizas: number; // %
  fallingNumber?: number;
  almidonDanado: 'bajo' | 'medio' | 'alto';
  granulometria: 'fina' | 'media' | 'gruesa';
  
  // Comportamiento culinario
  hidratacionTipica: {
    pan: number;
    pizza: number;
    pasteleria: number;
    pasta: number;
  };
  toleranciaFermentacion: 'baja' | 'alta';
  color: string;
  sabor: string[];
  estructuraMiga: 'cerrada' | 'abierta' | 'mixta';
  crocancia: 'baja' | 'media' | 'alta';
  
  // Seguridad
  alergenos: string[];
  contaminacionCruzada: string[];
  almacenamiento: {
    temperatura: string;
    humedad: string;
    vidaUtil: string;
  };
  
  // Usos y recetas
  usosIdeales: string[];
  recetasBase: {
    id: string;
    nombre: string;
    hidratacion: number;
    tecnica: string;
  }[];
  
  // Tips de formulación
  tips: string[];
  
  // Metadatos
  alias: string[];
  colorGradiente: string;
  icono: string;
}

export const HARINAS: Harina[] = [
  {
    id: 'trigo-panadera',
    nombre: 'Harina de Trigo Panadera',
    nombreCientifico: 'Triticum aestivum',
    familia: 'trigo',
    gluten: true,
    badges: ['GLUTEN', 'Pan', 'Pizza', 'Todo uso'],
    proteina: { min: 9, max: 11.5, promedio: 10.5 },
    fuerza: { w: 200, pl: 0.5 },
    absorcion: 'media',
    extraccion: 75,
    cenizas: 0.5,
    fallingNumber: 300,
    almidonDanado: 'bajo',
    granulometria: 'media',
    hidratacionTipica: { pan: 65, pizza: 60, pasteleria: 50, pasta: 30 },
    toleranciaFermentacion: 'alta',
    color: 'Blanco cremoso',
    sabor: ['Neutro', 'Ligeramente dulce'],
    estructuraMiga: 'mixta',
    crocancia: 'media',
    alergenos: ['Gluten'],
    contaminacionCruzada: ['Avena', 'Cebada', 'Centeno'],
    almacenamiento: {
      temperatura: '20-25°C',
      humedad: '<70%',
      vidaUtil: '6-12 meses'
    },
    usosIdeales: ['Pan de molde', 'Pizza casera', 'Pasta fresca', 'Bizcochos'],
    recetasBase: [
      { id: 'pan-molde', nombre: 'Pan de Molde', hidratacion: 65, tecnica: 'Amasado directo' },
      { id: 'pizza-casera', nombre: 'Pizza Casera', hidratacion: 60, tecnica: 'Fermentación 24h' },
      { id: 'pasta-fresca', nombre: 'Pasta Fresca', hidratacion: 30, tecnica: 'Sémola + huevo' }
    ],
    tips: [
      'Ideal para principiantes en panadería',
      'Añade 0.2% malta si el falling number es alto',
      'Para pizza: autólisis 30 min antes del amasado'
    ],
    alias: ['AP', 'All Purpose', 'Harina común'],
    colorGradiente: 'from-amber-200 to-amber-300',
    icono: 'Wheat'
  },
  {
    id: 'trigo-fuerza',
    nombre: 'Harina de Trigo Fuerza',
    nombreCientifico: 'Triticum aestivum',
    familia: 'trigo',
    gluten: true,
    badges: ['GLUTEN', 'Pan', 'Pizza', 'Fermentación larga'],
    proteina: { min: 12, max: 14, promedio: 13 },
    fuerza: { w: 320, pl: 0.6 },
    absorcion: 'alta',
    extraccion: 78,
    cenizas: 0.6,
    fallingNumber: 280,
    almidonDanado: 'medio',
    granulometria: 'media',
    hidratacionTipica: { pan: 72, pizza: 65, pasteleria: 45, pasta: 35 },
    toleranciaFermentacion: 'alta',
    color: 'Amarillo dorado',
    sabor: ['Intenso', 'Cereal tostado'],
    estructuraMiga: 'abierta',
    crocancia: 'alta',
    alergenos: ['Gluten'],
    contaminacionCruzada: ['Avena', 'Cebada', 'Centeno'],
    almacenamiento: {
      temperatura: '20-25°C',
      humedad: '<70%',
      vidaUtil: '6-12 meses'
    },
    usosIdeales: ['Pan rústico', 'Pizza napolitana', 'Brioche', 'Croissants'],
    recetasBase: [
      { id: 'pan-rustico', nombre: 'Pan Rústico', hidratacion: 75, tecnica: 'Masa madre + autólisis' },
      { id: 'pizza-napoletana', nombre: 'Pizza Napolitana', hidratacion: 65, tecnica: 'Fermentación 48-72h' },
      { id: 'brioche', nombre: 'Brioche', hidratacion: 50, tecnica: 'Enriquecido con huevo y mantequilla' }
    ],
    tips: [
      'Baja sal a 1.8% con W>320',
      'Requiere amasado más intenso',
      'Ideal para fermentaciones largas en frío'
    ],
    alias: ['Bread flour', 'Harina de fuerza', 'Strong flour'],
    colorGradiente: 'from-yellow-400 to-yellow-500',
    icono: 'Wheat'
  },
  {
    id: 'trigo-integral',
    nombre: 'Harina de Trigo Integral',
    nombreCientifico: 'Triticum aestivum',
    familia: 'trigo',
    gluten: true,
    badges: ['GLUTEN', 'Integral', 'Nutritivo', 'Pan'],
    proteina: { min: 11, max: 13, promedio: 12 },
    fuerza: { w: 180, pl: 0.4 },
    absorcion: 'alta',
    extraccion: 100,
    cenizas: 1.2,
    fallingNumber: 250,
    almidonDanado: 'alto',
    granulometria: 'gruesa',
    hidratacionTipica: { pan: 70, pizza: 65, pasteleria: 40, pasta: 35 },
    toleranciaFermentacion: 'baja',
    color: 'Marrón tostado',
    sabor: ['Intenso', 'Nuez', 'Cereal tostado'],
    estructuraMiga: 'cerrada',
    crocancia: 'alta',
    alergenos: ['Gluten'],
    contaminacionCruzada: ['Avena', 'Cebada', 'Centeno'],
    almacenamiento: {
      temperatura: '15-20°C',
      humedad: '<60%',
      vidaUtil: '3-6 meses'
    },
    usosIdeales: ['Pan integral', 'Galletas', 'Muffins saludables'],
    recetasBase: [
      { id: 'pan-integral', nombre: 'Pan Integral', hidratacion: 70, tecnica: 'Mezcla 50% integral + 50% blanca' },
      { id: 'galletas-integrales', nombre: 'Galletas Integrales', hidratacion: 40, tecnica: 'Método cremado' }
    ],
    tips: [
      'Sube 2-4% de agua si mezclas integral 50%',
      'Refrigera para mantener frescura',
      'Mezcla con harina blanca para mejor estructura'
    ],
    alias: ['Whole wheat', 'Harina completa'],
    colorGradiente: 'from-amber-600 to-amber-700',
    icono: 'Wheat'
  },
  {
    id: 'arroz-blanco',
    nombre: 'Harina de Arroz Blanco',
    nombreCientifico: 'Oryza sativa',
    familia: 'cereales-gf',
    gluten: false,
    badges: ['SIN GLUTEN', 'Fritura', 'Tempura', 'Asia'],
    proteina: { min: 6, max: 8, promedio: 7 },
    absorcion: 'media',
    extraccion: 70,
    cenizas: 0.3,
    almidonDanado: 'bajo',
    granulometria: 'fina',
    hidratacionTipica: { pan: 60, pizza: 55, pasteleria: 45, pasta: 25 },
    toleranciaFermentacion: 'baja',
    color: 'Blanco puro',
    sabor: ['Neutro', 'Ligeramente dulce'],
    estructuraMiga: 'cerrada',
    crocancia: 'alta',
    alergenos: [],
    contaminacionCruzada: ['Gluten', 'Frutos secos'],
    almacenamiento: {
      temperatura: '20-25°C',
      humedad: '<60%',
      vidaUtil: '12-18 meses'
    },
    usosIdeales: ['Tempura', 'Frituras', 'Postres asiáticos', 'Pasta sin gluten'],
    recetasBase: [
      { id: 'tempura', nombre: 'Tempura', hidratacion: 25, tecnica: 'Agua muy fría + mezcla rápida' },
      { id: 'fideos-arroz', nombre: 'Fideos de Arroz', hidratacion: 30, tecnica: 'Agua caliente + amasado' }
    ],
    tips: [
      'Para fritura súper crujiente: mezcla arroz + maíz (70/30)',
      'Usa agua muy fría para tempura',
      'Añade 1-2% xantana para mejor estructura'
    ],
    alias: ['Rice flour', 'Harina de arroz'],
    colorGradiente: 'from-white to-gray-100',
    icono: 'Grain'
  },
  {
    id: 'maiz-fino',
    nombre: 'Harina de Maíz Fina',
    nombreCientifico: 'Zea mays',
    familia: 'cereales-gf',
    gluten: false,
    badges: ['SIN GLUTEN', 'Tortillas', 'Arepas', 'América Latina'],
    proteina: { min: 7, max: 9, promedio: 8 },
    absorcion: 'alta',
    extraccion: 80,
    cenizas: 0.4,
    almidonDanado: 'bajo',
    granulometria: 'fina',
    hidratacionTipica: { pan: 65, pizza: 60, pasteleria: 50, pasta: 40 },
    toleranciaFermentacion: 'baja',
    color: 'Amarillo dorado',
    sabor: ['Dulce', 'Cereal', 'Tostado'],
    estructuraMiga: 'cerrada',
    crocancia: 'alta',
    alergenos: [],
    contaminacionCruzada: ['Gluten'],
    almacenamiento: {
      temperatura: '20-25°C',
      humedad: '<60%',
      vidaUtil: '12-18 meses'
    },
    usosIdeales: ['Tortillas', 'Arepas', 'Polenta', 'Pan de maíz'],
    recetasBase: [
      { id: 'tortillas', nombre: 'Tortillas', hidratacion: 60, tecnica: 'Agua caliente + reposo 30min' },
      { id: 'arepas', nombre: 'Arepas', hidratacion: 65, tecnica: 'Agua tibia + amasado suave' },
      { id: 'polenta', nombre: 'Polenta', hidratacion: 80, tecnica: 'Cocción lenta con caldo' }
    ],
    tips: [
      'Mezclar con agua caliente para activar',
      'Ideal para texturas crujientes',
      'Combina bien con harina de arroz'
    ],
    alias: ['Corn flour', 'Harina de maíz', 'Maicena'],
    colorGradiente: 'from-yellow-300 to-yellow-400',
    icono: 'Grain'
  },
  {
    id: 'almendras',
    nombre: 'Harina de Almendras',
    nombreCientifico: 'Prunus dulcis',
    familia: 'frutos-secos',
    gluten: false,
    badges: ['SIN GLUTEN', 'Keto', 'Paleo', 'Pastelería'],
    proteina: { min: 20, max: 25, promedio: 22 },
    absorcion: 'baja',
    extraccion: 100,
    cenizas: 3.5,
    almidonDanado: 'bajo',
    granulometria: 'fina',
    hidratacionTipica: { pan: 40, pizza: 35, pasteleria: 30, pasta: 20 },
    toleranciaFermentacion: 'baja',
    color: 'Beige claro',
    sabor: ['Nuez', 'Dulce', 'Intenso'],
    estructuraMiga: 'cerrada',
    crocancia: 'media',
    alergenos: ['Frutos secos'],
    contaminacionCruzada: ['Otros frutos secos'],
    almacenamiento: {
      temperatura: '5-15°C',
      humedad: '<50%',
      vidaUtil: '6-12 meses'
    },
    usosIdeales: ['Macarons', 'Tartas', 'Galletas', 'Pan keto'],
    recetasBase: [
      { id: 'macarons', nombre: 'Macarons', hidratacion: 30, tecnica: 'Método francés' },
      { id: 'tarta-almendras', nombre: 'Tarta de Almendras', hidratacion: 25, tecnica: 'Método cremado' }
    ],
    tips: [
      'Refrigerar para mantener frescura',
      'Usar menos cantidad que harina de trigo',
      'Añadir 1-2% xantana para mejor estructura'
    ],
    alias: ['Almond flour', 'Harina de almendra'],
    colorGradiente: 'from-amber-100 to-amber-200',
    icono: 'Nut'
  },
  {
    id: 'quinoa',
    nombre: 'Harina de Quinoa',
    nombreCientifico: 'Chenopodium quinoa',
    familia: 'pseudocereales',
    gluten: false,
    badges: ['SIN GLUTEN', 'Proteína completa', 'Nutritivo', 'Superalimento'],
    proteina: { min: 14, max: 16, promedio: 15 },
    absorcion: 'alta',
    extraccion: 100,
    cenizas: 2.8,
    almidonDanado: 'bajo',
    granulometria: 'fina',
    hidratacionTipica: { pan: 70, pizza: 65, pasteleria: 50, pasta: 35 },
    toleranciaFermentacion: 'baja',
    color: 'Verde claro',
    sabor: ['Terroso', 'Nuez', 'Ligeramente amargo'],
    estructuraMiga: 'cerrada',
    crocancia: 'media',
    alergenos: [],
    contaminacionCruzada: ['Gluten'],
    almacenamiento: {
      temperatura: '15-20°C',
      humedad: '<60%',
      vidaUtil: '6-12 meses'
    },
    usosIdeales: ['Pan nutritivo', 'Pasta sin gluten', 'Galletas saludables'],
    recetasBase: [
      { id: 'pan-quinoa', nombre: 'Pan de Quinoa', hidratacion: 70, tecnica: 'Mezcla con harina de arroz' },
      { id: 'pasta-quinoa', nombre: 'Pasta de Quinoa', hidratacion: 35, tecnica: 'Huevo + amasado' }
    ],
    tips: [
      'Tostar antes de moler para mejor sabor',
      'Mezclar con otras harinas sin gluten',
      'Añadir 2-3% xantana para mejor textura'
    ],
    alias: ['Quinoa flour', 'Harina de quinoa'],
    colorGradiente: 'from-green-200 to-green-300',
    icono: 'Leaf'
  },
  {
    id: 'tapioca',
    nombre: 'Almidón de Yuca (Tapioca)',
    nombreCientifico: 'Manihot esculenta',
    familia: 'tuberculos',
    gluten: false,
    badges: ['SIN GLUTEN', 'Almidón', 'Textura', 'Brasil'],
    proteina: { min: 0.5, max: 1, promedio: 0.8 },
    absorcion: 'baja',
    extraccion: 95,
    cenizas: 0.2,
    almidonDanado: 'bajo',
    granulometria: 'fina',
    hidratacionTipica: { pan: 30, pizza: 25, pasteleria: 20, pasta: 15 },
    toleranciaFermentacion: 'baja',
    color: 'Blanco puro',
    sabor: ['Neutro', 'Ligeramente dulce'],
    estructuraMiga: 'cerrada',
    crocancia: 'alta',
    alergenos: [],
    contaminacionCruzada: ['Gluten'],
    almacenamiento: {
      temperatura: '20-25°C',
      humedad: '<60%',
      vidaUtil: '18-24 meses'
    },
    usosIdeales: ['Pudín', 'Bubble tea', 'Texturizante', 'Pan sin gluten'],
    recetasBase: [
      { id: 'pudim-tapioca', nombre: 'Pudim de Tapioca', hidratacion: 20, tecnica: 'Cocción con leche de coco' },
      { id: 'pan-tapioca', nombre: 'Pan de Tapioca', hidratacion: 30, tecnica: 'Mezcla con otras harinas' }
    ],
    tips: [
      'Excelente para dar elasticidad',
      'Mezclar con harina de arroz para mejor textura',
      'Usar en pequeñas cantidades (5-10%)'
    ],
    alias: ['Tapioca starch', 'Almidón de yuca', 'Mandioca'],
    colorGradiente: 'from-white to-gray-50',
    icono: 'Circle'
  }
];

export const FAMILIAS = [
  { id: 'trigo', nombre: 'Trigo y Afines', color: 'from-amber-200 to-amber-400' },
  { id: 'cereales-gf', nombre: 'Cereales Sin Gluten', color: 'from-yellow-200 to-yellow-400' },
  { id: 'pseudocereales', nombre: 'Pseudocereales', color: 'from-green-200 to-green-400' },
  { id: 'tuberculos', nombre: 'Tubérculos', color: 'from-orange-200 to-orange-400' },
  { id: 'leguminosas', nombre: 'Leguminosas', color: 'from-red-200 to-red-400' },
  { id: 'frutos-secos', nombre: 'Frutos Secos', color: 'from-amber-100 to-amber-300' }
];

export const USOS_CULINARIOS = [
  'Pan rústico', 'Pan de molde', 'Baguette', 'Pizza napolitana', 'Pizza romana',
  'Pasta fresca', 'Pasta seca', 'Hojaldre', 'Croissants', 'Brioche',
  'Bizcocho genovés', 'Masa quebrada', 'Galletas', 'Muffins', 'Pancakes',
  'Tempura', 'Rebozado', 'Roux', 'Salsas', 'Empanizados'
];

export const TECNICAS = [
  'Amasado directo', 'Autólisis', 'Masa madre', 'Poolish', 'Biga',
  'Fermentación 24h', 'Fermentación 48-72h', 'Fermentación en frío',
  'Método cremado', 'Método francés', 'Método italiano'
];
